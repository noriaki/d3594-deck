const { parse } = require('url');
const next = require('next');
const { get, router } = require('microrouter');

const db = require('./db');
const createRoutes = require('./routes');
const createStaticRouter = require('./routes/static');
const reRouter = require('./routes/redirect');

const { host: assetHost } = require('../constants/assets');

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

const nextJsRouter = (req, res) => {
  const parsedUrl = parse(req.url, true);
  return handle(req, res, parsedUrl);
};

const setup = async () => {
  await app.prepare();
  await db.connect();
  db.preloadModels();
  const routes = createRoutes(app);
  const staticRouter = createStaticRouter(app);
  return router(...[
    get('/robots.txt', staticRouter('text/plain')),
    get('/sitemap.xml', reRouter(`${assetHost}/assets/sitemap.xml`)),
    ...routes,
    get('/*', nextJsRouter), // default route
  ]);
};

process.on('SIGUSR2', () => { db.deleteLoadedModels(); });

module.exports = setup();
