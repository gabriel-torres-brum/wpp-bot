const fs = require("fs");
const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const path = require("path");
const os = require("os");
// Path where the session data will be stored
const SESSION_FILE_PATH = path.join(__dirname, "session.json");
// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}
let chromeExecutablePath;
if (os.platform === "win32") {
  chromeExecutablePath =
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
} else if (os.platform === "linux") {
  chromeExecutablePath = "/usr/bin/google-chrome-stable";
}
const client = new Client({
  session: sessionData,
  puppeteer: {
    args: ["--no-sandbox"],
    executablePath: chromeExecutablePath,
  },
});
// Use the saved values
if (!sessionData) {
  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });
}
// Save session values to the file upon successful auth
client.on("authenticated", (session) => {
  sessionData = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    if (err) {
      console.error(err);
    }
  });
});

client.on("ready", () => {
  console.log("Bot rodando!");
});
client.initialize();

module.exports = {
  client,
};
