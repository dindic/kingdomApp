const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
var {Districts} = require('./district-model');

var CitySchema = new mongoose.Schema({
  name: {type: String},
    defenseValue: {type: Number},
    population: {type: Number},
    baseValue: {type: Number},
    alignment: {type: String},

    // TO-DO: Afegir valors de settlements

    // districts: [  Districts ]
  
})


var City = mongoose.model('City', CitySchema );

module.exports = {City}
