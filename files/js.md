class: center, middle, inverse

# JavaScript pour le Web
Alexandre Roulois (Université de Paris, LLF, CNRS)

---

## Sommaire

- Rappel de la syntaxe de JavaScript
    - les variables
    - les collections (tableaux et objets)
    - les structures conditionnelles
    - les structures itératives
    - déclarer des fonctions
- Programmation objet
    - le format JSON
    - définir des classes
- Manipuler le DOM
    - définition
    - accéder aux éléments
    - interagir : créer, supprimer
- Écouter des événements
- Gérer l’asynchrone
    - avec les *Promises*
    - avec *Async* et *Await*
    - lancer des requêtes parallèles
    - exemple de l’API *Fetch*

---

layout:true
## JavaScript pour le Web

---

.col-gauche[
### Syntaxe
- variables
]
.col-droite[

#### Les variables

- instanciation avec mot-clé `let`
- instanciation avec `const` si la valeur ne peut être réassignée
- typage dynamique faible

```
const a = '2';      /* Type string */
let b = 3;          /* Type number */
const c = a + b;    /* c = '23' */
let d;              /* undefined */
a = b + 10;         /* Redéclaration de 'a' invalide */
```

]

---

.col-gauche[
### Syntaxe
- variables
- collections
]
.col-droite[

#### Les collections

Deux types de données :
- tableaux (liste ordonnée d’éléments) ;
- objets (description d’un élément)

```
/* Type object */
const book = {
    author: 'Ernest Hemingway',
    title: 'Les travailleurs de la mer'
};
book.author = 'Victor Hugo';    /* Redéfinition propriété objet */
const prop = 'title';
const title = book[prop];       /* "Les travailleurs de la mer" */
const tab = ['bateau', 32];     /* Type array */
tab.push(book);                 /* Ajoute 'book' à la fin */
tab.length;                     /* Nb éléments du tableau : 3 */
tab.pop();                      /* Supprime le dernier élément */
tab.unshift(book);              /* Ajoute 'book' au début */
```

]
???
`const` ne signifie pas "valeur constante" mais "réference constante" : tableaux et objets peuvent être modifiés.

---

.col-gauche[
### Syntaxe
- variables
- collections
- structures conditionnelles
]
.col-droite[

#### Les structures conditionnelles

- pour contrôler le déroulement du programme ;
- instructions `if` `else` ou `switch` ;
- conditions booléennes ou avec opérateurs de comparaisons ;
- combinaisons possibles grâce à opérateurs logiques.

```
let msg = '';
let logged = false;
const userInput = 'qsef58!'

if (!logged && userInput === 'qsef58!*') {
    msg = 'Bonjour';
} else {
    msg = 'Mauvais mot de passe.';
}

switch (userInput) {
    case !logged && 'qsef58!*':
        msg = 'Bonjour';
    break;
    default:
        msg = 'Mauvais mot de passe';
}
```

]

---

.col-gauche[
### Syntaxe
- variables
- collections
- structures conditionnelles
]
.col-droite[

Instructions particulières :
- opérateur ternaire  
```
const pass = 'qsef5!*';
const logged = pass == 'qsef58!*' ? true : false; /* true */
```
- opérateur de coalescence des nuls  
```
const userInput = '';
const pass = userInput || true;     /* true */
const msg = userInput ?? false;     /* '' */
```
- opérateur de chaînage conditionnel  
```
const book = {
  author: "Victor Hugo",
  title: "Les travailleurs de la mer"
};
const pubDate = book.publication?.pubDate;  /* undefined */
```

]

???

`||` convertit gauche en booléen et renvoie droite si gauche === `false`

`??` renvoie opérande droite si `null` ou `undefined` à gauche

`const pubDate = book.publication?.pubDate;` renvoie une erreur

---

