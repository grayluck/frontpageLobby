
var s = require('sequelize');
var db = require('../db');
var utils = require('../../utils');

// console.log(db);

var User = db.define('user', {
    id: {
        type: s.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: s.STRING,
    token: s.STRING,
    password: s.STRING
}, {
    freezeTableName: true,
    instanceMethods: {
        toJSON: function () {
            // omit password before return
            var values = this.get();
            delete values.password;
            return values;
        }
      }
});

User.sync();

exports.getUser = function() {
	return User.findAll();
};

exports.signIn = function(params) {
    var username = params.username;
    var password = params.password;
    var token = utils.genToken(16);
    return User
        .create({
            username: username, 
            token: token,
            password: password
        });
}

exports.logIn = function(params) {

}
