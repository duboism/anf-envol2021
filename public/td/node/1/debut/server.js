// server.js

// Modules requis
const http = require('http');
const fs = require('fs');
const stream = require('stream');
const url = require('url');

// On utilise le port 3001 pour ne pas devoir stopper le serveur qui affiche les cours
const PORT = 3001;

const server = http.createServer(
    (request, response) => {
        // Extrait la partie chemin de l'URL
        let pathname = url.parse(request.url).pathname;

        // routes d'accès: détermine le nom du fichier en fonction du chemin dans l'URL
        switch (pathname) {
        case '/': filename = './index.html'; break;
        case '/inscription': filename = './confirmation.html'; break;
        default: filename = pathname;
        }

        // Affiche le fichier
        let index = fs.createReadStream(filename);
        stream.pipeline(index, response, (error) => {
            if (error) console.log(error);
        });
    }
)

server.listen(PORT);

