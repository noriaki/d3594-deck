const qs = require('qs');

const setApiHeaders = require('../helpers/setApiHeaders');
const Tactics = require('../../models/Tactics');

const search = (req, res) => {
  setApiHeaders(res);
  const { text, filter } = qs.parse(req.query);
  let query = Tactics;
  if (text != null && text !== '') {
    query = query.where('name').regex(text);
  }
  if (filter != null) {
    const filterKeys = ['origin', 'type', 'permissions'];
    query = filterKeys.reduce(
      (currentQuery, key) => currentQuery.where(key).in(filter[key] || []),
      query
    );
  }
  return query
    .select([
      '_id',
      'identifier',
      'name',
      'origin',
      'type',
      'permissions',
      'rate',
      'distance',
      'target',
      'description',
      'sortKey',
    ])
    .sort('sortKey')
    .find();
};

module.exports = {
  search,
};
