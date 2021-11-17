var express = require('express');
var router = express.Router();

/* GET: affiche la page. */
router.get('/', function(req, res, next) {
    res.render(
        'confirmation',
        {title: 'Confirmation de votre inscription'}
    );
});

module.exports = router;
