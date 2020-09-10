const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var fs = require("fs");
// var path = require('path');
var async = require("async");

const { check, oneOf, sanitize ,body} = require('express-validator');

const { to, ReS, ReE, ValidationErrors } = require('../services/util.service');
const commonAuthService = require('../services/common.service');
const passwordService = require("../services/password_service");
const User = require("../models/User.model");
const DriverProfile = require("../models/DriverProfile.model");

exports.validate=function(method){
    
    switch (method){
        case 'signUp':{
            return [
                
                check("firstname", "First Name is Required").exists().isLength({ min: 1 }),
                check("lastname", "Last Name is Required").exists().isLength({ min: 1 }),
                
                
                check('email', 'Email is Required').if(body('email').notEmpty()).exists().isLength({ min: 1 }),
                check('email', 'Please provide valid Email Address').if(body('email').notEmpty()).isEmail(),
                
                check('mobile_number', 'Phone number is Required').exists().isLength({ min: 1 }),
                check('mobile_number', 'Please provide valid Phone Number of 10 digits').isLength({ min: 10 }),
                
                check('password', 'Password is Required').exists().isLength({ min: 1 }),
                check('password', 'Password should be atleast 6 digit').isLength({ min: 6 }),
                
                check('confPassword', "Confirm Password is required").exists().isLength({ min: 1 }),
                check('confPassword', "Confirm password is not same is Password").custom((confPassword, { req, loc, path }) => {
                    console.log("password feid")
                    if (confPassword !== req.body.password) {
                        // throw error if passwords do not match
                        return false;
                    } else {
                        return true;
                    }
                }),
                
                check('device_token', "Device token is required").exists().isLength({ min: 1 }),
                
                check("role_type", "Role type is required").exists().isLength({ min: 1 }),
                                    
            ];
            break;
        }
        case 'login':{
            return [
                check('mobile_number', 'Phone number/Email is Required').exists().isLength({ min: 1 }),
                check('password', 'Password is Required').exists().isLength({ min: 1 })
            ];
            break;
        }
        case 'updateCurrentUser':{
            return [
                check("firstname", "First Name is Required").exists().isLength({ min: 1 }),
                check("lastname", "Last Name is Required").exists().isLength({ min: 1 }),


                check('email', 'Email is Required').if(body('email').notEmpty()).exists(),
                check('email', 'Please provide valid Email Address').if(body('email').notEmpty()).isEmail(),

                // check('mobile_number', 'Phone number is Required').if(body('mobile_number').notEmpty()).exists(),
                // check('mobile_number', 'Please provide valid Phone Number of 10 digits').if(body('mobile_number').notEmpty()).isLength({ min: 10 }),
            ];
            break;
        }
        case 'updatePassword':{
            return [
                check('oldPassword', "Old Password is required").exists().notEmpty(),
                check('password', "Password is required").exists().notEmpty(),
                check('confPassword', "Confirm Password is required").exists().notEmpty(),
                check('confPassword', "Confirm Password should be of atleast 6 character").isLength({ min: 6 }),
                check('confPassword', "Confirm password is not same is Password").custom((confPassword, { req, loc, path }) => {
                    if (confPassword !== req.body.password) {
                        // throw error if passwords do not match
                        return false;
                    } else {
                        return true;
                    }
                })
            ]; 
        }
        case 'userProfilePic':{
            return [
                
                check('profile_image', "Maximum allowed file size is 5 MB").custom((profile_image, { req, loc, path }) => {
                    if (typeof profile_image == 'object') {

                        if (req.files[0].fieldname == 'profile_image' && req.files[0].size > 5242880) {
                            return false;
                        } else if (req.files[1] && req.files[1].fieldname == 'profile_image' && req.files[1].size > 5242880) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                })
                
            ]
        }
        case 'updateDriverProfileData':{
            return [
                check('licence_number', "Licence number is required").exists().notEmpty(),
                check('licence_image', "Only jpg,png and jpeg are allowed!").custom((licence_image, { req, loc, path }) => {
                    if(typeof licence_image =='object'){
                        var arr = ['image/jpeg', 'image/jpg', 'image/png', 'image/x-png'];
                        if (arr.indexOf(licence_image.mimetype) == -1) {
                            return false;
                        } else {
                            return true;
                        }
                    }else{
                        return true;
                    }
                }),
                check('licence_image', "Maximum allowed file size is 5 MB").custom((licence_image, { req, loc, path }) => {
                    if (typeof licence_image == 'object') {
                        
                        if (req.files[0].fieldname == 'licence_image' && req.files[0].size > 5242880) {
                            return false;
                        } else if (req.files[1] && req.files[1].fieldname == 'licence_image' && req.files[1].size > 5242880) {
                            return false;
                        } else{
                            return true;
                        }
                    } else {
                        return true;
                    }
                }),
                check('identity_proof', "Licence number is required").exists().notEmpty(),
                check('identity_image', "Only jpg,png and jpeg are allowed!").custom((identity_image, { req, loc, path }) => {
                    if (typeof identity_image == 'object') {
                        var arr = ['image/jpeg', 'image/jpg', 'image/png', 'image/x-png'];
                        if (arr.indexOf(identity_image.mimetype) == -1) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }),
                check('identity_image', "Maximum allowed file size is 5 MB").custom((identity_image, { req, loc, path }) => {
                    if (typeof identity_image == 'object') {

                        if (req.files[0].fieldname == 'identity_image' && req.files[0].size > 5242880) {
                            return false;
                        } else if (req.files[1] && req.files[1].fieldname == 'identity_image' && req.files[1].size > 5242880) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                })
            ]
        }
        case 'registerednumber':{
            return [
                check('mobile_number', 'Phone number is Required').exists().isLength({ min: 1 }),
                check('mobile_number', 'Please provide valid Phone Number of 10 digits').isLength({ min: 10 }),
            ];
            break;
        }
        case 'change-password':{
            return [
                check('mobile_number', 'Phone number is Required').exists().isLength({ min: 1 }),
                check('mobile_number', 'Please provide valid Phone Number of 10 digits').isLength({ min: 10 }),
                check('password', "Password is required").exists().notEmpty(),
                check('password', "Password should be of atleast 6 character").isLength({ min: 6 }),
                check('confPassword', "Confirm Password is required").exists().notEmpty(),
                check('confPassword', "Confirm password is not same is Password").custom((confPassword, { req, loc, path }) => {
                    if (confPassword !== req.body.password) {
                        // throw error if passwords do not match
                        return false;
                    } else {
                        return true;
                    }
                })
            ];
            break;
        }

        case 'adminLogin':{
            return[
                check('email', 'Email is Required').exists().notEmpty(),
                check('password', 'Password is Required').exists().isLength({ min: 1 })
            ];
            break;
        }

        case 'updateCurrentAdmin':{
            return [
                check("firstname", "First admin Name is Required").exists().isLength({ min: 1 }),
                check("lastname", "Last admin Name is Required").exists().isLength({ min: 1 }),
                check('contact', 'Phone number is Required').if(body('contact').notEmpty()).exists(),
            ];
            break;
        }

        case 'changeAdminpassword':{
            return [
                check('password', "Password is required").exists().notEmpty(),
                check('password', "Password should be of atleast 6 character").isLength({ min: 6 }),
                check('confPassword', "Confirm Password is required").exists().notEmpty(),
                check('confPassword', "Confirm password is not same is Password").custom((confPassword, { req, loc, path }) => {
                    if (confPassword !== req.body.password) {
                        // throw error if passwords do not match
                        return false;
                    } else {
                        return true;
                    }
                })
            ];
            break;
        }
    }
    
    
}
/*
* Controller Function To Add User
*/
exports.signup = async function (req, res) {
    let err, user;
    const reqBody = req.body;
    
    
    await check('email').if(body('email').notEmpty()).custom(value => {
        return User.find({email:value}).then(user => {
            if (user.length>0) {
                return Promise.reject('Email is allready in use');
            }
        });
    }).run(req);
    
    await check('mobile_number').custom(mobile_number => {
        return User.find({ mobile_number: mobile_number }).then(user => {
            if (user.length > 0) {
                return Promise.reject('Mobile number is allready in use');
            }
        });
    }).run(req);
    
    
    
    const errors = ValidationErrors(req);
    if (!errors.isEmpty()) {
        return ReE(res, { msg: "Validation Failed", errors: errors.mapped() }, 422);
    }
    
    [err, user] = await to(commonAuthService.signup(reqBody));
    if (err) return ReE(res, { message: err.message }, 422);
    return ReS(res, { user: user });
}
/*
* Controller Function To Login
*/
exports.login = async function (req, res) {
    let err, user;
    let data={};
    
    //check is user with email or phone number exists or not
    await check('mobile_number').custom(mobile_number => {
        return User.findOne({
             $or: [
                { 'mobile_number': mobile_number },
                { 'email': mobile_number }
            ]}).then(user => {
                if(user){
                    if (user.length <= 0) {
                        return Promise.reject('Invalid Email or Phone Number.');
                    } else if (user.account_activate != 'active'){
                        console.log(user);
                        return Promise.reject('Your account is still pending for admin approval.');
                    }
                }else{
                    return Promise.reject('This number is not regitered!');
                }
            });
    }).run(req);
    
    await check('password').custom((password, { req, loc, path }) => {
        
        return User.findOne({
            
            account_activate: 'active', $or: [
                { 'mobile_number': req.body.mobile_number },
                { 'email': req.body.mobile_number }
            ]}).then(user => {
                //console.log(bcrypt.compareSync(password,user.password))
                if(user!=null){
                    if ( !bcrypt.compareSync(password, user.password)) {
                        return Promise.reject("Password dosen't matched");
                    }    
                }
                
            });
    }).run(req);
    
    const errors = ValidationErrors(req);
    if (!errors.isEmpty()) {
        return ReE(res, { msg: "Validation Failed", errors: errors.mapped() }, 422);
    }
    
    
    const body = req.body;
    
    async.series(
        [
            function (seriesCallback) {
                User.findOne({
                    account_activate: 'active', 
                    $or: [
                        { 'mobile_number': body.mobile_number },
                        { 'email': body.mobile_number }
                    ]
                },function(err,userDoc){
                    if (!err) {
                        user = userDoc;
                        seriesCallback(null,userDoc);
                    }else{
                        seriesCallback(err);
                    } 
                });
            },
            function (seriesCallback) { 
                if(user){
                    const payload = { _id: user._id, user: user.email, device_token: user.device_token, mobile_number: user.mobile_number, user_role: user.role_type};
                    const options = { expiresIn: process.env.JWT_EXPIRES, issuer: process.env.JWT_ISSUER };
                    const secret = process.env.JWT_SECRET;
                    const token = jwt.sign(payload, secret, options);

                    data.token = token;

                    user.password = "";
                    delete user.password;
                    data.user = user;
                    seriesCallback();
                }else{
                    seriesCallback("User not found!");
                }
                
            }
        ], 
        function (error, seriesData) {
            if (error) {
                return ReE(res, { msg: "Something went wrong!", errors: error }, 422);
            } 
            return ReS(res, { data: data });
        }
    );
}
/*
* Controller Function To Upload Documents
*/
exports.uploadDocuments = async function (req, res) {
    console.log(req.files);
    if (typeof req.files !== 'undefined' && req.files.length > 0) {
        body = req.files[0];
    } else {
        return ReE(res, { message: "Unable to Upload Image" }, 422);
    }
    return ReS(res, { message: "Successfully Uploaded Image", img: body });
}

/*
* To get current logged in user
*/
exports.getCurrentUser=function (req, res){
    const payload = req.decoded;
    User.findOne({ _id: payload._id }).lean().exec((err, userdata) => {
        if (!err) {
            
            delete userdata['password'];
            delete userdata['created_date'];
            delete userdata['updated_date'];
            return ReS(res, { data: userdata });
        } else {
            return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
        }
    });
}


/*
* Update current logged user
*/
exports.updateCurrentUser = async function (req, res) {
    const payload = req.decoded;
    
    
    await check('email').if(body('email').notEmpty()).custom((value, { req, loc, path }) => {
        
        return User.countDocuments({ email: value, _id: { $ne: payload._id } }).then(user => {
            //console.log(user);
            if (user > 0) {
                return Promise.reject('Email is allready in use');
            }
        });
    }).run(req);

    // await check('mobile_number').custom((mobile_number, { req, loc, path }) =>  {
    //     return User.countDocuments({ mobile_number: mobile_number, _id: { $ne: payload._id } }).then(user => {
    //         if (user > 0) {
    //             return Promise.reject('Mobile number is allready in use');
    //         }
    //     });
    // }).run(req);
    
    
    
    const errors = ValidationErrors(req);
    if (!errors.isEmpty()) {
        return ReE(res, { msg: "Validation Failed", errors: errors.mapped() }, 422);
    }
    var result = {};
    if (payload) {
        User.findOne({ _id: payload._id }).then(
            userDoc => {

                if (userDoc) {
                    userDoc.firstname = req.body.firstname;
                    userDoc.lastname = req.body.lastname;
                    userDoc.email = req.body.email;
                    
                    
                    userDoc.save();
                    return ReS(res, { data: userDoc });
                } else {
                    return ReE(res, { msg: "Something went wrong!" }, 422);
                }

            },
            err => {
                return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
            }
        );
        
        
    } else {
        return ReE(res, { msg: "User not found!", errors: err }, 422);
    }
}


/*
* function change password by , logged in user itself
*/
exports.updatePassword=  async function (req, res){
    const payload = req.decoded;
    var result = {};
    
    await check('oldPassword').custom((oldPassword, { req, loc, path }) => {
        
        return User.findOne({
            _id: payload._id
        }).then(user => {
            
            if(user){
                if (!bcrypt.compareSync(oldPassword, user.password)) {
                    return Promise.reject("Password dosen't matched");
                }     
            }else{
                return Promise.reject("Something went wrong! Please try again later.");
            }

        });
    }).run(req);
    
    const errors = ValidationErrors(req);
    if (!errors.isEmpty()) {
        return ReE(res, { msg: "Validation Failed", errors: errors.mapped() }, 422);
    }

    let status = 200;
    [err, newpass] = await to(passwordService.createPassword(req.body.password));
    if (payload) {
        
            
        User.findByIdAndUpdate(payload._id, { password: newpass}, function (err, updateRes) {

            if (err) {
                return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
            } else if (updateRes !== null) {
                return ReS(res, { msg:"Password Updated successfuly" });
            } else {
                return ReE(res, { msg: "Unable to update , Please try again later!", errors: err }, 422);
            }

        });

    } else {
        return ReE(res, { msg: "User not found!", errors: err }, 422);
    }
}


/*
* Function to get driver additional profile data of logged in driver
*/
exports.getDriverProfileData=function(req,res){
    const payload = req.decoded;
    if(payload._id){
        DriverProfile.findOne({ driver_id: payload._id }).lean().exec((err, profiledata) => {
            if (!err) {
                if (profiledata==null){
                    profiledata = new DriverProfile();
                }
                return ReS(res, { data: profiledata });
            } else {
                return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
            }
        });
    }else{
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}


/*
* Function to update driver additional profile data of logged in driver
*/
exports.updateDriverProfileData = function (req, res,next) {
    const payload = req.decoded;
    const postData=req.body;
    //console.log(postData);
    
    const errors = ValidationErrors(req);
    if (!errors.isEmpty()) {
        return ReE(res, { msg: "Validation Failed", errors: errors.mapped() }, 422);
    }
    if (payload._id) {
        //console.log(req.files);
        var filesArray=req.files;
        
        //apply series so that update/create will happen once all images are processed
        async.series([
            //function to process images
            function (callback){
                
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
                            var basePath ="public/";
                            var writepath = "uploads/profiles/" + payload._id;
                            //sub path of the image
                            var subPath = "/";
                            
                            //check if folder exists
                            if (!fs.existsSync(basePath+writepath)) {
                                //if folder dosen't exist create them
                                fs.mkdirSync(basePath +writepath);
                                fs.mkdirSync(basePath +writepath + "/other");
                                fs.mkdirSync(basePath +writepath + "/licence");
                                fs.mkdirSync(basePath +writepath + "/identity");
                            }
                            file.filename = file.filename.replace(/\s+/g, "_");
                            //generate file path as per the name of the file
                            switch (file.fieldname) {
                                case 'licence_image': {
                                    subPath = "licence/" + file.filename;
                                    break;
                                }
                                case 'identity_image': {
                                    subPath = "identity/" + file.filename;
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
        ],function(error,data){
            if (error){
                return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
            }else{
                //save the updated data
                DriverProfile.findOne({ driver_id: payload._id }).exec((err, profiledata) => {
                    if (!err) {
                        if (profiledata == null) {
                            profiledata = new DriverProfile();
                        }
                        
                        profiledata.driver_id = payload._id;
                        profiledata.updated_date = new Date();
                        
                        profiledata.licence_number = postData.licence_number;
                        
                        if (profiledata.licence_image != "" && profiledata.licence_image != null) {
                            fs.unlinkSync(profiledata.licence_image);
                        }
                        
                        if (profiledata.licence_image != postData.licence_image){
                            profiledata.licence_verified = false;  
                        }
                        profiledata.licence_image = postData.licence_image;
                        
                        
                        
                        profiledata.identity_proof = postData.identity_proof;
                        if (profiledata.identity_image != postData.identity_image) {
                            profiledata.identity_verified = false;
                        }
                        if (profiledata.identity_image != "" && profiledata.identity_image != null) {
                            fs.unlinkSync(profiledata.licence_image);
                        }
                        
                        profiledata.identity_image = postData.identity_image;
                        
                        profiledata.save();
                        return ReS(res, { data: profiledata });
                    } else {
                        if (postData.identity_image != "" && postData.identity_image != null) {
                            fs.unlinkSync(postData.licence_image);
                        }
                        if (postData.licence_image != "" && postData.licence_image != null) {
                            fs.unlinkSync(postData.licence_image);
                        }
                        return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
                    }
                });
            }
        });
        
        
    } else {
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}


/*
* To check is given phone number is registered or not
*/
exports.isPhoneRegistered=function (req, res){
    const errors = ValidationErrors(req);
    if (!errors.isEmpty()) {
        return ReE(res, { msg: "Validation Failed", errors: errors.mapped() }, 422);
    }
    var phoneNumber=req.body.mobile_number;
    User.findOne({ mobile_number: phoneNumber }).lean().exec((err, userdata) => {
        if (!err) {
            if (userdata==null || userdata.length<=0){
                return ReE(res, { msg: "Phone not registered!", errors: { mobile_number: "Phone not registered!"}}, 422);    
            }else{
                delete userdata['password'];
                delete userdata['created_date'];
                delete userdata['updated_date'];
                return ReS(res, { data: userdata });    
            }
            
        } else {
            return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
        }
    });
}


/*
* To change password using forgot password functionality
*/
exports.changePassword = async function (req, res) {
    const payload = req.body;
    var result = {};

    await check('mobile_number').custom((mobile_number, { req, loc, path }) => {

        return User.findOne({
            mobile_number: mobile_number
        }).then(user => {

            if (!user) {
                return Promise.reject("Not a valid user! Given phone number is not valid.");
            }else{
                return Promise.resolve();
            }

        });
    }).run(req);

    const errors = ValidationErrors(req);
    if (!errors.isEmpty()) {
        return ReE(res, { msg: "Validation Failed", errors: errors.mapped() }, 422);
    }

    let status = 200;
    [err, newpass] = await to(passwordService.createPassword(payload.password));
    
    User.findOne({ mobile_number: payload.mobile_number}).then(userDoc => {

        if (userDoc) {
            userDoc.password = newpass;
            userDoc.save();
            return ReS(res, { msg: "Password updated succesfuly!" });
        } else {
            return ReE(res, { msg: "Something went wrong!" }, 422);
        }

    },
    err => {
        return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
    });


}

/*
* Function to user's profile pic
*/
exports.uploadUserProfilePic = function (req, res, next) {
    const payload = req.decoded;
    const postData = req.body;

    const errors = ValidationErrors(req);
    if (!errors.isEmpty()) {
        return ReE(res, { msg: "Validation Failed", errors: errors.mapped() }, 422);
    }
    if (payload._id) {
        //console.log(req.files);
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
                            var writepath = "uploads/profiles/" + payload._id;
                            //sub path of the image
                            var subPath = "/";

                            //check if folder exists
                            if (!fs.existsSync(basePath+writepath)) {
                                //if folder dosen't exist create them
                                fs.mkdirSync(basePath +writepath);
                                fs.mkdirSync(basePath +writepath + "/other");
                                fs.mkdirSync(basePath +writepath + "/licence");
                                fs.mkdirSync(basePath +writepath + "/identity");
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
                //save the updated data
                User.findOne({ _id: payload._id }).exec((err, profiledata) => {
                 
                    if (!err) {
                        if (profiledata.profile_image != "" && profiledata.profile_image!=null){
                            if (!fs.existsSync("public/"+profiledata.profile_image)) {
                                fs.unlinkSync("public/" +profiledata.profile_image);  
                            }  
                        }

                        profiledata.profile_image = postData.profile_image;
                        
                        profiledata.save();
                        return ReS(res, { data: profiledata });
                    } else {
                        
                        if (postData.profile_image != "" && postData.profile_image != null) {
                            fs.unlinkSync(postData.profile_image);
                        }
                        
                        return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
                    }
                });
            }
        });


    } else {
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}


/*
    get list of users
*/

exports.getUserList = function (req, res, next) {
    const payload = req.decoded;
    const postData = req.body;

    if (payload._id) {
        var userType=postData.role;
        var perPage = parseInt(process.env.Pagination_LIMIT);
        if (typeof postData.perPage != 'undefined') {
            perPage = postData.perPage;
        }
        var page = 1;
        if (typeof postData.page!='undefined'){
            page = postData.page;    
        }
        
        var orderBy = 'firstname';
        if (typeof postData.orderBy != 'undefined') {
            orderBy = postData.orderBy;
        }
        
        var orderByAscDesc = 1;
        if (typeof postData.orderByAscDesc != 'undefined') {
            var orderByAscDesc = postData.orderByAscDesc;
        }
        
        var offsetRecord = (page-1) * perPage;
        if(page==0){
            offsetRecord = (page) * perPage;
        }
        
        
        
        
        async.series(
            [
                function (seriesCallback) {
                    User.find({$and:[{$or:[
                        {'firstname':{$regex:postData.text}},
                        {'lastname':{$regex:postData.text}},
                        {'email':{$regex:postData.text}}
                        ]},{'role_type':userType}]}).countDocuments().exec((err, userCount) => {
                        if (!err) {
                            seriesCallback(null, userCount);
                        } else {
                            seriesCallback(err);
                        }
                    });
                },
                function (seriesCallback) {
                    User.find({$and:[{$or:[
                        {'firstname':{$regex:postData.text}},
                        {'lastname':{$regex:postData.text}},
                        {'email':{$regex:postData.text}}
                        ]},{'role_type':userType}]}).skip(offsetRecord).limit(perPage).exec((err, userData) => {
                        if (!err) {
                            seriesCallback(null, userData);
                            
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
                
                var reminder = seriesData[0] % perPage;
                var totalPages = parseInt(seriesData[0] / perPage);
                if (reminder > 0) {
                    totalPages++;
                }
                var data = {
                    totalCount: seriesData[0], 
                    totalPages: totalPages,
                    data: seriesData[1],
                    currentPage: page
                };
                
                return ReS(res, { data: data });
            }
        );
        
        
    } else {
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}


/*
* Controller Function To Login for admin
*/
exports.adminLogin = async function (req, res) {
    let err, user;
    let data={};
    let reqToken={};
    //check is user with email or phone number exists or not
    await check('email').custom(email => {
        return User.findOne({
                'email':email 
            }).then(user => {
                if(user){
                    if (user.length <= 0) {
                        return Promise.reject('Invalid Email or Phone Number.');
                    } else if (user.account_activate != 'active'){
                        return Promise.reject('Your account is still pending for admin approval.');
                    }
                }else{
                    return Promise.reject('This number is not regitered!');
                }
            });
    }).run(req);
    
    await check('password').custom((password, { req, loc, path }) => {
        
        return User.findOne({
            
            account_activate: 'active',  'email':req.body.email 
            }).then(user => {
                //console.log(bcrypt.compareSync(password,user.password))
                if(user!=null){
                    if ( !bcrypt.compareSync(password, user.password)) {
                        return Promise.reject("Password dosen't matched");
                    }    
                }
                
            });
    }).run(req);
    
    const errors = ValidationErrors(req);
    if (!errors.isEmpty()) {
        return ReE(res, { msg: "Validation Failed", errors: errors.mapped() }, 422);
    }
    
    
    const body = req.body;
    
    async.series(
        [
            function (seriesCallback) {
                User.findOne({
                    account_activate: 'active', 
                      'email':req.body.email  
                },function(err,userDoc){
                    if (!err) {
                        user = userDoc;
                        seriesCallback();
                    }else{
                        seriesCallback(err);
                    } 
                });
            },
            function (seriesCallback) { 
                if(user){
                    const payload = { _id: user._id, user: user.email, device_token: user.device_token, mobile_number: user.mobile_number, user_role: user.role_type };
                    const options = { expiresIn: process.env.JWT_EXPIRES, issuer: process.env.JWT_ISSUER };
                    const secret = process.env.JWT_SECRET;
                    const token = jwt.sign(payload, secret, options);

                    reqToken = token;

                    user.password = "";
                    delete user.password;
                    data = user;
                    seriesCallback();
                }else{
                    seriesCallback("User not found!");
                }
                
            }
        ], 
        function (error, seriesData) {
            if (error) {
                return ReE(res, { msg: "Something went wrong!", errors: error }, 422);
            } 
            return ReS(res, { token:reqToken,user:data});
        }
    );
}

exports.getCurrentAdmin=function (req, res){
  
    const payload = req.decoded;
    User.findOne({ _id: payload._id }).lean().exec((err, userdata) => {
        if (!err) {
            delete userdata['password'];
            delete userdata['created_date'];
            delete userdata['updated_date'];
            return ReS(res, { data: userdata });
        } else {
            return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
        }
    });
}


exports.updateCurrentAdmin = async function (req, res) {
    const payload = req.decoded;
    const errors = ValidationErrors(req);

    if (!errors.isEmpty()) {
        return ReE(res, { msg: "Validation Failed", errors: errors.mapped() }, 422);
    }
    var result = {};
    if (payload) {
        User.findByIdAndUpdate(payload._id, req.body, function (err, updateRes) {

            if (err) {
                return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
            } else if (updateRes !== null) {
                return ReS(res, { data: updateRes });
            } else {
                return ReE(res, { msg: "Unable to update , Please try again later!", errors: err }, 422);
            }
            
        });
        
    } else {
        return ReE(res, { msg: "User not found!", errors: "err" }, 422);
    }
}

exports.updatePendingUser = async function (req, res) {
   const payload = req.body;
    var status='pending';
  
    if(req.body.status===true)
    {
        status='active';
    }
    
    if (payload) {
        let err,user;
        [err,user] = await to(User.findByIdAndUpdate({_id:payload.id}, {account_activate:status}));

            if (err) {
                return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
            } else if (user !== null) {
                return ReS(res, { data: user });
            } else {
                return ReE(res, { msg: "Unable to update , Please try again later!", errors: err }, 422);
            }
        
    } else {
        return ReE(res, { msg: "User not found!", errors: err }, 422);
    }
}

exports.getPendingUserList = function (req, res, next) {
    const payload = req.decoded;
    const postData = req.body;

    
    if (payload._id) {
        var userType=postData.role;
        var perPage = parseInt(process.env.Pagination_LIMIT);
        if (typeof postData.perPage != 'undefined') {
            perPage = postData.perPage;
        }
        var page = 1;
        if (typeof postData.page!='undefined'){
            page = postData.page;    
        }
        
        var orderBy = 'firstname';
        if (typeof postData.orderBy != 'undefined') {
            orderBy = postData.orderBy;
        }
        
        var orderByAscDesc = 1;
        if (typeof postData.orderByAscDesc != 'undefined') {
            var orderByAscDesc = postData.orderByAscDesc;
        }
        
        var offsetRecord = (page-1) * perPage;
        if(page==0){
            offsetRecord = (page) * perPage;
        }
        
        
        
        
        async.series(
            [
                function (seriesCallback) {
                    User.find({ account_activate: "pending" }, { password: 0 }).countDocuments().exec((err, userCount) => {
                        if (!err) {
                            seriesCallback(null, userCount);
                        } else {
                            seriesCallback(err);
                        }
                    });
                },
                function (seriesCallback) {
                    User.find({ account_activate: "pending" }, { password: 0 }).skip(offsetRecord).limit(perPage).exec((err, userData) => {
                        if (!err) {
                            seriesCallback(null, userData);
                            
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
                
                var reminder = seriesData[0] % perPage;
                var totalPages = parseInt(seriesData[0] / perPage);
                if (reminder > 0) {
                    totalPages++;
                }
                var data = {
                    totalCount: seriesData[0], 
                    totalPages: totalPages,
                    data: seriesData[1],
                    currentPage: page
                };
                
                
                
                return ReS(res, { data: data });
            }
        );
        
        
    } else {
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}

exports.getDriverProfileDataAdmin = function(req,res,next){
    const payload = req.decoded;
    var driverId = req.params.userId;
  
    if (payload._id) {
        async.series(
            [
                function (seriesCallback) {
                    DriverProfile.findOne({ driver_id: driverId }).lean().exec((err, profiledata) => {
                      
                        if (!err) {
                            seriesCallback(null,profiledata);
                            
                        } else {
                            seriesCallback(err);
                        }
                    });
                    
                },
                function (seriesCallback) {
                    User.findOne({
                        _id: driverId
                    },{password:0}).lean().exec((err, userDoc) => {
                        if (!err) {
                            seriesCallback(null, userDoc);

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
                return ReS(res, { user: seriesData[1], driverProfile: seriesData[0] });
            }
        );
        
    } else {
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}

exports.updateDriverProfileDataAdmin = function (req, res, next) {
    const payload = req.decoded;
    var driverId = req.params.userId;
    const postData = req.body;
    //var driverId = postData.userId;
    if (payload._id) {
        DriverProfile.findOne({ driver_id: driverId }).then(
            profileDoc => {
                               

                profileDoc.licence_verified = postData.licence_verified;
                profileDoc.identity_verified = postData.identity_verified;

                if (profileDoc.save()) {
                    return ReS(res, { data: profileDoc });
                } else {

                    return ReE(res, { msg: "Something went wrong!" }, 422);
                }

            },
            err => {
                return ReE(res, { msg: "Something went wrongs!", errors: err }, 422);
            }
        );

    } else {
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}

/*
* To change Admin password using forgot password functionality
*/
exports.changeAdminPassword = async function (req, res) {
    const payload = req.body;

    
    User.findOne({ email:payload.email},{role_type:1}).then(userDoc => {

        if (userDoc) {
            // userDoc.password = newpass;
            // userDoc.save();
            return ReS(res, { msg: "Email found updated succesfuly!" });
        } else {
            return ReE(res, { msg: "Something went wrong!" }, 422);
        }

    },
    err => {
        return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
    });


}


exports.getDriverUserList = function (req, res, next) {
    const payload = req.decoded;
    const postData = req.body;

    if (payload._id) {
        var userType=postData.role;
        var perPage = parseInt(process.env.Pagination_LIMIT);
        if (typeof postData.perPage != 'undefined') {
            perPage = postData.perPage;
        }
        var page = 1;
        if (typeof postData.page!='undefined'){
            page = postData.page;    
        }
        
        var orderBy = 'firstname';
        if (typeof postData.orderBy != 'undefined') {
            orderBy = postData.orderBy;
        }
        
        var orderByAscDesc = 1;
        if (typeof postData.orderByAscDesc != 'undefined') {
            var orderByAscDesc = postData.orderByAscDesc;
        }
        
        var offsetRecord = (page-1) * perPage;
        if(page==0){
            offsetRecord = (page) * perPage;
        }       
        
        async.series(
            [
                function (seriesCallback) {
                    User.find({ role_type: userType }, { password: 0 }).countDocuments().exec((err, userCount) => {
                        if (!err) {
                            seriesCallback(null, userCount);
                        } else {
                            seriesCallback(err);
                        }
                    });
                },
               
                function (seriesCallback) {
                    User.aggregate([
                        { $match:{$and:[{ role_type: 2 },{$or:[{firstname:{$regex:postData.text}},{lastname:{$regex:postData.text}},{email:{$regex:postData.text}}] } ]}},
                        { $lookup: {from: 'driverprofiles', localField: '_id', foreignField: 'driver_id', as: 'driverInfo'} }
                    ]).skip(offsetRecord).limit(perPage).exec((err, userData) => {
                        if (!err) {
                                                  
                            seriesCallback(null, userData)
                            
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
                
                var reminder = seriesData[0] % perPage;
                var totalPages = parseInt(seriesData[0] / perPage);
                if (reminder > 0) {
                    totalPages++;
                }
                var data = {
                    totalCount: seriesData[0], 
                    totalPages: totalPages,
                    data: seriesData[1],
                    currentPage: page
                };
                
                return ReS(res, { data: data });
            }
        );
        
        
    } else {
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}

exports.test = function (req, res) {
    const payload = req.decoded;
    //var driverId = req.params.userId;
    const postData = req.body;
    var driverId = postData.userId;
    if (payload._id) {
        

        return ReE(res, { msg: "Something went wrong!" }, 422);
        

    } else {
        return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
    }
}


module.exports = exports;