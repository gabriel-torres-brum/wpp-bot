import { Client } from '@open-wa/wa-automate';
import { ChatInfo } from '../main';
import { SearchInstalmentsService } from '../services/api/SearchInstalmentsService';

import moment from 'moment';
import 'moment/locale/pt-br';

import { ManageChat } from '../services/ManageChatService';
import resetStepFunction from './ResetStepFunction';
import stepZeroFunction from './Step0Function';

async function stepThreeFunction(client: Client, info: ChatInfo) {
	const { chatId, messageId, content, chatFound, type } = info;
	const { updateChat } = new ManageChat();
	switch (type) {
		case 'buttons_response':
			if (content === 'reset') return await stepZeroFunction(client, info);

			const cpf = chatFound.cpf;
			const instalmentId = content.split('_')[0];
			const offerId = content.split('_')[1];

			const { execute } = new SearchInstalmentsService();
			const { instalments, error } = await execute({ cpf, offerId });
			console.log(instalments);
			if (instalments) {
				const step = 4;
				await updateChat({ chatId, cpf, step });
				await client.sendText(chatId, 'Qual a melhor data de vencimento do seu boleto?');
				const dueDates = instalments[instalmentId].dueDate;
				for (const dueDate of dueDates) {
					const day = dueDate.split('-')[2];
					const monthNumber = parseInt(dueDate.split('-')[1]) - 1;
					const month = moment().month(monthNumber).format('MMMM');

					const button = [ { id: 'reset', text: `${day} de ${month}` } ];
					await client.sendButtons(chatId, '⠀ㅤ', button, '');
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
			await resetStepFunction(client, info);
			break;
	}
}

export default stepThreeFunction;
