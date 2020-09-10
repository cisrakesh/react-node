const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var fs = require("fs");
// var path = require('path');
var async = require("async");

const { User } = require("../models");

const { ReE,ReS } = require('../services/util.service');
/*
* Controller Function To Add User
*/
exports.getUser = function (req, res) {
    let err, user;
    const reqBody = req.params;
    User.findOne({ where: { id: reqBody.userId } }).then(user => {
        if (user !== null) {
            return ReS(res, { user: user });
        }
        return ReE(res, { message: err.message }, 422);
    });
}
/*
* Controller Function To Login
*/
exports.insertUser = function (req, res) {
    //let err, userdata;
    var userdata=new User();
    const reqBody = req.params;
    console.log(reqBody)
    userdata.name = reqBody.firstname;
    User.create(userdata).then(user => {
        if (user !== null) {
            return ReS(res, { user: user });
        }
        return ReE(res, { message: err.message }, 422);
    });
    
    
    
}





module.exports = exports;