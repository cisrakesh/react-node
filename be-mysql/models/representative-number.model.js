module.exports = (sequelize, DataTypes) => {
    var RepresentativeNumberModel = sequelize.define('RepresentativeNumber', {
        representative_number: DataTypes.STRING, 
    }); 

    RepresentativeNumberModel.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return RepresentativeNumberModel;
}