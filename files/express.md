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


