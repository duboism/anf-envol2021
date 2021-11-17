// Connection à MongoDB + requêtes au serveur arduino

const mongoose = require('mongoose');

const uri = 'mongodb://127.0.0.1/ICUMoov?retryWrites=true&w=majority';
const Light = require('../models/light');
const Temperature = require('../models/temperature');

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
            newData(value, cmd);
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

function newData(data, type) {
    if (type == 'temperature') {
        var obj = new Temperature({
            temperature: data,
            date: Date.now()
        });
    } else {
        var obj = new Light({
            light: data,
            date: Date.now()
        });
    }
    obj.save();
};

const listLights = () => {
    return (req, res) => {
        Light.find()
            .then(lights => res.status(200).json(lights))
            .catch(error => res.status(400).json({ error }));
    };
};

const listTemperatures = () => {
    return (req, res) => {
        Temperature.find()
            .then(temperatures => res.status(200).json(temperatures))
            .catch(error => res.status(400).json({ error }));
    };
};

module.exports = {
    getData,
    listLights,
    listTemperatures,
};
