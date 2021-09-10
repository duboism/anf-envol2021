class: center, middle, inverse

# Le protocole HTTP
Alexandre Roulois (Université de Paris, LLF, CNRS)

---

## Sommaire

- Un protocole ?
- HTTP 1.1
- Le mécanisme de requête et réponse
- Les verbes

---

layout: true
## Le protocole HTTP

---

.col-gauche[
### Protocole ?
]
.col-droite[

Ensemble de règles de communication entre deux systèmes, sur une même couche d’abstraction.

Chaque couche apporte des fonctions supplémentaires aux précédentes.

.img-large[![Pile de protocoles](./images/http-fig1.png "Pile de protocoles")]
.legende[Pile de protocoles]

]

---

.col-gauche[
### Protocole ?
### HTTP 1.1
]
.col-droite[

.important[HTTP :] *HyperText Transfer Protocol*

Liaison entre un client HTTP et un serveur HTTP, sur la couche application.

HTTP 0.9, protocole très simple :
- connexion du client HTTP
- envoi d'une requête de type GET
- réponse du serveur HTTP
- fermeture de la connexion

Exemple :
```
GET /index.html
```
]

---

.col-gauche[
### Protocole ?
### HTTP 1.1
]
.col-droite[

.important[HTTP 1.0 :] utilisation d’en-têtes pour transmettre les métadonnées

.important[HTTP 1.1 :] meilleure gestion des en-têtes

Exemple :
```
GET /index.html HTTP/1.1
Host: alexandre.roulois.fr
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:90.0) Gecko/20100101 Firefox/90.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate, br
```
]
???
Le Host est obligatoire depuis la v1.1.

Le User-agent, c'est le navigateur Web utilisé.

---

.col-gauche[
### Protocole ?
### HTTP 1.1
### Mécanisme
]
.col-droite[

Requête client HTTP `==>` réponse serveur HTTP

Requête :

```
GET /index.html HTTP/1.1
Host: alexandre.roulois.fr
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:90.0) Gecko/20100101 Firefox/90.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8
Accept-Language: fr,fr-FR;q=0.8,en-US;q=0.5,en;q=0.3
Accept-Encoding: gzip, deflate, br
```

Réponse :

```
HTTP/1.1 200 OK
Date: Sat, 31 Jul 2021 08:10:40 GMT
Server: Apache/2.4.41 (Ubuntu)
Last-Modified: Mon, 05 Jul 2021 08:16:01 GMT
ETag: "2629-5c65bea712ca4-gzip"
Accept-Ranges: bytes
Vary: Accept-Encoding
Content-Encoding: gzip
Content-Length: 3832
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: text/html
```
]

---

.col-gauche[
### Protocole ?
### HTTP 1.1
### Mécanisme
]
.col-droite[

HTTP permet de :
- charger ressources (documents, images, polices, vidéos…)
- communiquer avec Web (envoi/réception de données)

Nécessite une adresse Web

Code retourné pour chaque requête :

|Code|Signification|
|:-:|-|
|200|Succès|
|403|Accès refusé|
|404|Ressource introuvable|
|500|Erreur interne du serveur|
|503|Service Web indisponible|
.legende[Extrait de codes HTTP]
]

---

.col-gauche[
### Protocole ?
### HTTP 1.1
### Mécanisme
]
.col-droite[

Sur les navigateurs : menu développeur pour vérifier requêtes HTTP

.img-large[![Onglet "Network" de DevTools pour le moteur Chrome](./images/http-fig2.png)]
.legende[Onglet "Network" de DevTools pour le moteur Chrome]

]

---

.col-gauche[
### Protocole ?
### HTTP 1.1
### Mécanisme
### Les verbes
]
.col-droite[

Requête HTTP se construit par verbe :
- .imp[GET :] pour récupérer les données d’une ressource
- .imp[POST :] pour rajouter des données à une ressource
- .imp[PUT :] pour modifier les données d’une ressource
- .imp[DELETE :] pour supprimer les données d’une ressource

Exemples avec cURL :

```bash
# Notice d'un dépôt sur HAL
curl "https://api.archives-ouvertes.fr/search/?q=<idhal>"
curl -X GET "https://api.archives-ouvertes.fr/search/?q=<idhal>"
```

```bash
# Statut d'un dépôt sur HAL
curl -X GET -v -u <login> -p https://api.archives-ouvertes.fr/sword/<idhal>
```

]

???
Méthode GET par défaut

Option -X pour modifier la méthode par défaut

---

.col-gauche[
### Protocole ?
### HTTP 1.1
### Mécanisme
### Les verbes
]
.col-droite[

Attribut `method` des formulaires Web exploite les verbes :

```html
<form method="post" action="https://monsite.com/traitement.php">
    <button type="submit">Envoyer</button>
</form>
```

API REST repose aussi sur les verbes.

]