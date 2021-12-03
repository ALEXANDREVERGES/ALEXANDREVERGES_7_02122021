const mysql = require("mysql")

// Create connexion
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '159Counterstrike13004',
    database : "groupomania",
   
  });
  
module.exports = db;