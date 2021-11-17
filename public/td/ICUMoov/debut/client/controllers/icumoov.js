// Connection à MongoDB + requêtes au serveur arduino

const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1/ICUMoov?retryWrites=true&w=majority';

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const net = require('net');

const ARDUINO_PORT = 9999;

const getData = () => {
    return (req, res) => {
        // Recupère le paramètre cmd (méthode à interroger)
        const cmd = req.params.cmd;
        // Ouvre une socket vers le serveur
        const socket = net.connect({ port: ARDUINO_PORT });
        // Écrit la commande et ferme
        socket.write(cmd);
        socket.end();
        // Fonction de rappel
        socket.on('data', (data) => {
            const value = data.toString().substr(4);
            res.render(
                'data',
                {
                    type: cmd,
                    data: value
                }
            );
        });
    };
};

module.exports = {
    getData
};
