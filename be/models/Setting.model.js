const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema
const schema = new Schema({
    base_price: { type: Number, required: false, trim: true, default: 1 },
    base_kilometer: { type: Number, required: false, default: 1 },
    rate_per_km: { type: Number, trim: true, default:1},
    commision_per_km: { type: Number, trim: true, default: 1},
    admin_contact :{type:String,required:true,trim:true,default:123456789},
    admin_email :{type:String,required:true,trim:true,default:'dummy@email.com'},
    support_email1:{type:String,required:false,trim:true,default:''},
    support_email2:{type:String,required:false,trim:true,default:''},
    office_address:{type:String,required:true,trim:true,default:"123,xyz office"},
    office_city:{type:String,required:true,trim:true,default:''},
    contact1:{type:String,required:false,trim:true,default:''},
    contact2:{type:String,required:false,trim:true,default:''},

    
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

// the schema is useless so far
// we need to create a model using it
const Setting = mongoose.model('Setting', schema);


// make this available to our users in our Node applications
module.exports = Setting;
