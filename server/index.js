const { parse } = require('url');
const { join } = require('path');
const next = require('next');
const { get, router } = require('microrouter');

const db = require('./db');
const createRoutes = require('./routes');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const nextJsRouter = (req, res) => {
  const parsedUrl = parse(req.url, true);
  return handle(req, res, parsedUrl);
};

const rootStaticFilesRouter = (mimeType = 'text/plain') => (req, res) => {
  res.setHeader('Content-Type', mimeType);
  const { pathname } = parse(req.url, true);
  const path = join(__dirname, '../static', pathname);
  return app.serveStatic(req, res, path);
};

const setup = async () => {
  await app.prepare();
  await db.connect();
  db.preloadModels();
  const routes = createRoutes(app);
  return router(...[
    get('/robots.txt', rootStaticFilesRouter('text/plain')),
    ...routes,
    get('/*', nextJsRouter), // default route
  ]);
};

process.on('SIGUSR2', () => { db.deleteLoadedModels(); });

module.exports = setup();
