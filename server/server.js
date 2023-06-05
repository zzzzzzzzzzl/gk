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
  const query = `SELECT DISTINCT ${column} FROM chaxun`;
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

function getDataFromDatabase(tableName, page, pageSize) {
  const offset = (page - 1) * pageSize;
  const query = `SELECT * FROM ${tableName} LIMIT ?, ?`;

  return new Promise((resolve, reject) => {
    connection.query(query, [offset, pageSize], (error, results) => {
      if (error) {
        console.error(`查询 "${tableName}" 表失败：`, error);
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}



 app.get('/api/filtered-chaxun', (req, res) => {
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

//--------------------------------------------------------------------
// 路由处理程序
// app.get('/combinedColumns', (req, res) => {
//   // SQL查询语句
//   const query = 'SELECT CONCAT_WS("  ", Amenlei, Azhuanyeleibie, Azhuanyedaima, Azhuanyemingchengyaoqiu, Axuankeyaoqiu, Ayuanxiaodaima, Axuexiaomingc, Acengci, Ashengfen, Acity, A22toudangfen, A22toudangweici, Axuefei, Azhaoshengleix, Acitypaihang, A22jihuashu, zhuanyetese, A21zuidifen, A21zuidiweici, A22jihua, A21jihua, Atuimianyanzhao, Abeizhu, Axuezhi, Acengcitedian, Ajihuashu, Azhuanyemingcheng) AS combinedColumn FROM chaxun;'


//   // 执行查询
//   connection.query(query, (err, results) => {
//     if (err) {
//       console.error('Error executing query: ' + err.stack);
//       res.status(500).send('Error executing query');
//       return;
//     }

//     // 获取查询结果中的合并列数据
//     const combinedColumns = results.map(result => result.combinedColumn);

//     // 返回查询结果
//     res.json(combinedColumns);
//   });
// });



 // 路由处理程序
 app.get('/combinedColumns', (req, res) => {
  // SQL查询语句
  const query = 'SELECT Amenlei, Azhuanyeleibie, Azhuanyedaima, Azhuanyemingchengyaoqiu, Axuankeyaoqiu, Ayuanxiaodaima, Axuexiaomingc, Acengci, Ashengfen, Acity, A22toudangfen, A22toudangweici, Axuefei, Azhaoshengleix, Acitypaihang, A22jihuashu, zhuanyetese, A21zuidifen, A21zuidiweici, A22jihua, A21jihua, Atuimianyanzhao, Abeizhu, Axuezhi, Acengcitedian, Ajihuashu, Azhuanyemingcheng FROM chaxun;'

  // 执行查询
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      res.status(500).send('Error executing query');
      return;
    }

    // 获取查询结果
    const combinedColumns = [];

    // 将查询结果按属性分开
    results.forEach(result => {
      const item = {
        Amenlei: result.Amenlei,
        Azhuanyeleibie: result.Azhuanyeleibie,
        Azhuanyedaima: result.Azhuanyedaima,
        Azhuanyemingchengyaoqiu: result.Azhuanyemingchengyaoqiu,
        Axuankeyaoqiu: result.Axuankeyaoqiu,
        Ayuanxiaodaima: result.Ayuanxiaodaima,
        Axuexiaomingc: result.Axuexiaomingc,
        Acengci: result.Acengci,
        Ashengfen: result.Ashengfen,
        Acity: result.Acity,
        A22toudangfen: result.A22toudangfen,
        A22toudangweici: result.A22toudangweici,
        Axuefei: result.Axuefei,
        Azhaoshengleix: result.Azhaoshengleix,
        Acitypaihang: result.Acitypaihang,
        A22jihuashu: result.A22jihuashu,
        zhuanyetese: result.zhuanyetese,
        A21zuidifen: result.A21zuidifen,
        A21zuidiweici: result.A21zuidiweici,
        A22jihua: result.A22jihua,
        A21jihua: result.A21jihua,
        Atuimianyanzhao: result.Atuimianyanzhao,
        Abeizhu: result.Abeizhu,
        Axuezhi: result.Axuezhi,
        Acengcitedian: result.Acengcitedian,
        Ajihuashu: result.Ajihuashu,
        Azhuanyemingcheng: result.Azhuanyemingcheng // 添加了一个属性
      };

      combinedColumns.push(item);
    });

    // 发送结果作为响应
    res.json(combinedColumns);
  });
});



//-------------------------------------------------------------------------------------------------
// 启动服务器
app.listen(3000, () => {
  console.log('Node.js服务器已启动，监听端口3000！');
});

app.get('/api/table-data', (req, res) => {
  const tableName = req.query.tableName;

  connection.query(`SELECT * FROM ${tableName}`, (error, results) => {
    if (error) {
      console.error(`查询 "${tableName}" 表失败：`, error);
      res.status(500).json({ error: '数据库查询错误' });
      return;
    }

    const tableData = [];
    for (let i = 0; i < results.length; i++) {
      const row = results[i];
      const rowData = [];
      for (const column in row) {
        rowData.push(row[column]);
      }
      tableData.push(rowData);
    }

    res.json(tableData);
  });

});
