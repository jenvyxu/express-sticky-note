var express = require('express');
var router = express.Router();

/* GET auth */
router.get('/jirengu', function(req, res, next) {
	console.log(req.query)
    res.render('index', { title: 'Express便利贴' });
});

module.exports = router;
