class: center, middle, inverse

# Une application Web avec Express.js
Alexandre Roulois (Université de Paris, LLF, CNRS)

---

## Sommaire

- Présentation
  - un serveur minimal
  - définir des routes
  - servir des fichiers statiques
  - générer le squelette d’une application
  - architecture d’une application
  - *postman*, un service pour tester ses requêtes
- Écrire des vues avec Pug
  - intégrer des éléments
  - intégrer des attributs
  - intégrer du texte
  - intégrer du code JS
- Routage des requêtes
  - emprunter une route avec des méthodes
  - transmettre des données comme variables
  - analyser la requête du client
  - manipuler la réponse du serveur

---

layout:true
## Une application Web avec Express.js

---

.col-gauche[
### Présentation
]
.col-droite[

.imp[Express.js :] cadriciel pour *Node.js*
- modules spécifiques applications Web
- modèle MVC
- basé sur le module *Connect*

Dans un répertoire *appName* :
- initialiser l’application en définissant le point d’entrée
```shell
$ npm init
entry point: server.js
```
- installer *Express.js* en local :
```shell
$ npm install express --save
```

]

---

.col-gauche[
### Présentation
- serveur minimal
]
.col-droite[

#### Un serveur minimal

Serveur minimal dans *server.js* :
```
const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
```

Fichier *app.js* :
```
const express = require('express')
const app = express()

app.use((req, res) => {
  res.send('Hello World!')
})

module.exports = app
```

]

---

.col-gauche[
### Présentation
- serveur minimal
- routage
]
.col-droite[

#### Définir des routes

Syntaxe :
```
app.<VERB>(path, handler)
```

```
// app.js
const express = require('express')
const app = express()

// page d'accueil + méthode GET
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// page "bye" + méthode GET
app.get('/bye', (req, res) => {
  res.send('See you soon!')
})

// autres combinaisons
app.use((req, res) => {
  res.send('Lost?')
})

module.exports = app
```

]

---

.col-gauche[
### Présentation
- serveur minimal
- routage
- fichiers statiques
]
.col-droite[

#### Servir des fichiers statiques

*Middleware* pour servir les fichiers statiques d’un répertoire particulier :

```
// donne accès au contenu de http://localhost:3000/public
app.use(express.static('public'))
```

En changeant le nom du répertoire :
```
// donne accès au contenu du répertoire "public" sous le nom "static"
app.use('/static', express.static('public'))
```

Méthode avec un chemin absolu :
```
const path = require('path')
app.use('/static', express.static(path.join(__dirname, 'public')))
```

]

---

.col-gauche[
### Présentation
- serveur minimal
- routage
- fichiers statiques
- squelette
]
.col-droite[

#### Générer le squelette d’une application

Outil `express-generator` :
```shell
# créer nouvelle appli
$ mkdir newApp
$ cd newApp

# générer un squelette Express
$ npx express-generator

# installer dépendances
$ npm install

# démarrer application
$ DEBUG=newApp:* npm start
```

Modifier `scripts.start` dans *package.json* pour rendre compatible avec `nodemon` :

```json
"scripts": {
  "start": "nodemon ./bin/www"
}
```
]

---

