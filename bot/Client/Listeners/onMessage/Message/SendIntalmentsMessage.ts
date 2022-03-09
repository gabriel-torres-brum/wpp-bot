import { Client } from "@open-wa/wa-automate";

const sendInstalmentsMessage = async (infos: any, instalments?: any) => {
  const { chatInfos, client, step, offerId } = infos;
  /* Fazer envio de mensagem com acordos */
  switch (step) {
    case 1:
      const responseInstalments1 = `*${instalments.instalment}x* de *R$ ${instalments.values[0].total}*`;

      let button1 = [{ id: `step2_${instalments.id}_${offerId}`, text: "Selecionar" }];
      await client.sendText(
        chatInfos.id,
        "*Em quantas parcelas deseja pagar ?*"
      );
      await client.sendButtons(
        chatInfos.id,
        responseInstalments1,
        button1,
        ""
      );
      break;
    case 2:
      await client.sendText(
        chatInfos.id,
        "*Escolha um dia de sua preferência para pagamento de cada parcela*"
      );
      for (let i = 0; i < instalments.dueDate.length; i++) {

        let dia = instalments.dueDate[i].split('-')[2];
        let mes = instalments.dueDate[i].split('-')[1];
        let ano = instalments.dueDate[i].split('-')[0];
        let responseInstalments2 = `*Primeira parcela em* ${dia}/${mes}/${ano}`;

        let button2 = [{ id: `step3_${dia}_${instalments.id}_${offerId}`, text: "Selecionar" }];

        await client.sendButtons(
          chatInfos.id,
          responseInstalments2,
          button2,
          "*Dia* " + dia
        );
      }
      break;
    case 3:
      console.log("toaq");
      await client.sendText(
        chatInfos.id,
        "*Próxima rotina...*"
      );
      break;
  }
};

export default sendInstalmentsMessage;
