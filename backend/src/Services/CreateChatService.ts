import { getCustomRepository } from 'typeorm';
import { ChatsRepositories } from '../repositories/ChatsRepository';

interface ICreateChat {
	chatId: string;
	nome: string;
	telefone: string;
	cpf?: string;
	step?: number;
}

class CreateChatService {
	async execute({ chatId, nome, telefone, cpf = null, step = null }: ICreateChat) {
		const chatsRepository = getCustomRepository(ChatsRepositories);

		const chatAlreadyCreated = await chatsRepository.findOne({
			chatId
		});

		if (chatAlreadyCreated) {
			throw new Error('Chat já existe!');
		}

		const chat = chatsRepository.create({
			chatId,
			nome,
			telefone,
			cpf,
			step
		});

		await chatsRepository.save(chat);

		return chat;
	}
}

export { CreateChatService };
