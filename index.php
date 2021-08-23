<?php

$f = isset($_SERVER['QUERY_STRING'])
  ? explode('=', $_SERVER['QUERY_STRING'])[1]
  : 'index';

switch ($f) {
  case 'html':
    $t = 'Les fondamentaux du HTML5';
    $l = 'html';
    break;
  case 'http':
    $t = 'Le protocole HTTP';
    $l = 'html';
    break;
  case 'css':
    $t = 'Les fondamentaux de CSS3';
    $l = 'css';
    break;
  case 'js':
    $t = 'JavaScript pour le Web';
    $l = 'js';
    break;
  case 'node':
    $t = 'Node.js, du JavaScript côté serveur';
    $l = 'js';
    break;
  default:
    $t = 'Page d’accueil';
    $l = 'html';
    break;
}

?>

<!DOCTYPE html>
<html>
  <head>
    <title><?php echo($t) ?> | ANF ENVOL 2021</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="./layout.css" />
  </head>
  <body>
    <textarea id="source"></textarea>
    <script src="https://remarkjs.com/downloads/remark-latest.min.js"></script>
    <script>
      var slideshow = remark.create({
        sourceUrl: './files/<?php echo($f); ?>.md',
        highlightLanguage: '<?php echo($l); ?>',
        highlightStyle: 'monokai',
      });
    </script>
  </body>
</html>
