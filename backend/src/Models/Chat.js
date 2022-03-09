const Sequelize = require("sequelize");
var sequelize = require("../Config/database");

var nametable = "chats";

var Chats = sequelize.define(
  nametable,
  {
    id_cha: {
      type: Sequelize.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    idchat_cha: {
      type: Sequelize.STRING,
      allow_null: false,
      unique: true,
    },
    nome_cha: Sequelize.STRING,
    tel_cha: Sequelize.STRING,
    cpf_cha: Sequelize.BIGINT,
  },
  {
    timestamps: true,
    createdAt: "datacriacao_cha",
    updatedAt: false,
  }
);

module.exports = Chats;
