import axios from "axios";

// BaseURL da API (banco de dados)
const apiBaseURL = "http://127.0.0.1:3333";

const createChatSession = (id: string, nome: string, tel: string) => {
  // Parametros da busca
  const parametros = {
    idchat_cha: id,
    nome_cha: nome,
    tel_cha: tel,
  };
  // Faz a requisição na API
  const resposta = axios
    .post(`${apiBaseURL}/chat/create`, parametros)
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
};
const saveCPF = (id: string, cpf?: number) => {
  // Parametros da requisição
  let parametro;
  if (cpf) {
    parametro = { cpf_cha: cpf };
  } else {
    parametro = { cpf_cha: null };
  }

  // Faz a requisição na API
  const resposta = axios
    .post(`${apiBaseURL}/chat/update/${id}`, parametro)
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
};
const verifyCPFSaved = (id: string) => {
  // Faz a requisição na API
  const resposta = axios
    .get(`${apiBaseURL}/chat/get/${id}`)
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
};
export { createChatSession, saveCPF, verifyCPFSaved };
