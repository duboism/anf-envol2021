// Connection à MongoDB

const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1/ICUMoov?retryWrites=true&w=majority';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
