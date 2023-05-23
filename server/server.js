const express = require('express');
const mysql = require('mysql');
const app = express();
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


// 创建数据库连接
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gk'
});

// 连接到数据库
connection.connect((error) => {
  if (error) {
    console.error('连接到数据库失败：', error);
    return;
  }
  console.log('成功连接到数据库！');
});

// 设置路由和处理程序
app.get('/api/data', (req, res) => {
  const id = req.query.id; // 从请求参数中获取ID值

  // 执行数据库查询
  connection.query('SELECT * FROM test WHERE id = ?', [id], (error, results) => {
    console.log("results",results);
    if (error) {
      console.error('查询数据库失败：', error);
      res.status(500).json({ error: '数据库查询错误' });
      return;
    }
    res.json(results);
  });
});

// 启动服务器
app.listen(3000, () => {
  console.log('Node.js服务器已启动，监听端口3000！');
});
