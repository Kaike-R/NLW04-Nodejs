import 'reflect-metadata';

import express, { request, response } from 'express';
import { router } from './router';
import createConnection from "./database";

createConnection();
const app = express();

app.use(express.json());
/**
 * GET => Busca
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração Especifica
*/
//http://localhost:3333/users


app.use(router);

export { app };