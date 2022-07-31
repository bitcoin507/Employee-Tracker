const mysql = require("mysql2");

require('dotenv').config();


const connect = mysql.createConnection({

  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database
});

connect.connect(function (err) {
  if (err) throw err;
});

module.exports = connect;