.col-gauche[
### Syntaxe
- variables
- collections
- structures conditionnelles
- structures itératives
]
.col-droite[

#### Les structures itératives

- boucles `for`, `for … in`, `for … of`
- boucles logiques `while`

```
for (let i = 0; i < 10; i++) {
    console.log(i);             /* 0, 1… 9 */
}

const students = ['Mia', 'Brahim', 'Sarah'];
for (let i in students) {
    console.log(students[i]);       /* 'Mia', 'Brahim', 'Sarah' */
}
for (let student of students) {
    console.log(student);           /* 'Mia', 'Brahim', 'Sarah' */
}

const nbStudents = students.length; /* 3 */
let studentsOut = nbStudents;
let studentsIn = 0;

while (studentsOut > 0) {
  studentsIn++;
  studentsOut--;
}
```

]

---

.col-gauche[
### Syntaxe
- variables
- collections
- structures conditionnelles
- structures itératives
- fonctions
]
.col-droite[

#### Déclarer des fonctions

Fonction nommée :
```
function hello() {
    return "Hello World!";
}
```

Avec arguments :
```
function hello(msg, user) {
    return Array(msg, user).join(" ");
}
```

Avec arguments par défaut :
```
function hello(loggedIn = false) {
    if (loggedIn) return "Hello World!";
    else return "Please sign in.";
}
```

]

---

.col-gauche[
### Syntaxe
- variables
- collections
- structures conditionnelles
- structures itératives
- fonctions
]
.col-droite[

Avec l’opérateur du reste des paramètres :
```
function listing(msg, ...names) {
    return `${msg} ${names.join(", ")}`;
}
listing("Students are:", "Mia", "Brahim", "Sarah");
```

Fonction anonyme :
```
const hello = function() {
    return "Hello World!";
}
```

Auto-exécutable :
```
(function() {
    console.log("Hello World!");
})();
```
]

---

.col-gauche[
### Syntaxe
- variables
- collections
- structures conditionnelles
- structures itératives
- fonctions
]
.col-droite[

Fonction fléchée :
```
const hello = (msg, user) => {
    return `${msg} ${user}`;
}
```

Avec un seul paramètre :
```
const hello = loggedIn => {
    if (loggedIn) return "Hello again!";
    else return "Please sign in."
}
```

Sans paramètre :
```
const hello = () => {
    return "Hello World!";
}
```
]

---

.col-gauche[
### Syntaxe
### Programmation objet
- JSON
]
.col-droite[

#### Le format JSON

.imp[Objet :] interface composée d’attributs et de méthodes pour le manipuler

.imp[Classe :] modèle pour créer un objet

.imp[JSON :] *JavaScript Object Notation*

- Représentation de l’information structurée
- Sérialisation de paires `clé:valeur` pour les propriétés

]

---

.col-gauche[
### Syntaxe
### Programmation objet
- JSON
]
.col-droite[

Syntaxe d’un objet :

```
const book = {
    title: "Le vaillant petit tailleur",
    author: {
        forename: "Eric",
        surname: "Chevillard"
    },
    pages: 223,
    hasRead: true
};
```

Accéder aux propriétés :
```
const title = book.title;
const pages = book["pages"];
const author = [book.author.forename, book.author.surname].join(" ");
```

Parcourir les propriétés :
.colonne[
```
for (let key in book) {
    console.log(key, book[key]);
}
```
]
.colonne[
```
// Méthode statique "keys()"
console.log(Object.keys(book));
```
]
]

---

.col-gauche[
### Syntaxe
### Programmation objet
- JSON
- classes et instances
]
.col-droite[

#### Définir des classes

Objet pourvu de propriétés mais dépourvu de méthodes

Notion de classe pour définir un modèle d’objet avec attributs et méthodes

Constructeur de la classe attribue les données à la nouvelle instance

```
// Définition de la classe
class Book {
    constructor(title, author, pages) {
        this.title = title;
        this.author = {
            forename: author.split(" ")[0],
            surname: author.split(" ")[1]
        };
        this.pages = pages;
        this.hasRead = false;
    }
}
// Déclaration d'une nouvelle instance
const tailleur = new Book("Le vaillant petit tailleur", "Eric Chevillard", 233);
```

]

