var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'User REST API'});
});

router.post('/adduser', function (req, res) {
    res.send('Post page');
});

module.exports = router;
