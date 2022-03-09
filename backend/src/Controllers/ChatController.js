const controllers = {};

var sequelize = require("../Config/database");
var Chat = require("../Models/Chat");

sequelize.sync();

controllers.create = async (req, res) => {
  const { idchat_cha, nome_cha, tel_cha } = req.body;
  const data = await Chat.findAll({
    where: { idchat_cha: idchat_cha },
  });
  if (!data[0]) {
    await Chat.create({
      idchat_cha: idchat_cha,
      nome_cha: nome_cha,
      tel_cha: tel_cha,
    })
      .then(() => {
        res.status(200).json({
          success: true,
          exists: false,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({
          success: false,
        });
      });
  } else {
    res.status(500).json({
      success: false,
      exists: true,
    });
  }
};

controllers.get = async (req, res) => {
  const { id } = req.params;

  await Chat.findAll({
    where: { idchat_cha: id },
  })
    .then(function (data) {
      res.status(200).json({
        success: true,
        data: data[0],
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: true,
        error: error,
      });
    });
};

controllers.update = async (req, res) => {
  // id da conversa (GET)
  const { id } = req.params;
  // CPF solicitado (POST)
  const { cpf_cha } = req.body;
  // Atualizar campos no BD
  await Chat.update(
    {
      cpf_cha: cpf_cha,
    },
    {
      where: { idchat_cha: id },
    }
  )
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        success: false,
      });
    });
};

controllers.delete = async (req, res) => {
  // id da conversa (POST)
  const { idchat_cha } = req.body;
  // Deleta os dados
  const del = await Chat.destroy({
    where: { idchat_cha: idchat_cha },
  });
  res.json({
    success: true,
    deleted: del,
  });
};

module.exports = controllers;
