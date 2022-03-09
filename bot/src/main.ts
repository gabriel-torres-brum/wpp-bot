import { create, Client } from "@open-wa/wa-automate";
import { ListenButtons } from "./Services/listenButtons";
import { ListenMessages } from "./Services/listenMessages";

function start(client: Client) {
  client.onButton(async (msg) => {
    const listenButtons = new ListenButtons();
    return await listenButtons.execute({client, msg})
  });
  client.onMessage(async (msg) => {
    const listenMessage = new ListenMessages();
    return await listenMessage.execute({client, msg})
  });
}

create({
  sessionId: "session",
  useChrome: true,
  autoRefresh:true,
  cacheEnabled:false,
}).then(start);
