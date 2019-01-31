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

const loadData = (dir) => {
  const commanderPath = resolve(dir, 'commanders.json');
  const tacticsPath = resolve(dir, 'tactics.json');
  return {
    commanders: JSON.parse(readFileSync(commanderPath), 'utf8'),
    tactics: JSON.parse(readFileSync(tacticsPath), 'utf8'),
  };
};

const performImport = async ({ commanders, tactics }) => {
  await Commander.importAll(commanders);
  await Tactics.importAll(commanders, tactics);
  await Formation.importSampleData();
};

const importFactoryData = async () => {
  const dir = './server/models/__factories__/';
  const data = loadData(dir);
  await performImport(data);
};

const importAllData = async () => {
  const dir = './data/';
  const data = loadData(dir);
  await performImport(data);
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
  connectAndClearDB,
  importFactoryData,
  importAllData,
};
