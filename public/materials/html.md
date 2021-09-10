class: center, middle, inverse

# HTML5 : les fondamentaux
Alexandre Roulois (Université de Paris, LLF, CNRS)

---

## Sommaire

- Présentation
- Syntaxe
- Squelette
- Modèles de contenu
- Méthodes de balisage
- Ressources

---

layout:true
## HTML5 : les fondamentaux

---

.col-gauche[
### Présentation
]
.col-droite[

.important[HTML :] *HyperText Markup Language*

- langage à balises (éléments, attributs)
- système hypertexte
- à destination du Web

.important[1992 :] HTML 2.0  
.important[2009 :] HTML5  
.important[2021 :] Norme (*Living standard*)

.important[Élément :] dispositif permettant de marquer un segment (mot, phrase, image…)

.important[Attribut :] pour affiner la fonction d’un élément (date, langue, source, destination…)

]

---

.col-gauche[
### Présentation
### Syntaxe
- éléments
]
.col-droite[

#### Éléments

Pour marquer un segment avec :
- balise d’ouverture
- balise de fermeture

.important[Exception :] éléments autonomes (`<br />` `<hr />`, `<img />`…)

```
<p>« Les chats, c’est comme le papier, ça se froisse très vite. »
<br />(Maupassant)</p>
```

Respecter l’ordre d’ouverture et de fermeture des balises :

```
<p><q>Quand je réveille mon chat, il a l’air reconnaissant de
celui à qui l’on donne l’occasion de se rendormir.
<br />(M. Audiard)</q></p>
```

]

---

.col-gauche[
### Présentation
### Syntaxe
- éléments
- attributs
]
.col-droite[

#### Attributs

Pour modifier les propriétés d’un élément

- paires `nom="valeur"`
- uniquement dans les balises ouvrantes
- 0 à *n* attributs
- attributs universels (e.g. : `title`)
- attributs spécifiques (e.g. : `href` pour élément `a`)
- attributs obligatoires (e.g. : `type` pour élément `input`)
- ordre sans importance

```
<input type="checkbox" name="choix" checked="checked" />
```

]

---

.col-gauche[
### Présentation
### Syntaxe
- éléments
- attributs
- divers
]
.col-droite[

#### Divers

```
<!-- Code HTML -->
<body>
    <h1>Zombicat</h1>
    <p>Le zombicat (<i lang="lat">Felis silvestris zombiscus</i> ou <i lang="en">Zombie Cat</i> en anglais), est l’épouvantable résultat du processus de zombification infectant les chats. En sa qualité de gardien du royaume des morts dans l’antique Egypte, le chat présenterait des prédispositions génétiques à la contamination. La déesse Bastet en perdrait sa jolie frimousse…<br />
    <img src="http://alexandre.roulois.fr/images/site/zombicat.jpg" width="150" height="200" title="Zombie Cat" alt="Un chat atteint de zombification" /></p>
</body>
```
Espaces géminées sans impact : indentation du code ne sert qu’au confort visuel

Bons réflexes :

- balise de fermeture obligatoire
- éléments autonomes soigneusement écrits : `<img />` et non `<img>`
- aucun chevauchement de balises
- balises et attributs en minuscules
- valeurs des attributs entre guillemets
]

---

.col-gauche[
### Présentation
### Syntaxe
### Squelette
]
.col-droite[
```
<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<!-- En-tête -->
<head>
    <!-- Métadonnées -->
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width"/>
    <title></title>
</head>
<body>
    <!-- Contenu HTML -->
</body>
</html>
```
.legende[Structure minimale d’une page Web]

.imp[`head` :] métadonnées, relations inter-documents…

.imp[`body` :] contenu visible dans le navigateur

.imp[`viewport` :] manière dont le navigateur doit afficher le document sur les différents supports (`device-width` = 100 % de la surface visible)

]

---

