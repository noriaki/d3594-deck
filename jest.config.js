const pathIgnorePatterns = [
  '<rootDir>/.git/',
  '<rootDir>/.next/',
  '<rootDir>/node_modules/',
];

module.exports = {
  setupTestFrameworkScriptFile: './jest.setup.js',
  testPathIgnorePatterns: pathIgnorePatterns,
  watchPathIgnorePatterns: pathIgnorePatterns,
};
