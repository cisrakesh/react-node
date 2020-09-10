const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema
const schema = new Schema({
    title: { type: String, required: true, trim: true, default: null },
    created_date: { type: Date, default: new Date },
    updated_date: { type: Date, default: new Date }
});

// the schema is useless so far
// we need to create a model using it
const VehicleTypes = mongoose.model('VehicleTypes', schema);


// make this available to our users in our Node applications
module.exports = VehicleTypes;
