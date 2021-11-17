// server.js

// modules requis
const connect = require('connect');
// Notre module
const utils = require('utils');

PORT = 3001;

// app
const app = connect();

// middlewares
app.use('/home', utils.loadFile('./index.html') );
app.use('/inscription', utils.loadFile('./confirmation.html'));
app.use(utils.loadFile('./404.html'));

// port d'écoute
app.listen(PORT);
