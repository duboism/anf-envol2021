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
- Écrire des vues avec PUG

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
- vues au format *pug*, *jade* ou *ejs*
- par défaut, aucun modèle défini
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
