var Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "bot_cobranca", //database
  "root", //username
  "!web@2008", //password
  {
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3307,
  }
);

module.exports = sequelize;
