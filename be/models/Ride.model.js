const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema for ride
const schema = new Schema({    
    passenger_id: { type: Schema.Types.ObjectId, ref: 'User', index: true, trim: true, required: false },
    source_point:{ type: Object, required: false}, // { lat : "xxx", long : "zzz"}
    destination_point:{ type: Object, required: false }, // { lat : "xxx", long : "zzz"}
    ride_status:{type: String, required: true},//{ status : initiated, accepted, timedout(if any driver not accepted in official timeframe),started,completed}
    accepted_driver_id: { type: Schema.Types.ObjectId, ref: 'User', index: true, trim: true, required: false },
    accepted_vehicle_id: { type: Schema.Types.ObjectId, ref: 'Vehicles', index: true, trim: true, required: false },
    created_date: { type: Date, default: new Date },
    updated_date: { type: Date, default: new Date },
    driver_accepted_date: { type: Date },
    ride_path: { type: Array },
    ride_start_date: {  type: Date },
    ride_end_date:{ type: Date }
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

// the schema is useless so far
// we need to create a model using it
const Ride = mongoose.model('Ride', schema);

// make this available to our rides in our Node applications
module.exports = Ride;
