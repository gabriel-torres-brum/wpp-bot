import { Client, Message } from "@open-wa/wa-automate";
import {
  createChatSession,
  saveCPF,
  verifyCPFSaved,
} from "../Controllers/api/chats";
import { searchOffers } from "../Controllers/api/offers";
import sendWelcomeMessage from "../Functions/SendMessage/sendWelcome";
import thenSearchOffers from "../Functions/thenSearchOffers";

interface IListenMessages {
  client: Client,
  msg: Message
}

class ListenMessages {
  async execute({ client, msg }: IListenMessages) {
    if (!msg.selectedButtonId) {
      // Retorna os dados do contato
      const chatInfo = {
        nome: msg.sender.pushname, // Nome
        tel: msg.from.split("@")[0], // Telefone
        id: msg.from,
        msgId: msg.id,
      };
      // Função para salvar os dados da conversa no BD
      // Salva o ID da conversa, o nome do usuário e o telefone dele.
      const chatSession = await createChatSession(chatInfo.id, chatInfo.nome, chatInfo.tel);

      // Se for uma nova conversa, retorna a mensagem de boas-vindas.
      if (chatSession.success) return await sendWelcomeMessage(chatInfo, client);
      // Se for uma conversa salva, continua com a lógica.
      if (chatSession.exists) {
        const CPFIsSaved = await verifyCPFSaved(chatInfo.id);
        if (CPFIsSaved.data.cpf_cha) {
          const cpf = CPFIsSaved.data.cpf_cha;
          let buttons = [
            {
              id: `cpfOffers_${cpf}`,
              text: "Sim",
            },
            {
              id: "reset",
              text: "Não",
            },
          ];
          return await client.sendButtons(
            chatInfo.id,
            `Deseja pesquisar as ofertas do cpf nº *${cpf}* novamente ?`,
            buttons,
            `${chatInfo.nome.split(" ")[0]},`
          );
        }
        else {
          const cpf = msg.body;
          const cpfIsValid = cpf.search(/\D/g);
          // Verifica se a resposta do usuário é um CPF
          switch (true) {
            case cpfIsValid == -1 && cpf.length == 11:
              // Salva o CPF enviado no banco de dados
              await saveCPF(chatInfo.id, parseInt(cpf));
              // Se for um CPF, faz a pesquisa na API de cobrança
              const searchOffer = await searchOffers(parseInt(cpf));
              if (searchOffer) await thenSearchOffers(chatInfo, searchOffer, client);
              break;

            default:
              // Se a resposta do usuário não for um cpf
              // Responde que o CPF é inválido.
              await client.reply(
                chatInfo.id,
                "CPF inválido!\nPor favor, verifique e tente novamente.",
                chatInfo.msgId
              );
              break;
          }
        }
      }
    }
  }
}

export { ListenMessages };
