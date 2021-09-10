class: center, middle, inverse

# Node.js, du JavaScript côté serveur
Alexandre Roulois (Université de Paris, LLF, CNRS)

---

## Sommaire

- Présentation
- Gestion des modules
  - charger un module
  - écrire un module
  - quelques modules utilitaires
- Gestion des événements
- Gestion des *streams*
  - *streams* en lecture
  - *streams* en écriture
  - *streams* bidirectionnels
- Gestion des fichiers et des répertoires

---

layout:true
## Node.js : JS côté serveur

---

.col-gauche[
### Présentation
]
.col-droite[

.colonne[
.imp[Node.js :] plateforme logicielle pour applications réseau événementielles
- syntaxe JavaScript
- servir des pages Web (module `http`)
- mono *thread*
- gestion asynchrone grâce aux événements

Téléchargement :  
https://nodejs.org/
Documentation officielle :  
https://nodejs.org/api/
]
.colonne[
.img-large[![Logo Node.js](./images/node-fig1.svg)]
]

]
???
Asynchrone : permet de traiter les requêtes utilisateur même si une opération prend du temps.

---

.col-gauche[
### Présentation
]
.col-droite[

Utilitaire `node` pour exécuter un fichier JS :

```
// hello.js
console.log("Hello World!")
```

```shell
# terminal
$ node hello.js
```

Ou lancer des actions en ligne grâce à REPL (*Read Eval Print Loop*) :

```
$ node
> console.log("Hello World!");
Hello World!
undefined
> .exit
```

]

---

.col-gauche[
### Présentation
]
.col-droite[

Démon Node pour mise à jour en temps réel du serveur

Installation :

```shell
$ npm install -g nodemon
```

Lancer un serveur :

```shell
$ nodemon server.js
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
- charger
]
.col-droite[

#### Charger un module

Trois types :
- modules natifs de Node.js
- modules externes de la communauté
- modules développeur

Fonction `require()` pour appeler un module :
- extension optionnelle
- chemin complet
- fichier maître `index.js` par défaut

```
const hello = require('./hello.js');
// ou sans l'extension :
const hello = require('./hello');
// lève une exception
const hello = require('hello');
// charge fichier "./utils/index.js"
const utils = require('./utils');
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
- charger
]
.col-droite[

Fichier `package.json`, propre à chaque module, pour définir des propriétés :
```
// recursive/package.json
// fichier maître : series.js
{ "main": "series.js" }
```

|Propriété|Description|
|:-:|-|
|`name`|Nom de l’application|
|`version`|Version de l’application (au format x.y.z).|
|`scripts.start`|Indique la commande exécutée lors de `npm start` dans un terminal.|
|`main`|Nom du fichier maître du module.|
|`dependencies`|Objet qui reprend les modules à installer avec leurs numéros de versions. Pour la dernière version : `*`. Les modules seront installés lors de `npm install`.|

]

---

.col-gauche[
### Présentation
### Gestion des modules
- charger
]
.col-droite[

Répertoire spécial `node_modules` :
- chaque sous-répertoire `=` module
- omission chemin :
```
const utils = require('utils');
console.log(utils.reverse('bazinga'));
```

Mise en cache du module chargé :
```
const utils = require('utils');             // mis en cache
const utilsCopy = require('utils');         // n'est pas rechargé
console.log(utilsCopy.reverse('bazinga'));  // agnizab
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
- charger
]
.col-droite[

Charger module standard Node.js par son nom :

```
const http = require('http');
```

Module tiers à télécharger avec `npm` (*Node Package Manager*) :

```shell
$ npm install <module>
```

Interroger contenu module :
```
console.log(utils);
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
- charger
]
.col-droite[

|Commande|Description|
|:-:|-|
|`npm install <module[@version]>`|Installe un module, soit dans le répertoire `node_modules` de l’application, soit de manière globale avec l’option `-g`. La version du module peut être précisée derrière le nom. |
|`npm uninstall <module>`|Supprime un module, soit dans le répertoire `node_modules` de l’application, soit de manière globale avec l’option `-g`.|
|`npm install`|Lit le fichier `package.json` pour installer les dépendances de l’application indiquées à la clé `dependencies`.|
|`npm start`|Lit le fichier `package.json` pour démarrer l’application indiquée à la clé `scripts.start`.|
|`npm update [<module>]`|Met à jour tous les modules (dernière version) ou le module indiqué.|
|`npm ls`|Liste les modules installés dans `node_modules` ou en global avec l’option `-g`.|
|`npm search <module>`|Recherche un module sur Internet.|
.legende[Quelques commandes avec `npm`]

]

