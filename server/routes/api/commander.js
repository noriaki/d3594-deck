const qs = require('qs');

const setApiHeaders = require('../helpers/setApiHeaders');
const Commander = require('../../models/Commander');

const search = (req, res) => {
  setApiHeaders(res);
  const { text, filter } = qs.parse(req.query);
  let query = Commander;
  if (text != null) {
    query = query.where('name').regex(text);
  }
  if (filter != null) {
    const filterKeys = ['rarity', 'army', 'team'];
    query = filterKeys.reduce(
      (currentQuery, key) => currentQuery.where(key).in(filter[key] || []),
      query
    );
  }
  return query
    .select(['_id', 'id', 'identifier', 'name', 'image', 'imageURL'])
    .sort('sortKey')
    .find();
};

module.exports = {
  search,
};
