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
    // Attention, c'est une lecture asynchrone
    fs.readFile('./private/db.json', 'utf8', function (err, data) {
        if (err) throw err;
        rows = JSON.parse(data);
        console.log(rows);
        // Groupe par année + decodage
        // Note: on  garde tout le document
        const documents = rows.response.docs.reduce(
            (acc, raw_doc) => {
                // Décodage des entités HTML
                raw_doc.ref = entities.decode(raw_doc.label_s);

                // Année de la publi
                // On ne la convertit pas en entier car on stocke dans un objet
                // Note: les Map ne semblent pas fonctionner non plus
                let year = raw_doc.publicationDate_tdate.substring(0, 4);
                console.log(year);

                // Si l'année n'est pas dans l'accumulateur, on initialise
                if (!acc[year]) {
                    acc[year] = [];
                }

                // Ajoute le document pour l'année
                acc[year].push(raw_doc);

                return acc;
            },
            {}
        );
        console.log(documents);
        // Affichage
        res.render(
            'index',
            {
                title: 'Références bibliographiques',
                docs: documents,
            }
        );
    });
});

module.exports = router;
