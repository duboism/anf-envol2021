const mongoose = require('mongoose');

const lightSchema = mongoose.Schema({
  light: Number,
  date: Date
});

const Light = mongoose.model('Light', lightSchema);

module.exports = Light;
