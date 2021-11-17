// server.js

// Modules requis
const http = require('http');
const fs = require('fs');
const stream = require('stream');

// On utilise le port 3001 pour ne pas devoir stopper le serveur qui affiche les cours
const PORT = 3001;

const server = http.createServer(
    (request, response) => {
        // Affiche la page d'accueil
        let index = fs.createReadStream('./index.html');
        stream.pipeline(index, response, (error) => {
            if (error) console.log(error);
        });
    }
)

server.listen(PORT);

