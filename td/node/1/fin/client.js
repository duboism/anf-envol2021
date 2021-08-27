// client.js

// module http
const http = require('http');

// options de connexion
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/inscription',
  method: 'POST'
}

// données
const data = {
  nom: "Roulois",
  prenom: "Alexandre",
  email: "alexandre.roulois@u-paris.fr",
  statut: "i",
  affiliation: "LLF"
};

// formatage données
let query = String();
for (const prop in data) {
  query += `${prop}=${data[prop]}&`;
}
query = query.slice(0, -1);

// paramètres requête
const request = http.request(options, (response) => {
  console.log("Informations envoyées !");
  console.log(response.statusCode);
});

// gestion erreur
request.on('error', (error) => {
  console.log(`Erreur dans la requête : ${ error.message }`);
});

// transmission au serveur
request.end(query);
