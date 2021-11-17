var express = require('express');
var router = express.Router();

const fs = require('fs');

/* Middleware qui modifie le fichie puis passe la main à celui qui fait l'affichage.
 * En cas d'erreur, on appelle next(error): quand on passe un argument à error,
 * Express saute toutes les middleware "non-erreur" (c-à-d qui n'ont pas 4 arguments);
 * dans notre cas (cf. app.js), ça affiche la page d'erreur.
 */
router.post('/', (req, res, next) => {
    console.log("Modification du fichier CSV");
    const values = Object.values(req.body);
    const data = `${ values.join('\t') }\n`;
    fs.appendFile('./private/files/inscriptions.csv', data, (error) => {
        if (error) next(error);
        else next();
    });
});

/* Middleware simple qui affiche la page */
router.post('/', function(req, res, next) {
    console.log("Affichage");
    res.render(
        'confirmation',
        {title: 'Confirmation de votre inscription'}
    );
});

module.exports = router;
