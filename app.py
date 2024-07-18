# # from flask import Flask, render_template, request, jsonify, session
# # import mysql.connector
# # import random

# # app = Flask(__name__)
# # app.secret_key = 'supersecretkey'  # 세션 관리를 위한 비밀 키 설정

# # def get_db_connection():
# #     return mysql.connector.connect(
# #         host="localhost",
# #         user="your_username",
# #         password="your_password",
# #         database="my_database"
# #     )

# # # 사진과 스타일 데이터를 랜덤으로 가져오는 API
# # @app.route('/get-random-photos', methods=['GET'])
# # def get_random_photos():
# #     connection = get_db_connection()
# #     cursor = connection.cursor(dictionary=True)
    
# #     cursor.execute('SELECT p.id, p.url, s.name AS style FROM photos p JOIN styles s ON p.style_id = s.id')
# #     photos = cursor.fetchall()
    
# #     cursor.close()
# #     connection.close()
    
# #     random.shuffle(photos)  # 사진을 랜덤으로 섞음
# #     return jsonify(photos[:3])  # 스타일당 1장씩 총 3장의 사진을 반환

# # # 사용자가 선택한 사진을 저장하는 API
# # @app.route('/select-photo', methods=['POST'])
# # def select_photo():
# #     if 'selections' not in session:
# #         session['selections'] = []
        
# #     photo_id = request.json['photo_id']
# #     user_id = 1  # 테스트용으로 사용자 ID를 1로 고정
# #     session['selections'].append(photo_id)
    
# #     if len(session['selections']) == 10:
# #         connection = get_db_connection()
# #         cursor = connection.cursor()
        
# #         for photo_id in session['selections']:
# #             cursor.execute('INSERT INTO user_selections (user_id, photo_id) VALUES (%s, %s)', (user_id, photo_id))
        
# #         connection.commit()
# #         cursor.close()
# #         connection.close()
        
# #         session.pop('selections')  # 세션 초기화
    
# #     return jsonify({'status': 'success'})

# # # 선택된 스타일별 퍼센트 계산 API
# # @app.route('/style-percentage', methods=['GET'])
# # def get_style_percentage():
# #     connection = get_db_connection()
# #     cursor = connection.cursor(dictionary=True)

# #     query = '''
# #     SELECT 
# #         s.name AS style_name,
# #         COUNT(us.id) AS selection_count,
# #         (COUNT(us.id) / total.total_selections) * 100 AS selection_percentage
# #     FROM 
# #         styles s
# #     JOIN 
# #         photos p ON s.id = p.style_id
# #     JOIN 
# #         user_selections us ON p.id = us.photo_id
# #     CROSS JOIN
# #         (SELECT COUNT(*) AS total_selections FROM user_selections) AS total
# #     GROUP BY 
# #         s.id;
# #     '''

# #     cursor.execute(query)
# #     result = cursor.fetchall()

# #     cursor.close()
# #     connection.close()

# #     return jsonify(result)

# # # 메인 페이지 렌더링
# # @app.route('/')
# # def index():
# #     return render_template('index.html')

# # if __name__ == '__main__':
# #     app.run(debug=True)

# from flask import Flask, render_template, request, redirect, url_for, session
# from flask_sqlalchemy import SQLAlchemy
# import random

# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///fashion_test.db'
# app.config['SECRET_KEY'] = 'your_secret_key'

# db = SQLAlchemy(app)

# class Photo(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     url = db.Column(db.String(255), nullable=False)
#     style_id = db.Column(db.Integer, nullable=False)

# class UserSelection(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user_id = db.Column(db.Integer, nullable=False)
#     photo_id = db.Column(db.Integer, db.ForeignKey('photo.id'), nullable=False)

# class Style(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(50), nullable=False)

# @app.route('/')
# def index():
#     return render_template('index.html')

# @app.route('/test', methods=['GET', 'POST'])
# def test():
#     if request.method == 'POST':
#         selected_photos = request.form.getlist('photos')
#         for photo_id in selected_photos:
#             selection = UserSelection(user_id=session['user_id'], photo_id=photo_id)
#             db.session.add(selection)
#         db.session.commit()
#         return redirect(url_for('result'))

#     photos = []
#     for i in range(11):
#         photos.append(Photo.query.filter_by(style_id=i+1).order_by(db.func.random()).first())
#     return render_template('test.html', photos=photos)

# @app.route('/result')
# def result():
#     user_selections = UserSelection.query.filter_by(user_id=session['user_id']).all()
#     style_count = {}
#     for selection in user_selections:
#         style_id = Photo.query.get(selection.photo_id).style_id
#         if style_id in style_count:
#             style_count[style_id] += 1
#         else:
#             style_count[style_id] = 1
#     sorted_styles = sorted(style_count.items(), key=lambda x: x[1], reverse=True)
#     return render_template('result.html', sorted_styles=sorted_styles)

# @app.route('/mypage')
# def mypage():
#     user_selections = UserSelection.query.filter_by(user_id=session['user_id']).all()
#     style_count = {}
#     for selection in user_selections:
#         style_id = Photo.query.get(selection.photo_id).style_id
#         if style_id in style_count:
#             style_count[style_id] += 1
#         else:
#             style_count[style_id] = 1
#     sorted_styles = sorted(style_count.items(), key=lambda x: x[1], reverse=True)
#     total_selections = sum(style_count.values())
#     style_percentages = [(Style.query.get(style_id).name, count / total_selections * 100) for style_id, count in sorted_styles]
#     return render_template('mypage.html', style_percentages=style_percentages)

# if __name__ == '__main__':
#     app.run(debug=True)






from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
import MySQLdb.cursors
import re
import bcrypt
import logging

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# 로깅 설정
logging.basicConfig(level=logging.DEBUG)

# MySQL 설정
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'  # MySQL 사용자 이름
app.config['MYSQL_PASSWORD'] = '4126'  # MySQL 비밀번호
app.config['MYSQL_DB'] = 'geeklogin'  # 데이터베이스 이름

mysql = MySQL(app)

@app.route('/login', methods=['POST'])
def login():
    try:
        username = request.json['username']
        password = request.json['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
        account = cursor.fetchone()
        if account and bcrypt.checkpw(password.encode('utf-8'), account['password'].encode('utf-8')):
            return jsonify({"success": True, "message": "Logged in successfully!", "user": {
                "id": account['id'],
                "username": account['username'],
                "email": account['email']
            }})
        else:
            return jsonify({"success": False, "message": "Incorrect username / password!"})
    except Exception as e:
        logging.error(f"An error occurred during login: {str(e)}")
        return jsonify({"success": False, "message": "An error occurred during login."}), 500

@app.route('/register', methods=['POST'])
def register():
    try:
        username = request.json['username']
        email = request.json['email']
        password = request.json['password']
        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
        account = cursor.fetchone()
        if account:
            return jsonify({"success": False, "message": "Account already exists!"})
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            return jsonify({"success": False, "message": "Invalid email address!"})
        elif not re.match(r'[A-Za-z0-9]+', username):
            return jsonify({"success": False, "message": "Username must contain only characters and numbers!"})
        elif not username or not email or not password:
            return jsonify({"success": False, "message": "Please fill out the form!"})
        else:
            hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
            cursor.execute('INSERT INTO users (username, email, password) VALUES (%s, %s, %s)', (username, email, hashed_password))
            mysql.connection.commit()
            return jsonify({"success": True, "message": "You have successfully registered!"})
    except Exception as e:
        logging.error(f"An error occurred during registration: {str(e)}")
        return jsonify({"success": False, "message": f"An error occurred during registration: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)