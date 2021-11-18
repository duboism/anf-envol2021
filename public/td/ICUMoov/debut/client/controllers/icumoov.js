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
const os = require('os');

var networkInterfaces = Object.values(os.networkInterfaces()).flat();
var localInterfaces = networkInterfaces
    .filter(
        iface => {
            return (! iface.internal) && (iface.family == "IPv4");
        }
    );
var MY_IP;
if (localInterfaces.length == 1) {
    let MY_IP_AUTO = localInterfaces[0].address;
    console.log("Automatically guessed IP " + MY_IP_AUTO);
    MY_IP = process.env.MY_IP || MY_IP_AUTO;
} else {
    if ( process.env.MY_IP ) {
        MY_IP = process.env.MY_IP;
    } else {
        throw "Can't determine IP automatically and none given";
    }
}
const ARDUINO_PORT = 9999;
console.log("Will connect to Arduino server on " + MY_IP + ":" + ARDUINO_PORT);

const getData = () => {
    return (req, res) => {
        // Recupère le paramètre cmd (méthode à interroger)
        const cmd = req.params.cmd;
        // Ouvre une socket vers le serveur
        const socket = net.connect(
            {
                host: MY_IP,
                port: ARDUINO_PORT,
            }
        );
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

const listData = () => {
    return async (req, res) => {
        const temperatures = await Temperature.find();
        const lights = await Light.find();
        res.render('index', {
            lights: lights,
            temperatures: temperatures
        });
    };
};

const graphData = () => {
    return async (req, res) => {
        const temperatures = await Temperature.find();
        const lights = await Light.find();
        res.render('graphData', {
            lights: lights,
            temperatures: temperatures
        });
    };
};

module.exports = {
    getData,
    listLights,
    listTemperatures,
    listData,
    graphData,
};
