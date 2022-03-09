import { Client } from "@open-wa/wa-automate";

const sendWelcomeMessage = async (msgInfos: any, client: Client) => {
  const message =
    "*Olá,* " +
    msgInfos.nome.split(" ")[0] +
    ".\n" +
    "\nPara consultar as ofertas disponíveis para você, " +
    "responda com seu CPF, sem pontos ou hífens.\n" +
    "\n*Ex.:* _14521125799_";
  return await client.sendText(msgInfos.id, message);
};

export default sendWelcomeMessage;
