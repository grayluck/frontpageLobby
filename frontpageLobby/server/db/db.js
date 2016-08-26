
var env = require('../env.js')

var s = require('sequelize');
var mysql = require('mysql');

var db = new s(env.DB_NAME, env.DB_USERNAME, env.DB_PASSWORD, {
  host: env.HOST,
  dialect: 'mysql',
  define: {
    timestamps: false,
  }
});

db
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

// console.log(db);

module.exports = db;
