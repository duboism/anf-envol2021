class: center, middle, inverse

# CSS3 : les fondamentaux
Alexandre Roulois (Université de Paris, LLF, CNRS)

---

## Sommaire

- Présentation
- Les sélecteurs
  - syntaxe
  - sélecteurs principaux
  - autres sélecteurs
  - les pseudo-formats
- Quelques bonnes pratiques
  - les styles par défaut
  - adopter des conventions
  - utiliser un cadriciel

---

layout:true
## CSS3 : les fondamentaux

---

.col-gauche[
### Présentation
]
.col-droite[

.imp[CSS :] *Cascading Style Sheets*

.imp[11 avril 2008 :] Livraison des spécifications CSS 1

.imp[7 juin 2011 :] Livraison des spécifications CSS 2.1

.imp[12 avril 2016 :] CSS 2.2 au statut *Working Draft*

Quid de CSS3 ?
- modulaire
- certains modules déjà prêts (*Candidate Recommandation*)

Déclarer une feuille de style :

```html
<link rel="stylesheet" type="text/css" href="./layout.css" />
```

]

---

.col-gauche[
### Présentation
### Sélecteurs
- syntaxe
]
.col-droite[

#### Syntaxe

Syntaxe excessivement simple :
```
selecteur { propriete: valeur; }
```
Exemple d’une séquence d’ordres :
```
/* Modifie tous les éléments h1 et h2 */
h1, h2 { color: #5a3a22; /* Texte en rouge */ }

/* Modifie tous les paragraphes balisés par <p> */
p {
    font-size: x-small; /* Taille des caractères */
    text-indent: 0.1px; /* Indentation positive */
    background-image: url('../images/bg_p.png'); /* Arrière-plan */
}
```

]

---

.col-gauche[
### Présentation
### Sélecteurs
- syntaxe
- principaux
]
.col-droite[

#### Les principaux sélecteurs

.def-env[
  .def-elm[Sélecteur d’élément]  
  .def[Utiliser le nom d’un élément HTML pour tous les sélectionner.]
```
/* Sélectionne tous les éléments 'p' */
p {  }
```
]

.def-env[
  .def-elm[Sélecteur d’identifiant]  
  .def[Utiliser la valeur affectée à un attribut HTML `id` pour sélectionner les éléments concernés.]
```
/* Sélectionne les éléments avec un attribut id="success" */
#success {  }
```
]

.def-env[
  .def-elm[Sélecteur de classe]  
  .def[Utiliser la valeur affectée à un attribut HTML `class` pour sélectionner les éléments concernés.]
```
/* Sélectionne les éléments avec un attribut class="error" */
.error {  }
```

]

]

---

.col-gauche[
### Présentation
### Sélecteurs
- syntaxe
- principaux
]
.col-droite[

.def-env[
  .def-elm[Sélecteur de descendance]  
  .def[Utiliser plusieurs sélecteurs séparés par une espace. Seul le dernier sera concerné par les déclarations à partir du moment où il suit la ligne de descendance, à quelque degré que ce soit.]
```
/* Sélectionne tous les éléments 'a' qui descendent de 'p' */
p a {  }
```
]
.def-env[
  .def-elm[Sélecteur d’éléments multiples]  
  .def[Utiliser plusieurs sélecteurs séparés par une virgule.]
```
/* Sélectionne tous les éléments 'a' ainsi que les éléments 'h1' */
a, h1 {  }
```
]

]

---

.col-gauche[
### Présentation
### Sélecteurs
- syntaxe
- principaux
- autres
]
.col-droite[

#### Autres sélecteurs (extrait)

.def-env[
  .def-elm[Sélecteur universel]  
  .def[L’astérisque permet de sélectionner tous les éléments.]
```
* {  }
```
]
.def-env[
  .def-elm[Sélecteur de descendance au premier degré]  
  .def[L’opérateur `>` impose une descendance au premier degré entre les membres de la relation, c’est-à-dire qu’aucun élément intermédiaire ne doit entrer dans la lignée.]
```
/* Sélectionne les éléments 'a' enfants de 'p' */
p > a {  }
```
]
.def-env[
  .def-elm[Sélecteur d’adjacence]  
  .def[L’opérateur `+` contraint le deuxième membre de la relation à être adjacent au premier.]
```
/* Sélectionne le 1er élément 'p' à suivre directement les éléments 'h1'. */
h1 + p {  }
```
]

]

---

.col-gauche[
### Présentation
### Sélecteurs
- syntaxe
- principaux
- autres
]
.col-droite[

.def-env[
  .def-elm[Sélecteur d’attribut]  
  .def[Indiquer entre crochets `[]` le nom d’un attribut pour sélectionner tous les élements où il est déclaré.]
```
/* Sélectionne tous les éléments avec un attribut 'title' déclaré */
[title] {  }
```
]
.def-env[
  .def-elm[Sélecteur de valeur d’attribut]  
  .def[Identique au sélecteur d’attribut, avec la contrainte supplémentaire d’une valeur spécifique imposée à l’attribut.]
```
/* Sélectionne les éléments pour lesquels l'attribut 'type' vaut 'submit' */
[type="submit"] {  }
```
]

]

