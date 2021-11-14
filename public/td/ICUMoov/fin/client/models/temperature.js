const mongoose = require('mongoose');

const tempSchema = mongoose.Schema({
  temperature: Number,
  date: Date
});

const Temperature = mongoose.model('Temperature', tempSchema);

module.exports = Temperature;
