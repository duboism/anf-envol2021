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

        // Si le fichier existe, on l'envoie (flux en écriture : fichier HTML envoyé)
        // Sinon on affiche la page pour les erreurs 404
        // Note: exists est obsolète.
        fs.exists(filename, (exists) => {
            const headers = {'Content-Type': 'text/html'};
            if (!exists) {
                filename = './404.html';
                response.writeHead(404, headers);
            }
            else response.writeHead(200, headers);
            let file = fs.createReadStream(filename);
            stream.pipeline(file, response, (error) => {
                if (error) console.log(error);
            });
        });
    }
)

server.listen(PORT);

