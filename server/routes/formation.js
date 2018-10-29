const { parse } = require('url');

const Formation = require('../models/Formation');

const show = app => async (req, res) => {
  const { id } = req.params;
  const formation = await Formation.fetchById(id);
  console.log(id, formation);
  if (formation === null) {
    return app.getRequestHandler()(req, res, parse(req.url, true));
  }
  return app.render(req, res, '/f', { formation, id });
};

module.exports = {
  show,
};
