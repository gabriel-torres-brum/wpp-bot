var Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'test', //database
    'root', //username
    '', //password
    {
        host: 'localhost',
        dialect: 'mysql',
    }
);

module.exports = sequelize;