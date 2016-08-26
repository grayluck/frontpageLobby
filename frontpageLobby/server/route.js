
var express = require('express');
var userModel = require('./db/models/user');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	userModel.getUser().then(function(results) {
		res.status(200).json(results);
	});
});

module.exports = router;
