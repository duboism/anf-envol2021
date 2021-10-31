# Une approche de la sécurisation des routes

Si certaines routes se contentent d’exposer des données inoffensives, d’autres agissent directement sur la base de données. Il s’agit notamment de celles qui utilisent les verbes HTTP *POST*, *PUT* et *DELETE*.

Au cours de ce TD, vous mettrez en place un système très simple qui vérifiera la conformité d’un mot de passe envoyé dans l’objet `req` de Express avec l’information contenue dans la base de données.

## Étape 1 : ajouter une table des utilisateurs

Dans le répertoire *private*, vous trouverez un fichier *missions.sql* augmenté des instructions pour ajouter une table `users` et insérer un utilisateur `admin@envol2021.fr`. Importez de nouveau le fichier SQL dans votre système de gestion de bases de données :

```shell
mysql -u root -p missions < missions.sql
```

Pour information, le mot de passe associé à l’utilisateur `admin@envol2021.fr` est : *envol-2021*.

## Étape 2 : installer l’application

Comme dans le TD précédent, déplacez-vous à la racine du répertoire *backend*, installez l’application avec tous les modules nécessaires et lancez-la :

```shell
cd backend
npm install
npm start
```

Votre application est maintenant [disponible](http://localhost:3000).

## Étape 2 : définir un modèle pour les utilisateurs

Créez, dans le répertoire *models*, un fichier *users.js* qui sera chargé des opérations sur les utilisateurs. Pour le moment, ne définissez qu’une méthode pour récupérer les informations d’un utilisateur particulier :

```js
const db = require('../services/db');

/* GET one user */
async function getUserById(id_user) {

    const results = await db.query(
        `SELECT email, password
        FROM users
        WHERE id_user = ?;`,
        [id_user]
    );

    return results;
};

module.exports = {
    getUserById
};
```

Rien de bien nouveau dans cette méthode : elle affiche l’email et le mot de passe d’un utilisateur pour un `id_user` donné.

## Étape 3 : authentifier un utilisateur

À présent, créez un contrôleur *auth.js* dans le répertoire *controllers* et importez le modèle précédent :

```js
const users = require('../models/users');
```

Définissez maintenant une méthode asynchrone `checkAuth()` qui se limite pour l’instant à mobiliser la méthode `getUserById()` du modèle *users* :
```js
const checkAuth = async (req, res, next) => {
    try {
        const user = await users.getUserById(req.body.id_user)[0];
        // check
    } catch (err) {
        next(err);
    }
};
```

Dans le bloc `try`, vérifier qu’un paramètre `password` envoyé via formulaire correspond exactement à ce qui est enregistré dans la base de données pour un utilisateur donné :

```js
const checkAuth = async (req, res, next) => {
    try {
        // a user
        const user = await users.getUserById(req.body.id_user);
        // if given password is equal to the one in database…
        if (req.body.password == user.password) {
            // … continue!
            next();
        }
        // in other cases, send a message
        else {
            res.status(401).send('Utilisateur non autorisé.');
        }
    } catch (err) {
        next(err);
    }
};
```

Il ne vous reste plus qu’à exporter votre méthode :

```js
module.exports = {
    checkAuth
};
```

## Étape 4 : assigner la demande d’authentification à certaines routes

Rien de plus simple pour assujettir une route au contrôle d’accès. Importez tout d’abord le contrôleur *auth.js* dans le fichier de routage des requêtes concernant les missions :

```js
const auth = require('../controllers/auth');
```

Ajoutez enfin comme deuxième paramètre des routes *POST*, *PUT* et *DELETE* la méthode *auth.checkAuth* :

```js
router.post('/add', auth.checkAuth, missions.addMission);
router.put('/update/:id_mission', auth.checkAuth, missions.updateMission);
router.delete('/del/:id_mission', auth.checkAuth, missions.deleteMission);
```

Utilisez à présent le service *Postman* pour vérifier le bon fonctionnement de l’authentification en paramétrant par exemple une requête de type `POST` avec deux paramètres : `id_user` défini à `1` et `password` à `$2y$10$yo2QZYwGkk.6EtIsS/f4MeF8j8yC9xU.mww6fW2cXAvFDARMJi/T2`.

**Vous trouverez le code final des documents JavaScript dans le dossier *fin* de ce premier TD.**