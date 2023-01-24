import { randomUUID } from 'node:crypto';

import { Database } from './database.js';
const database = new Database();
import { buildRoutePath } from './utils/build-route-path.js';

export const routes = [
  {
    method: 'GET',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const users = database.select('users');

      return res
        .writeHead(200)
        .end(JSON.stringify(users));
    }
  },
  {
    method: 'POST',
    path: buildRoutePath('/users'),
    handler: (req, res) => {
      const { id, name, email } = req.body;
      const user = {
        id: randomUUID(),
        name,
        email
      }

      database.insert('users', user)
      return res.writeHead(201).end();
    }
  },
  {
    method: 'DELETE',
    path: buildRoutePath('/users/:userId'),
    handler: (req, res) => {

      return res.writeHead(201).end();
    }
  }
]