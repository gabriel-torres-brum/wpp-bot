import "reflect-metadata";
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import { router } from './routes'

import './database/Connection';

const app = express();

app.use(express.json());

/**
 * Tipos de parametros:
 * Routes Params => fazem parte da rota. tipo o id na url => "/test/{id}"
 * Query Params  => fazem parte de uma query. Geralmente pra filtrar => "/test?name=teclado&description=tecladobom" PARAMS NAO OBRIGATÓRIOS e não vem explícito na rota
 * Body Params   => utiliza pro metodo post, patch ou put. Vêm no corpo da requisição. ex: {
 * "nome": "teclado",
 * "description": "teclado bom"
 * }
 */

// Todas as rotas
app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction ) => {
  if(err instanceof Error){
    return response.status(400).json({
      error: err.message
    })
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})

app.listen(3030, () => {
  console.log('Server online!')
})
