var express = require('express');
const icumoov = require('../controllers/icumoov');
var router = express.Router();

/* GET home page. */
router.get('/', icumoov.listData());
router.get('/:cmd', icumoov.getData());

module.exports = router;
