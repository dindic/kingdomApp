// import { Schema } from 'mongoose';
//const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');

var DistricSchema = new mongoose.Schema({   
  name: {type: String},
  city: {type: String},
  population: {type: Number},
  baseValue: {type: Number},
  defenseValue: {type: Number},
  neighbours: [{  id: {type: Number},
                  fullLots: {type: Number},
                  buildings: [{type: String}]
  }],
  buildingGrid: [{  id: {type: String},
                  value: {type: String}
              }],        
  wall: {
      north: {type: Boolean},
      east: {type: Boolean},
      south: {type: Boolean},
      west: {type: Boolean},
  },
  water: {
      north: {type: Boolean},
      east: {type: Boolean},
      south: {type: Boolean},
      west: {type: Boolean},
  }                 
});      


var CitySchema = new mongoose.Schema({
  name: String,
  defenseValue:  Number,
  population: Number,
  baseValue: Number,
  alignment: String,


  districts: [  DistricSchema ]

})

var KingdomSchema = new mongoose.Schema({
  _creator:{ required: true, type: mongoose.Schema.Types.ObjectId},
  name: {type: String, required: true},
  capital: {type: String, required: false},
  ruler:  {type: String, required: false},
  alignment:  {type: String, required: false},
  population:   {type: Number, required: false},
  promotion: {type: String, required: false},
  taxation: {type: String, required: false},
  holiday: {type: String, required: false},
  governmentType:   {type: String, required: false},
  size: {type: Number, required: false},
  consumption: {type: Number, required: false},
  bps: {type: Number, required: false},
  unrest: {type: Number, required: false},
  // Tiradas de control
  loyalty: { bonuses : {events : {type: Number, required: false}, other  : {type: Number, required: false}}, penalties : {other  : {type: Number, required: false}}},
  economy: { bonuses : {events : {type: Number, required: false}, other  : {type: Number, required: false}}, penalties : {other  : {type: Number, required: false}}},
  stability: { bonuses : {events : {type: Number, required: false}, other  : {type: Number, required: false}}, penalties : {other  : {type: Number, required: false}}},



  cities: [CitySchema],
  
  leaders: [{ id: {type: String},
              name: {type: String},
              hability: {type: String},
              modifier: {type: Number},
              vacancy: {type: Boolean},
              presence: {type: Boolean},
              leadership: {type: Boolean},
              ruler: [{type: String}]
  }],

  improvements: [{ id: {type: String}, total: {type: Number}}],

  specialTerrain: [{ id: {type: String}, total: {type: Number}}]
})


var Kingdom = mongoose.model('Kingdoms', KingdomSchema );

module.exports = {Kingdom}
