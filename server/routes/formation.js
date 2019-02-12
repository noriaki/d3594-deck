const { parse } = require('url');

const Formation = require('../models/Formation');

const show = app => async (req, res) => {
  const { id } = req.params;
  const formation = await Formation.fetchById(id);
  if (formation === null) {
    return app.getRequestHandler()(req, res, parse(req.url, true));
  }
  return app.render(req, res, '/f', { formation, id });
};

const edit = app => async (req, res) => {
  const { id } = req.params;
  if (id == null) {
    return initialize(app)(req, res);
  }
  const formation = await Formation.fetchById(id);
  if (formation === null) {
    return app.getRequestHandler()(req, res, parse(req.url, true));
  }
  return app.render(req, res, '/f/edit', { formation, id });
};

const initialize = app => (req, res) => {
  const formation = new Formation();
  return app.render(req, res, '/f/edit', { formation });
};

module.exports = {
  show,
  edit,
  initialize,
};
