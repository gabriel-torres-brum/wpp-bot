import axios from 'axios';
import 'dotenv/config';
import { env } from 'process';
// Bearer token de autorização (API de cobrança)
const authToken = env.API_AUTH_TOKEN;
// BaseURL (API de cobrança)
const baseURL = env.OFFERS_BASE_URL;

const messagePattern = 'Ocorreu um erro desconhecido, tente novamente mais tarde.';

interface ISearchOffers {
	cpf: string;
}

class SearchOffersService {
	async execute({ cpf }: ISearchOffers) {
		// Monta a url final para requisição
		const url = `${baseURL}/${cpf}`;
		// Monta os parâmetros da requisição
		// Seta no header o token de autorização
		const parameters = {
			headers: {
				Authorization: `Bearer ${authToken}`
			}
		};
		// Faz a requisição na API
		const resposta = axios
			.get(url, parameters)
			.then((res) => {
				// Retorna o JSON com os dados
				return res.data;
			})
			.catch(function(error) {
				if (error.response) {
					// Se for um erro na busca dentro da API
					// Ex.: "Nenhuma oferta para o cpf".
					const message = error.response.data || messagePattern;
					return { error: message };
				} else if (error.resquest) {
					// Se for um erro na requisição
					return { error: messagePattern };
				}
			});
		//Retorna a resposta da requisição
		return resposta;
	}
}

export { SearchOffersService };
