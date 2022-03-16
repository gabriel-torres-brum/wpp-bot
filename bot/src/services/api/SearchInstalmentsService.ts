import axios from 'axios';
import 'dotenv/config';
import { env } from 'process';
// Bearer token de autorização (API de cobrança)
const authToken = env.API_AUTH_TOKEN;
// BaseURL (API de cobrança)
const baseURL = env.INSTALMENTS_BASE_URL;

const messagePattern = 'Ocorreu um erro desconhecido, tente novamente mais tarde.';

interface ISearchInstalments {
	cpf: string;
	offerId: string;
}

class SearchInstalmentsService {
	async execute({ cpf, offerId }: ISearchInstalments) {
		// Monta a url final para requisição
		const url = `${baseURL}/${cpf}/${offerId}`;
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
					// Ex.: "Nenhum acordo para o cpf".
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

export { SearchInstalmentsService };
