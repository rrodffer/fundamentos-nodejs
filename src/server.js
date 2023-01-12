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

const server = http.createServer((req, res) => {
  const { method, url } = req;


  if (method === 'GET' && url === '/users') {
    return res.end(`${method} ${url}, Listagem de usuários`);
  } else if (method === 'POST' && url === '/users') {
    return res.end(`${method} ${url}, Cadastro de usuários`);
  } else {
    return res.end('Hello World! 🍺');
  }

});

server.listen(3333);
