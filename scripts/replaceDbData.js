const { readdirSync, readFileSync } = require('fs');
const { resolve } = require('path');
const { connect, disconnect } = require('../server/db');
const Commander = require('../server/models/Commander');
const Tactics = require('../server/models/Tactics');
const Formation = require('../server/models/Formation');

const logAndExit = (error) => { console.error(error); process.exit(1); };

const getAllData = (modelClass) => {
  const dirpath = resolve(modelClass.getDataPath());
  const filenames = readdirSync(dirpath);
  const correctFilename = /^[0-9a-f]+\.json$/;
  return filenames.filter(
    filename => correctFilename.test(filename)
  ).map(
    filename => JSON.parse(readFileSync(resolve(dirpath, filename)))
  );
};

const main = async () => {
  // setup
  await connect();
  await Formation.deleteMany({});
  await Tactics.deleteMany({});
  await Commander.deleteMany({});

  // Commander
  const commanderData = getAllData(Commander);
  await Commander.importAll(commanderData);

  // Tactics
  const tacticsData = getAllData(Tactics);
  await Tactics.importAll(tacticsData);

  // Formation
  await Formation.importSampleData();

  // teardown
  await disconnect();
};

main().then(() => process.exit()).catch(logAndExit);

// error handling
process.on('unhandledRejection', logAndExit);
