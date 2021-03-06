// created_at: 2019/03/06
const { connect, disconnect, preloadModels } = require('../server/db');
const Formation = require('../server/models/Formation');

const logAndExit = (error) => { console.error(error); process.exit(1); };

const perform = async () => {
  const formations = await Formation.find({
    $or: [
      { createdAt: { $exists: false } },
      { updatedAt: { $exists: false } },
    ],
  });
  return formations.reduce(
    (prev, formation) => prev.then(
      () => formation.initializeTimestamps().save()
    ),
    Promise.resolve()
  );
};

const main = async () => {
  // setup
  await connect();
  preloadModels();

  await perform();

  // teardown
  await disconnect();
};

if (process.argv.length === 2 && process.argv[1] === __filename) {
  main().then(() => process.exit()).catch(logAndExit);

  // error handling
  process.on('unhandledRejection', logAndExit);
}

module.exports = perform;
