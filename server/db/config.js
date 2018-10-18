const resolve = require('./helpers/resolveDbUri');

const appName = 'd3594-deck';

module.exports = {
  appName,
  dbUri: resolve(appName),
};
