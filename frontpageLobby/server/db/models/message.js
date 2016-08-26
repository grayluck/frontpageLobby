
var s = require('sequelize');
var db = require('../db');

var Message = db.define('message', {
  id: {
    type: s.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  user: s.INTEGER,
  content: s.STRING,
  time: s.DATE
}, {
	freezeTableName: true
});

Message.sync();
