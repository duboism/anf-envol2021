const mongoose = require('mongoose');
const net = require('net');
const Light = require('../models/light');
const Temperature = require('../models/temperature');

const uri = 'mongodb+srv://<USER>:<PASS>@cluster0.udwqf.mongodb.net/ICUMoov?retryWrites=true&w=majority';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

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
}

const getData = () => {

  return (req, res) => {

    const cmd = req.params.cmd;
    const socket = net.connect({ port: 9999 });

    socket.on('data', (data) => {
      const value = data.toString().substr(4);
      newData(value, cmd);
      res.render('data', { type: cmd, data: value });
    });

    socket.write(cmd);

    socket.end();

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

  }

};

const listTemperatures = () => {
  return (req, res) => {
    Temperature.find()
      .then(temps => res.status(200).json(temps))
      .catch(error => res.status(400).json({ error }));
  }
}

const listLights = () => {
  return (req, res) => {
    Light.find()
      .then(lights => res.status(200).json(lights))
      .catch(error => res.status(400).json({ error }));
  }
}

module.exports = {
  listData,
  listTemperatures,
  listLights,
  getData
};
