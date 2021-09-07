var express = require('express');
const fs = require('fs');
var router = express.Router();

// enregistrement
router.post('/', (req, res, next) => {
  const values = Object.values(req.body);
  const data = `${ values.join('\t') }\n`;
  fs.appendFile('./private/files/inscriptions.csv', data, (error) => {
    if (error) next(error);
    else next();
  });
});

// confirmation
router.post('/', function(req, res, next) {
  res.render('confirmation', { title: 'Confirmation de votre inscription' });
});

module.exports = router;
