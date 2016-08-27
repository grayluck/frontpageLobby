
var s = require('sequelize');
var db = require('../db');
var User = require('./user');
var chatServer = require('../../chatServer.js');

var Message = db.define('message', {
    id: {
    type: s.INTEGER,
    primaryKey: true,
    autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    // user: s.INTEGER,
    content: s.STRING(256),
    time: {
        type: s.DATE,
        defaultValue: s.fn('NOW')
    }
}, {
    freezeTableName: true
});

Message.belongsTo(User.model, {foreignKey:'userId'});

User.model.sync().then(function(){
    Message.sync()
});

exports.getMsg = function() {
    return Message.findAll({
        attributes:[
            'content', 
            'time'
        ],
        include:[{
            model: User.model,
            attributes: [
                'username'
            ]
        }]
    }).then(function(res){
        var ret = [];
        for(var i = 0; i < res.length; ++i) {
            ret.push({
                content: res[i].content,
                time: res[i].time,
                username: res[i].user.username
            });
        }
        return ret;
    });
}

exports.postMsg = function(params) {
    var token = params.token;
    var content = params.content;
    return User.getUserByToken(token).then(function(user) {
        if(!user)
            return {error: 'You are not logged in.'};
        var msg = {
            userId: user.id,
            content: content,
        };
        chatServer.io.emit('message', msg);
        return Message.create(msg);
    });
}
