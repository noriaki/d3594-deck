const { send } = require('micro');
const qs = require('qs');

const setApiHeaders = require('../helpers/setApiHeaders');
const Commander = require('../../models/Commander');

const search = (req, res) => {
  setApiHeaders(res);
  const { text, filter } = qs.parse(req.query);
  let query = Commander;
  if (text != null && text !== '') {
    query = query.where('name').regex(text);
  }
  if (filter != null) {
    const filterKeys = ['rarity', 'army', 'team', 'distance', 'cost'];
    query = filterKeys.reduce(
      (currentQuery, key) => currentQuery.where(key).in(filter[key] || []),
      query
    );
  }
  return query
    .select([
      '_id', 'id', 'identifier', 'name', 'special', 'image', 'imageURL',
    ])
    .sort('sortKey')
    .find();
};

const fetch = async (req, res) => {
  setApiHeaders(res);
  const commander = await Commander.fetchById(req.params.id);
  if (commander === null) {
    return send(res, 404, {
      error: { code: 404, message: 'Commander not found' },
    });
  }
  const tactics = await commander.specificTactics();
  return { commander, tactics };
};

module.exports = {
  search,
  fetch,
};
