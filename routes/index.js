var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Frontpage lobby' });
});

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Frontpage lobby - User login' });
});

module.exports = router;
