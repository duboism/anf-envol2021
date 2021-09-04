// server.js

// modules
const connect = require('connect');
const utils = require('utils');

// app
const app = connect();

/*
*	accueil
*/

app.use('/home', utils.loadFile('./index.html') );

/*
*	inscription
*/

// 1. enregistrement
app.use('/inscription', utils.register('./inscription.csv'));
// 2. message de confirmation
app.use('/inscription', utils.loadFile('./confirmation.html'));

/*
*   mauvaises routes
*/
app.use( utils.loadFile('./404.html') )


// port d'écoute
app.listen(3000);
