var express = require('express');
var router = express.Router();

// Controller pour connexion à MongoDB 
const icumoov = require('../controllers/icumoov');

/* GET home page: redirige vers /data. */
router.get('/', function(req, res, next) {
    res.redirect('/data');
});

/* GET /light: enregistre la valeur de la luminosité. */
router.get('/light', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET /temperature: enregistre la valeur de la temperature. */
router.get('/temperature', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

module.exports = router;
