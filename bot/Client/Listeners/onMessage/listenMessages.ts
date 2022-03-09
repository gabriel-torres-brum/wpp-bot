import { Client, Message } from "@open-wa/wa-automate";
import {
  createChatSession,
  saveCPF,
  verifyCPFSaved,
} from "../../Controller/Chats";
import { searchOffers } from "../../Controller/Offers";
import sendWelcomeMessage from "./Message/SendWelcomeMessage";
import thenSearchOffers from "./thenActions/thenSearchOffers";

const listenMessages = async (client: Client, msg: Message) => {
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
    await createChatSession(chatInfo.id, chatInfo.nome, chatInfo.tel).then(
      async (dados: { success: boolean; exists: boolean }) => {
        // Se for uma nova conversa, retorna a mensagem de boas-vindas.
        if (dados.success) await sendWelcomeMessage(chatInfo, client);
        if (dados.exists) {
          await verifyCPFSaved(chatInfo.id).then(async (resVerifyCPFSaved) => {
            const cpfSaved = resVerifyCPFSaved.data.cpf_cha;
            if (cpfSaved) {
              let buttons = [
                {
                  id: `searchCPFOffers_${cpfSaved}`,
                  text: "Sim",
                },
                {
                  id: "reset",
                  text: "Não",
                },
              ];
              return await client.sendButtons(
                chatInfo.id,
                `Deseja pesquisar as ofertas do cpf nº *${cpfSaved}* novamente ?`,
                buttons,
                `${chatInfo.nome.split(" ")[0]},`
              );
            }
            // Guarda a resposta do usuário
            const cpf = parseInt(msg.body);
            // Verifica se a resposta do usuário é um CPF
            // Tamanho == 11 e se pode ser transformado em inteiro
            if (msg.body.length === 11 && cpf) {
              // Salva o CPF enviado no banco de dados
              await saveCPF(chatInfo.id, cpf);
              // Se for um CPF, faz a pesquisa na API de cobrança
              await searchOffers(cpf).then(async (resSearchOffers: any) => {
                await thenSearchOffers(chatInfo, resSearchOffers, client);
              });
            } else {
              // Se a resposta do usuário não for um cpf
              // Responde que o CPF é inválido.
              await client.reply(
                chatInfo.id,
                "CPF inválido!\nPor favor, verifique e tente novamente.",
                chatInfo.msgId
              );
            }
          });
        }
      }
    );
  }
};

export { listenMessages };
