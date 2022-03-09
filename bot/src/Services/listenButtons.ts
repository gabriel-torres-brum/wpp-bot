import { Client, Message } from "@open-wa/wa-automate";
import { saveCPF, verifyCPFSaved } from "../Controllers/api/chats";
import { searchInstalments } from "../Controllers/api/instalments";
import { searchOffers } from "../Controllers/api/offers";
import sendWelcomeMessage from "../Functions/SendMessage/sendWelcome";
import thenSearchInstalments from "../Functions/thenSearchInstalments";
import thenSearchOffers from "../Functions/thenSearchOffers";

interface IListenButtons {
  client: Client,
  msg: Message
}

class ListenButtons {
  async execute({ client, msg }: IListenButtons) {
    const buttonId = msg.selectedButtonId;
    // Retorna os dados do contato
    const chatInfos = {
      nome: msg.sender.pushname, // Nome
      tel: msg.from.split("@")[0], // Telefone
      id: msg.from, // Chat ID
    };
    const msgTypeFun = {
      "reset": async () => {
        await saveCPF(chatInfos.id);
        return await sendWelcomeMessage(chatInfos, client);
      },
      "cpfOffers": async () => {
        const cpf = parseInt(buttonId.split("cpfOffers_")[1]);
        // Se o usuário quiser fazer a consulta com um cpf que já existe, faz a pesquisa na API de cobrança.
        const searchOffer = await searchOffers(cpf);
        if (searchOffer) {
          await thenSearchOffers(chatInfos, searchOffer, client);
        }
      },
      "step1": async () => {
        const offerId = msg.selectedButtonId.split("_")[1];
        await verifyCPFSaved(chatInfos.id).then(async (resVerifyCPFSaved) => {
          const cpf = resVerifyCPFSaved.data.cpf_cha;
          if (cpf) {
            await searchInstalments(cpf, offerId).then(
              async (resSearchInstalments) => {
                const infos = {
                  chatInfos,
                  resSearchInstalments,
                  client,
                  step: 1,
                  offerId
                }
                await thenSearchInstalments(infos);
              }
            );
          }
        });
      },
      "step2": async () => {
        const idInfo = msg.selectedButtonId.split("_");
        const instalmentId = idInfo[1];
        const offerId = idInfo[2];

        await verifyCPFSaved(chatInfos.id).then(async (resVerifyCPFSaved) => {
          const cpf = resVerifyCPFSaved.data.cpf_cha;
          if (cpf) {
            await searchInstalments(cpf, offerId).then(
              async (resSearchInstalments) => {
                const infos = {
                  chatInfos,
                  resSearchInstalments,
                  client,
                  step: 2,
                  instalmentId,
                  offerId
                }
                await thenSearchInstalments(infos);
              }
            );
          }
        });
      },
      "step3": async () => {
        const idInfo = msg.selectedButtonId.split("_")
        const instalmentDia = idInfo[1];
        const instalmentId = idInfo[2];
        const offerId = idInfo[3];
        await verifyCPFSaved(chatInfos.id).then(async (resVerifyCPFSaved) => {
          const cpf = resVerifyCPFSaved.data.cpf_cha;
          if (cpf) {
            await searchInstalments(cpf, offerId).then(
              async (resSearchInstalments) => {
                const infos = {
                  chatInfos,
                  resSearchInstalments,
                  client,
                  step: 3,
                  instalmentDia,
                  instalmentId,
                  offerId
                }
                await thenSearchInstalments(infos);
              }
            );
          }
        });
      }
    }

    const msgType:any = {
      reset: buttonId.startsWith("reset") ?
      msgTypeFun.reset()
      : null,
      cpfOffers: buttonId.startsWith("cpfOffers") ?
      msgTypeFun.cpfOffers()
      : null,
      step1: buttonId.startsWith("step1") ?
      msgTypeFun.step1()
      : null,
      step2: buttonId.startsWith("step2") ?
      msgTypeFun.step2()
      : null,
      step3: buttonId.startsWith("step3") ?
      msgTypeFun.step3()
      : null
    }
    
    for (const key in msgType) {
      // Executa a função específica
      msgType[key];
    }
    
    
  }
}

export { ListenButtons };
