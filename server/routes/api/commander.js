const qs = require('qs');

const setApiHeaders = require('../helpers/setApiHeaders');
const Commander = require('../../models/Commander');

const search = async (req, res) => {
  setApiHeaders(res);
  const { text, filter } = qs.parse(req.query);
  let query = Commander;
  if (text != null) {
    query = query.where('name').regex(text);
  }
  if (filter != null) {
    query = Object.entries(filter).reduce(
      (currentQuery, [key, array]) => currentQuery.where(key).in(array),
      query
    );
  }
  const commanders = query.select([
    '_id', 'identifier', 'name', 'imageURL',
  ]).find();
  return commanders;
};

module.exports = {
  search,
};
