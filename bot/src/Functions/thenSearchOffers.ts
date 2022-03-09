import { Client } from "@open-wa/wa-automate";
import sendOffersMessage from "./SendMessage/sendOffers";

const thenSearchOffers = async (
  msgInfos: any,
  retornoSearchOffers: any,
  client: Client
) => {
  const errorSearchOffers =
    retornoSearchOffers.Message || retornoSearchOffers === 400;

  if (errorSearchOffers) {
    /* Fazer aqui busca por acordos no CPF */
    await client.reply(
      msgInfos.id,
      "*Não há ofertas disponíveis para este CPF*",
      msgInfos.msgId
    );
  } else {
    // Se for sucesso, mostra as ofertas disponíveis para o CPF
    /* Fazer resposta */
    const offers = retornoSearchOffers.offers;
    for (let i = 0; i < offers.length; i++) {
      await sendOffersMessage(msgInfos, offers[i], i, client);
    }
  }
};
export default thenSearchOffers;
