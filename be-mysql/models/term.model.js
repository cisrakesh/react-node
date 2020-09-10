module.exports = (sequelize, DataTypes) => {
    var TermModel = sequelize.define('Term', {
        title: DataTypes.STRING, 
        type: DataTypes.STRING,
        description: DataTypes.STRING,
    }); 

    TermModel.prototype.toWeb = function (pw) {
        let json = this.toJSON();
        return json;
    };

    return TermModel;
}