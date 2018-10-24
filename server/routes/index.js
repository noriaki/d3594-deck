const { get } = require('microrouter');

const formationRouter = require('./formation');

const apiNamespace = '/api/v1';

module.exports = [
  // api
  get(`${apiNamespace}/f/:id`, formationRouter.show),
];
