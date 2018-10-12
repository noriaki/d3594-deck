const mongoose = require('mongoose');

const { dbUri } = require('./config');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const connect = async () => {
  mongoose.Promise = Promise;
  await mongoose.connect(dbUri);
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
