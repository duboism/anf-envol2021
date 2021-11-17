var express = require('express');
var router = express.Router();

// Pour lire la base de données
const fs = require('fs');
// Traitement des caratères spéciaux
const entities = require('html-entities');

const DBFILE = './private/db.json';

/* GET home page: liste les références bibliographiques. */
router.get('/', function(req, res, next) {
    console.log("Ça va lire");
    fs.readFile('./private/db.json', 'utf8', function (err, data) {
        if (err) throw err;
        rows = JSON.parse(data);
    });
    console.log(rows);
    const documents = Array();
    for (doc of rows.response.docs) {
        documents.push({
            ref: entities.decode(doc.label_s)
        });
    }
    res.render(
        'index',
        {
            title: 'Références bibliographiques',
            docs: documents.sort(),
        });
});

module.exports = router;
