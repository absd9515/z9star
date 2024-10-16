const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// SQLite 데이터베이스 연결
const db = new sqlite3.Database('guestbook.db');

// 데이터베이스 테이블 생성 (최초 한 번만 실행)
db.run(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    message TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  )
`);

// 미들웨어 설정
app.use(express.urlencoded({ extended: false }));

// 메시지 등록
app.post('/addMessage', (req, res) => {
  const { name, message } = req.body;
  db.run('INSERT INTO messages (name, message) VALUES (?, ?)', [name, message], (err) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error adding message');
    } else {
      res.send('Message added successfully');
    }
  });
});

// 메시지 목록 가져오기
app.get('/messages', (req, res) => {
  db.all('SELECT * FROM messages', (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error fetching messages');
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});