---

.col-gauche[
### Présentation
### Gestion des modules
- charger
- écrire
]
.col-droite[

#### Écrire un module

Fichier JS classique avec consigne d’exportation :
```
// utils/index.js
const reverse = (str) => {
  const rev = str.split('').reverse().join('');
  return rev;
}

module.exports.reverse = reverse;
```

Appel de la fonction `reverse` dans l’application :
```
const utils = require('utils');
console.log(utils.reverse("bazinga"));
```

Méthode alternative :
```
module.exports.reverse = (str) => {
  const rev = str.split('').reverse().join('');
  return rev;
}

```
]

---

.col-gauche[
### Présentation
### Gestion des modules
- charger
- écrire
]
.col-droite[

Définir une fonction principale :
```
// recursive/series.js

// somme entiers naturels d'une suite
const gauss = (n) => {
  if (n == 0) return 0;
  return n + gauss(n - 1);
}

// énième terme de la suite de Fibonacci
const fibo = (n) => {
  if (n == 0 || n == 1 || n == 2) return 1;
  return fibo(n - 1) + fibo(n - 2);
}

module.exports = gauss;     // fonction principale
module.exports.fibo = fibo;
```

Appel des fonctions :
```
// présence d'un package.json avec "main": "series.js"
const series = require('recursive');
console.log( series(13) );        // 91
console.log( series.fibo(13) );   // 233
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
- charger
- écrire
- utilitaires
]
.col-droite[

#### Quelques modules utilitaires

.def-env[
  .def-elm[Module `util`]  
  .def[Dans ce module, des méthodes de formatage de chaînes de caractères, une méthode `inherit()` pour hériter d’une autre classe et des méthodes pour tester le type d’un objet.]
```
const util = require('util');
const arr = [17, 'Éric'];
console.log(util.isArray(arr));
```
]

.def-env[
  .def-elm[Module `url`]  
  .def[Ce module très spécialisé permet d’analyser une URL (méthode `parse()`), d’en formater une soit à partir d’un objet (méthode `format()`) soit à partir de paramètres (méthode `resolve()`).]
```
const url = require('url');
const res = url.parse('http://www.llf.cnrs.fr/fr/Gens/Roulois');
console.log(res);
```
]

]

---

.col-gauche[
### Présentation
### Gestion des modules
- charger
- écrire
- utilitaires
]
.col-droite[

.def-env[
  .def-elm[Module `querystring`]  
  .def[La méthode `stringify()` permet de composer une requête à partir des paramètres envoyés, quant la méthode `parse()` décompose au contraire une requête en ses constituants.]
```
const qs = require('querystring');
const query = qs.stringify({
  q: 'title_t:"Salammbô"',
  fl: 'label_s',
  wt: 'xml'
});
console.log(query);
console.log(qs.parse(query));
```
]
.def-env[
  .def-elm[Module `path`]  
  .def[Ce module offre des méthodes pour manipuler les noms de fichiers et leurs chemins.]
```
const path = require('path');
console.log(path.normalize('./pics/./path//to/img'));
console.log(path.join('./', 'pics', 'path', 'to', 'img'));
console.log(path.dirname('./pics/path/to/img'));
console.log(path.basename('./pics/path/to/img.jpg'));
console.log(path.extname('./pics/path/to/img.jpg'));
```
]

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
]
.col-droite[

Module standard `events` avec classe `events.EventEmitter` pour créer des objets événementiels

Sert à de nombreux objets dérivés (`http.Server`…) :
```
const http = require('http');
const events = require('events');

console.log(http.Server instanceof events.EventEmitter);  // true
```

Méthodes `addListener()` ou `on()` pour écouter un événement et déclencher une fonction de *callback*

Méthode `emit()` pour déclencher un événement

```
const events = require('events');
const e = new events.EventEmitter();
const hello = () => console.log('Hello World!');

e.on('sayHello', hello);
e.emit('sayHello');
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
]
.col-droite[

Attacher plusieurs fonctions à un même événement :
```
const hello = () => console.log('Hello');
const world = () => console.log('World!');

e.on('sayHello', hello);
e.on('sayHello', world);

e.emit('sayHello');
```

Retirer un gestionnaire d’événements :
```
e.emit('sayHello');
e.removeListener('sayHello', world);
e.emit('sayHello');
```

Supprimer tous les gestionnaires :
```
e.removeAllListeners('sayHello');
```

]
???
Méthode `once()` plutôt que `on()` pour éviter plusieurs déclencheurs inopportuns.

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
]
.col-droite[

Transmettre des paramètres :

```
const firstname = 'Éric';
const lastname = 'Chevillard';
const hello = (person) => {
  console.log(`Hello ${person.firstname} ${person.lastname} !`);
}

e.on('sayHello', hello);

e.emit('sayHello', {firstname: firstname, lastname: lastname});
```

Créer une classe dérivée :

```
const util = require('util');
const warn = (name) => console.log(`Application ${name} activée !`);

function App(name) {
    this.name = name;
}

util.inherits(App, events.EventEmitter);

const insta = new App('InstaMiam');
insta.on('activation', warn);
insta.emit('activation', insta.name);
```

]
???
Module `util` avec méthodes utilitaires

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
]
.col-droite[

.imp[*Stream* :] flux d’octets pour échanger des informations
- taille inconnue
- contenu accessible par paquets (*chunks*)
- *chunks* stockés dans un *buffer*
- asynchrone
- émet des événements

.imp[*Buffer* :]
- stocke données au format binaire (nombres de 0 à 255)
- taille connue
- synchrone

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
]
.col-droite[

Module `stream` :
- classe `stream.Readable()` pour lecture
- classe `stream.Writable()` pour écriture
- classe `stream.Duplex()` pour les deux
- toutes héritent de la classe `events.EventEmitter`

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
- lecture
]
.col-droite[

#### Gestion d’un *stream* en lecture

Classe `stream.Readable()`
- en pause par défaut
- méthode privée `_read()` à définir obligatoirement
- méthode `setEncoding()` pour définir encodage
- méthode `push()` pour envoyer des *chunks* dans le *buffer*
- vider *buffer* avec événement `data` ou `readable`

```
const stream = require('stream');
const readable = new stream.Readable();
readable.setEncoding('utf8');
let content = 'Hello World!';

readable._read = (size) => {
  if (content) readable.push(content);
  readable.push(null);
}

readable.on('data', (chunk) => {
  console.log(chunk);
});
```

]

