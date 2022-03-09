import { Client } from "@open-wa/wa-automate";

const sendOffersMessage = async (
  msgInfos: any,
  offer: any,
  iterator: number,
  client: Client
) => {
  /* Fazer um looping do array "offer.debts" */
  let debts = offer.debts[0];
  const responseOffers =
    "*Empresa:* " +
    `${debts.company.businessName}\n` +
    "*Contrato:* " +
    `${debts.contractNumber}\n` +
    "*Descrição:* " +
    `${debts.typeDescription}\n` +
    "*Valor atualizado:* " +
    `R$ ${offer.debtCurrentValues}\n` +
    "*Valor a vista:* " +
    `R$ ${offer.atSight} (economize ${offer.discountPercentage}%)\n` +
    `*Ou em até* ${offer.maxInstalments} *parcelas de* R$ ${offer.maxInstalmentValue}`;
  let button = [{ id: `step1_${offer.id}`, text: "Selecionar" }];
  await client.sendText(
    msgInfos.id,
    `${
      msgInfos.nome.split(" ")[0]
    }, *Segue as ofertas disponíveis para este CPF:*`
  );
  return await client.sendButtons(
    msgInfos.id,
    responseOffers,
    button,
    ""
  );
};

export default sendOffersMessage;
