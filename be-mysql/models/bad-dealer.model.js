module.exports = (sequelize, DataTypes) => {
    var BadDealerModel = sequelize.define('BadDealer', {
        user_id: DataTypes.INTEGER, 
        dealer_id: DataTypes.INTEGER,
        description: DataTypes.STRING,
        remark: DataTypes.STRING,
    }); 

    BadDealerModel.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return BadDealerModel;
}