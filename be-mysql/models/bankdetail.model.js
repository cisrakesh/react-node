module.exports = (sequelize, DataTypes) => {
    var NoticeModel = sequelize.define('BankDetail', {
        user_id: DataTypes.STRING, 
        bank_account_number: DataTypes.STRING,
    }); 

    NoticeModel.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return NoticeModel;
}