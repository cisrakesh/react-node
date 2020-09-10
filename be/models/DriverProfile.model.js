const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema
const schema = new Schema({
    driver_id: {type: Schema.Types.ObjectId, ref: 'User', index: true,trim: true,unique: true },//userSchema
    licence_number: { type: String, required: true, trim: true, default: null },
    licence_image: { type: String,  trim: true, default: null },
    licence_verified: { type: Boolean, default: false, trim: true },
    identity_proof: { type: String,  trim: true, default: null },
    identity_image: { type: String,  trim: true, default: null },
    identity_verified: { type: Boolean, default: false, trim: true },
    created_date: { type: Date, default: new Date },
    updated_date: { type: Date, default: new Date }
});

// the schema is useless so far
// we need to create a model using it
const DriverProfile = mongoose.model('DriverProfile', schema);


// make this available to our users in our Node applications
module.exports = DriverProfile;
