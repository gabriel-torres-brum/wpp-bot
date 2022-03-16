import { Client } from '@open-wa/wa-automate';
import { ChatInfo } from '../main';
import { SearchInstalmentsService } from '../services/api/SearchInstalmentsService';

import { ManageChat } from '../services/ManageChatService';
import stepOneFunction from './Step1Function';

async function stepTwoFunction(client: Client, info: ChatInfo) {
	const { chatId, messageId, content, chatFound, type } = info;
	const { updateChat } = new ManageChat();
	switch (type) {
		case 'buttons_response':
			if (content === chatFound.cpf) return await stepOneFunction(client, info);
			const cpf = chatFound.cpf;
			const offerId = content;
			const { execute } = new SearchInstalmentsService();
			const { instalments, error } = await execute({ cpf, offerId });
			if (instalments) {
				const step = 3;
				await updateChat({ chatId, cpf, step });
				for (const instalment of instalments) {
					const num = instalment.instalment;
					let text =
						`${num != 1 ? `${num}x de ` : ''}` +
						`R$ ${instalment.values[0].total}` +
						`${num == 1 ? ' à vista' : ''}`;
					let button = [ { id: instalment.id, text: text } ];
					await client.sendButtons(chatId, 'oi', button, '');
				}
			} else {
				await client.reply(
					chatId,
					error.Message || 'Ocorreu um erro desconhecido!\nPor favor, tente novamente.',
					messageId
				);
			}
			break;
		default:
			let header = 'Não entendi 😕';
			let text = `Se quiser desfazer o acordo até aqui, consultando novamente as ofertas para o CPF ${chatFound.cpf}`;
			let footer = 'Clique no botão abaixo.';
			let button = [ { id: chatFound.cpf, text: 'Consultar ofertas novamente' } ];
			await client.sendButtons(chatId, text, button, header, footer);
			break;
	}
}

export default stepTwoFunction;
