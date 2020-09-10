module.exports = (sequelize, DataTypes) => {
    var AdvertismentModel = sequelize.define('Advertisment', {
        title: DataTypes.STRING, 
        advertisment_image: DataTypes.STRING,
    }); 

    AdvertismentModel.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return AdvertismentModel;
}