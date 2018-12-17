const { get, post } = require('microrouter');

const formationRouter = require('./formation');
const formationApiRouter = require('./api/formation');
const commanderApiRouter = require('./api/commander');

const apiNamespace = '/api/v1';

module.exports = app => ([
  // api
  get(`${apiNamespace}/f/:id`, formationApiRouter.show),
  post(`${apiNamespace}/f`, formationApiRouter.create),
  get(`${apiNamespace}/c`, commanderApiRouter.search),
  // pages
  get('/f/new', formationRouter.edit(app)),
  get('/f/:id', formationRouter.show(app)),
  get('/f/:id/edit', formationRouter.edit(app)),
]);
