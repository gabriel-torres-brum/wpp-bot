import { Request, Response } from 'express';
import { CreateChatService } from '../Services/CreateChatService';

class CreateChatController {
	async handle(request: Request, response: Response) {
		const { chatId, nome, telefone, cpf, step } = request.body;

		const createChatService = new CreateChatService();

		const chat = await createChatService.execute({ chatId, nome, telefone, cpf, step });

		return response.json(chat);
	}
}

export { CreateChatController };
