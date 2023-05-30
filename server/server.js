// server.js
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

app.get('/api/filteredSchools', (req, res) => {
  const selectedProvince = req.query.province || '';
  const selectedEducationType = req.query.educationType || '';
  const selected985211 = req.query['985211'] || '';
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 50;

  // 构建 SQL 查询语句和参数
  let sql = 'SELECT * FROM school WHERE 1=1';
  let params = [];

  if (selectedProvince) {
    sql += ' AND province = ?';
    params.push(selectedProvince);
  }
  if (selectedEducationType) {
    sql += ' AND education_type = ?';
    params.push(selectedEducationType);
  }
  if (selected985211) {
    sql += ' AND (is_985 = ? OR is_211 = ?)';
    params.push(selected985211 === '985' ? 1 : 0);
    params.push(selected985211 === '211' ? 1 : 0);
  }

  // 计算偏移量
  const offset = (page - 1) * pageSize;

  // 执行数据库查询
  connection.query(`${sql} LIMIT ?, ?`, [...params, offset, pageSize], (error, results) => {
    if (error) {
      console.error('查询 "filteredSchools" 表失败：', error);
      res.status(500).json({ error: '数据库查询错误' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/schools', (req, res) => {
  // 执行数据库查询
  connection.query('SELECT * FROM school', (error, results) => {
    if (error) {
      console.error('查询 "schools" 表失败：', error);
      res.status(500).json({ error: '数据库查询错误' });
      return;
    }
    res.json(results);
  });
});


app.get('/api/provinces', (req, res) => {
  // 执行数据库查询或其他操作来获取省份列表
  const provinces = ['山东', '山西', '河北']; // 用实际的省份数据替换这里的示例数据

  // 将省份列表作为JSON响应发送回客户端
  res.json(provinces);
});


// 在 server.js 文件中添加以下代码
app.get('/unique-values', (req, res) => {
  const column = req.query.column;
  const query = `SELECT DISTINCT ${column} FROM your_table_name`;
  connection.query(query, (error, results) => {
    if (error) {
      console.error('获取唯一值失败：', error);
      res.status(500).json({ error: '获取唯一值失败' });
    } else {
      const values = results.map(result => result[column]);
      res.json(values);
    }
  });
});

// 在 server.js 文件中添加以下代码
app.get('/filtered-schools', (req, res) => {
  const { xuankeYaoqiu, province, city, zhuanyeLeibie, tuitionLessThan8000 } = req.query;

  let query = 'SELECT * FROM chaxun WHERE 1=1';

  if (xuankeYaoqiu) {
    query += ` AND Axuankeyaoqiu = '${xuankeYaoqiu}'`;
  }

  if (province) {
    query += ` AND Ashengfen = '${province}'`;
  }

  if (city) {
    query += ` AND Acity = '${city}'`;
  }

  if (zhuanyeLeibie) {
    query += ` AND Azhuanyeleibie = '${zhuanyeLeibie}'`;
  }

  if (tuitionLessThan8000) {
    query += ' AND Axuefei < 8000';
  }

  connection.query(query, (error, results) => {
    if (error) {
      console.error('查询数据失败：', error);
      res.status(500).json({ error: '查询数据失败' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/filteredchaxun', (req, res) => {
  const { xuankeYaoqiu, province, city, zhuanyeLeibie, tuitionLessThan8000 } = req.query;

  let query = 'SELECT * FROM chaxun WHERE 1=1';

  if (xuankeYaoqiu) {
    query += ` AND Axuankeyaoqiu = '${xuankeYaoqiu}'`;
  }

  if (province) {
    query += ` AND Ashengfen = '${province}'`;
  }

  if (city) {
    query += ` AND Acity = '${city}'`;
  }

  if (zhuanyeLeibie) {
    query += ` AND Azhuanyeleibie = '${zhuanyeLeibie}'`;
  }

  if (tuitionLessThan8000) {
    query += ' AND Axuefei < 8000';
  }

  connection.query(query, (error, results) => {
    if (error) {
      console.error('查询数据失败：', error);
      res.status(500).json({ error: '查询数据失败' });
    } else {
      res.json(results);
    }
  });
});



// 启动服务器
app.listen(3000, () => {
  console.log('Node.js服务器已启动，监听端口3000！');
});
