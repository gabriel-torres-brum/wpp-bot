import { create, Client } from "@open-wa/wa-automate";
import { listenButtons } from "./Client/Listeners/onButton/listenButtons";
import { listenMessages } from "./Client/Listeners/onMessage/listenMessages";

function start(client: Client) {
  client.onMessage(async (msg) => {
    return await listenMessages(client, msg);
  });
  client.onButton(async (buttonMsg) => {
    return await listenButtons(client, buttonMsg);
  });
}

create({
  sessionId: "session",
}).then(start);
