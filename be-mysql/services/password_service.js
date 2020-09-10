const bcrypt = require('bcrypt');
const bcrypt_p = require('bcrypt-promise');
const { to, TE } = require('./util.service');

/* Encrypting The Password Using Bcrypt */

exports.createPassword = async function (password) {
    [err, salt] = await to(bcrypt.genSalt(10));
    if (err) TE(err.message, true);
    [err, hash] = await to(bcrypt.hash(password, salt));
    if (err) TE(err.message, true);
    return hash;
}
exports.comparePassword = async function (user_password,password) {
    
    if(bcrypt.compareSync(password, user_password)) {
         return "Matched"
       } else {
        return "Not Matched"
       }
}
module.exports = exports;