const {
  get,
  post,
  put,
  patch,
  del,
} = require('microrouter');

const helloRouter = require('./hello');
const todoRouters = require('./todo');

module.exports = [
  // route(hello): variable url
  get('/hello/:who', helloRouter),
  // route(todos): CRUD API uri
  get('/todos', todoRouters.list),
  post('/todos', todoRouters.create),
  get('/todos/:id', todoRouters.show),
  put('/todos/:id', todoRouters.update),
  patch('/todos/:id', todoRouters.update),
  del('/todos/:id', todoRouters.destroy),
];
