// Update with your config settings.
const { dirname } = require('path');
const path = require('path')

module.exports = {


  client: 'mysql',
  connection: {
      host: 'localhost',
      user: 'root',
      password: '123456',
      database: 'sean_db',
  },
  migrations:{
    directory: path.resolve(__dirname, 'database', 'migrations')

  },
  seeds:{
    directory: path.resolve(__dirname, 'database', 'seeds')

  },
  useNullAsDefault:true,


};
