const resolveDbUri = (base, env = process.env.NODE_ENV) => {
  if (process.env.MONGODB_URI != null) {
    return process.env.MONGODB_URI;
  }
  const suffix = {
    development: '_development',
    test: '_test',
    production: '_production',
  };
  const dbName = `${base}${suffix[env || 'development']}`;
  return `mongodb://localhost:27017/${dbName}`;
};

module.exports = resolveDbUri;
