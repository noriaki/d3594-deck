const { get } = require('microrouter');
const { createServer } = require('microrouter-test-server');

const helloRouter = require('../hello');

const routes = [
  get('/hello/:who', helloRouter),
];

describe('Routes: `/hello/:who`', () => {
  let server;

  beforeAll(async () => {
    server = await createServer(routes);
  });

  // Shutdown the server so test suite does not hang
  afterAll(async () => {
    await server.close();
  });

  it('should return expected value', async () => {
    const result = await server.get('/hello/test');
    expect(result).toEqual('Hello test');
  });
});
