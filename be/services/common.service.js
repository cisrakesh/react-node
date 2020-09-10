
const { to, TE } = require('../services/util.service');
const emailvalidator = require("email-validator");
const User = require("../models/User.model");
const passwordService = require("./password_service");

const admin = require("firebase-admin");
const serviceAccount = require("../push-notification-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://push-notification-1b878.firebaseio.com/"
});

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

  var createdUser = user;
  if(createdUser){
    admin.auth().createUser({
      email: createdUser.email,
      emailVerified: true,
      phoneNumber: createdUser.mobile_number,
      password: createdUser.password,
      displayName: createdUser.firstname+' '+createdUser.lastname,      
      disabled: false
    })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.    
      console.log("userRecord from firebase", userRecord)  ;
      const doc = {
        firebase_token: userRecord.uid         
      };
      User.update({_id: createdUser.id}, doc, function(err, raw) {  
      });      
    })
    .catch(function(error) {
      //console.log('Error creating new user:', error);
    });
  }
    
  

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