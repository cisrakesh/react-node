const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
var async = require("async");

// var admin = require("firebase-admin");

// var serviceAccount = require("../push-notification-firebase.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://push-notification-1b878.firebaseio.com/"
// });

const { to, ReS, ReE, ValidationErrors } = require('../services/util.service');
const Ride = require("../models/Ride.model");
const Vehicles = require("../models/Vehicles.model");
const ObjectId = mongoose.Types.ObjectId;

// insert request for ride
exports.insertRideRequest = function (req, res) {
    const payload = req.decoded;
    const postData = req.body;    

    if (payload._id) {
        Ride.create({
          passenger_id: payload._id,
          source_point: {lat: postData.source.lat, long: postData.source.long},
          destination_point: {lat: postData.destination.lat, long: postData.destination.long},
          ride_status: 'initiated'
        }, function (err, response) {
            if (err) return ReE(res, { msg: "Request failed!", errors: err }, 422);
            return ReS(res, { data: response });
            // saved!
          });
    }
}

/**
 * This API will return the data related to ride id.
 * user will be also get return who is the pessanger in the ride 
 */ 

exports.getRideDetails = function (req, res, next) {
    const payload = req.decoded;
    const postData = req.body;

    if (payload._id) {
        
        Ride.aggregate([
            { $match:{$and:[{ _id: ObjectId(postData.ride_id) }] } },
            {$lookup:
                {
                from: "users",
                let: { id: "$passenger_id" },
                pipeline: [
                    { $match:
                        { $expr:
                            { $and:
                                [
                                    { $eq: [ "$_id",  "$$id" ] }
                                ]
                            }
                        }
                    },
                    { $project: { stock_item: 0, _id: 0 } }
                ],
                as: "passengerData"
                }
            }

        ],(err,data)=>{
            if(err) {
            next(err);
            return;
            }           
            return ReS(res, { data: data });
        });
    }
}

/**
 * This api will update ride status to accepted when ride accepted by
 * The driver after checking the ride request
 */
exports.acceptRideRequest = function (req, res, next) {
    const payload = req.decoded;
    const postData = req.body;
    const driverId = payload._id;
    const rideId = postData.ride_id;
    var vehiclesData = '';

     if (driverId && rideId) {
        async.series(
            [
                function (seriesCallback) {
                    Vehicles.findOne({
                        active_vehicle: 'true',
                        driver_id: ObjectId(driverId)
                    },function(err,userDoc){
                        console.log("driver id", driverId);
                        if (!err && userDoc._id ) {
                            console.log("founded vehicle", userDoc);
                            vehiclesData = userDoc;
                            seriesCallback(null,userDoc);
                        }else{
                            seriesCallback(err);
                        } 
                    });
                },
                function (seriesCallback) { 
                    if(vehiclesData !== ''){

                        Ride.updateOne({_id: ObjectId(rideId) }, {
                            $set: {
                                accepted_driver_id: driverId,
                                accepted_vehicle_id: vehiclesData._id,
                                ride_status: 'accepted',
                                driver_accepted_date: new Date
                            } 
                        },
                        {upsert: false}, function(_err, doc) {
                            if (_err) {
                                seriesCallback('Accept ride request failed!');
                            } else {  seriesCallback(null, doc); }
                            
                        });
                        
                    }else{
                        seriesCallback("No active vehicle found!");
                    }
                    
                }
            ], 
            function (error, seriesData) {
                if (error) {
                    return ReE(res, { msg: "Something went wrong!", errors: error }, 422);
                } 
                return ReS(res, { data: seriesData });
            }
        ); 
    }
}

/**
 * This api will return the driver info by ride_id
 */
exports.getDriverOfRide = function (req, res, next) {
    const payload = req.decoded;
    const postData = req.body;

    if (payload._id) {
        
        Ride.aggregate([
            { $match:{$and:[{ _id: ObjectId(postData.ride_id) }] } },
            {$lookup:
                {
                from: "users",
                let: { id: "$accepted_driver_id" },
                pipeline: [
                    { $match:
                        { $expr:
                            { $and:
                                [
                                    { $eq: [ "$_id",  "$$id" ] }
                                ]
                            }
                        }
                    },
                    { $project: { stock_item: 0, _id: 0 } }
                ],
                as: "driverData"
                }
            },
            {$lookup:
                {
                from: "vehicles",
                let: { vehicle_id: "$accepted_vehicle_id" },
                pipeline: [
                    { $match:
                        { $expr:
                            { $and:
                                [
                                    { $eq: [ "$_id",  "$$vehicle_id" ] }
                                ]
                            }
                        }
                    },
                    { $project: { stock_item: 0, _id: 0 } }
                ],
                as: "vehicleData"
                }
            }

        ],(err,data)=>{
            if(err) {
            next(err);
            return;
            }           
            return ReS(res, { data: data });
        });
    }
}

/**
 * Ride started by driver
 */

exports.rideStartedByDriver = function(req, res, next){
    const payload = req.decoded;
    const postData = req.body;
    if (payload._id) {        
        const dataObj = {};
              dataObj.lat = postData.start_lat;
              dataObj.long = postData.start_long;
              dataObj.time = new Date;              

        Ride.updateOne(
            { _id: ObjectId(postData.ride_id), accepted_driver_id: ObjectId(payload._id) },
            {
                $set: {
                    ride_status: 'started',
                    ride_path: [
                        dataObj
                    ],
                    ride_start_date: new Date
                }
            },
            {upsert: false}, function(err, doc) {
                if(err) {
                    next(err);
                    return;
                } 
                return ReS(res, { data: doc });
            });        
    }
}

/**
 * update ride path after a specific time frame from client side
 */

exports.updateRideRoot = function(req, res, next){
    const payload = req.decoded;
    const postData = req.body;
    if (payload._id) {        
        const dataObj = {};
              dataObj.lat = postData.current_lat;
              dataObj.long = postData.current_long;
              dataObj.time = new Date;              

        Ride.updateOne(
            { _id: ObjectId(postData.ride_id), accepted_driver_id: ObjectId(payload._id) },            
            { $push: { ride_path: dataObj } },
            {upsert: false}, function(err, doc) {
                if(err) {
                    next(err);
                    return;
                } 
                return ReS(res, { data: doc });
            });        
    }
}

/**
* Mark complete ride when end by driver
*/

exports.endRide = function(req, res, next){
    const payload = req.decoded;
    const postData = req.body;
    if (payload._id) {
        const dataObj = {};
              dataObj.lat = postData.end_lat;
              dataObj.long = postData.end_long;
              dataObj.time = new Date;              

        Ride.updateOne(
            { _id: ObjectId(postData.ride_id), accepted_driver_id: ObjectId(payload._id) },            
            {
              $push: { ride_path: dataObj },
              $set: {
                      ride_status: 'completed',
                      ride_end_date: new Date
                    } 
            },
            {upsert: false}, function(err, doc) {
                if(err) {
                    next(err);
                    return;
                } 
                return ReS(res, { data: doc });
            });        
    }
}

module.exports = exports;