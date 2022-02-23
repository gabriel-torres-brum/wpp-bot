const fs = require("fs");
const mime = require("mime-types");
const { MessageMedia, Util } = require("whatsapp-web.js");

const filename = new Date().getTime();
let mediaPath = "./arquivos/";
if (!fs.existsSync(mediaPath)) {
  fs.mkdirSync(mediaPath);
  mediaPath = mediaPath + "fileToSticker/";
  fs.mkdirSync(mediaPath);
}
const imageSentToSticker = (media) => {
  if (media.mimetype && media.data) {
    const extension = mime.extension(media.mimetype);
    const fullFilename = mediaPath + filename + "." + extension;

    try {
      fs.writeFileSync(fullFilename, media.data, { encoding: "base64" });
      MessageMedia.fromFilePath((filePath = fullFilename));
      const retorno = new MessageMedia(media.mimetype, media.data, filename);
      return retorno;
    } catch (err) {
      console.log(err);
    }
  }
};
const fileUrlToSticker = async (media) => {
  const file = await MessageMedia.fromUrl(media.url);
  const fullFileName = mediaPath + filename;
  try {
    fs.writeFileSync(`${fullFileName}.webp`, file.data, { encoding: "base64" });
    console.log(file.mimetype);
    const retorno = new MessageMedia(
      file.mimetype,
      `${fullFileName}.webp`,
      filename
    );
    return retorno;
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  imageSentToSticker,
  fileUrlToSticker,
};