???

méthode `_read()` à définir car appelée régulièrement. Provoque une erreur autrement.

prévoir condition de sortie car lue régulièrement

par défaut, *stream* en pause. Pour passer en mode flowing, écouter événement `data`

ne pas indiquer de taille dans `size`, le plus simple étant de lire le *chunk* entièrement

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
- lecture
]
.col-droite[

Cycle de vie d’un *stream* en lecture :

1. *chunk* émis
2. événements `data` ou `readable` pour recevoir
3. méthode interne `_read()` appelée
  - appel méthode `push()` remplit *buffer*
  - si événement `data`, buffer vidé
  - si événement `readable`, appel méthode publique `read()`
4. appel méthode interne `_read()` en attente d’un nouveau *chunk*
  - etc.
5. terminer *stream* avec `readable.push(null)`

.imp[Remarque :] si les *chunks*, poussés par `push()` ne sont pas consommés par `read()` aussi vite qu’ils arrivent, risque de dépasser la limite du *buffer* (paramètre `highWaterMark`, 16 Kb par défaut).

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
- lecture
]
.col-droite[

.centrer[
  .img-grand[![Illustration du cycle de vie d’un *stream*](./images/node-fig2.png)]
]

]

???

Tant que `highWaterMark` renvoie `true` => `_read()` rappelé par Node. Si `false`, Node se met en attente de la consommation du *chunk* par `read()`.

