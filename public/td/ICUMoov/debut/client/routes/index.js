var express = require('express');
var router = express.Router();

// Controller pour connexion à MongoDB
const icumoov = require('../controllers/icumoov');

/* GET home page: redirige vers /data. */
router.get('/', icumoov.listData());

/* GET /graph: dessine un graphe des valeurs
 * On la place avant la route des commandes sinon
 * c'est cette route qui est prise
 */
router.get('/graph', icumoov.graphData())

/* GET /:cmd: enregistre la valeur de la luminosité (si :cmd = light) ou de la temperature (si :cmd = temperature). */
router.get('/:cmd', icumoov.getData());

module.exports = router;
