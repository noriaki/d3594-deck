import {
  get,
  post,
  put,
  patch,
  del,
} from 'microrouter';
import { createServer } from 'microrouter-test-server';

import { connect, disconnect } from '../../db';
import todoRouters from '../todo';
import Todo from '../../models/todo';

describe('Routes: `/todos`', () => {
  let server;
  const routes = [
    get('/todos', todoRouters.list),
    post('/todos', todoRouters.create),
    get('/todos/:id', todoRouters.show),
    put('/todos/:id', todoRouters.update),
    patch('/todos/:id', todoRouters.update),
    del('/todos/:id', todoRouters.destroy),
  ];

  beforeAll(async () => {
    await connect();
    server = await createServer(routes);
  });

  afterEach(async () => {
    await Todo.remove({});
  });

  afterAll(async () => {
    await server.close();
    await disconnect();
  });

  describe('get', () => {
    let ids;
    beforeEach(async () => {
      const t1 = await Todo.create({ title: 'Test todo01' });
      const t2 = await Todo.create({ title: 'Test todo02' });
      ids = [t1._id, t2._id]; // eslint-disable-line no-underscore-dangle
    });

    it('list', async () => {
      const results = JSON.parse(await server.get('/todos'));
      expect(results).toHaveLength(2);
    });

    it('show', async () => {
      const result = JSON.parse(await server.get(`/todos/${ids[0]}`));
      expect(result).toHaveProperty('title', 'Test todo01');
    });
  });
});
