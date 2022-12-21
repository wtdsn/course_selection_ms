const { dbOption } = require('../config.js')

// mysql 连接数据库，执行sql 命令
const mysql = require('mysql')

// 连接数据库
const connection = mysql.createConnection(dbOption)

connection.connect(function (err) {
  if (err) {
    console.error("数据库连接失败：", err.stack)
    return
  }
  console.log("数据库连接成功！")
});

/* 
   对 query 进行封装
*/
async function queryAsync(query) {
  return new Promise((resolve) => {
    connection.query(query, (err, data) => {
      if (err) {
        console.log("Error At", err.stack);
        resolve({
          code: 0,
          err
        })
      }
      resolve({
        code: 1,
        data
      })
    })
  })
}

module.exports = {
  connection,
  queryAsync
}
