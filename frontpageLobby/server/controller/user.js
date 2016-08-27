
var model = require('../db/models');

exports.getUsers = function(req, res) {
	model.user.getUser()
		.then(function(results) {
			res.status(200).json(results);
		});
}

exports.userSignIn = function(req, res) {
	model.user.signIn(req.body)
		.then(function(results) {
			res.status(200).json(results);
		});
}

exports.userLogIn = function(req, res) {
	console.log('user logging in: ' + req.body.username);
	model.user.logIn(req.body)
		.then(function(results) {
			res.status(200).json(results);
		});
}
