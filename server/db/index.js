const mongoose = require('mongoose');

const resolveDbUri = require('./helpers/resolveDbUri');
const { appName, dbUri } = require('./config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.Promise = Promise;

const connect = async (refresh = false) => {
  await mongoose.connect(refresh ? resolveDbUri(appName) : dbUri);
  mongoose.connection.on(
    'error', console.error.bind(console, 'mongodb connection error:')
  );
  return { mongoose, db: { name: mongoose.connection.name, uri: dbUri } };
};

// async method
const disconnect = () => mongoose.disconnect();

module.exports = {
  connect,
  disconnect,
};
