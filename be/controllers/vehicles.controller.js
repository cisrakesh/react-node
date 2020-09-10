const { to, ReS, ReE, ValidationErrors } = require('../services/util.service');
const { check} = require('express-validator');

const Vehicle = require("../models/Vehicles.model");
const VehicleType = require("../models/VehicleTypes.model");
var async = require("async");
var fs = require("fs");


exports.validate = function (method) {
    switch (method) {
        case 'addVehicle': {
            return [
                check("brand_make", "Manufacturer is required").notEmpty(),
                check("brand_model", "Model name is required").notEmpty(),
                check("car_type", "Model name is required").notEmpty(),
                check("car_color", "Color is required").notEmpty(),
                check("engine_number", "Engine Number is required").notEmpty(),
                check("manufacture_year", "Year of manufacture is required").notEmpty(),
                check("manufacture_year", "Year of manufacture should be four digit number").isNumeric().isLength({ min: 4, max: 4 }),
                check("seat_capacity", "Seat capacity is required").notEmpty(),
                check("seat_capacity", "Seat capacity should be number").isNumeric(),
                check("insurer", "Insurer company is required").notEmpty(),
                check("insurance_image", "Insurance image is required").notEmpty(),
                check('insurance_image', "Only jpg,png and jpeg are allowed!").custom((insurance_image, { req, loc, path }) => {
                    if (typeof insurance_image == 'object') {
                        var arr = ['image/jpeg', 'image/jpg', 'image/png', 'image/x-png'];
                        if (arr.indexOf(insurance_image.mimetype) == -1) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }),
                check('insurance_image', "Maximum allowed file size is 5 MB").custom((insurance_image, { req, loc, path }) => {
                    if (typeof insurance_image == 'object') {

                        if (req.files[0].fieldname == 'insurance_image' && req.files[0].size > 5242880) {
                            return false;
                        } else if (req.files[1] && req.files[1].fieldname == 'insurance_image' && req.files[1].size > 5242880) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }),
                
                check("insurance_validity", "Date of insurance validity is required").notEmpty(),
                check("insurance_validity", "Please insert valid date").isISO8601(),
                check("registration_number", "Registration number is required").notEmpty(),
                check("registation_image", "Registration image is required").notEmpty(),
                
                check("registation_image", "Registration image is required").notEmpty(),
                check('registation_image', "Only jpg,png and jpeg are allowed!").custom((registation_image, { req, loc, path }) => {
                    if (typeof registation_image == 'object') {
                        var arr = ['image/jpeg', 'image/jpg', 'image/png', 'image/x-png'];
                        if (arr.indexOf(registation_image.mimetype) == -1) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }),
                check('registation_image', "Maximum allowed file size is 5 MB").custom((registation_image, { req, loc, path }) => {
                    if (typeof registation_image == 'object') {

                        if (req.files[0].fieldname == 'registation_image' && req.files[0].size > 5242880) {
                            return false;
                        } else if (req.files[1] && req.files[1].fieldname == 'registation_image' && req.files[1].size > 5242880) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }),
            ];
            break;
        }
    }
}

/*
* Controller Function To Add User
*/
exports.addVehicle = async function (req, res) {
    const payload = req.decoded;
    const postData = req.body;
    await check('car_type').custom(value => {
        return VehicleType.find({ _id: value }).then(vehicleTypeDoc => {
            if (vehicleTypeDoc.length <= 0) {
                return Promise.reject('Please provide valid car type');
            }
        },
        err=>{
            return Promise.reject('Please provide valid car type');
        });
    }).run(req);
    
    const errors = ValidationErrors(req);
    if (!errors.isEmpty()) {
        return ReE(res, { msg: "Validation Failed", errors: errors.mapped() }, 422);
    }
    
    if (payload._id) {
        //console.log(req.files);
        var filesArray = req.files;
        var vehicleData = new Vehicle();
        //apply series so that update/create will happen once all images are processed
        async.series([
            //function to process images
            function (callback) {

                async.each(filesArray, function (file, eachcallback) {
                    async.waterfall([
                        //read the file from temp directory
                        function (callback) {
                            fs.readFile(file.path, (err, data) => {
                                if (err) {
                                    console.log("err ocurred", err);
                                }
                                else {
                                    callback(null, data);
                                }
                            });
                        },
                        ///function to write images in particular folder
                        function (data, callback) {
                            //path of the user profile
                            var basePath = "public/";
                            var writepath = "uploads/vehicles/" + vehicleData._id;
                            //sub path of the image
                            var subPath = "/";

                            //check if folder exists
                            if (!fs.existsSync(basePath +writepath)) {
                                //if folder dosen't exist create them
                                fs.mkdirSync(basePath +writepath);
                                fs.mkdirSync(basePath +writepath + "/registration");
                                fs.mkdirSync(basePath +writepath + "/insurance");
                                
                            }
                            file.filename = file.filename.replace(/\s+/g, "_");
                            //generate file path as per the name of the file
                            switch (file.fieldname) {
                                case 'registation_image': {
                                    subPath = "registration/" + file.filename;
                                    break;
                                }
                                case 'insurance_image': {
                                    subPath = "insurance/" + file.filename;
                                    break;
                                }
                            }

                            //write file in the created folder 
                            fs.writeFile(basePath +writepath + "/" + subPath, data, (err) => {
                                if (err) {
                                    console.log("error occured", err);
                                }
                                else {
                                    //assign newly saved file path to the postdata
                                    postData[file.fieldname] = writepath + "/" + subPath;

                                    callback(null, 'done');
                                }
                            });
                        }
                    ], function (err, result) {
                        console.log(result)
                        // result now equals 'done'
                        //pass final callback to async each to move on to next file

                        eachcallback();
                    });
                }, function (err) {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback();

                    }
                });


            }
        ], function (error, data) {
            if (error) {
                return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
            } else {
                //save the updated data
                vehicleData.driver_id = payload._id;
                vehicleData.brand_make = postData.brand_make;
                vehicleData.brand_model = postData.brand_model;
                vehicleData.car_color = postData.car_color;
                vehicleData.engine_number = postData.engine_number;
                vehicleData.manufacture_year = postData.manufacture_year;
                vehicleData.seat_capacity = postData.seat_capacity;
                vehicleData.insurer = postData.insurer;
                if (vehicleData.insurance_image != "" && vehicleData.insurance_image != null && vehicleData.insurance_image != postData.insurance_image) {
                    if (!fs.existsSync("public/" + vehicleData.insurance_image)) {
                        fs.unlinkSync("public/" + vehicleData.insurance_image);
                    }
                }
                vehicleData.insurance_image = postData.insurance_image;
                vehicleData.insurance_validity = new Date(postData.insurance_validity);
                vehicleData.registration_number = postData.registration_number;
                vehicleData.registation_image = postData.registation_image;
                if (vehicleData.registation_image != "" && vehicleData.registation_image != null && vehicleData.registation_image != postData.registation_image) {
                    if (!fs.existsSync("public/" + vehicleData.registation_image)) {
                        fs.unlinkSync("public/" + vehicleData.registation_image);
                    }
                }
                vehicleData.save();
                return ReS(res, { data: vehicleData });
            }
        });
    } else {
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}


exports.getDriverVehicle = function (req, res) {
    const payload = req.decoded;
    const postData = req.body;
  

    if (payload._id) {
        Vehicle.find({ driver_id: payload._id }).lean().exec((err, vehiclesdata) => {
            if (!err) {
                
                return ReS(res, { data: vehiclesdata });
            } else {
                return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
            }
        });
    } else {
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}


exports.getVehicleType = function (req, res) {

    VehicleType.find().lean().exec((err, vehicleTypedoc) => {
        if (!err) {

            return ReS(res, { data: vehicleTypedoc });
        } else {
            return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
        }
    });
    
}

exports.getVehicle=function(req,res){
    const payload = req.decoded;
    var vehicleId = req.params.vehicleId;
    if (payload._id) {
        Vehicle.findOne({ _id: vehicleId, driver_id: payload._id }).lean().exec((err, vehicleData) => {
            if (!err) {
                if (vehicleData){
                    return ReS(res, { data: vehicleData });    
                }else{
                    return ReE(res, { msg: "vehicle not found"}, 422);    
                }
                
            } else {
                return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
            }
        });
    } else {
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}

exports.setVehicleActive = function (req, res) {
    const payload = req.decoded;
    var vehicleId = req.body.vehicleId;
    if (payload._id) {
        Vehicle.findOne({ _id: vehicleId, driver_id: payload._id }).exec((err, vehicleData) => {
            if (!err) {
                if (vehicleData) {
                    
                    vehicleData.active_vehicle=true;
                    if (vehicleData.save()){
                        Vehicle.update({ driver_id: payload._id, _id: { $ne: vehicleId } }, { $set: { active_vehicle: false } });
                    }
                    return ReS(res, { data: vehicleData });
                } else {
                    return ReE(res, { msg: "vehicle not found" }, 422);
                }

            } else {
                return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
            }
        });
    } else {
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}

module.exports = exports;