
const connection = require('knex')({
  client: 'mysql',
  connection: {
    host : 'localhost',
    port : 3306,
    user : 'root',
    password : '123456',
    database : 'sean_db'
  }
});


module.exports = connection


