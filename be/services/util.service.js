const { to } = require('await-to-js');
const jwt = require('jsonwebtoken');
const {  validationResult} = require('express-validator');
const pe = require('parse-error');
const fs        = require('fs');
require('dotenv').config();//instatiate environment variables




module.exports.to = async (promise) => {
  let err, res;
  [err, res] = await to(promise);
  if (err) return [pe(err)];

  return [null, res];
};

module.exports.ReE = function (res, err, code) { // Error Web Response
  if (typeof err == 'object' && typeof err.message != 'undefined') {
    err = err.message;
  }
  if (typeof code !== 'undefined') res.statusCode = code;

  return res.json({ success: false, error: err });
};

module.exports.ReS = function (res, data, code) { // Success Web Response
  let send_data = { success: true };

  if (typeof data == 'object') {
    send_data = Object.assign(data, send_data);//merge the objects
  }

  if (typeof code !== 'undefined') res.statusCode = code;
  return res.json(send_data)
};

module.exports.TE = TE = function (err_message, log) { // TE stands for Throw Error
  if (log === true) {
    console.error(err_message);
  }
  throw new Error(err_message);
};

module.exports.ValidationErrors=function(req){
    
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
        // Build your resulting errors however you want! String, object, whatever - it works!
        //console.log(location, msg, param, value, nestedErrors);
        // let err = {}
        // err[param] = msg;
        return msg;
    };
    //console.log(validationResult(req).formatWith(errorFormatter))
    return validationResult(req).formatWith(errorFormatter);
    
};

exports.validateToken= (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    let result;
    if (authorizationHeader) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        const options = {
            expiresIn: process.env.JWT_EXPIRES, issuer: process.env.JWT_ISSUER
        };
        try {
            // verify makes sure that the token hasn't expired and has been issued by us
            result = jwt.verify(token, process.env.JWT_SECRET, options);

            // Let's pass back the decoded token to the request object
            req.decoded = result;
            // We call next to pass execution to the subsequent middleware
            next();
        } catch (err) {
            result = {
                error: `Authentication error. In-valid Token.`,
                status: 401
            };
            
            res.status(401).send(result);
            // Throw an error just in case anything goes wrong with verification
            //throw new Error(err);
        }
    } else {
        result = {
            error: `Authentication error. Token required.`,
            status: 401
        };
        console.log(result);
        res.status(401).send(result);
    }
}

exports.validateAdminToken = (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    let result;
    if (authorizationHeader) {
        const token = req.headers.authorization.split(' ')[1]; // Bearer <token>
        const options = {
            expiresIn: process.env.JWT_EXPIRES, issuer: process.env.JWT_ISSUER
        };
        try {
            // verify makes sure that the token hasn't expired and has been issued by us
            result = jwt.verify(token, process.env.JWT_SECRET, options);
            
            if (result.user_role!=1){
                result = {
                    error: `You are not allowed to visit this page`,
                    status: 302
                };
                res.status(302).send(result);
            }
            // Let's pass back the decoded token to the request object
            req.decoded = result;
            // We call next to pass execution to the subsequent middleware
            next();
        } catch (err) {
            result = {
                error: `Authentication error. In-valid Token.`,
                status: 401
            };
            
            res.status(401).send(result);
            // Throw an error just in case anything goes wrong with verification
            //throw new Error(err);
        }
    } else {
        result = {
            error: `Authentication error. Token required.`,
            status: 401
        };
        console.log(result);
        res.status(401).send(result);
    }
}

module.exports = exports;