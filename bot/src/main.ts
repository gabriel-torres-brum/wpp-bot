import { create, Client, Message, MessageId, ChatId } from '@open-wa/wa-automate';

import { FindChatResponse, ManageChat } from './services/ManageChatService';

import stepZeroFunction from './functions/Step0Function';
import stepOneFunction from './functions/Step1Function';
import stepTwoFunction from './functions/Step2Function';
import stepThreeFunction from './functions/Step3Function';

export type ChatInfo = {
	chatId: ChatId;
	messageId: MessageId;
	content: string;
	nome: string;
	telefone: string;
	chatFound: FindChatResponse;
	type: string;
};

async function start(client: Client) {
	client.onMessage(async (message: Message) => {
		const { findChat, updateChat } = new ManageChat();
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
				await stepZeroFunction(client, info);
				break;
			case 1:
				await stepOneFunction(client, info);
				break;
			case 2:
				await stepTwoFunction(client, info);
				break;
			case 3:
				await stepThreeFunction(client, info);
				break;
			case 4:
				await client.reply(chatId, 'Proxima rotina...', info.messageId);
				break;
		}
	});
}

create({
	sessionId: 'session'
}).then(start);
