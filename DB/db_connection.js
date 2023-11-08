const mysql = require('mysql');
const settings = require('./db_details.json');
const settings2 = require('./db_details_2nd.json');

const QueryBuilder = require('node-querybuilder');
 const pool = new QueryBuilder(settings, 'mysql', 'pool');
 const pool2 = new QueryBuilder(settings2, 'mysql', 'pool');

 const con = mysql.createConnection(settings);
 const con2 = mysql.createConnection(settings2);


 module.exports={
  con,
  pool,
  con2
 };