---

.col-gauche[
### Syntaxe
### Programmation objet
- JSON
- classes et instances
]
.col-droite[

Définir une méthode :
```
class Book {
    // Constructeur
    …
    // Méthodes
    getAuthorFullName() {
        return `${this.author.forename} ${this.author.surname}`;
    }
}
const authorFullName = tailleur.getAuthorFullName();
```

Définir un accesseur :
```
class Book {
    // Constructeur
    …
    // Accesseurs
    get authorFullName() {
        return this.getAuthorFullName();
    }
    // Méthodes
    …
}
const authorFullName = tailleur.authorFullName;
```
]

---

.col-gauche[
### Syntaxe
### Programmation objet
- JSON
- classes et instances
]
.col-droite[

Définir une fonction utilitaire attachée à une classe :

```
class Book {
    …
    // Méthode statique appelée en dehors de l'instance
    static fullName(forename, surname) {
        return `${forename} ${surname}`;
    }
}
const fullName = Book.fullName("Victor", "Hugo");
```

Créer une sous-classe :
```
class Translated extends Book {
    // Constructeur de la sous-classe…
    constructor(title, author, pages, translator) {
        // … fondée sur la classe dont elle hérite
        super(title, author, pages);
        this.translator = translator;
    }
}
const poe = new Translated("Double Assassinat dans la rue Morgue", "Edgar Poe", 43, "Charles Baudelaire");
// Toutes les méthodes sont héritées
console.log(poe.authorFullName);
```
]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
- définition
]
.col-droite[

.imp[DOM :] *Document Object Model*

- représentation arborescente d’une page Web
- API pour manipuler le DOM
- implémentée dans les navigateurs

Objet `window.document` avec :
- propriétés (`title` `anchors` `links` `head` `body` `images`)
- méthodes (`getElementById` `createElement` `removeChild`…)

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
- définition
]
.col-droite[

```html
<!-- Fragment HTML -->
<article>
    <p id="p1">Lorem ipsum dolor sit amet.</p>
    <p id="p2">Consectetur adipiscing elit.</p>
</article>
```
.centrer[
  .img-moy[![Représentation sous forme d’arbre](./pics/js-fig1.png)]
  .legende[Représentation sous forme d’arbre]
]
]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
- définition
- accès
]
.col-droite[

#### Accéder au DOM

Certaines méthodes retournent une collection, d’autres un objet

|Méthode|Rôle|
|:-:|-|
|`getElementById(id)`|Retourne le nœud dont l’identifiant vaut `id`|
|`getElementByName(name)`|Retourne le nœud dont l’attribut `name` vaut `name`|
|`getElementsByTagName(element)`|Retourne un tableau indexé de type `NodeList` des nœuds identifiés par des éléments valant `element`|
|`querySelector(selector)`|Retourne le premier élément HTML identifié grâce au sélecteur CSS `selector`|
|`querySelectorAll(selector)`|Retourne un tableau indexé de type `NodeList` des éléments HTML identifiés par le sélecteur CSS `selector`|
|`item(n)`|Retourne le nœud dont la position vaut `n` dans un tableau indexé de type `NodeList`|

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
- définition
- accès
]
.col-droite[

Exemples :

```
// accéder à une collection
document.getElementsByTagName('article');   // Collection de 1 élément
document.getElementsByTagName('p');         // Collection de 2 éléments

// accéder à un nœud particulier
document.getElementsByTagName('article')[0];// 1e "article" indice 0
document.getElementsByTagName('p')[1];      // 2e "p" à l'indice 1
document.querySelector('[id="p2"]');        // Sélecteur CSS
document.getElementById('p1');              // Sélection par identifiant
```

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
- définition
- accès
- interagir
]
.col-droite[

#### Interagir avec le DOM

Modifications via propriétés et méthodes sur nœuds

|Attribut|Rôle|
|:-:|-|
|`innerHTML`|Accès au contenu HTML du nœud sélectionné.|
|`firstChild`|Désigne le premier enfant du nœud sélectionné.|
|`lastChild`|Désigne le dernier enfant du nœud sélectionné.|
|`nextSibling`|Désigne le prochain nœud.|
|`previousSibling`|Désigne le nœud précédent.|
|`parentNode`|Désigne le parent du nœud sélectionné.|
|`childNodes`|Renvoie une liste de nœuds de type `NodeList`|
|`nodeName`|Renvoie le nom du nœud (`p`, `td`, `textarea`…)|
|`nodeType`|Renvoie la catégorie du nœud (1 = élément, 2 = attribut, 3 = texte…)|
|`attributes`|Retourne un tableau des attributs du nœud.|
.legende[Propriétés notables d’un objet `Node`]

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
- définition
- accès
- interagir
]
.col-droite[

|Méthode|Rôle|
|:-:|-|
|`appendChild(element)`|Insère l’objet `element` dans le document.|
|`cloneNode([deep])`|Clone le nœud sélectionné. Option `deep` pour cloner aussi les enfants.|
|`contains(node)`|`node` est-il enfant du nœud sélectionné ? Renvoie un booléen `true` ou `false`.|
|`hasChildNodes()`|Retourne un booléen indiquant si le nœud sélectionné dispose d’enfants ou non.|
|`insertBefore(a, b)`|Insère l’objet `a` avant l’élément de référence `b`|
|`insertAdjacentHTML(a, b)`|Insère l’objet `b` en position `a` parmi quatre valeurs : `beforebegin`, `afterbegin`, `beforeend`, `afterend`|
|`removeChild(a)`|Supprime le nœud `a`|
|`replaceChild(a, b)`|Remplace le nœud `b` par le nœud `a`|
|`setAttribute(attr, val)`|Ajoute un attribut de type `attr` et de valeur `val`|
.legende[Quelques méthodes notables]

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
- définition
- accès
- interagir
]
.col-droite[

.imp[Objectif :] compléter la liste HTML ci-dessous des postulats du livre I des éléments d’Euclide, sachant qu’il manque les deux premiers :
1. Un segment de droite peut être tracé en joignant deux points quelconques.
2. Un segment de droite peut être prolongé indéfiniment en une ligne droite.

```html
<ol id="postulates">
    <li id="p3">Étant donné un segment de droite quelconque, un cercle peut être tracé en prenant ce segment comme rayon et l’une de ses extrémités comme centre.</li>
    <li id="p4">Tous les angles droits sont congruents.</li>
    <li id="p5">Si deux lignes droites sont sécantes avec une troisième de telle façon que la somme des angles intérieurs d’un côté est inférieure à deux angles droits, alors ces deux lignes sont forcément sécantes de ce côté.</li>
</ol>
```

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
- définition
- accès
- interagir
]
.col-droite[

.imp[Étape 1 :] créer les éléments

```
const p1 = document.createElement("li");
const p2 = document.createElement("li");
```

.imp[Étape 2 :] leur appliquer les attributs
```
p1.setAttribute("id", "p1");
p2.setAttribute("id", "p2");
```

.imp[Étape 3 :] ajouter le texte
```
p1.innerHTML = "Un segment de droite peut être tracé en joignant deux points quelconques.";
p2.innerHTML = "Un segment de droite peut être prolongé indéfiniment en une ligne droite.";
```

.imp[Étape 4 :] insérer dans le DOM
```
const postulates = document.getElementById("postulates");
const p3 = document.getElementById("p3");
postulates.insertBefore(p2, p3);
postulates.insertBefore(p1, p2);
```
]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
]
.col-droite[

.imp[Événement :] action utilisateur sur le document
- écouter un événement
- pour déclencher une réaction (*callback*)
- gestion asynchrone

Liste des événements :  
https://developer.mozilla.org/fr/docs/Web/Events


Exemple :

```
// fonction à déclencher
const parallel = () => {
    alert('Autrement nommé "Axiome des parallèles"');
}

// élément à écouter
const p5 = document.getElementById('p5');

// gestionnaire des événements :
// au clic souris sur p5, déclencher la fonction "parallel"
p5.addEventListener('click', parallel);
```
]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
]
.col-droite[

Navigateurs implémentent un comportement par défaut (ex : au clic sur un lien, ouvrir un onglet)

Fonction `preventDefault()` empêche la réaction par défaut :

```html
<a href="./parallel.html" id="parallel">Axiome des parallèles</a>
```

```
// élément à écouter
const parallel = document.getElementById('parallel');

// au clic sur l'élément…
parallel.addEventListener("click", (event) => {
    // … empêcher l'ouverture du lien
    event.preventDefault();
    // … et ouvrir une boîte d'alerte
    alert("Si deux lignes droites sont sécantes avec une troisième de telle façon que la somme des angles intérieurs d’un côté est inférieure à deux angles droits, alors ces deux lignes sont forcément sécantes de ce côté.");
})
```

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
]
.col-droite[

Événement propagé de l’élément écouté vers ses antécédents

Court-circuiter avec `stopPropagation()` :

```html
<ol id="axiomes">
    <li id="hilbert">Axiome de Hilbert</li>
    <li id="parallel">Axiome des parallèles</li>
</ol>
```

```
// aléments à écouter
const axiomes = document.getElementById('axiomes');
const parallel = document.getElementById('parallel');
// au clic n'importe où dans la liste…
axiomes.addEventListener("click", () => {
    // … afficher un texte dans la console
    console.log("Voici quelques axiomes célèbres.")
})
// au clic sur l'élément "parallel"…
parallel.addEventListener("click", (event) => {
    // … empêcher la propagation
    event.stopPropagation();
    // … afficher un texte dans la console
    console.log("Axiome des parallèles d’Euclide.")
})
```

]

