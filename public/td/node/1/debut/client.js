// client.js

// module http
const http = require('http');

// options de connexion
const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/inscription',
    method: 'POST'
};

// Donnée d'inscription
const data = {
    nom: "Roulois",
    prenom: "Alexandre",
    email: "alexandre.roulois@u-paris.fr",
    statut: "i",
    affiliation: "LLF"
};

// Formate la requête
paramvals = [];
for (let k of Object.keys(data))
    paramvals.push([k, encodeURIComponent(data[k])].join("="));
query = paramvals.join("&");
console.log(query);
