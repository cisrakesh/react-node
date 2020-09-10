const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
// create a schema
const schema = new Schema({
    driver_id: { type: Schema.Types.ObjectId, ref: 'User', index: true, trim: true, required: true },//userSchema
    brand_make: { type: String, required: true },
    brand_model: { type: String , required: true },
    car_color: { type: String , required: true },
    engine_number: { type: String, required: true },
    manufacture_year: { type: Number, required: true },
    seat_capacity: { type: Number, required: true },
    insurer: { type: String, required: true },
    insurance_image: { type: String, required: true },
    insurance_validity: { type: Date, required: true, default: null },
    registration_number: { type: String, required: true },
    registation_image: { type: String, required: true, default: null },
    
    active_vehicle: { type: String, required: true, default: false },
    IS_ride_on: { type: String, required: true, default: false },
    current_location:{ type: Object, required: false },
    created_date: { type: Date, default: new Date },
    updated_date: { type: Date, default: new Date }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

// the schema is useless so far
// we need to create a model using it
const Vehicles = mongoose.model('Vehicles', schema);


// make this available to our users in our Node applications
module.exports = Vehicles;
