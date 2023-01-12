import http from 'node:http';

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

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;


  if (method === 'GET' && url === '/users') {
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(users));

  } else if (method === 'POST' && url === '/users') {
    users.push({
      id: '123ID',
      name: 'Rayron',
      email: 'email@example.com'
    })
    return res.end(`${method} ${url}, Cadastro de usuários`);
  } else {
    return res.end('Hello World! 🍺');
  }

});

server.listen(3333);
