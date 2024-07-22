const mysql = require('promise-mysql');

// create database connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

function getConnection() {
    return connection;
}

module.exports = {
    getConnection
}