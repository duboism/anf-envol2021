// server.js

const http = require('http');
const fs = require('fs');
const url = require('url');
const stream = require('stream');

const server = http.createServer( (request, response) => {

  // analyse url
  let filename = url.parse(request.url).pathname;

  // routes d'accès
  switch (filename) {
    case '/': filename = './index.html'; break;
    case '/inscription': filename = './confirmation.html'; break;
  }

  // flux en écriture : fichier HTML envoyé
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

  // compléter inscriptions.csv
  request.on('data', (chunk) => {
    let data = String();
    let search = String();
    for (let param of chunk.toString().split('&')) {
      const q = param.split('=');
      search += `${ decodeURIComponent(q[1]) }\t`;
    }
    data = `${ search.slice(0, -1) }\n`;
    fs.appendFile('./inscriptions.csv', data, (error) => {
      if (error) console.log(error);
    });
  });

});

server.listen(3000);
