import http from 'node:http';

import { json } from './middlewares/json.js';
import { routes } from './routes.js';

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

/*
  Query Parameters: URL Stateful ->  buscas com filtros, paginação, parâmetro não obrigatório | GET http://localhost:3333/users?userId=1&name=Jhon
  Route Parameters: identificação de recursos, busca especifica, parâmetro obrigatório | GET http://localhost:3333/users/1
  Request Body: Envio de informações de formulários(JSON), cadastro etc...| POST http://localhost:3333/users
*/

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(route => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    return route.handler(req, res)
  }

  return res.writeHead(404).end('Rota não encontrada! 🍺');
});

server.listen(3333);
