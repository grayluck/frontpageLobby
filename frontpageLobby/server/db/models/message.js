
var s = require('sequelize');
var db = require('../db');
var User = require('./user');

var Message = db.define('message', {
    id: {
    type: s.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    user: s.INTEGER,
    content: s.STRING(256),
    time: {
        type: s.DATE,
        defaultValue: s.fn('NOW')
    }
}, {
    freezeTableName: true
});

Message.sync();

exports.getMsg = function() {
    return Message.findAll();
}

exports.postMsg = function(params) {
    var token = params.token;
    var content = params.content;
    return User.getUserByToken(token).then(function(user) {
        if(!user)
            return {error: 'You are not logged in.'};
        var msg = {
            user: user.id,
            content: content,
        };
        console.log(msg);
        return Message.create(msg);
    });
}
