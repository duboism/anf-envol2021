const mongoose = require('mongoose');

const temperatureSchema = mongoose.Schema({
    temperature: Number,
    date: Date
});

const Temperature = mongoose.model('Temperature', temperatureSchema);

module.exports = Temperature;

