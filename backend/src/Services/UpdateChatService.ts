import { getCustomRepository } from 'typeorm';
import { ChatsRepositories } from '../repositories/ChatsRepository';

interface IUpdateChat {
	chatId: string;
	cpf?: string;
	step?: number;
	telefone: string;
	nome: string;
}

class UpdateChatService {
	async execute({ chatId, cpf, step, telefone, nome }: IUpdateChat) {
		const chatsRepository = getCustomRepository(ChatsRepositories);

		const chat = await chatsRepository.findOne({ chatId });

		if (cpf) chat.cpf = cpf;
		if (step !== undefined) chat.step = step;
		if (telefone) chat.telefone = telefone;
		if (nome) chat.nome = nome;

		await chatsRepository.save(chat);

		return chat;
	}
}

export { UpdateChatService };
