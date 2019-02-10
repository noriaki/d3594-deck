const { readFileSync } = require('fs');
const { resolve } = require('path');
const fetch = require('isomorphic-fetch');
const { connect, disconnect } = require('../server/db');
const Commander = require('../server/models/Commander');
const Tactics = require('../server/models/Tactics');
const Formation = require('../server/models/Formation');

const logAndExit = (error) => { console.error(error); process.exit(1); };

const getValidEnv = () => {
  const { NODE_ENV, DATA_REPO } = process.env;
  let ret = false;
  if (NODE_ENV != null) {
    if (NODE_ENV === 'production' && DATA_REPO != null) {
      ret = 'remote';
    } else if (NODE_ENV === 'development') {
      ret = 'local';
    }
  }
  return ret;
};

// async
const getAllData = () => {
  const env = getValidEnv();
  if (env === 'remote') {
    const { DATA_REPO } = process.env;
    return getAllDataRemote(DATA_REPO);
  } else if (env === 'local') {
    return Promise.resolve(getAllDataLocal());
  }
  // never reach
  return new Error('InValid Environment');
};

// async
const fetchJson = uri => fetch(uri, {
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
}).then(response => response.json());

const getAllDataRemote = async repo => ({
  commanders: await getAllCommandersDataRemote(repo),
  tactics: await getAllTacticsDataRemote(repo),
});

// async
const getAllCommandersDataRemote = (repo) => {
  const uri = `https://github.com/${repo}/raw/master/data/commanders.json`;
  return fetchJson(uri);
};

// async
const getAllTacticsDataRemote = (repo) => {
  const uri = `https://github.com/${repo}/raw/master/data/tactics.json`;
  return fetchJson(uri);
};

const getAllDataLocal = () => ['commanders', 'tactics'].reduce((ret, key) => {
  const path = `./data/${key}.json`;
  return { ...ret, [key]: JSON.parse(readFileSync(resolve(path), 'utf8')) };
}, {});

const main = async () => {
  if (getValidEnv() === false) { throw new Error('InValid Environment'); }

  // setup
  await connect();
  if (getValidEnv() === 'local') {
    await Formation.deleteMany({});
  }
  await Tactics.deleteMany({});
  await Commander.deleteMany({});

  const { commanders, tactics } = await getAllData();

  await Commander.importAll(commanders);
  await Tactics.importAll(commanders, tactics);
  if (getValidEnv() === 'local') {
    await Formation.importSampleData();
  }
  await Formation.importHalloweenCupData();

  // teardown
  await disconnect();
};

main().then(() => process.exit()).catch(logAndExit);

// error handling
process.on('unhandledRejection', logAndExit);
