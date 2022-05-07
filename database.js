var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'database-1.cxmqmrd3em3r.us-east-1.rds.amazonaws.com',
    database: 'public',
    user: 'admin',
    password: 'Qq8MCIzlPj2XLVCtKguA'
});
module.exports = connection;