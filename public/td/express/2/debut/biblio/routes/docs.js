// docs.js: routes pour /doc

var express = require('express');
var router = express.Router();

// (GET) /docs/new : formulaire pour ajouter une référence
router.get('/new', (req, res, next) => {
});

// (POST) /docs/new : ajouter une référence
router.post('/new', (req, res, next) => {
});

// (GET) /docs/update/:id : formulaire pour modifier une référence
router.get('/update/:id', (req, res, next) => {
});

// (PUT) /docs/update/:id : modifier une référence
router.post('/update/:id', (req, res, next) => {
});

// (DELETE) /docs/delete/:id : supprimer une référence
router.post('/delete/:id', (req, res, next) => {
});

module.exports = router;
