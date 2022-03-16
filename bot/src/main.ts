import { create, Client, Message, MessageId, ChatId } from '@open-wa/wa-automate';

import { FindChatResponse, ManageChat } from './services/ManageChatService';
import stepOneFunction from './functions/Step1Function';
import stepTwoFunction from './functions/Step2Function';
import stepZeroFunction from './functions/Step0Function';

export type ChatInfo = {
	chatId: ChatId;
	messageId: MessageId;
	content: string;
	nome: string;
	telefone: string;
	chatFound: FindChatResponse;
	type: string;
};

function start(client: Client) {
	client.onMessage(async (message: Message) => {
		const { findChat } = new ManageChat();
		const chatId = message.chatId;
		const chatFound = await findChat({ chatId });

		const info: ChatInfo = {
			chatId: chatId,
			messageId: message.id,
			content: message.selectedButtonId || message.content,
			nome: message.sender.pushname,
			telefone: message.sender.id.split('@')[0],
			chatFound: chatFound,
			type: message.type
		};

		switch (chatFound.step) {
			case undefined:
			case 0:
				stepZeroFunction(client, info);
				break;
			case 1:
				stepOneFunction(client, info);
				break;
			case 2:
				stepTwoFunction(client, info);
				break;
		}
	});
}

create({
	sessionId: 'session'
}).then(start);
