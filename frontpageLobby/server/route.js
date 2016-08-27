
var controller = require('./controller');

var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/getUsers', controller.user.getUsers);
router.post('/userSignIn', controller.user.userSignIn);
router.post('/userLogIn', controller.user.userLogIn);

module.exports = router;
