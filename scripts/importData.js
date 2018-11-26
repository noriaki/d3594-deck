const fetch = require('isomorphic-fetch');
const { connect, disconnect } = require('../server/db');
const Commander = require('../server/models/Commander');
const Tactics = require('../server/models/Tactics');

const logAndExit = (error) => { console.error(error); process.exit(1); };

const isValidEnv = () => {
  const { NODE_ENV, DATA_REPO } = process.env;
  return (
    NODE_ENV != null && NODE_ENV === 'production' && DATA_REPO != null
  );
};

// async
const getAllData = () => {
  const { DATA_REPO } = process.env;
  const uri = `https://github.com/${DATA_REPO}/raw/master/data/commanders.json`;
  return fetch(uri, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  }).then(response => response.json());
};

const main = async () => {
  if (!isValidEnv()) { throw new Error('InValid Environment'); }

  // setup
  await connect();
  await Tactics.deleteMany({});
  await Commander.deleteMany({});

  const data = await getAllData();

  await Commander.importAll(data);
  await Tactics.importAll(data);

  // teardown
  await disconnect();
};

main().then(() => process.exit()).catch(logAndExit);

// error handling
process.on('unhandledRejection', logAndExit);