---

.col-gauche[
### Présentation
### Sélecteurs
- syntaxe
- principaux
- autres
- pseudo-formats
]
.col-droite[

#### Les pseudo-formats

- Constitués de pseudo-classes et de pseudo-éléments
- Affinent le comportement des sélecteurs
- Enrichissent l’expérience utilisateur
- S’ajoutent à la fin du sélecteur, avec les signes `:` ou `::`

```
/* Pseudo-classe 'hover' : action à effectuer au survol de la souris */
a:hover { text-decoration: none; }

/* Pseudo-élément 'before' : contenu à insérer avant un élément "q" */
q::before { content: open-quote; }
```
]

---

.col-gauche[
### Présentation
### Sélecteurs
- syntaxe
- principaux
- autres
- pseudo-formats
]
.col-droite[

|Pseudo-classe|Rôle|
|:-:|-|
|`:active`|Modifie l’élément actif.|
|`:focus`|Modifie l’élément ayant le focus.|
|`:hover`|Modifie l’élément survolé.|
|`:first-child`|Modifie le premier enfant.|
|`:last-child`|Modifie le dernier enfant.|
|`:nth-child(n)`|Modifie le énième enfant.|
|`:checked`|Modifie l’élément dont l’état est coché.|
|`:enabled`|Modifie l’élément dont l’état est activé.|
|`:disabled`|Modifie l’élément dont l’état est désactivé
|`:target`|Modifie dynamiquement un élément cible d’un hyperlien au sein même du document.|
.legende[Principales pseudo-classes]

]

---

.col-gauche[
### Présentation
### Sélecteurs
- syntaxe
- principaux
- autres
- pseudo-formats
]
.col-droite[

|Pseudo-élément|Rôle|
|:-:|-|
|`::first-line`|Modifie la première ligne d’un élément.|
|`::first-letter`|Modifie la première lettre d’un élément.|
|`::before`|Modifie le contenu généré avant l’élément.|
|`::after`|Modifie le contenu généré après l’élément.|
|`::selection`|Modifie l’élément sélectionné par l’utilisateur. Déprécié.|
|`::marker`|Modifie le contenu d’un élément de liste. Aucun support à ce jour.|
.legende[Liste des pseudo-éléments]

]

---

.col-gauche[
### Présentation
### Sélecteurs
### Bonnes pratiques
- styles par défaut
]
.col-droite[

#### Les styles par défaut

Conventions différentes selon les navigateurs

Moteurs de rendu appliquent des styles par défaut

Deux solutions pour harmoniser :
- remettre à zéro le formatage ;
- uniformiser le rendu.

Remise à zéro par *reset* sélectif de Eric Meyer :  
http://meyerweb.com/eric/tools/css/reset/

Uniformisation par Nicolas Gallagher :  
http://necolas.github.io/normalize.css/

]

---

.col-gauche[
### Présentation
### Sélecteurs
### Bonnes pratiques
- styles par défaut
- conventions
]
.col-droite[

#### Conventions

Adopter des conventions :
- syntaxiques (dénomination des classes, bas de casse, indentation, déclarations raccourcies…) ;
- sémantiques (`menu-accordeon` plutôt que `m41bzud`) ;
- organisationnelles (feuilles de styles spécialisées, propriétés ordonnées…) ;
- d’écriture (multiligne VS monoligne).
- …

```
/* Exemple d'une bonne application de conventions */
.vignette-accueil {
  border: 1px dashed orange;
  padding: 3px 2px;
  text-align: right;
  vertical-align: baseline;
}
/* Monoligne illisible si plus d’une propriété */
.vignette-accueil { border: 1px dashed orange; padding: 3px 2px; text-align: right; vertical-align: baseline; }
```

]

---

.col-gauche[
### Présentation
### Sélecteurs
### Bonnes pratiques
- styles par défaut
- conventions
- cadriciels
]
.col-droite[

#### Cadriciels

.imp[Cadriciels populaires :]
- Blueprint CSS : http://www.blueprintcss.org/
- Bootstrap : http://getbootstrap.com/
- 960.gs : http://960.gs/
- HTML5 Boilerplate : https://html5boilerplate.com/

.colonne[
.imp[Avantages]
- Ensemble de styles utilitaires déjà configurés
- Normes communes et documentation partagée
- Rapidité de mise en place
]
.colonne[
.imp[Inconvénients]
- Courbe d’apprentissage
- Manque d’optimisation
- Dépendance
]

]