const { readdirSync, readFileSync } = require('fs');
const { resolve } = require('path');
const { connect, disconnect } = require('../server/db');
const Commander = require('../server/models/Commander');
const Tactics = require('../server/models/Tactics');

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
  await connect();

  // Commander
  const commanderData = getAllData(Commander);
  await Commander.deleteMany({});
  await Commander.importAll(commanderData);

  // Tactics
  const tacticsData = getAllData(Tactics);
  await Tactics.deleteMany({});
  await Tactics.importAll(tacticsData);

  await disconnect();
};

main().then(() => process.exit()).catch(logAndExit);

// error handling
process.on('unhandledRejection', logAndExit);
