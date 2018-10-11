const { readdirSync, readFileSync } = require('fs');
const { resolve } = require('path');
const { connect, disconnect } = require('../server/db');
const Commander = require('../server/models/commander');

const logAndExit = (error) => { console.error(error); process.exit(1); };

const main = async () => {
  await connect();
  const dirpath = resolve(Commander.getDataPath());
  const filenames = readdirSync(dirpath);
  const correctFilename = /^[0-9a-f]+\.json$/;
  const jsons = filenames.filter(
    filename => correctFilename.test(filename)
  ).map(filename => JSON.parse(readFileSync(resolve(dirpath, filename))));
  await Commander.deleteMany({});
  await Commander.importAll(jsons);
  await disconnect();
};

main().then(() => process.exit()).catch(logAndExit);

// error handling
process.on('unhandledRejection', logAndExit);;
