
var s = require('sequelize');
var db = require('../db');
var User = require('./user');
var chatServer = require('../../chatServer.js');

var moment = require('moment');

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
        }],
        order: '`time` DESC'
    }).then(function(res){
        var ret = [];
        for(var i = 0; i < res.length; ++i) {
            ret.push({
                content: res[i].content,
                time: moment(res[i].time).format('YYYY-MM-DD HH:mm:ss'),
                username: res[i].user.username
            });
        }
        return ret;
    });
}

exports.postMsg = function(params) {
    var token = params.token;
    var content = params.content;
    if(content.length == 0)
        return {error: 'The content cannot be empty.'};
    return User.getUserByToken(token).then(function(user) {
        if(!user)
            return {error: 'You are not logged in.'};
        var msg = {
            userId: user.id,
            username: user.username,
            content: content,
            time: moment().format('YYYY-MM-DD HH:mm:ss')
        };
        chatServer.io.emit('message', msg);
        return Message.create(msg);
    });
}
