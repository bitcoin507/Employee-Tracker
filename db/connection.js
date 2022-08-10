const mysql = require("mysql2");

require('dotenv').config();

const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Letmein123!',
        database: 'employee_db'
});

connection.connect(function (err) {
  if (err) throw err;
});

module.exports = connection;