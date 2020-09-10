const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var fs = require("fs");
// var path = require('path');
var async = require("async");

const { check,body} = require('express-validator');

const { to, ReS, ReE, ValidationErrors } = require('../services/util.service');
const commonAuthService = require('../services/common.service');

const User = require("../models/User.model");

exports.getDriverList = function (req, res, next) {
    const payload = req.decoded;
    const postData = req.body;

    if(payload._id){

        User.find({ role_type: postData.role }).lean().exec((err, driverdata) => {
            if (!err) {
                return ReS(res, { data: driverdata });
            } else {
                return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
            }
        });
    }else{
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}

exports.getActivatedUser = function (req, res, next) {
        const payload = req.decoded;
        const postData = req.body;
        var result = {};
        if (payload) {
            async.series(
                [
                    function (seriesCallback) {
                        User.find({$and:[{ role_type: 2 }, {account_activate:'active'}]}).countDocuments().exec((err, userCount) => {
                            if (!err) {
                                seriesCallback(null, userCount);
                            } else {
                                seriesCallback(err);
                            }
                        });
                    },
                    function (seriesCallback) {
                        User.find({$and:[{ role_type: 3 }, { account_activate:'active' }]}).countDocuments().exec((err, userCount) => {
                            if (!err) {
                                seriesCallback(null, userCount);
                            } else {
                                seriesCallback(err);
                            }
                        });
                    }
                ],
                function (error, seriesData) {   
    
                    if (error) {
                        return ReE(res, { msg: "Something went wrong!", errors: error }, 422);
                    }
    
                    
                    var data = {
                        driverCount: seriesData[0],
                        userCount: seriesData[1]
                    };
                    return ReS(res, { data: data });
                }
            );
    
    
        } else {
            return ReE(res, { msg: "User not found!", errors: err }, 422);
        }
    
}


exports.dummyFileUpload = function (req, res, next) {
    const payload = req.decoded;
    const postData = req.body;

   // const errors = ValidationErrors(req);
    // if (!errors.isEmpty()) {
    //     return ReE(res, { msg: "Validation Failed", errors: errors.mapped() }, 422);
    // }
    if (postData) {
       
        var filesArray = req.files;
      

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
                            var writepath = "dummyFolder/multipleImage/";
                            //sub path of the image
                            var subPath = "/";

                            //check if folder exists
                            if (!fs.existsSync(basePath+writepath)) {
                                //if folder dosen't exist create them
                                fs.mkdirSync(basePath +writepath);
                                fs.mkdirSync(basePath +writepath + "/other");
                            
                            }
                            file.filename = file.filename.replace(/\s+/g, "_");
                            //generate file path as per the name of the file
                            subPath = "profile_" + file.filename;
                            
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
                return ReE(res, { msg: "File uploaded Successfully!" });
            }
        });


    } else {
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}

module.exports = exports;