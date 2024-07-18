// const express = require('express');
// const mysql = require('mysql');
// const cors = require('cors');

// const app = express();

// // MySQL 연결 설정
// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'iksanalswn1127^^',
//   database: 'webproject_0724'
// });

// // MySQL 연결
// db.connect((err) => {
//   if (err) {
//     console.error('MySQL connection error:', err);
//     return;
//   }
//   console.log('MySQL database connected!');
// });

// // CORS 설정
// app.use(cors());

// // JSON 파싱 미들웨어 추가
// app.use(express.json());

// // 사진 목록 가져오기 API
// app.get('/api/photos', (req, res) => {
//   const sql = 'SELECT * FROM photos ORDER BY RAND() LIMIT 11'; // 랜덤하게 11개의 사진 선택
//   db.query(sql, (err, photos) => {
//     if (err) {
//       res.status(500).json({ error: 'Failed to fetch photos' });
//     } else {
//       res.json(photos);
//     }
//   });
// });

// // 사용자 선택 저장 API
// app.post('/api/selections', (req, res) => {
//   const { userId, photoIds } = req.body;
//   // 예시: 사용자 선택을 user_selections 테이블에 저장하는 로직을 추가해야 함
//   const sql = 'INSERT INTO selections (user_id, photo_id) VALUES ?';
//   const values = photoIds.map(photoId => [userId, photoId]);

//   db.query(sql, [values], (err, result) => {
//     if (err) {
//       console.error('Error saving selections:', err);
//       res.status(500).json({ error: 'Failed to save user selections' });
//     } else {
//       console.log('User selections saved successfully');
//       res.status(200).json({ message: 'User selections saved successfully' });
//     }
//   });
// });

// // 포트 설정
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 5001;

app.use(express.static('public'));

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12341234',
  database: 'webproject_0724'
});

// MySQL 연결
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
    return;
  }
  console.log('MySQL database connected!');
});

// CORS 설정
app.use(cors());

// JSON 파싱 미들웨어 추가
app.use(express.json());

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  const sqlInsert = 'INSERT INTO users (email, password) VALUES (?, ?)';
  db.query(sqlInsert, [email, password], (err, result) => {
    if (err) {
      console.error('회원가입 실패:', err);
      res.status(500).json({ message: '회원가입 실패', error: err });
    } else {
      console.log('회원가입 성공:', result);
      res.status(200).json({ message: '회원가입 성공', result });
    }
  });
});

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

  // 사용자 선택을 selections 테이블에 저장하는 로직
  const sql = 'INSERT INTO selections (user_id, photo_id) VALUES ?';
  const values = photoIds.map(photoId => [userId, photoId]);

  db.query(sql, [values], (err, result) => {
    if (err) {
      console.error('Error saving selections:', err);
      res.status(500).json({ error: 'Failed to save user selections' });
    } else {
      console.log('User selections saved successfully');
      res.status(200).json({ message: 'User selections saved successfully' });
    }
  });
});


// 포트 설정
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
