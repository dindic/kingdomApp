

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
    },            

});