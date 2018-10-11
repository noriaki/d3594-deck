const resolve = require('./helpers/resolveDbUri');

const appName = 'nextjs-micro-mongoose-boilerplate';

module.exports = {
  dbUri: resolve(appName),
};
