var express = require('express');
var router = express.Router();

const icumoov = require('../controllers/icumoov');

/* GET /data: liste les mesures. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/* GET /data/lights: affiche les mesures de luminosité. */
router.get('/lights', icumoov.listLights());

/* GET /data/temperature: affiche les mesures de temperature. */
router.get('/temperatures', icumoov.listTemperatures());

module.exports = router;
