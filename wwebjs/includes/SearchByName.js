const db = require("../helpers/mysql.js");
const pesquisaPorNome = async (message) => {
  const nome = message.body.slice(6);
  const respostaNome = await db.lerNome(nome);
  if (respostaNome !== false) {
    if (respostaNome.roleId === 1) {
      cargo = "Meu criador";
    }
    if (respostaNome.roleId === 2) {
      cargo = "Amiguinho do meu criador";
    }
    if (respostaNome.roleId === 3) {
      cargo = "Outra pessoa ai";
    }
    return message.reply(
      "*ID:* " +
        JSON.stringify(respostaNome.id) +
        "\n*E-mail:* " +
        JSON.stringify(respostaNome.email).replace(/"/g, "") +
        "\n*Endereço:* " +
        JSON.stringify(respostaNome.address).replace(/"/g, "") +
        "\n*Telefone:* " +
        JSON.stringify(respostaNome.phone) +
        "\n*Cargo:* " +
        cargo
    );
  } else if (respostaNome === false) {
    return message.reply("Não achei nada sobre esse nome aq não u.u");
  }
};
module.exports = {
  pesquisaPorNome,
};
