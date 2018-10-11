const setApiHeaders = (res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  const acaHeaders = [
    'Authorization',
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Methods',
    'Origin',
    'Accept',
    'X-Requested-With',
    'Content-Type',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
  ];
  res.setHeader(
    'Access-Control-Allow-Headers',
    acaHeaders.join(', ')
  );
};

module.exports = setApiHeaders;
