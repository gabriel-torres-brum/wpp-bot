import { Client } from '@open-wa/wa-automate';
import { ChatInfo } from '../main';

async function resetStepFunction(client: Client, info: ChatInfo) {
	const { chatId, messageId } = info;
	await client.reply(chatId, '*Não entendi* 😕', messageId);
	let text = `Se quiser recomeçar a negociação, clique no botão abaixo:`;
	let button = [ { id: 'reset', text: `Recomeçar` } ];
	return await client.sendButtons(chatId, text, button, '');
}

export default resetStepFunction;
