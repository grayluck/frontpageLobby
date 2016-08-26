
var s = require('sequelize');
var db = require('../db');

// console.log(db);

var User = db.define('user', {
  id: {
    type: s.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
  },
  username: s.STRING,
  token: s.STRING,
  password: s.STRING
}, {
	freezeTableName: true
});

User.sync();

exports.getUser = function() {
	return User.findAll();
};

exports.userSignIn = function() {

}

exports.userLogIn = function() {
  
}
