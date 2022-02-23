const { client } = require("./configs/botConfig.js");
const { pesquisaPorNome } = require("./includes/SearchByName.js");
const {
  imageSentToSticker,
  fileUrlToSticker,
} = require("./includes/fileToSticker.js");
const axios = require("axios").default;
client.on("message", async (message) => {
  const messageBody = message.body.toLowerCase();
  const temMidia = message.hasMedia;

  switch (temMidia) {
    case true:
      if (messageBody === "figurinha" || !messageBody) {
        message.downloadMedia().then((media) => {
          const retorno = imageSentToSticker(media);
          client.sendMessage(message.from, retorno, {
            sendMediaAsSticker: true,
            stickerAuthor: "Criada pelo Bot do Biel",
            stickerName: "Figulinha",
          });
        });
      }
      break;
    case false:
      if (messageBody.startsWith("nome:")) {
        pesquisaPorNome(message);
        return;
      } else if (messageBody.startsWith("comandos")) {
        message.reply(
          "😄 *BOT DO BIEL* 😄" +
            "\n\n- *P/ te mandar figurinhas de gatos:*" +
            "\n*Envie:* _gatos_ *ou* _gatos_ _-f_" +
            "\n- *P/ converter imagem em figurinha:*" +
            "\n-> _Envie uma imagem_ (Só isso! KKK)" +
            "\n- *P/ eu te contar uma piada (Em inglês pq n achei API em português 😒):*" +
            "\n*Envie:* _piada_"
        );
        return;
      } else if (messageBody === "piada") {
        axios.get("https://v2.jokeapi.dev/joke/Any?lang=en").then((res) => {
          if (res.data) {
            if (res.data.type === "single") {
              message.reply(`${res.data.joke}`);
            } else {
              message.reply(`*${res.data.setup}*\n- ${res.data.delivery}`);
            }
          }
        });
        return;
      } else if (messageBody.startsWith("gatos")) {
        const metodo = messageBody.slice(5);
        console.log(metodo);
        let tipo = "png,jpg";
        switch (metodo) {
          case "-fgif":
          case " -fgif":
          case "-f gif":
          case " -f gif":
            tipo = "gif";
            break;
          default:
            break;
        }
        const options = {
          method: "GET",
          url: "https://api.thecatapi.com/v1/images/search",
          params: {
            limit: 1,
            size: "full",
            mime_types: tipo,
          },
          headers: {
            "x-api-key": "91a94129-9bb5-4076-ab5b-9172ce4d1700",
          },
        };
        axios.request(options).then(async (res) => {
          const media = {
            url: res.data[0].url,
          };
          const retorno = await fileUrlToSticker(media);
          client.sendMessage(message.from, retorno, {
            sendMediaAsSticker: true,
            stickerAuthor: "Criada pelo Bot do Biel",
            stickerName: "Figulinha",
          });
        });
        return;
      } else if (messageBody === "Gado") {
        message.reply("qq tem o wesley ?");
        return;
      } else {
        message.reply(
          "*Tendi foi nada!* 😒\n*Manda* _comandos_ *que te mostro os comandos* 🙄"
        );
      }
      break;
    default:
      break;
  }
});
