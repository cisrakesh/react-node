const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var fs = require("fs");
// var path = require('path');
var async = require("async");

const { check,body} = require('express-validator');

const { to, ReS, ReE, ValidationErrors } = require('../services/util.service');
const commonAuthService = require('../services/common.service');

const Setting = require("../models/Setting.model");
const User = require("../models/User.model");
const DriverProfile = require("../models/DriverProfile.model");

/*
* To get settings
*/
exports.getSetting=function (req, res){
    const payload = req.decoded;
    Setting.findOne({}).exec((err, settingDoc) => {
        if (!err) {
            if (settingDoc == null) {
                settingDoc = new Setting();
            }
            return ReS(res, { data: settingDoc });
        } else {
            return ReE(res, { msg: "Something went wrong!", errors: err }, 422);
        }
    });
}

/*
* Update fare setting
*/
exports.updateSetting = function (req, res) {
    const payload = req.decoded;
    const postData = req.body;
    var result = {};
    if (payload) {
        Setting.findOne({ _id: postData.settingId }).then(
            settingDoc => {
                if (settingDoc == null || settingDoc=="") {
                    settingDoc = new Setting();
                    settingDoc._id = postData.settingId;
                } 
                
                settingDoc.base_price = postData.base_price;
                settingDoc.base_kilometer = postData.base_kilometer;
                settingDoc.rate_per_km = postData.rate_per_km;
                settingDoc.commision_per_km = postData.commision_per_km;
                
                if (settingDoc.save()){
                    return ReS(res, { data: settingDoc });
                }else {
                    
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

exports.updateGeneralSetting = function (req, res) {
    const payload = req.decoded;
    const postData = req.body;
  
    var result = {};
    if (payload) {
        Setting.findOne({ _id: postData._id }).then(
            generalsetting => {
                if (generalsetting == null || generalsetting=="") {
                    generalsetting = new Setting();
                    generalsetting._id = postData.settingId;
                } 
                
                generalsetting.admin_contact = postData.admin_contact;
                generalsetting.admin_contact = postData.admin_contact;
                generalsetting.support_email1 = postData.support_email1;
                generalsetting.support_email2 = postData.support_email2;
                generalsetting.office_address = postData.office_address;
                generalsetting.office_city = postData.office_city;
                generalsetting.contact1 = postData.contact1;
                generalsetting.contact2 = postData.contact2;
                
                if (generalsetting.save()){
                    return ReS(res, { data: generalsetting });
                }else {
                    
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

exports.getUserCounts = function (req, res) {
    const payload = req.decoded;
    const postData = req.body;
    var result = {};
    if (payload) {
        async.series(
            [
                function (seriesCallback) {
                    User.find({ role_type: 2 }, { password: 0 }).countDocuments().exec((err, userCount) => {
                        if (!err) {
                            seriesCallback(null, userCount);
                        } else {
                            seriesCallback(err);
                        }
                    });
                },
                function (seriesCallback) {
                    User.find({ role_type: 3 }, { password: 0 }).countDocuments().exec((err, userCount) => {
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
                    userCount: seriesData[1],
                    totalUsers: seriesData[0]+seriesData[1]
                };
                return ReS(res, { data: data });
            }
        );


    } else {
        return ReE(res, { msg: "User not found!", errors: err }, 422);
    }
}

exports.getPendingCounts = function (req, res) {
    const payload = req.decoded;
    const postData = req.body;
    var result = {};
    if (payload) {
        async.series(
            [
                function (seriesCallback) {
                    DriverProfile.find({$or:[{ licence_verified: false }, { identity_verified: false }]}).countDocuments().exec((err, userCount) => {
                        if (!err) {
                            seriesCallback(null, userCount);
                        } else {
                            seriesCallback(err);
                        }
                    });
                },
            ],
            function (error, seriesData) {

                if (error) {
                    return ReE(res, { msg: "Something went wrong!", errors: error }, 422);
                }

                var data = {
                    totalPendingUsers: seriesData[0]
                };
                return ReS(res, { data: data });
            }
        );


    } else {
        return ReE(res, { msg: "User not found!", errors: err }, 422);
    }
}
module.exports = exports;