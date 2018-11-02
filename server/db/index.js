const mongoose = require('mongoose');

const resolveDbUri = require('./helpers/resolveDbUri');
const { appName, dbUri } = require('./config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('toJSON', {
  transform: true, flattenDecimals: true, getters: true,
});
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

module.exports = {
  connect,
  disconnect,
};
