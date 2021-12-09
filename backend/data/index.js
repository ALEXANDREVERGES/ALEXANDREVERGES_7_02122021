'use strict';
const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize(
        'groupomania',
        'root',
        '159Counterstrike13004',
    {
        host: 'localhost',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        port: 3306,
        logging: false
    }
);

sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch((err) => {
            console.log('Unable to connect to the database:', err);
        });


db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.js")(sequelize, Sequelize);

module.exports = db;