var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('users', {'title': 'Users Todate'});
});


router.get('/admins', function(req, res, next) {
	res.render('users', {'title': 'Admins Todate'});
});

module.exports = router;