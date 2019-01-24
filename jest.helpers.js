const { readFileSync } = require('fs');
const { resolve } = require('path');

const mongoose = require('mongoose');
const mongodbUri = require('mongodb-uri');
const resolveDbUri = require('./server/db/helpers/resolveDbUri');
const { appName } = require('./server/db/config');
const { connect, disconnect } = require('./server/db');

const Commander = require('./server/models/Commander');
const Tactics = require('./server/models/Tactics');
const Formation = require('./server/models/Formation');

// @async
const clearDB = () => {
  // guard
  if (process.env.NODE_ENV !== 'test') {
    throw new Error([
      `[ENV -> ${process.env.NODE_ENV}]`,
      'This method (clearDB) should only use when testing,',
      'try set process.env.NODE_ENV = "test"',
    ].join(' '));
  }
  return Promise.all(Object.keys(mongoose.connection.collections).map(
    name => mongoose.connection.collections[name].deleteMany({})
  ));
};

const connectAndClearDB = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      mongodbUri.formatMongoose(resolveDbUri(appName));
    } catch (e) {
      return;
    }
    await connect(true);
  }
  await clearDB();
};

const importFactoryData = async () => {
  const commanderPath = './server/models/__factories__/commanders.json';
  const tacticsPath = './server/models/__factories__/tactics.json';
  const commanderData = JSON.parse(
    readFileSync(resolve(commanderPath), 'utf8'));
  const tacticsData = JSON.parse(readFileSync(resolve(tacticsPath), 'utf8'));
  await Commander.importAll(commanderData);
  await Tactics.importAll(commanderData, tacticsData);
  await Formation.importSampleData();
};

const setupDB = async () => {
  await connectAndClearDB();
  await importFactoryData();
};

const teardownDB = async () => {
  await disconnect();
};

module.exports = {
  setupDB,
  teardownDB,
};
