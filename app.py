from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import MySQLdb.cursors
import bcrypt
import logging
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# 로깅 설정
logging.basicConfig(level=logging.DEBUG, filename='app.log', filemode='a',
                    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# MySQL 설정
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER', 'root')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD', '4126')
app.config['MYSQL_DB'] = 'geeklogin'

mysql = MySQL(app)

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data['username']
    email = data['email']
    password = data['password']
    
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    
    try:
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO users (username, email, password) VALUES (%s, %s, %s)', (username, email, hashed_password))
        mysql.connection.commit()
        return jsonify({"success": True, "message": "회원가입 성공"})
    except Exception as e:
        logging.error(f"An error occurred during registration: {str(e)}")
        return jsonify({"success": False, "message": "회원가입 실패: 데이터베이스 오류"}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']
    
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
    user = cursor.fetchone()
    
    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({"success": True, "message": "로그인 성공"})
    else:
        return jsonify({"success": False, "message": "로그인 실패: 이메일 또는 비밀번호가 올바르지 않습니다"}), 401


@app.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    try:
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT id, username, email, gender, firstname, lastname, country, job_title FROM users WHERE id = %s', (user_id,))
        user = cursor.fetchone()
        
        if user:
            return jsonify({"success": True, "user": user})
        else:
            return jsonify({"success": False, "message": "User not found"}), 404
    except Exception as e:
        logging.error(f"An error occurred while fetching user data: {str(e)}")
        return jsonify({"success": False, "message": "An error occurred while fetching user data."}), 500

@app.route('/user/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    try:
        data = request.json
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        
        # 업데이트할 필드 준비
        update_fields = []
        update_values = []
        for field in ['gender', 'firstname', 'lastname', 'country', 'job_title']:
            if field in data:
                update_fields.append(f"{field} = %s")
                update_values.append(data[field])
        
        if not update_fields:
            return jsonify({"success": False, "message": "No fields to update"}), 400
        
        update_query = f"UPDATE users SET {', '.join(update_fields)} WHERE id = %s"
        update_values.append(user_id)
        
        cursor.execute(update_query, tuple(update_values))
        mysql.connection.commit()
        
        if cursor.rowcount > 0:
            return jsonify({"success": True, "message": "User information updated successfully"})
        else:
            return jsonify({"success": False, "message": "User not found or no changes made"}), 404
    except Exception as e:
        logging.error(f"An error occurred while updating user data: {str(e)}")
        return jsonify({"success": False, "message": "An error occurred while updating user data."}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
