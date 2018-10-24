const { get } = require('microrouter');

const formationApiRouter = require('./api/formation');

const apiNamespace = '/api/v1';

module.exports = [
  // api
  get(`${apiNamespace}/f/:id`, formationApiRouter.show),
];
