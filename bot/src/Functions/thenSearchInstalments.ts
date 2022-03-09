import sendInstalmentsMessage from "./SendMessage/sendInstalments";

const thenSearchInstalments = async (infos: any) => {
  const { chatInfos, resSearchInstalments, client, step } = infos;
  const errorSearchInstalments =
    resSearchInstalments.Message || resSearchInstalments === 400;

  switch (step) {
    case 1:
      if (errorSearchInstalments) {
        await client.reply(
          chatInfos.id,
          "*Não há acordos disponíveis para a oferta selecionada.*",
          chatInfos.msgId
        );
      } else {
        // Se for sucesso, mostra os tipos de parcelamento disponíveis para a oferta.
        const instalments = resSearchInstalments.instalments;
        await client.sendText(
          chatInfos.id,
          "*Em quantas parcelas deseja pagar esse acordo ?*"
        );
        for (let i = 0; i < instalments.length; i++) {
          await sendInstalmentsMessage(infos, instalments[i]);
        }
      }
      break;
    case 2:
      if (errorSearchInstalments) {
        await client.reply(
          chatInfos.id,
          "*Ocorreu um erro desconhecido, tente novamente mais tarde.*",
          chatInfos.msgId
        );
      } else {
        // Se for sucesso, mostra 
        await client.sendText(
          chatInfos.id,
          "Qual a melhor data de vencimento do seu boleto?"
        );
        const instalments = resSearchInstalments.instalments;
        await sendInstalmentsMessage(infos, instalments[infos.instalmentId]);
      }
      break;
    case 3:
      if (errorSearchInstalments) {
        await client.reply(
          chatInfos.id,
          "*Ocorreu um erro desconhecido, tente novamente mais tarde.*",
          chatInfos.msgId
        );
      } else {
        // Se for sucesso, mostra 
        await sendInstalmentsMessage(infos);
      }
      break;
  }
};
export default thenSearchInstalments;