Aucune exception levée !

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
- lecture
]
.col-droite[

Méthode `read()` pour lire le flux à volonté :

```
const fs = require('fs');
const stream = require('stream');
const readable = new stream.Readable();

let content = fs.readFileSync('./rimbaud.txt');

readable.setEncoding('utf8');

readable._read = (size) => {
  if (content) readable.push(content);
  readable.push(null);
}

// déclenchement manuel de la lecture du contenu
const buffer = readable.read();
console.log(buffer);
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
- lecture
]
.col-droite[

.imp[Bonne pratique :] consommer le *stream* lors de l’événement `readable`, déclenché dès que des octets arrivent et sont prêts à être lus :

```
const fs = require('fs');
const stream = require('stream');
const readable = new stream.Readable();

let content = fs.readFileSync('./rimbaud.txt');

readable.setEncoding('utf8');

readable._read = (size) => {
  if (content) readable.push(content);
  readable.push(null);
}

// assurance que les octets sont prêts
readable.on('readable', () => {
  const buffer = readable.read();
  console.log(buffer);
});
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
- lecture
- écriture
]
.col-droite[

#### Gestion d’un *stream* en écriture

Classe `stream.Writable()`
- méthode privée `_write()` à définir obligatoirement
- méthodes `write()` ou `end()` pour envoyer des *chunks* dans le *buffer*
- si *buffer* plein, attendre événement `drain` pour accepter de nouveaux *chunks*

```
const stream = require('stream');
const writable = new stream.Writable();

writable._write = (chunk) => {
  console.log(chunk.toString());
}

writable.write('Hello World!');
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
- lecture
- écriture
]
.col-droite[

Méthode `write` prend trois paramètres obligatoires :
- `chunk` : *buffer* d’octets
- `encoding` : par défaut UTF-8
- `callback` : fonction appelée sur `_write()` pour signifier la fin de l’écriture

```
const stream = require('stream');
const writable = new stream.Writable();

writable._write = (chunk, encoding, callback) => {
  console.log(chunk.toString());
  callback();
}

for (let i = 0; i <= 10; i++) {
  writable.write(i.toString(), () => {
    console.log(i);
  });
}
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
- lecture
- écriture
]
.col-droite[

Méthode `end` similaire à `write()` sauf :
- appelée une seule fois pour fermer le *stream*
- paramètres facultatifs

Événement `error` à traiter

```
const stream = require('stream');
const writable = new stream.Writable();

writable._write = (chunk, encoding, callback) => {
  console.log(chunk.toString());
  callback();
}

for (let i = 0; i <= 10; i++) {
  writable.write(i.toString(), () => {
    console.log(i);
  });
}

writable.end('Fin du stream');

writable.on('error', (error) => {
  console.log(error);
});
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
- lecture
- écriture
]
.col-droite[

Cycle de vie d’un *stream* en écriture :

1. *chunk* poussé dans le *buffer* grâce à `write()`
  - si `true` :
    1. *chunk* traité en interne par `_write()`
    2. appel fonction *callback* pour terminer le traitement
  - si `false` :
    1. mise en mémoire (taille limite paramètre `highWaterMark`)
    2. attente événement `drain`
2. reprise du cycle
3. fin du *stream* avec `end()`

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
- lecture
- écriture
]
.col-droite[

Connecter *stream* lecture et *stream* écriture :

```
const stream = require('stream');
const writable = new stream.Writable();
const readable = new stream.Readable();

writable._write = (chunk, encoding, callback) => {
  console.log(chunk.toString());
  callback();
};

readable.setEncoding('utf8');
let content = 'Hello World!';

readable._read = (size) => {
  if (content) readable.push(content);
  readable.push(null);
};

readable.on('readable', () => {
  readable.read();
});

stream.pipeline(readable, writable, (error) => {
  if (error) console.log(error);
});
```

]

???

Existe aussi `readable.pipe(writable)` mais nécessite traitement individuel des erreurs

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
- lecture
- écriture
- bidirection&hyphen;<wbr/>nel
]
.col-droite[

#### Gestion d’un *stream* bidirectionnel

Classe `stream.Duplex()` :
- *streams* en lecture **et** en écriture
- méthodes privées `_read()` et `_write()` à implémenter obligatoirement

```
const stream = require('stream');
const duplex = new stream.Duplex();
const content = 'Hello World!';

duplex._write = (chunk, encoding, callback) => {
  console.log(chunk.toString());
  callback();
};
duplex._read = (size) => {
  if (content) {
    duplex.push(content);
    duplex.write(content);
  }
  duplex.push(null);
};
duplex.on('readable', () => duplex.read());
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
### Gestion des fichiers
]
.col-droite[

API spécialisée de gestion de *streams*
- lecture/écriture de fichiers
- gestion synchrone classique avec méthode `readFileSync()`
- gestion asynchrone avec méthode `readFile()`
- retour sous forme d’octets

```
const fs = require('fs');
const data = fs.readFileSync('./lamia.txt');
console.log(data);
```

```
fs.readFile('./lamia.txt', (error, data) => {
  if (error) console.error(error.message);
  else console.log(data);
});
```
.imp[Rappel :] Node.js est mono *thread* ! Gestion synchrone à réserver pour les actions non bloquantes, comme le démarrage du serveur alors qu’aucun utilisateur n’est connecté.

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
### Gestion des fichiers
]
.col-droite[

Ouvrir un fichier :
- méthode `open()`
- paramètres : chemin, mode d’ouverture, *callback*
- retourne un descripteur de fichier

```
fs.open('./lamia.txt', 'r', (error, fd) => console.log(fd));
```

|Mode|decsription|
|:-:|-|
|`r`|Lecture seule, le fichier doit exister.|
|`r+`|Lecture et écriture, le fichier doit exister.|
|`w`|Écriture seule, le fichier est créé ou écrasé s’il existe.|
|`w+`|Lecture et écriture, le fichier est créé ou écrasé s’il existe.|
|`a`|Mode ajout, le fichier est créé ou modifié s’il existe.|
|`a+`|Lecture et ajout, le fichier est créé ou modifié s’il existe.|

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
### Gestion des fichiers
]
.col-droite[

Fermer un fichier :
- méthode `close()`
- paramètres : descripteur de fichier, *callback*

```
fs.open('./lamia.txt', 'r', (error, fd) => {
  if (error) console.log(error);
  else console.log(fd);
  fs.close(fd, (error) => {
    if (error) console.log(error);
    else console.log('Fichier fermé')
  });
});
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
### Gestion des fichiers
]
.col-droite[

Lire un fichier en totalité :
- méthode `readFile()`
- paramètres : chemin, options, *callback*

```
const options = {
  flag: 'r+',
  encoding: 'utf8'
}

fs.readFile('./lamia.txt', options, (error, data) => {
  console.log(data);
});
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
### Gestion des fichiers
]
.col-droite[

Lire partiellement un fichier :
- méthode `read()`
- paramètres : descripteur, *buffer*, position dans le *buffer*, nb octets à lire, position dans le fichier, *callback*

```
fs.open('./lamia.txt', 'r', (error, fd) => {
  const buffer = new Buffer.alloc(100);
  fs.read(fd, buffer, 0, buffer.length, 0, (error, bytesRead, data) => {
    console.log(`Octets lus : ${ bytesRead }`);
    console.log(data.toString());
  });
});

```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
### Gestion des fichiers
]
.col-droite[

Écrire dans un fichier :
- méthode `writeFile()`
- paramètres : nom du fichier, octets encodés en UTF-8 par défaut, *callback*

```
const data = 'C’est un trou de verdure où chante une rivière\n\
Accrochant follement aux herbes des haillons\n\
D’argent ; où le soleil, de la montagne fière,\n\
Luit : c’est un petit val qui mousse de rayons.\n';

fs.writeFile('./rimbaud.txt', data, (error) => {
  if (error) console.log(error);
});
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
### Gestion des fichiers
]
.col-droite[

Écrire à la fin d’un fichier :
- méthode `appendFile()`
- paramètres : nom du fichier, octets, *callback*

```
const data = 'Un soldat jeune, bouche ouverte, tête nue,\n';

fs.appendFile('./rimbaud.txt', data, (error) => {
  if (error) console.log(error);
});
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
### Gestion des fichiers
]
.col-droite[

Dupliquer un fichier :

```
fs.link('./rimbaud.txt', './dormeur-du-val.txt', (error) => {
  if (error) console.log(error);
});
```

Supprimer un fichier :

```
fs.unlink('./rimbaud.txt', (error) => {
  if (error) console.log(error);
});
```

Renommer un fichier :

```
fs.rename('./dormeur-du-val.txt', 'dormeur-du-val_(rimbaud).txt', (error) => {
  if (error) console.log(error);
});
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
### Gestion des fichiers
]
.col-droite[

Créer un répertoire :

```
fs.mkdir('text', (error) => {
  if (error) console.log(error);
  else console.log('Répertoire créé.');
});
```

Renommer un répertoire :

```
fs.rename('text', 'texts', (error) => {
  if (error) console.log(error);
  else console.log('Répertoire renommé.');
});
```

Supprimer un répertoire :

```
fs.rmdir('texts', (error) => {
  if (error) console.log(error);
  else console.log('Répertoire supprimé.');
});
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
### Gestion des fichiers
]
.col-droite[

Lister les fichiers d’un répertoire :

```
fs.readdir('texts', (error, files) => {
  if (error) console.log(error);
  else console.log(files);
});
```

Tester l’existence d’un répertoire (ou d’un fichier) :

```
fs.exists('text', (exists) => {
  if (exists) console.log('Le répertoire existe.');
  else console.log('Le répertoire n’existe pas.');
});
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
### Gestion des fichiers
]
.col-droite[

Obtenir des informations sur un fichier (ou répertoire) :

```
fs.stat('./lamia.txt', (error, stat) => {
  if (stat.isFile()) console.log(stat);
});
```

Connecter deux *streams* de fichiers en lecture et en écriture :

```
const stream = require('stream');
const fs = require('fs');

const readstream = fs.createReadStream('./lamia.txt');
const writestream = fs.createWriteStream('./keats.txt');

stream.pipeline(readstream, writestream, (error) => {
  if (error) console.log(error);
});
```

]

---

.col-gauche[
### Présentation
### Gestion des modules
### Gestion des événements
### Gestion des *streams*
### Gestion des fichiers
]
.col-droite[

Exemple de saisie au clavier enregistrée dans un fichier :

```
const stream = require('stream');
const fs = require('fs');

const readstream = process.stdin;
const writestream = fs.createWriteStream('./poem.txt');

// enregistrement au fur et à mesure de la saisie
stream.pipeline(readstream, writestream, (error) => {
  if (error) console.log(error);
});

// lecture du fichier à la fin
readstream.on('data', (chunk) => {
  chunk = chunk.toString().replace(/[\r\n]/g, '');
  if (chunk == 'exit()') {
    fs.readFile('./poem.txt', (error, data) => {
      console.log(data.toString());
      writestream.end();  // fermer le stream en écriture
      readstream.pause(); // fermer le stream en lecture
    });
  }
});
```

]

???

Ordre de fermeture des *streams* important
