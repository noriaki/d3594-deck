const { parse } = require('url');
const { join } = require('path');

const createStaticRouter = app => (mimeType = 'text/plain') => (req, res) => {
  res.setHeader('Content-Type', mimeType);
  const { pathname } = parse(req.url, true);
  const path = join(__dirname, '../../static', pathname);
  return app.serveStatic(req, res, path);
};

module.exports = createStaticRouter;
