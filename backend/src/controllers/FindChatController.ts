import { Request, Response } from 'express';
import { FindChatService } from '../Services/FindChatService';

class FindChatController {
	async handle(request: Request, response: Response) {
		const { chatId } = request.body;

		const findChatService = new FindChatService();

		const chat = await findChatService.execute({ chatId });

		return response.json(chat);
	}
}

export { FindChatController };
