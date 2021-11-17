var express = require('express');
var router = express.Router();

/* Middleware simple qui affiche la page */
router.post('/', function(req, res, next) {
    res.render(
        'confirmation',
        {title: 'Confirmation de votre inscription'}
    );
});

module.exports = router;
