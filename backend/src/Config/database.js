var Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "bot_cobranca", //database
  "root", //username
  "root#mysql@2022", //password
  {
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = sequelize;
