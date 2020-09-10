const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema
const schema = new Schema({
    firstname: {type: String, required: true,trim: true },
    lastname: { type: String, required: true },
    email: {type: String ,  trim: true},
    profile_image:{type:String,trim:true,default:null},
    mobile_number: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    email_activate: { type: Number, required: true, trim: true },
    mobile_number_activate: { type: Number, required: true, trim: true },
    account_activate: { type: String, required: true, trim: true },
    role_type: { type: Number, required: true, trim: true },
    device_token: { type: String, trim: true },
    created_date: { type: Date, default: new Date },
    location:{ type: Object, required: false, },
    updated_date: { type: Date, default: new Date },
    firebase_token: { type: String}
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

// the schema is useless so far
// we need to create a model using it
schema.index({location: '2dsphere'});
const User = mongoose.model('User', schema);

// make this available to our users in our Node applications
module.exports = User;
