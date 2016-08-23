
initServer = function(server) {

	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function (socket) {
	    socket.emit('message', { message: 'welcome to the chat' });
	    socket.on('send', function (data) {
	        io.sockets.emit('message', data);
	    });
	});

};

exports.initServer = initServer;
