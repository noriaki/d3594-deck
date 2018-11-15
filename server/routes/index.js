const { get } = require('microrouter');

const formationRouter = require('./formation');
const formationApiRouter = require('./api/formation');

const apiNamespace = '/api/v1';

module.exports = app => ([
  // api
  get(`${apiNamespace}/f/:id`, formationApiRouter.show),
  // pages
  get('/f/new', formationRouter.edit(app)),
  get('/f/:id', formationRouter.show(app)),
  get('/f/:id/edit', formationRouter.edit(app)),
]);
