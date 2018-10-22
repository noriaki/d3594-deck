const resolveDbUri = (base, env = process.env.NODE_ENV, suite = process.env.TEST_SUITE) => {
  if (process.env.MONGODB_URI != null) {
    return process.env.MONGODB_URI;
  }
  const suiteSuffix = suite != null ? `-${suite}` : '';
  const suffix = {
    development: '_development',
    test: `_test${suiteSuffix}`,
    production: '_production',
  };
  const dbName = `${base}${suffix[env || 'development']}`;
  return `mongodb://localhost:27017/${dbName}`;
};

module.exports = resolveDbUri;
