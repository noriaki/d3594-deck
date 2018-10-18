const mongoose = require('mongoose');
const { connect, disconnect } = require('./server/db');

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
  Object.keys(mongoose.connection.collections).map(
    name => mongoose.connection.collections[name].deleteMany({})
  );
};

beforeEach(async () => {
  if (mongoose.connection.readyState === 0) {
    await connect(true);
  }
  await clearDB();
});

afterEach(async () => {
  await disconnect();
});
