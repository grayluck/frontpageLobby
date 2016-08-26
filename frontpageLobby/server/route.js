
var controller = require('./controller');

var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/getUsers', controller.user.getUsers);

module.exports = router;
