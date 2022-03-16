import { Client } from '@open-wa/wa-automate';
import { ChatInfo } from '../main';
import { ManageChat } from '../services/ManageChatService';

async function stepZeroFunction(client: Client, info: ChatInfo) {
	const { chatId, nome, telefone } = info;
	const { createChat, updateChat, findChat } = new ManageChat();

	const step = 1;
	let text: string;

	const chatCreated = await createChat({ chatId, nome, telefone, step });
	if (chatCreated.error) {
		const chatFound = await findChat({ chatId });
		if (!chatFound.error) {
			await updateChat({ chatId, step });
			await client.sendText(chatId, `Olá, ${nome.split(' ')[0]} 🤗`);
			/* Fazer rotina que pesquisa o CPF existente na base de dados */
			text = `Por favor, digite seu CPF se quiser saber se já temos alguma oferta disponível no sistema para você.`;
			await client.sendText(chatId, text);
		} else {
			await client.sendText(chatId, 'Aconteceram alguns problemas técnicos.\nPor favor tente novamente.');
		}
	} else {
		await updateChat({ chatId, step });
		text = `Olá, *${nome.split(' ')[0]}* 🤗\nMeu nome é *Carol*, sou sua atendente virtual.`;
		await client.sendText(chatId, text);
		/* Fazer rotina que pesquisa o CPF existente na base de dados */
		text = `Por favor, digite seu CPF para que eu consulte se temos alguma oferta disponível no sistema para você.`;
		await client.sendText(chatId, text);
	}
}

export default stepZeroFunction;
