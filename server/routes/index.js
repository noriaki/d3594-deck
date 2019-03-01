const { get, post, put } = require('microrouter');

const formationRouter = require('./formation');
const formationApiRouter = require('./api/formation');
const commanderApiRouter = require('./api/commander');
const tacticsApiRouter = require('./api/tactics');

const apiNamespace = '/api/v1';

module.exports = app => ([
  // api
  get(`${apiNamespace}/f/:id`, formationApiRouter.show),
  put(`${apiNamespace}/f/:id`, formationApiRouter.publish),
  post(`${apiNamespace}/f`, formationApiRouter.create),
  get(`${apiNamespace}/c`, commanderApiRouter.search),
  get(`${apiNamespace}/c/:id`, commanderApiRouter.fetch),
  get(`${apiNamespace}/t`, tacticsApiRouter.search),
  // pages
  get('/f/new', formationRouter.initialize(app)),
  get('/f/:id.png', formationRouter.screenshot(app)),
  get('/f/:id', formationRouter.show(app)),
  get('/f/:id/edit', formationRouter.edit(app)),
]);
