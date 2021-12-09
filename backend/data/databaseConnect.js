const mysql = require("mysql")

// Create connexion
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '159Counterstrike13004',
    database : "groupomania"
  });
  var pool  = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '159Counterstrike13004',
    database : "groupomania"
  });
  
  pool.getConnection(function(err, connection) {
    if(err) throw err;
      connection.query( 'SELECT * FROM user', function(err, rows) {
  
        console.log(pool._freeConnections.indexOf(connection)); // -1
  
        connection.release();
  
        console.log(pool._freeConnections.indexOf(connection)); // 0
  
     });
  });

  

module.exports = db;