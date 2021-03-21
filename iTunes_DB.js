const mysql = require('mysql');

const databaseString =  "mysql://root:11091991@localhost:3306/iTunes"
const databaseConnection = mysql.createConnection(databaseString);

module.exports = databaseConnection;
