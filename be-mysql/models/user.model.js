const jwt           	= require('jsonwebtoken');

const { to, TE, ReS }    = require('../services/util.service');
const bcrypt 			= require('bcrypt');
const bcrypt_p 			= require('bcrypt-promise');
const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    var UserModel = sequelize.define('User', {
        name: DataTypes.STRING,
        password: DataTypes.STRING,
        role_id: DataTypes.INTEGER,
        company_name: DataTypes.STRING,
        company_address: DataTypes.STRING,
        email: {
            type: DataTypes.STRING, 
            allowNull: true, 
            
        },
        dealer_certification_number:DataTypes.STRING,
        status:DataTypes.INTEGER,
        phone_number: {type: DataTypes.STRING, allowNull: true,
            }
    }); 

    UserModel.prototype.comparePassword = async function (pw) {
        let err, pass
        if(!this.password) TE('password not set');

        [err, pass] = await to(bcrypt_p.compare(pw, this.password));
        if(err) TE(err);

        if(!pass) TE('Invalid Password');

        return this;
    }
    UserModel.beforeSave(async (user, options) => {
        let err;
        if (user.changed('password')){
            let salt, hash
            [err, salt] = await to(bcrypt.genSalt(10));
            if(err) TE(err.message, true);

            [err, hash] = await to(bcrypt.hash(user.password, salt));
            if(err) TE(err.message, true);

            user.password = hash;
        }
    });

    
    UserModel.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return UserModel;
}