.col-gauche[
### Présentation
### Syntaxe
### Squelette
### Modèles de contenu
]
.col-droite[

Distinction classique fondée sur le rendu visuel :
- éléments de type en ligne (*inline*)
- éléments de type bloc (*bloc-level*)

HTML5 introduit des raffinements reposant sur le contenu

.img-grand[
.centrer[
    ![Tableau périodique des éments (Mike Riethmuller)](./images/html-fig1.jpg)
    ]
]

]

---

.col-gauche[
### Présentation
### Syntaxe
### Squelette
### Modèles de contenu
]
.col-droite[

3 modèles de contenu en plus du texte simple :
- .imp[éléments de flux], dont le rôle est de structurer le document, contiennent :
    - d’autres éléments de flux
    - des éléments de phrasé
    - du texte
- .imp[éléments de phrasé], imbriqués dans les éléments de flux, contiennent :
    - d’autres éléments de phrasé
    - du texte
- .imp[éléments de métadonnées]

|Modèle|Éléments (extrait)|
|:-|:-|
|flux|`a` `p` `div` `h1` `h2` `article` `header` `aside` `section` `video`…|
|phrasé |`a` `em` `i` `strong` `b` `small` `img` `input` `span`…|
|métadonnées|`link` `meta` `style` `script`…|

]

---

.col-gauche[
### Présentation
### Syntaxe
### Squelette
### Modèles de contenu
### Méthodes de balisage
]
.col-droite[

Comparaison de trois méthodes de balisage :
- balisage minimaliste
- balisage enrichi
- balisage avec groupement spécialisé

]

---

.col-gauche[
### Présentation
### Syntaxe
### Squelette
### Modèles de contenu
### Méthodes de balisage
]
.col-droite[

```
<!-- Balisage minimaliste -->
<h1>Étude comparée des extravagances capillaires chez les footballeurs et les stars américaines de la chanson</h1>
<h2>Le dégradé baroque</h2>
<p>Chez l’<i lang="lat">homo footbaliscus</i>, le dégradé arbore de manière préférentielle des couleurs vives et la plupart du temps opposées sur la roue chromatique, témoin d’une absence totale de sensibilité à l’harmonie ou à la complémentarité des tons qui présume d’une absence complète de personnalité, tandis que chez leurs homologues du hit parade étasunien, à quelques exceptions près – citons notamment Britney Spears dans sa période déglingue –, la recherche esthétique domine la volonté d’exhiber son égo.</p>
<h2>Accessorisation scénique</h2>
<p>L’équilibre entre recherche esthétique, manifestation d’un égo surdimensionné et trouble clinique de l’estime de soi, n’est pas forcément évident lorsque l’on procède à l’inventaire des accessoires et autres extensions des joueurs de football.</p>
<h2>Diagramme des phénomènes capillaires entre 2014-2016</h2>
<img src="./images/diagramme-capillaires.jpg" alt="Diagramme en barres représentant les différents phénomènes affectant les footballeurs (en bleu) et les stars américaines de la chanson (en vert céladon)" width="800" height="600" />
```
.colonne[
- aucune hiérarchie
- absence de plan
- ambiguïté
- notion d’ordre pour rétablir dépendances
]
.colonne[
.img-large[![Représentation arborescente du balisage minimaliste](./images/html-fig2.png)]
.legende[Représentation arborescente du balisage minimaliste]
]

]

---

