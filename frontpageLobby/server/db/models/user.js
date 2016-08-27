
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
    username: s.STRING(50),
    token: s.STRING(50),
    password: s.STRING(50)
}, {
    freezeTableName: true,
    /*
    instanceMethods: {
        toJSON: function () {
            // omit password before return
            var values = this.get();
            delete values.password;
            return values;
        }
      }
    */
});

User.sync();

exports.getUser = function() {
	return User.findAll();
};

exports.getUserByToken = function(token) {
    return User.findOne({
        where: {token: token}
    });
}

exports.signIn = function(params) {
    var username = params.username;
    var password = utils.toMd5(params.password);
    var token = utils.genToken();
    return User
        .findOne({
            where: {
                username: username
            }
        })
        .then(function(result) {
            if(result) {
                // user already exists
                return {error: 'User already exists.'};
            } else {
                return User
                    .create({
                        username: username, 
                        token: token,
                        password: password
                    })
                    .then(function(result) {
                        return {
                            token: token,
                            username: username
                        };
                    });
            }
        });
}

exports.logIn = function(params) {
    var username = params.username;
    var password = utils.toMd5(params.password);
    return User
        .findOne({
            where: {
                username: username,
                password: password
            }
        })
        .then(function(result) {
            if(result) {
                var token = utils.genToken();
                return User
                    .update(
                        {token: token}, 
                        {where: {username: username}
                    })
                    .then(function(result){
                        return {
                            token: token, 
                            username: username
                        };
                    });
            } else
                return {error: 'Incorrect username or password.'};
        });
}
