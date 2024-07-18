// server.js

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root@localhost',
  password: 'iksanalswn1127^^',
  database: 'webproject_0724'
});

// MySQL 연결
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('MySQL database connected!');
});

// CORS 설정
app.use(cors());

// 사진 목록 가져오기 API
app.get('/api/photos', (req, res) => {
  const sql = 'SELECT * FROM photos ORDER BY RAND() LIMIT 11'; // 랜덤하게 11개의 사진 선택
  db.query(sql, (err, photos) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch photos' });
    } else {
      res.json(photos);
    }
  });
});

// 사용자 선택 저장 API
app.post('/api/selections', (req, res) => {
  const { userId, photoIds } = req.body;
  // 예시: 사용자 선택을 user_selections 테이블에 저장하는 로직을 추가해야 함
  // 이 부분은 실제 필요에 맞게 작성해야 합니다.
});

// 포트 설정
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
