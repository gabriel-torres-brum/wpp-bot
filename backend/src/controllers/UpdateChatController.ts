import { Request, Response } from 'express';
import { UpdateChatService } from '../Services/UpdateChatService';

class UpdateChatController {
	async handle(request: Request, response: Response) {
		const { chatId, cpf, step, telefone, nome } = request.body;

		const updateChatService = new UpdateChatService();

		const chat = await updateChatService.execute({ chatId, cpf, step, telefone, nome });

		return response.json(chat);
	}
}

export { UpdateChatController };
