const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var fs = require("fs");
// var path = require('path');
var async = require("async");

const { check,body} = require('express-validator');

const { to, ReS, ReE, ValidationErrors } = require('../services/util.service');
const commonAuthService = require('../services/common.service');

const Coupon = require("../models/Coupon.model");
const User = require("../models/User.model");

exports.addCoupons = function (req, res) {
    const payload = req.decoded;
    const postData = req.body;

    Coupon.findOne({ coupon_token:req.body.couponToken }).then(
        couponDetails => {
            if(couponDetails){
                return ReE(res, { msg: "Coupon already exists ! Try again"});
            }

            else{
            if (postData) {
                Coupon.create({'coupon_token':req.body.couponToken,'coupon_title': req.body.title,'description':req.body.description,'expiry':req.body.expiry_date,'status':'active' })
                return ReE(res, { msg: "data inserted succesfully!"});
                
            } else {
                return ReE(res, { msg: "Unable to process your request!", errors: err }, 422);
            }
        }

    })
}


exports.getCouponList = function (req, res, next) {
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
                    Coupon.find({}).countDocuments().exec((err, userCount) => {
                        if (!err) {
                            seriesCallback(null, userCount);
                        } else {
                            seriesCallback(err);
                        }
                    });
                },
                function (seriesCallback) {
                    Coupon.find({}).skip(offsetRecord).limit(perPage).exec((err, userData) => {
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
* Update Coupon
*/
exports.updateCoupon = function (req, res) {
    const payload = req.decoded;
    const postData = req.body;
    var result = {};

    if (payload) {
        Coupon.findOne({ _id: postData.id }).then(
             couponData => {
                if (couponData == null || couponData=="") {
                    couponData = new couponData();
                    couponData._id = postData._id;
                } 
                
                couponData.coupon_title = postData.title;
                couponData.description = postData.description;
                couponData.expiry = postData.expiry_date;
                couponData.status = postData.status;
                couponData.coupon_token =postData.couponToken;
                
                if (couponData.save()){
                    return ReS(res, { data: couponData });
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

/*
* delete Coupon
*/
exports.deleteCoupon = function (req, res) {
    const payload = req.decoded;
    const postData = req.body;
    var result = {};
    if (payload) {
        Coupon.findOne({ _id: postData.id }).then(
             couponData => {
                
                if (couponData.remove()){
                    return ReS(res, { data: couponData });
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



module.exports = exports;