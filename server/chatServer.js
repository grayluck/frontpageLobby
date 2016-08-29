
var io = require('socket.io');

initServer = function(server) {

	exports.io = io = io.listen(server);

	io.sockets.on('connection', function (socket) {
		socket.on('login', function(username) {
			socket.username = username;
			io.emit('login', username);
		});
		socket.on('disconnect', function(){
			io.emit('leave', socket.username);
		});
		/*
	    socket.on('send', function (data) {
			console.log('sending: ' + data);
	        io.sockets.emit('message', data);
	    });
		*/
	});

};

exports.initServer = initServer;
