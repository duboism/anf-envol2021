// db.js
const mysql = require('mysql2');
const config = require('../private/config');

// create the connection
const connection = mysql.createConnection(config);

module.exports = connection;
