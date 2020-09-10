module.exports = (sequelize, DataTypes) => {
    var NoticeModel = sequelize.define('Notice', {
        title: DataTypes.STRING, 
        description: DataTypes.STRING,
        push_message: DataTypes.STRING,
    }); 

    NoticeModel.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return NoticeModel;
}