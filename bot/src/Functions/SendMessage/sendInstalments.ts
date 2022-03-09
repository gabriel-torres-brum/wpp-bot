import { Client } from "@open-wa/wa-automate";

const sendInstalmentsMessage = async (infos: any, instalments?: any) => {
  const { chatInfos, client, step, offerId }: { chatInfos: any, client: Client, step: number, offerId: string } = infos;
  /* Fazer envio de mensagem com acordos */
  switch (step) {
    case 1:
      const parcela = instalments.instalment;
      const pluralParcela = parcela == 1 ? "parcela" : "parcelas";
      const responseInstalments1 = `${parcela} ${pluralParcela} de *R$ ${instalments.values[0].total}*`;
      let button1 = [{ id: `step2_${instalments.id}_${offerId}`, text: `${parcela}x` }];
      await client.sendButtons(
        chatInfos.id,
        responseInstalments1,
        button1,
        ""
      );
      break;
    case 2:
      if (instalments.dueDate) {
        for (let i = 0; i < instalments.dueDate.length; i++) {

          let dia = instalments.dueDate[i].split('-')[2];
          let mes = instalments.dueDate[i].split('-')[1];
          // let ano = instalments.dueDate[i].split('-')[0];
          switch (mes) {
            case "01":
              mes = "Janeiro";
              break;
            case "02":
              mes = "Fevereiro";
              break;
            case "03":
              mes = "Março";
              break;
            case "04":
              mes = "Abril";
              break;
            case "05":
              mes = "Maio";
              break;
            case "06":
              mes = "Junho";
              break;
            case "07":
              mes = "Julho";
              break;
            case "08":
              mes = "Agosto";
              break;
            case "09":
              mes = "Setembro";
              break;
            case "10":
              mes = "Outubro";
              break;
            case "11":
              mes = "Novembro";
              break;
            case "12":
              mes = "Dezembro";
              break;
          }
          let responseInstalments2 = `${dia} de ${mes}`;

          let button2 = [{ id: `step3_${dia}_${instalments.id}_${offerId}`, text: `Dia ${dia}` }];

          await client.sendButtons(
            chatInfos.id,
            responseInstalments2,
            button2,
            ""
          );
        }
      } else {
        await client.reply(
          chatInfos.id,
          "Ocorreu um erro desconhecido ao buscar as ofertas, tente novamente.",
          chatInfos.msgId
        );
      }
      break;
    case 3:
      await client.sendText(
        chatInfos.id,
        "*Próxima rotina...*"
      );
      break;
  }
};

export default sendInstalmentsMessage;
