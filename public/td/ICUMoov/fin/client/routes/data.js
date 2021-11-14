const express = require('express');
const icumoov = require('../controllers/icumoov');
const router = express.Router();

/* GET data listing. */
router.get('/temperatures', icumoov.listTemperatures());
router.get('/lights', icumoov.listLights());

module.exports = router;
