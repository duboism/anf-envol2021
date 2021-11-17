const fs = require('fs');
const stream = require('stream');

function loadFile(filename) {
  return (req, res) => {
    const file = fs.createReadStream(filename);
    stream.pipeline(file, res, (error) => {
      if (error) console.log(error);
    });
  };
};

function register(filename) {
  return (req, res, next) => {
    req.on('data', (chunk) => {
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
    next();
  };
};

module.exports.loadFile = loadFile;
module.exports.register = register;

