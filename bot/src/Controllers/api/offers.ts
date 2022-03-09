import axios from "axios";

// Bearer token de autorização (API de cobrança)
const authToken = "i0ZGRFkJZ6Jgm1XkeSt7MluJcZRjdVdPOu9EdN7w";
// BaseURL (API de cobrança)
const apiBaseURL =
  "https://server4.3csistemas.com.br/Homologacao/cobranca/Api/offers/";

const searchOffers = (cpf: number) => {
  // Monta a url final para requisição
  const url = apiBaseURL + cpf;
  // Monta os parâmetros da requisição
  // Seta no header o token de autorização
  const parametros = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  // Faz a requisição na API
  const resposta = axios
    .get(url, parametros)
    .then((res) => {
      // Se receber um código de sucesso
      // Retorna o JSON com os dados
      return res.data;
    })
    .catch(function (error) {
      if (error.response) {
        // Se for um erro na busca dentro da api
        // Ex.: "Nenhuma oferta para o cpf".
        return error.response.data;
      } else if (error.resquest) {
        // Se for um erro na requisição
        // Ex.: Erro na comunicação com a API.
        return error.request.statusCode;
      }
    });
  //Retorna a resposta da requisição
  return resposta;
};

export { searchOffers };
