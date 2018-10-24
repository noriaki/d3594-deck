const { send } = require('micro');

const setApiHeaders = require('./helpers/setApiHeaders');
const Formation = require('../models/Formation');

const show = async (req, res) => {
  setApiHeaders(res);
  const formation = await Formation.fetchById(req.params.id);
  if (formation === null) {
    return send(res, 404, {
      error: { code: 404, message: 'Formation not found' },
    });
  }
  return formation;
};

module.exports = {
  show,
};
