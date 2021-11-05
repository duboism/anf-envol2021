var express = require('express');
const fs = require('fs');
const entities = require('html-entities');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  var rows;
  var documents = Array();
  var years = new Set();
  var docTypes = new Set();

  fs.readFile('./private/db.json', 'utf8', function (err, data) {

    if (err) throw err;
    rows = JSON.parse(data);

    for (doc of rows.response.docs) {
      const year = doc.publicationDate_tdate.substring(0, 4);
      documents.push({
        id: doc.halId_s,
        ref: entities.decode(doc.label_s),
        year: year
      });
      years.add(year);
      docTypes.add(doc.docType_s);
    }

    res.render('index', {
      title: 'Références bibliographiques',
      docs: documents.sort(),
      years: [...years].sort().reverse(),
      docTypes: [...docTypes].sort()
    });

  });
});

module.exports = router;
