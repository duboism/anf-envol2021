var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:file?', function(req, res, next) {
  const config = {
    title: 'Page d’accueil',
    language: 'html',
    file: 'index'
  }
  config.file = (req.params.file) ? req.params.file : 'index';
  switch (req.params.file) {
    case 'css':
    config.title = 'Les fondamentaux de CSS3';
    config.language = 'css';
    break;
  case 'express':
    config.title = 'Une application Web avec Express.js';
    config.language = 'js';
    break;
  case 'html':
    config.title = 'Les fondamentaux du HTML5';
    config.language = 'html';
    break;
  case 'http':
    config.title = 'Le protocole HTTP';
    config.language = 'html';
    break;
  case 'js':
    config.title = 'JavaScript pour le Web';
    config.language = 'js';
    break;
  case 'node':
    config.title = 'Node.js, du JavaScript côté serveur';
    config.language = 'js';
    break;
  case 'node-web':
    config.title = 'Node.js pour le Web';
    config.language = 'js';
    break;
  default:
    config.title = 'Page d’accueil';
    config.language = 'html';
    break;

  }
  res.render('index', config);
});

module.exports = router;
