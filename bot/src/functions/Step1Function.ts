import { validateBr } from 'js-brasil';

import { Client } from '@open-wa/wa-automate';
import { ChatInfo } from '../main';

import { ManageChat } from '../services/ManageChatService';
import { SearchOffersService } from '../services/api/SearchOffersService';

async function stepOneFunction(client: Client, info: ChatInfo) {
	const { chatId, messageId, content, nome } = info;
	const { updateChat } = new ManageChat();

	let cpfValid = validateBr.cpf(content);
	switch (cpfValid) {
		case true:
			const cpf = content.replace(/\D/g, '');
			const { execute } = new SearchOffersService();
			const { offers, error } = await execute({ cpf });
			if (offers) {
				/* Fazer um looping do array "offer.debts" */
				const step = 2;
				await updateChat({ chatId, cpf, step });
				await client.sendText(chatId, `${nome.split(' ')[0]}, estas são as ofertas que temos para você:`);
				for (const offer of offers) {
					let debts = offer.debts[0];
					const text =
						'*Empresa:* ' +
						`${debts.company.businessName}\n` +
						'*Contrato:* ' +
						`${debts.contractNumber}\n` +
						'*Descrição:* ' +
						`${debts.typeDescription}\n` +
						'*Valor atualizado:* ' +
						`R$ ${offer.debtCurrentValues}\n` +
						'*Valor a vista:* ' +
						`R$ ${offer.atSight} (economize ${offer.discountPercentage}%)\n` +
						`*Ou em até* ${offer.maxInstalments} *parcelas de* R$ ${offer.maxInstalmentValue}`;
					let button = [ { id: offer.id, text: 'Ver oferta' } ];
					await client.sendButtons(chatId, text, button, '');
				}
			} else {
				const step = 0;
				await updateChat({ chatId, cpf, step });
				const text = `${error.Message
					? 'Não achei nenhuma oferta disponível para este CPF.'
					: 'Não consegui realizar a consulta. 😓\nTente novamente mais tarde.'} 😢`;
				await client.sendText(chatId, text);
			}
			break;

		default:
			await client.reply(chatId, `*Este não é um CPF válido!*\nPor favor, tente novamente.`, messageId);
			break;
	}
}

export default stepOneFunction;
