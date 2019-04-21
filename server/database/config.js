const mysql = require('mysql');
//Database info here - Don't hardcode, use ENV variables

let hostName = process.env.HOST ||'mysql.fernandofaria.info';
let dbUser = process.env.DBUSER || 'fernandofariainf';
let dbPassword = process.env.DBPASSWORD || 'm3000gtx';
let database = process.env.DATABASE || 'fernandofaria_info';

const db  = mysql.createPool({
  connectionLimit : 100,
  host            : hostName,
  user            : dbUser,
  password        : dbPassword,
  database        : database
});
 
console.log('DB Initialized')

module.exports = db;