const qs = require('qs');

const setApiHeaders = require('../helpers/setApiHeaders');
const Tactics = require('../../models/Tactics');

const selectKeys = [
  '_id',
  'id',
  'identifier',
  'name',
  'stage',
  'origin',
  'type',
  'permissions',
  'stock',
  'rate',
  'distance',
  'target',
  'description',
  'sortKey',
];

const search = (req, res) => {
  setApiHeaders(res);
  const { text, filter, group } = qs.parse(req.query);
  if (text == null && filter == null) { return null; }
  const ops = [];
  const matchOp = {};
  if (text != null && text !== '') {
    matchOp.name = { $regex: text };
  }
  if (filter != null) {
    const filterKeys = ['origin', 'type', 'permissions'];
    filterKeys.forEach((key) => {
      matchOp[key] = { $in: filter[key] || [] };
    });
  }
  if (Object.keys(matchOp).length > 0) { ops.push({ $match: matchOp }); }
  ops.push(
    { $sort: { sortKey: 1 } }
  );
  ops.push(
    { $project: selectKeys.reduce((ret, key) => ({ ...ret, [key]: 1 }), {}) }
  );
  if (group != null) {
    ops.push({ $group: { _id: `$${group}`, tactics: { $push: '$$ROOT' } } });
  }
  return Tactics.aggregate(ops).exec();
};

module.exports = {
  search,
};
