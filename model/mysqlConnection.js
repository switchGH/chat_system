const mysql = require('mysql');

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: 'newpassword',
  database: 'chat_board'
};
const connection = mysql.createConnection(dbConfig);

module.exports = connection;
