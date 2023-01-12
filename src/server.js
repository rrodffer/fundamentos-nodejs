import http from 'node:http';

/* 
- CommonJS => require "type": "commonjs"
- ESModules => import "type": "module"
* adicionar "type" no package.json
*/

const server = http.createServer((req, res) => {
  return res.end('Hello World! 🍺');
});

server.listen(3333);
