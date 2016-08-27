
var model = require('../db/models');

exports.postMsg = function(req, res) {
	model.message.postMsg(req.body)
		.then(function(results) {
			res.status(200).json(results);
		});
}

exports.getMsg = function(req, res) {
	model.message.getMsg()
		.then(function(results) {
			res.status(200).json(results);
		}).catch(function(error) {
			res.status(200).json({error: error});
		});
}