.col-gauche[
### Présentation
- serveur minimal
- routage
- fichiers statiques
- squelette
- architecture
]
.col-droite[

#### Architecture d’une application

.colonne[
![Architecture d'une application Express](./pics/express-fig2.png)
]
.colonne[
- *app.js* : point d’entrée
- *bin* : serveur
- *public* : accès statique au répertoire
- *routes* : routage des requêtes (contrôleurs)
- *views* : vues de l’application

.imp[Remarque :]
- vues au format *Pug*, *Jade*, *Hogan* ou *EJS*
- par défaut, aucun modèle (BDD) défini
]

]

---

.col-gauche[
### Présentation
- serveur minimal
- routage
- fichiers statiques
- squelette
- architecture
- *postman*
]
.col-droite[

Service [*Postman*](https://postman.co) pour tester API :

.img-large[![de](./pics/express-fig1.png)]

]

---

.col-gauche[
### Présentation
### Vues avec Pug
]
.col-droite[

.imp[*Pug* :] langage de templating

Successeur de *Jade*

Installation :
```shell
$ npm install --save pug
```

Définir paramètre dans `app.js` :
```
app.set('view engine', 'pug')
```

Référence complète :  
https://pugjs.org/language/tags.html

]

---

.col-gauche[
### Présentation
### Vues avec Pug
- éléments
]
.col-droite[

#### Intégrer des éléments

Succession d’éléments :

.colonne[
```txt
div
p Hello World!
```
]
.colonne[
```html
<div></div>
<p>Hello World</p>
```
]

Imbrication :

.colonne[
```txt
div
  p Hello World!
```
]
.colonne[
```html
<div>
  <p>Hello World</p>
</div>
```
]

Imbrication en une ligne :

.colonne[
```txt
div: p Hello World!
```
]
.colonne[
```html
<div>
  <p>Hello World</p>
</div>
```
]

]

---

.col-gauche[
### Présentation
### Vues avec Pug
- éléments
- attributs
]
.col-droite[

#### Intégrer des attributs

Attribut unique :
.colonne[
```txt
a(href="https://u-paris.fr") Hello UP!
```
]
.colonne[
```html
<a href="https://u-paris.fr">Hello UP!</a>
```
]

Attributs multiples :
.colonne[
```txt
input(
  type="checkbox"
  name="pug"
  checked
)
```
]
.colonne[
```html
<input type="checkbox" name="pug" checkbox="checkbox" />
```
]

Classes CSS et identifiants :

.colonne[
```txt
p.lead
  a#link-up(href="https://u-paris.fr") Hello UP!
```
]
.colonne[
```html
<p class="lead">
  <a id="link-up" href="https://u-paris.fr">Hello UP!</a>
</p>
```
]

]

---

.col-gauche[
### Présentation
### Vues avec Pug
- éléments
- attributs
- texte
]
.col-droite[

#### Intégrer du texte

Texte brut :

.colonne[
```txt
p Hello World!
```
]
.colonne[
```html
<p>Hello World!</p>
```
]

Avec des balises imbriquées :
.colonne[
```txt
p Hello <b>World</b>!
```
]
.colonne[
```html
<p>Hello <b>World</b>!</p>
```
]

Contrôler le flux du texte :
.colonne[
```txt
p
  | Lorem ipsum dolor sit amet
  | [#em consectetur adipiscing] elit.
```
]
.colonne[
```html
<p>Lorem ipsum dolor sit amet <em>consectetur adipiscing</em> elit.</p>
```
]

]

---

.col-gauche[
### Présentation
### Vues avec Pug
- éléments
- attributs
- texte
- code JS
]
.col-droite[

#### Intégrer du code JS

Code précédé du signe `-` :
.colonne[
```txt
-
  const ingredients = [
    "Menthe", "Rhum", "Citron vert",
    "Sucre de canne", "San Pellegrino"
  ]
ul
  each item in ingredients
    li= item
```
]
.colonne[
```html
<ul>
  <li>Menthe</li>
  <li>Rhum</li>
  <li>Citron vert</li>
  <li>Sucre de canne</li>
  <li>San Pellegrino</li>
</ul>
```
]

]

---

.col-gauche[
### Présentation
### Vues avec Pug
### Routage des requêtes
- méthodes
]
.col-droite[

#### Emprunter une route avec des méthodes

Les routes sont définies par un chemin :
- `/` pour la racine
- `/admin`
- `/users/list`
- …

Et sont appelées par une méthode (`verb`) :
- `GET` (accéder)
- `POST` (ajouter)
- `PUT` (modifier)
- `DELETE` (supprimer)

]

???

Il existe d'autres `verbs`

---

.col-gauche[
### Présentation
### Vues avec Pug
### Routage des requêtes
- méthodes
]
.col-droite[

Méthode `app.use()` prend deux arguments :
- la route
- le *handler* (fonction de *callback*)

`app.use()` pour toutes les méthodes :

```
// peu importe la méthode, fonctionne sur la page d'index
app.use('/', (req, res, next) => {
  res.write('Hello');
  next();
});
// peu importe la route, peu importe la méthode
app.use((req, res) => {
  res.end(' World!');
});
```

.imp[Remarque :] *handler* prend deux paramètres (`req` et `res`) + fonction `next()` optionnelle pour transférer au *middleware* suivant.

]

---

.col-gauche[
### Présentation
### Vues avec Pug
### Routage des requêtes
- méthodes
]
.col-droite[

Méthodes spécifiques à un `verb` :
```
app.get('/users', (req, res) => {
  res.end('Méthode get sur la route /users.');
});
app.post('/users', (req, res) => {
  res.end('Méthode post sur la route /users.');
});
```

Méthode `app.route()` pour enchaîner les méthodes :
```
// route /users
app.route('/users')
  // si méthode get
  .get( (req, res) => {
    res.end('Lister');
  })
  // si méthode post
  .post( (req, res) => {
    res.end('Ajouter');
  })
  // si méthode put
  .put( (req, res) => {
    res.end('Modifier');
  });
```

]

---

.col-gauche[
### Présentation
### Vues avec Pug
### Routage des requêtes
- méthodes
]
.col-droite[

Expressions régulières autorisées dans une route :
```
app.get('/*list$', (req, res) => {
  res.end('Toute route qui se termine par "list".')
});
app.get(/list/, (req, res) => {
  res.end('Toute route avec "list" dedans/');
});
```

Transmettre plusieurs *handlers* :
```
// premier gestionnaire
const hello = (req, res, next) => {
  res.write('Hello');
  next();
};

// second gestionnaire
const world = (req, res) => {
  res.end(' World!');
};

// transmission des deux gestionnaires
app.get('/', [hello, world]);
```

]

---

.col-gauche[
### Présentation
### Vues avec Pug
### Routage des requêtes
- méthodes
]
.col-droite[

Outrepasser l’interception par *Express.js* des erreurs 404 :
```
app.all(/.*/, (req, res) => {
  res.status(404);
  res.end('Erreur 404');
});
```

Gestion des routes par *Express.js* dans modules séparés :
```
// app.js

// charge module ./routes/users.js
var usersRouter = require('./routes/users');
// route /users gérée par le module déclaré plus haut
app.use('/users', usersRouter);
```

```
// module ./routes/users.js

var router = express.Router();
// pour la racine du module, à savoir la route /users
router.get('/', (req, res) => {
  res.end('Hello World!');
});
```

]

---

.col-gauche[
### Présentation
### Vues avec Pug
### Routage des requêtes
- méthodes
- paramètres
]
.col-droite[

#### Définir des paramètres

.imp[Paramètres :] données variables dans l’URL
- introduits par la syntaxe `:parametre`
  - `/user/:id`
  - `/user/:userId/invoice/:invoiceID`
- transmis avec la requête dans l’objet `req.params`

```
app.get('/user/:id', (req, res) => {
  res.end(req.params.id);
});
```

Si paramètre optionnel, utiliser `?` :
```
app.get('/users/:id?', (req, res) => {
  // undefined si :id non fourni
  res.end(req.params.id);
});
```

]

---

.col-gauche[
### Présentation
### Vues avec Pug
### Routage des requêtes
- méthodes
- paramètres
- requête
]
.col-droite[

#### Analyser la requête du client

Objet `req` pour récupérer des informations sur la requête

|Objet|Description|
|:-:|-|
|`req.query`|Contient les données transmises par la méthode `GET` (via un formulaire par exemple).|
|`req.body`|Contient les données transmises par la méthode `POST` (via un formulaire par exemple).|
|`req.params`|Contient les variables transmises dans l’URL de la route.|

]

---

.col-gauche[
### Présentation
### Vues avec Pug
### Routage des requêtes
- méthodes
- paramètres
- requête
]
.col-droite[

|Propriété|Description|
|:-:|-|
|`req.url`|Adresse URL utilisée, en incluant la partie `query` (ex. : `/users?nom=x`).|
|`req.path`|URL sans la partie `query`.|
|`req.method`|Méthode employée pour parvenir à la ressource.|
|`req.ip`|Adresse IP de l’utilisateur.|
|`req.protocol`|Protocole utilisé.|
|`req.host`|Nom du serveur.|
.legende[Propriétés pour interroger la route empruntée]

]

---

.col-gauche[
### Présentation
### Vues avec Pug
### Routage des requêtes
- méthodes
- paramètres
- requête
- réponse
]
.col-droite[

#### Manipuler la réponse du serveur

Objet `res` avec méthodes pour définir la manière dont le serveur répond

|Méthode|Description|
|:-:|-|
|`res.download()`|Invite le client à télécharger un fichier.|
|`res.end()`|Redonne la main au client en mettant un terme à la réponse.|
|`res.json()`|Envoie une réponse au format JSON.|
|`res.redirect()`|Redirige la requête.|
|`res.render()`|Renvoie une vue au client.|
|`res.send()`|Envoie une réponse au client.|
|`res.sendFile()`|Envoie un fichier comme flux d’octet.|
|`res.status()`|Fixe le code HTTP à retourner.|
.legende[Quelques méthodes de l’objet `res`]

]

---

.col-gauche[
### Présentation
### Vues avec Pug
### Routage des requêtes
- méthodes
- paramètres
- requête
- réponse
]
.col-droite[

Retourner un code HTTP avec un en-tête :

```
// renvoyer un fichier JSON
app.get('/users', function (req, res, next) {
  res.status(200);
  res.sendFile('private/clients.json', { root: '.' } )
});
```

```
// renvoyer un objet JSON
app.get('/users', function (req, res, next) {
  res.type('application/json');
  res.json( { message: "Hello Users!" } )
});
```
```
// affiche '{ "message": "Hello Users!" }'
app.get('/users', function (req, res, next) {
  res.set({
    'Content-Type': 'text/plain; charset=latin1',
    'Content-length': 123
  });
  res.end('{ "message": "Hello Users!" }')
});
```

]

---

.col-gauche[
### Présentation
### Vues avec Pug
### Routage des requêtes
- méthodes
- paramètres
- requête
- réponse
]
.col-droite[

Focus sur `res.render()` pour invoquer une vue, avec trois paramètres :
1. nom de la vue
2. objet à partager avec la vue (optionnel)
3. une fonction de *callback* (optionnel)

```
app.get('/mojito', function (req, res, next) {
  const cocktail = {
    nom: "mohito",
    ingredients: [
      "Menthe", "Rhum", "Citron vert",
      "Sucre de canne", "San Pellegrino"
    ]
  };
  res.render('cocktail', cocktail);
});
```

```txt
// cocktail.pug
h1= cocktail.nom
ul
  each item in cocktail.ingredients
    li= item
```
]
???
Un 3e paramètre : fonction de callback.

---

.col-gauche[
### Présentation
### Vues avec Pug
### Routage des requêtes
- méthodes
- paramètres
- requête
- réponse
]
.col-droite[

Problématique du contrôle d’accès HTTP :

1. Serveur sur port 3000
2. Application sur port 8080

Deux origines différentes déclencheront des requêtes *cross-origin HTTP*

Autoriser des origines différentes, limiter les en-têtes personnalisables ainsi que les méthodes utilisables :

```
// middleware à placer en premier
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
  app.use((req, res, next) => {
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  next();
});
```

]

