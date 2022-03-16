import { getCustomRepository } from 'typeorm';
import { ChatsRepositories } from '../repositories/ChatsRepository';

interface IFindChat {
	chatId: string;
}

class FindChatService {
	async execute({ chatId }: IFindChat) {
		const chatsRepository = getCustomRepository(ChatsRepositories);

		const chat = await chatsRepository.findOne({ chatId });

		if (chat) {
			return chat;
		}

		throw new Error('Chat não encontrado!');
	}
}

export { FindChatService };
