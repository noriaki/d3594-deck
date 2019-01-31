const mongoose = require('mongoose');
const { readdirSync } = require('fs');
const { resolve } = require('path');

const resolveDbUri = require('./helpers/resolveDbUri');
const { appName, dbUri } = require('./config');

const transformOptions = {
  transform: true, flattenDecimals: true, getters: true, virtuals: true,
};

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('toJSON', transformOptions);
mongoose.set('toObject', transformOptions);
mongoose.Promise = Promise;

const connect = async (refresh = false) => {
  await mongoose.connect(refresh ? resolveDbUri(appName) : dbUri);
  const getMongooseTestEnv = () => JSON.stringify({
    MONGODB_URI: process.env.MONGODB_URI,
    NODE_ENV: process.env.NODE_ENV,
    TEST_SUITE: process.env.TEST_SUITE,
  }, null, 2);
  mongoose.connection.on(
    'error', console.error.bind(
      console, `[ENV] ${getMongooseTestEnv()}`, 'mongodb connection error:'
    )
  );
  return { mongoose, db: { name: mongoose.connection.name, uri: dbUri } };
};

// async method
const disconnect = () => mongoose.disconnect();

const preloadModels = () => {
  const dirPath = resolve(__dirname, '../models');
  const correctFileRegexp = /.*\.js$/;
  const correctFile = filename => correctFileRegexp.test(filename);
  readdirSync(dirPath)
    .filter(correctFile)
    .forEach((f) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      require(resolve(dirPath, f));
    });
};

const deleteLoadedModels = () => {
  Object.keys(mongoose.connection.models).forEach((name) => {
    delete mongoose.connection.models[name];
  });
};

module.exports = {
  connect,
  disconnect,
  preloadModels,
  deleteLoadedModels,
};
