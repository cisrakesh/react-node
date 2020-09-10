'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize("test_sequlise", 'root','root', {
    host: 'localhost',
    dialect: 'mysql',
    //port: CONFIG.db_port,
    // operatorsAliases: false
});

fs.readdirSync(__dirname)
    .filter((file) => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach((file) => {
        let model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


console.log(db);
db.sequelize = sequelize;
db.Sequelize = Sequelize;


db.sequelize.authenticate().then(() => {
    //console.log('Connected to SQL database:', CONFIG.db_name, ' and port is ', CONFIG.port);
}).catch(err => {
    //console.error('Unable to connect to SQL database:', CONFIG.db_name, err);
});

db.sequelize.sync();//creates table if they do not already exist
    // models.sequelize.sync({ force: true });//deletes all tables then recreates them useful for testing and development purposes


module.exports = db;