???
Le clic sur "parralel" empêche le parent de recevoir l'événement et de déclencher l'affichage du message "Voici quelques axiomes célèbres"

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
]
.col-droite[

.imp[Synchrone :] ligne de code qui s’exécute après la fin de l’exécution de la ligne précédente

.imp[Asynchrone :] ligne de code qui s’exécute après la ligne précédente, sans attendre la fin de son exécution

JavaScript est synchrone *mono-thread* (un seul fil d’exécution)

*Callbacks* sur événements, exemple de code asynchrone :
```
// fonction attend le clic sur "el" pour s'exécuter
el.addEventListener('click', (e) => {
    alert(e.target);
})
```

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
]
.col-droite[

#### La gestion des *Promises*, ou promesses de résultat

.imp[*Promise* :] promesse quant au résultat d’une action
- si valeur `reject`, fonction `catch()` pour traiter l’exception
- si valeur `resolve`, fonction `then()` pour traiter le résultat
    - objet *Promise* retourné
    - chaînage possible des *Promises*

```
const dice = new Promise( (success) => {
    // valeur aléatoire entre 1 et 6
    const a = Math.floor(Math.random() * 6) + 1;
    const b = Math.floor(Math.random() * 6) + 1;
    success([a, b]);
});
dice.then( data => {
    // affichage retardé de 2s
    setTimeout( () => {
        console.log( `${data[0]} + ${data[1]} = ${data[0] + data[1]}` );
    }, 2000);
});

// Ce message paraîtra avant le code au-dessus
console.log('Résultat de vos lancers de dés :');
```

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
]
.col-droite[

Récupérer une erreur dans la *Promise* :

```
dice.then( data => {
    setTimeout( () => {
        console.log( `${data[0]} + ${data[1]} = ${data[0] + data[1]}` );
    }, 2000);
})
// méthode catch récupère un objet "Error"
.catch(error => {
    console.error(error.message);
});
```

Rejeter une promesse :

```
// ajout d'un paramètre personnalisé "error"
const dice = new Promise( (success, error) => {
    const a = Math.floor(Math.random() * 6) + 1;
    const b = Math.floor(Math.random() * 6) + 1;
    const total = a + b;
    // si 7 : envoi d'une Promise "resolve"
    if (total == 7) success([a, b]);
    // autrement : promesse non tenue !
    else error(`${total} est insuffisant : relancez les dés !`);
});
```
]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
]
.col-droite[

Déclarer une fonction pour renvoyer une promesse :

```
function prom() {
    return new Promise((success) => {
        success("Promesse…");
    });
}

prom()
.then( (msg) => {
    msg += " tenue !"
    console.log(msg);
});
```

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
]
.col-droite[

Chaîner les *Promises* :

```
function prom() {
  return new Promise((success) => {
    success(1);
  });
}

prom()
.then( (step) => {
    console.log(`Étape ${step} : achevée !`);
    // renvoyer un résultat pour le récupérer ensuite
    return step + 1;
})
.then( (step) => {
    // une erreur survient à la 2e étape
    throw new Error(`Étape ${step} : erreur…`);
})
.catch(error => {
    console.error(error.message + "\nVérifiez vos paramètres");
    // erreur non bloquante
    return 3;
})
.then( (step) => {
    console.log(`Étape ${step} : achevée !`);
});
```

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
- *async*/*await*
]
.col-droite[

#### JS asynchrone avec `async` et `await`

- mot-clé `async` pour déclarer une fonction asynchrone
- mot-clé `await` pour attendre une fonction asynchrone
- renvoient des *Promises*

```
async function getNumber() {
    return 2;
}

async function total() {
    const a = await getNumber();
    const b = 3;
    return a + b;
}

total().then(sum => {
    console.log(sum);
})
```

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
- *async*/*await*
]
.col-droite[

.imp[Intérêt :] lenteur d’une commande ne bloque pas la résolution des autres

.imp[Étape 1 :] fonction qui prend 5 secondes pour se résoudre
```
async function slow() {
    console.log("1e commande lancée !");
    setTimeout( () => {
        console.log("1e commande : enfin prête…");
    }, 5000);
}
```
.imp[Étape 2 :] fonction qui ne prend que 2 secondes :
```
async function fast() {
    console.log("2e commande lancée !")
    setTimeout( () => {
        console.log("2e commande : prête avant !");
    }, 2000);
}
```

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
- *async*/*await*
]
.col-droite[

.imp[Étape 3 :] fonction qui déclenche les commandes

```
async function orders() {
    await slow();
    await fast();
    return "Résultat des commandes :";
}
```

.imp[Étape 4 :] résolution de la *Promise*

```
orders().then(msg => {
    console.log(msg);
})
.catch(error => {
    console.error(error.message);
});
```
]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
- *async*/*await*
- requêtes parallèles
]
.col-droite[

#### Lancer des requêtes en parallèle

- technique pour lancer plusieurs requêtes HTTP en même temps
- basée sur la méthode *static* `Promise.all()`
    - un tableau de fonctions en paramètre
    - objet `Promise` retourné


```
async function orders() {
    await Promise.all([slow(), fast()];
    return "Résultat des commandes :";
}
```

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
- *async*/*await*
- requêtes parallèles
- API *Fetch*
]
.col-droite[

#### API *Fetch*

- pour récupérer des données d’un service Web
- basée sur les *Promises*
- objet `Response` en cas de succès
- objet `Error` en cas d’échec

Syntaxe générique :
```
fetch(url)
.then(response => {
    if (response.ok) {
        // Faire quelque chose
    }
})
.catch(error => {
    // Traiter l'erreur
});
```
]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
- *async*/*await*
- requêtes parallèles
- API *Fetch*
]
.col-droite[

.imp[Objectif :] récupérer une *Chuck Norris fact* grâce à l’API [ICNDB](http://www.icndb.com/api/)
- adresse : https://api.icndb.com/jokes/random
- format : JSON

.imp[Étape 1 :] paramétrer l’URL

```
const url = 'https://api.icndb.com/jokes/random';
```

.imp[Étape 2 :] lancer la requête

```
const url = 'https://api.icndb.com/jokes/random';

fetch(url)
.then(response => {
    if (response.ok) {
        // Traiter la réponse
    }
});
```
]


---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
- *async*/*await*
- requêtes parallèles
- API *Fetch*
]
.col-droite[

.imp[Étape 3 :] traiter le résultat au format JSON

```
const url = 'https://api.icndb.com/jokes/random';

fetch(url)
.then(response => {
    if (response.ok) {
        return response.json();
    }
});
```

.imp[Étape 4 :] chaîner avec l’affichage de la *joke*

```
const url = 'https://api.icndb.com/jokes/random';

fetch(url)
.then(response => {
    if (response.ok) {
        return response.json();
    }
})
.then(data => {
    console.log(data.value.joke);
});
```

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
- *async*/*await*
- requêtes parallèles
- API *Fetch*
]
.col-droite[

.imp[Étape 5 :] traiter une éventuelle erreur du service Web

```
const url = 'https://api.icndb.com/jokes/random';

fetch(url)
.then(response => {
    if (response.ok) {
        return response.json();
    }
})
.then(data => {
    console.log(data.value.joke);
})
.catch(error => {
    console.error(error.message);
});
```

]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
- *async*/*await*
- requêtes parallèles
- API *Fetch*
]
.col-droite[

.imp[Objectif :] créer une chaîne de traitement pour paralléliser des requêtes auprès de plusieurs APIs Web
- ICNDB : http://api.icndb.com/jokes/random
- chucknorris.io: https://api.chucknorris.io/jokes/random

.imp[Étape 1 :] paramétrer les URLs

```
const icndb = 'https://api.icndb.com/jokes/random';
const io = 'https://api.chucknorris.io/jokes/random';
```

.imp[Étape 2 :] paralléliser les requêtes HTTP

```
async function requests() {
    const responses = await Promise.all([
        fetch(icndb),
        fetch(io)
    ]);
    return responses;
}
```
]

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
- *async*/*await*
- requêtes parallèles
- API *Fetch*
]
.col-droite[

.imp[Étape 3 :] récupérer les données au format JSON

```
const getResponses = async (responses) => {
    const streams = new Array();
    for (const response of responses) {
        if (response.ok) {
            streams.push(await response.json());
        }
    }
    return streams;
};
```

.imp[Étape 4 :] extraire le contenu des *jokes*

```
const getJokes = (streams) => {
    const data = new Array();
    for (const stream of streams) {
        if (stream.value.joke) data.push(stream.value.joke);
        else data.push(stream.value);
    }
    return data;
};
```

]

???
async dans getResponses permet d'éviter que les objets ne soient retournés avant leur résolution

---

.col-gauche[
### Syntaxe
### Programmation objet
### DOM
### Événements
### Programmation asynchrone
- *Promise*
- *async*/*await*
- requêtes parallèles
- API *Fetch*
]
.col-droite[

.imp[Étape 5 :] afficher le contenu des *jokes*

```
const logJokes = jokes => {
    for (joke of jokes) {
        console.log(joke);
    }
};
```

.imp[Étape 6 :] lancer la chaîne de traitement

```
requests()
.then( getResponses )
.then( getJokes )
.then( logJokes )
.catch( (error) => {
    console.error(error.message);
});
```

]
