
var controller = require('./controller');

var express = require('express');

var router = express.Router();

// URL routes for user API
router.get('/getUsers', controller.user.getUsers);
router.post('/userSignIn', controller.user.userSignIn);
router.post('/userLogIn', controller.user.userLogIn);

// URL routes for message API
router.post('/postMsg', controller.message.postMsg);
router.get('/getMsg', controller.message.getMsg);

module.exports = router;
