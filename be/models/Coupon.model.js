const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// create a schema
const schema = new Schema({
    coupon_token:{type:String,required:true,trim:true},
    coupon_title: { type: String, required: true, trim: true},
    description: { type: String, required: false, default: null },
    expiry: { type: Date, required:true},
    status: { type: String, trim: true}
    
});

// the schema is useless so far
// we need to create a model using it
const Coupon = mongoose.model('Coupon', schema);


// make this available to our users in our Node applications
module.exports = Coupon;
