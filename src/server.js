import http from 'node:http';
import { randomUUID } from 'node:crypto';

import { json } from './middlewares/json.js';
import { Database } from './database.js';
const database = new Database();
/* 
- CommonJS => require "type": "commonjs"
- ESModules => import "type": "module"
* adicionar "type" no package.json
*/

/*
  HTTP
- Método HTTP: GET(Busca), POST(Criar), PUT(Atualiza vários campos), PATCH(Atualiza campo especifico), DELETE(Deletar/Remover)
- URL

  Rota => método + recurso
  - POST /users
  - GET /users
*/

/*
  - Stateful - salva informações em memória
  - Stateless - salva em lugares externos(banco de dados, mobile, etc)
*/

/*
  - JSON: JavaScript Object Notation
*/

/*
  Cabeçalhos (Req/Res) => Metadados (informações adicionais de como o dado pode ser interpretado pelo lado do client)
*/

/*
  HTTP Status Code => 100, 200, 201, 400, 404, 500...
*/

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  if (method === 'GET' && url === '/users') {
    const users = database.select('users');

    return res
      .writeHead(200)
      .end(JSON.stringify(users));

  } else if (method === 'POST' && url === '/users') {
    const { id, name, email } = req.body;
    const user = {
      id: randomUUID(),
      name,
      email
    }

    database.insert('users', user)
    return res.writeHead(201).end();
  } else {
    return res.writeHead(404).end('Rota não encontrada! 🍺');
  }

});

server.listen(3333);
