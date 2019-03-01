// created_at: 2019/03/01
const { connect, disconnect } = require('../server/db');
const Formation = require('../server/models/Formation');

const logAndExit = (error) => { console.error(error); process.exit(1); };

const main = async () => {
  // setup
  await connect();

  await Formation.updateMany(
    { published: { $exists: false } },
    { published: false }
  );

  // teardown
  await disconnect();
};

main().then(() => process.exit()).catch(logAndExit);

// error handling
process.on('unhandledRejection', logAndExit);
