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

Définir plusieurs routes d’accès :

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

---

.col-gauche[
### Connexions HTTP
- un serveur simple
- servir une page Web
]
.col-droite[

Définir des en-têtes pour le client :

```
const server = http.createServer( (request, response) => {

  let filename = url.parse(request.url).pathname;

  switch (filename) {
    case '/': filename = './index.html'; break;
    case '/aide': filename = './aide.html'; break;
  }

  fs.exists(filename, (exists) => {
    const headers = {'Content-Type': 'text/html'};
    if (!exists) {
      filename = './404.html';
      response.writeHead(404, headers);
    }
    else response.writeHead(200, headers);
    let file = fs.createReadStream(filename);
    stream.pipeline(file, response, (error) => {
      if (error) console.log(error);
    });
  });

});

server.listen(3000);
```

]

???

Méthode `response.setHeader(name, value)` autrement

---

.col-gauche[
### Connexions HTTP
- un serveur simple
- servir une page Web
]
.col-droite[

.imp[Remarques :]
- objet `response` = flux en écriture
- flux à fermer par la méthode `end()`
- méthode `end()` (ou pipeline…) déclenche événement `close`
- Node.js envoie `close` en cas de problème (interruption de chargement, fermeture du navigateur…)
- objet `server` déclenche aussi un événement `close` :
  - avec méthode `close()`
  - tout client connecté diffère la fermeture du serveur

]

---

.col-gauche[
### Connexions HTTP
- un serveur simple
- servir une page Web
- un client HTTP
]
.col-droite[

#### Créer un client HTTP

Pour se connecter à un serveur HTTP

Méthode `http.request()` (ou `http.get()` si requête `GET`) :
- paramètre `options` (`hostname`, `port`, `path` et `method`)
- fonction *callback* avec paramètre `response` (flux en lecture)
- objet `request` retourné :
  - flux en écriture
  - méthode `request.end()` pour le fermer et passer la main au serveur
- événement `error` si échec fonction *callback*

]

---

.col-gauche[
### Connexions HTTP
- un serveur simple
- servir une page Web
- un client HTTP
]
.col-droite[

```
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'GET'
}

let buffer = String();

const request = http.request(options, (response) => {
  response.setEncoding('utf-8');
  response.on('data', (chunk) => {
    buffer += chunk;
  });
  response.on('end', () => {
    console.log(buffer);
  });
});

request.on('error', (error) => {
  console.log(`Erreur dans la requête : ${ error.message }`);
});

request.end();
```

.legende[Exemple de client HTTP simple]

]

---

.col-gauche[
### Connexions HTTP
- un serveur simple
- servir une page Web
- un client HTTP
]
.col-droite[

Méthode `http.get()` plus simple :
- requête obligatoirement de type `GET`
- flux en écriture automatiquement fermé

```
const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/'
}

let buffer = String();

const request = http.get(options, (response) => {
  response.setEncoding('utf-8');
  response.on('data', (chunk) => buffer += chunk );
  response.on('end', () => console.log(buffer) )
});

request.on('error', (error) => {
  console.log(`Erreur dans la requête : ${ error.message }`);
});
```

]
