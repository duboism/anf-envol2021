// db.js
const mysql = require('mysql2/promise');
const config = require('../private/config');

async function query(sql, params) {
  // create the connection
  const connection = await mysql.createConnection(config);
  // query database
  const [rows, fields] = await connection.execute(sql, params);
  
  return rows;
};

module.exports = { query };
