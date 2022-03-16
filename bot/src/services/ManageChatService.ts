import axios from 'axios';
import 'dotenv/config';
import { env } from 'process';

const baseURL = env.BACKEND_BASE_URL;
const createChatURL = `${baseURL}/chat/create`;
const findChatURL = `${baseURL}/chat/find`;
const updateChatURL = `${baseURL}/chat/update`;

type CreateChat = {
	chatId: string;
	nome: string;
	telefone: string;
	step: number;
};

type FindChat = {
	chatId: string;
};

export type FindChatResponse = {
	id: string;
	chatId: string;
	nome: string;
	telefone: string;
	cpf: string;
	step: number;
	createdAt: string;
	updatedAt: string;
	error?: string;
};

type UpdateChat = {
	chatId: string;
	cpf?: string;
	step?: number;
	telefone?: string;
	nome?: string;
};

class ManageChat {
	async createChat({ chatId, nome, telefone, step }: CreateChat) {
		// Parametros da busca
		const parameters = {
			chatId: chatId,
			nome: nome,
			telefone: telefone,
			step: step
		};
		// Faz a requisição na API
		const response = axios
			.post(createChatURL, parameters)
			.then((res) => {
				// Se receber um código de sucesso
				return res.data;
			})
			.catch((err) => {
				// Se receber um código de erro
				if (err.response) {
					return err.response.data;
				} else if (err.request) {
					return err.request;
				} else {
					return err.message;
				}
			});
		// Retorna a resposta da requisição
		return response;
	}
	async findChat({ chatId }: FindChat): Promise<FindChatResponse> {
		const parameters = {
			chatId: chatId
		};
		// Faz a requisição na API
		const resposta = axios
			.post(findChatURL, parameters)
			.then((res) => {
				// Se receber um código de sucesso
				return res.data;
			})
			.catch((err) => {
				// Se receber um código de erro
				if (err.response) {
					return err.response.data;
				} else if (err.request) {
					return err.request;
				} else {
					return err.message;
				}
			});
		// Retorna a resposta da requisição
		return resposta;
	}
	async updateChat({ chatId, cpf, step, telefone, nome }: UpdateChat) {
		// Parametros da requisição
		const parameters = {
			chatId: chatId,
			cpf: cpf,
			step: step,
			telefone: telefone,
			nome: nome
		};

		// Faz a requisição na API
		const resposta = axios
			.post(updateChatURL, parameters)
			.then((res) => {
				// Se receber um código de sucesso
				return res.data;
			})
			.catch((err) => {
				// Se receber um código de erro
				if (err.response) {
					return err.response.data;
				} else if (err.request) {
					return err.request;
				} else {
					return err.message;
				}
			});
		// Retorna a resposta da requisição
		return resposta;
	}
}
export { ManageChat };
