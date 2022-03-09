import { Client, Message } from "@open-wa/wa-automate";
import { saveCPF, verifyCPFSaved } from "../../Controller/Chats";
import { searchInstalments } from "../../Controller/Instalments";
import { searchOffers } from "../../Controller/Offers";
import sendWelcomeMessage from "../onMessage/Message/SendWelcomeMessage";
import thenSearchInstalments from "../onMessage/thenActions/thenSearchInstalments";
import thenSearchOffers from "../onMessage/thenActions/thenSearchOffers";

const listenButtons = async (client: Client, buttonsMsg: Message) => {
  const buttonId = buttonsMsg.selectedButtonId;
  // Retorna os dados do contato
  const chatInfos = {
    nome: buttonsMsg.sender.pushname, // Nome
    tel: buttonsMsg.from.split("@")[0], // Telefone
    id: buttonsMsg.from, // Chat ID
  };
  if (buttonId == "reset") {
    await saveCPF(chatInfos.id);
    await sendWelcomeMessage(chatInfos, client);
    return;
  }
  if (buttonId.startsWith("searchCPFOffers_")) {
    const cpf_cha = parseInt(buttonId.split("searchCPFOffers_")[1]);
    // Se o usuário quiser fazer a consulta com um cpf que já existe, faz a pesquisa na API de cobrança.
    await searchOffers(cpf_cha).then(async (retornoSearchOffers: any) => {
      await thenSearchOffers(chatInfos, retornoSearchOffers, client);
    });
    return;
  }
  if (buttonId.startsWith("step1")) {
    const offerId = buttonsMsg.selectedButtonId.split("_")[1];
    await verifyCPFSaved(chatInfos.id).then(async (resVerifyCPFSaved) => {
      const cpf = resVerifyCPFSaved.data.cpf_cha;
      if (cpf) {
        await searchInstalments(cpf, offerId).then(
          (resSearchInstalments) => {
            const infos = {
              chatInfos,
              resSearchInstalments,
              client,
              step: 1,
              offerId
            }
            thenSearchInstalments(infos);
          }
        );
      }
    });
  }
  if (buttonId.startsWith("step2")) {
    const idInfo = buttonsMsg.selectedButtonId.split("_");
    const instalmentId = idInfo[1];
    const offerId = idInfo[2];

    await verifyCPFSaved(chatInfos.id).then(async (resVerifyCPFSaved) => {
      const cpf = resVerifyCPFSaved.data.cpf_cha;
      if (cpf) {
        await searchInstalments(cpf, offerId).then(
          (resSearchInstalments) => {
            const infos = {
              chatInfos,
              resSearchInstalments,
              client,
              step: 2,
              instalmentId,
              offerId
            }
            thenSearchInstalments(infos);
          }
        );
      }
    });

  }
  if (buttonId.startsWith("step3")) {
    const idInfo = buttonsMsg.selectedButtonId.split("_")
    const instalmentDia = idInfo[1];
    const instalmentId = idInfo[2];
    const offerId = idInfo[3];
    await verifyCPFSaved(chatInfos.id).then(async (resVerifyCPFSaved) => {
      const cpf = resVerifyCPFSaved.data.cpf_cha;
      if (cpf) {
        await searchInstalments(cpf, offerId).then(
          (resSearchInstalments) => {
            const infos = {
              chatInfos,
              resSearchInstalments,
              client,
              step: 3,
              instalmentDia,
              instalmentId,
              offerId
            }
            thenSearchInstalments(infos);
          }
        );
      }
    });
  }
};

export { listenButtons };
