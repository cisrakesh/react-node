
const { to, TE } = require('../services/util.service');
const emailvalidator = require("email-validator");
const User = require("../models/User.model");
const passwordService = require("./password_service");


/*
* Service Function To Create a User
*/
exports.signup = async function (userInfo) {
  /*Setting The Default Value */

  userInfo.email_activate = 0;
  userInfo.mobile_number_activate = 0;
  userInfo.account_activate = "pending";

  /*
  * Validation For Create A User Begins
  */

  if (userInfo.firstname == '') {
    TE('Please Enter First Name to register');
  }
  if (userInfo.lastname == '') {
    TE('Please Enter Last Name to register');
  }
  if (userInfo.password == '') {
    TE('Please Enter Password to register');
  }
  if (userInfo.mobile_number.length < 10) {
    TE('Please Enter Nine Digit Mobile Number to register');
  }
//   if (userInfo.email != '' && emailvalidator.validate(userInfo.email) == false) {
//     TE('Please Enter  Valid Email to register');
//   }

  [err, user] = await to(User.find({ mobile_number: userInfo.mobile_number }));

  if (user.length > 0) TE("User Already Exist");

  /*Encrypting The Password*/
  [err, pass] = await to(passwordService.createPassword(userInfo.password));
  userInfo.password = pass;

  /*Creating The User*/
  [err, user] = await to(User.create(userInfo));
  if (err) TE(err.message, true);
  return user;
}
/*
* Service Function To Login
*/
exports.login = async function (userInfo) {
  /*
  * Validation For Login Begins
  */
  //userInfo.mobile_number.toString()
  if (userInfo.mobile_number.length < 10) {
    TE('Please Enter Nine Digit Mobile Number to register');
  }
  if (userInfo.password == '') {
    TE('Please Enter Password to register');
  }
  /*
  * Checking Mobile Number Exist Or Not
  */
  [err, user] = await to(User.find({ mobile_number: userInfo.mobile_number }));
  if (user.length <= 0) TE("Mobile Number is Not Registered");
  /*
  * Checking Account is Activate or Not
  */
  if (user[0].account_activate == "active") {
    /*
    * Matching The Password
    */
    [err, pass] = await to(passwordService.comparePassword(user[0].password, userInfo.password));
    if (pass == "Not Matched") {
      TE('Please Check The Password');
    }
  } else {
    TE('Your Account is not Activated');
  }
  return user;
}
module.exports = exports;