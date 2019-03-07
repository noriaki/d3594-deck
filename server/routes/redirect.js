const redirector = (location, statusCode = 302) => (req, res) => {
  res.statusCode = statusCode;
  res.setHeader('Location', location);
  res.end();
};

module.exports = redirector;