.col-gauche[
### Présentation
### Syntaxe
### Squelette
### Modèles de contenu
### Méthodes de balisage
]
.col-droite[
```
<!-- Balisage enrichi -->
<div>
    <h1>Étude comparée des extravagances capillaires chez les footballeurs et les stars américaines de la chanson</h1>
    <div>
        <h2>Le dégradé baroque</h2>
        <p>Chez l’<i lang="lat">homo footbaliscus</i>, le dégradé arbore de manière préférentielle des couleurs vives et la plupart du temps opposées sur la roue chromatique, témoin d’une absence totale de sensibilité à l’harmonie ou à la complémentarité des tons qui présume d’une absence complète de personnalité, tandis que chez leurs homologues du hit parade étasunien, à quelques exceptions près – citons notamment Britney Spears dans sa période déglingue –, la recherche esthétique domine la volonté d’exhiber son égo.</p>
    </div>
    <div>
        <h2>Accessorisation scénique</h2>
        <p>L’équilibre entre recherche esthétique, manifestation d’un égo surdimensionné et trouble clinique de l’estime de soi, n’est pas forcément évident lorsque l’on procède à l’inventaire des accessoires et autres extensions des joueurs de football.</p>
    </div>
    <div>
        <h2>Diagramme des phénomènes capillaires entre 2014-2016</h2>
        <img src="images/diagramme-capillaires.jpg" alt="Diagramme en barres représentant les différents phénomènes affectant les footballeurs (en bleu) et les stars américaines de la chanson (en vert céladon)" width="800" height="600" />
    </div>
</div>
```

.colonne[
- élément `div` apporte de la structure
- plan du document
- compréhension balisage accrue
]
.colonne[
.img-moy[![Représentation arborescente du balisage enrichi](./images/html-fig3.png)]
]
]

---

.col-gauche[
### Présentation
### Syntaxe
### Squelette
### Modèles de contenu
### Méthodes de balisage
]
.col-droite[

```
<!-- Groupement spécialisé -->
<article>
    <h1>Étude comparée des extravagances capillaires chez les footballeurs et les stars américaines de la chanson</h1>
    <section>
        <h2>Le dégradé baroque</h2>
        <p>Chez l’<i lang="lat">homo footbaliscus</i>, le dégradé arbore de manière préférentielle des couleurs vives et la plupart du temps opposées sur la roue chromatique, témoin d’une absence totale de sensibilité à l’harmonie ou à la complémentarité des tons qui présume d’une absence complète de personnalité, tandis que chez leurs homologues du hit parade étasunien, à quelques exceptions près – citons notamment Britney Spears dans sa période déglingue –, la recherche esthétique domine la volonté d’exhiber son égo.</p>
    </section>
    <section>
        <h2>Accessorisation scénique</h2>
        <p>L’équilibre entre recherche esthétique, manifestation d’un égo surdimensionné et trouble clinique de l’estime de soi, n’est pas forcément évident lorsque l’on procède à l’inventaire des accessoires et autres extensions des joueurs de football.</p>
    </section>
    <aside>
        <h2>Diagramme des phénomènes capillaires entre 2014-2016</h2>
        <img src="images/diagramme-capillaires.jpg" alt="Diagramme en barres représentant les différents phénomènes affectant les footballeurs (en bleu) et les stars américaines de la chanson (en vert céladon)" width="800" height="600" />
    </aside>
</article>
```

HTML5 intègre des éléments pour groupement spécialisé

]

---
.col-gauche[
### Présentation
### Syntaxe
### Squelette
### Modèles de contenu
### Méthodes de balisage
]
.col-droite[

.centrer[
.img-grand[![Schéma de distribution des éléments de groupement spécialisé](./images/html-fig4.png)]
.legende[Schéma de distribution des éléments de groupement spécialisé]
]

]

---

.col-gauche[
### Présentation
### Syntaxe
### Squelette
### Modèles de contenu
### Méthodes de balisage
]
.col-droite[
Affichage similaire avec balisage minimal, enrichi ou groupement spécialisé

.colonne[
Pourquoi ajouter structure ?
- spécialiser des parties de son code
- remonter dans les résultats des moteurs de recherche
- meilleure arborescence du DOM
- en prévision de l’évolution du Web (réseaux sémantiques)
]
.colonne[
.img-large[![Affichage similaire avec balisage minimal, enrichi ou groupement spécialisé](./images/html-fig5.png)]
]

]

---

.col-gauche[
### Présentation
### Syntaxe
### Squelette
### Modèles de contenu
### Méthodes de balisage
### Ressources
]
.col-droite[

- Liste des éléments :  
https://developer.mozilla.org/fr/docs/Web/HTML/Element
- Liste des attributs :  
https://developer.mozilla.org/fr/docs/Web/HTML/Attributes
- Valider la syntaxe :  
https://validator.w3.org/
- Révéler la structure d’un document :  
https://gsnedders.html5.org/outliner/

]
