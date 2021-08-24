class: center, middle, inverse

# Node.js pour le Web
Alexandre Roulois (Université de Paris, LLF, CNRS)

---

## Sommaire

- Gestion des connexions HTTP
  - créer un serveur HTTP simple
  - servir une page Web statique
  - créer un client HTTP
- Les *web sockets*
- Le module *Connect*

---

layout:true
## Node.js pour le Web

---

.col-gauche[
### Connexions HTTP
]
.col-droite[

.imp[HTTP :] *HyperText Transfer Protocol*
- liaison entre un client HTTP et un serveur HTTP
- connexion possible via un navigateur Web
- module `http` :
  - méthode `http.createServer()`
  - *callback* à la connexion d’un client
  - méthode `listen()` sur `server` pour écouter un port

```
// server.js
const http = require('http');

const server = http.createServer( (request, response) => {
  const html = '<p>Hello World!</p>';
  response.end(html);
})
.listen(3000);
```

1. lancer `node server.js` sur un terminal
2. ouvrir le navigateur à l’adresse : http://localhost:3000

]

---

.col-gauche[
### Connexions HTTP
- un serveur simple
]
.col-droite[

#### Créer un serveur

À la connexion, objet `server` émet un événement `request`

Traiter l’événement avec *callback* et ses deux paramètres :
- `request`, arguments transmis par le client (*stream* en lecture)
- `response`, réponse envoyée au client (*stream* en écriture)

```
// server.js
const http = require('http');
const server = http.createServer();

server.on('request', (request, response) => {
  const html = '<p>Hello World!</p>';
  response.end(html);
});

server.listen(3000);
```

]

---

.col-gauche[
### Connexions HTTP
- un serveur simple
]
.col-droite[

Objet `request` hérite de `stream.Readable`

```
const server = http.createServer( (request, response) => {

  // affichage dans la console du serveur
  console.log(request.url);

  // affichage dans le navigateur
  response.end(`<p>${request.url}</p>`);

});

server.listen(3000);
```

|Propriété|Description|
|:-:|-|
|`request.url`|URL qui a déclenché l’événément.|
|`request.method`|Méthode associée à la requête.|
|`request.headers`|Métadonnées associées à la requête.|
|`request.client`|Client TCP, de classe `net.Socket` qui se connecte au serveur.|
.legende[Propriétés principales de l’objet `request`]

]

???

Propriétés en lecture seule

Tester avec n'importe quelle URL (localhost:3000/nimportequelleURL.html)

---

.col-gauche[
### Connexions HTTP
- un serveur simple
]
.col-droite[

Objet `response` hérite de `stream.Writable`
- méthode `write()` pour écrire autant que souhaité
- méthode `end()` pour écrire une dernière fois et fermer le flux

```
const toDos = ['acheter de l’eau', 'voir des hippocampes', 'dormir à 3000 m.'];

const server = http.createServer( (request, response) => {
  response.write('<!DOCTYPE html>');
  response.write('<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">');
  response.write('<head>');
  response.write('<meta charset="utf8"/>');
  response.write('<meta name="viewport" content="width=device-width"/>');
  response.write('<title>Première page Web</title>');
  response.write('</head>');
  response.write('<body>');
  response.write('<ul>');
  for (let toDo of toDos) {
    response.write(`<li>${ toDo }</li>`);
  }
  response.end('</ul></body></html>');
});

server.listen(3000);
```

]

---

.col-gauche[
### Connexions HTTP
- un serveur simple
- servir une page Web
]
.col-droite[

#### Servir une page Web statique

Créer un pipeline entre un flux en lecture (fichier statique) et un flux en écriture (`response`) :

```
const http = require('http');
const fs = require('fs');
const stream = require('stream');

const server = http.createServer( (request, response) => {

  let index = fs.createReadStream('./index.html');
  stream.pipeline(index, response, (error) => {
    if (error) console.log(error);
  });

});

server.listen(3000);
```

]

---

.col-gauche[
### Connexions HTTP
- un serveur simple
- servir une page Web
]
.col-droite[

Définir plusieurs points d’accès :

```
const http = require('http');
const fs = require('fs');
const stream = require('stream');
const url = require('url');

const server = http.createServer( (request, response) => {

  // analyse url
  let filename = url.parse(request.url).pathname;

  // routes d'accès
  switch (filename) {
    case '/aide': filename = './aide.html'; break;
    default: filename = './index.html';
  }

  // flux en écriture et pipeline
  let file = fs.createReadStream(filename);
  stream.pipeline(file, response, (error) => {
    if (error) console.log(error);
  });

});

server.listen(3000);
```

]