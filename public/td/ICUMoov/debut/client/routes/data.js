var express = require('express');
var router = express.Router();

/* GET /data: liste les mesures. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET /data/lights: affiche les mesures de luminosité. */
router.get('/lights', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET /data/temperature: affiche les mesures de temperature. */
router.get('/temperature', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
