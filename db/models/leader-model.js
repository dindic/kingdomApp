const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');

var LeaderSchema = new mongoose.Schema({

})


var Leader = mongoose.model('Leader', LeaderSchema );

module.exports = {Leader}
