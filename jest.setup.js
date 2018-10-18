const mongoose = require('mongoose');
const { connect, disconnect } = require('./server/db');

// @async
const clearDB = () => (
  Object.keys(mongoose.connection.collections).map(
    name => mongoose.connection.collections[name].deleteMany({})
  )
);

beforeEach(async () => {
  if (mongoose.connection.readyState === 0) {
    await connect(true);
  }
  await clearDB();
});

afterEach(async () => {
  await disconnect();
});
