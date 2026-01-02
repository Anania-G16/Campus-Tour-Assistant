const {Schema , model} = require('../db/connector');
const BuildingSchema  = Schema({
    Name : {
        type : String,
        required : true,
        trim : true,
        lowercase: true
    },

});
const Building = model( 'Buildings',BuildingSchema)
module.exports = Building;

// Task 1 : Design and finish Buildings db