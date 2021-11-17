var express = require('express');
var router = express.Router();

/* GET home page: liste les références bibliographiques. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Références bibliographiques' });
});

module.exports = router;
