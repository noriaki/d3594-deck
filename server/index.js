const { parse } = require('url');
const next = require('next');
const { get, router } = require('microrouter');
const { readdirSync } = require('fs');
const { resolve } = require('path');

const db = require('./db');
const createRoutes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const nextJsRouter = (req, res) => {
  const parsedUrl = parse(req.url, true);
  return handle(req, res, parsedUrl);
};

const preloadModels = () => {
  const dirPath = resolve(__dirname, './models');
  const correctFileRegexp = /.*\.js$/;
  const correctFile = filename => correctFileRegexp.test(filename);
  readdirSync(dirPath)
    .filter(correctFile)
    .forEach((f) => {
      // eslint-disable-next-line global-require, import/no-dynamic-require
      require(resolve(dirPath, f));
    });
};

const setup = async () => {
  await app.prepare();
  await db.connect();
  preloadModels();
  const routes = createRoutes(app);
  return router(...[
    ...routes,
    get('/*', nextJsRouter), // default route
  ]);
};

module.exports = setup();
