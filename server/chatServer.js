
var io = require('socket.io');

initServer = function(server) {

	exports.io = io = io.listen(server);

	io.sockets.on('connection', function (socket) {
	    socket.on('send', function (data) {
	        io.sockets.emit('message', data);
	    });
	});

};

exports.initServer = initServer;
