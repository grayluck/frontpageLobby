
var model = require('../db/models');

exports.getUsers = function(req, res, next) {
	model.user.getUser()
		.then(function(results) {
			res.status(200).json(results);
		});
}

exports.userSignIn = function(req, res, next) {
	model.user.signIn()
		.then(function(results) {
			res.status(200).json(results);
		});
}

exports.userLogIn = function(req, res, next) {
	model.user.logIn()
		.then(function(results) {
			res.status(200).json(results);
		});
}
