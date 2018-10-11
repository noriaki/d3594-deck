import resolve from '../resolveDbUri';

describe('db helpers: resolving DB URI', () => {
  let orgMONGODBURI;

  beforeEach(() => {
    orgMONGODBURI = process.env.MONGODB_URI;
    delete process.env.MONGODB_URI;
  });

  afterEach(() => {
    if (orgMONGODBURI != null) {
      process.env.MONGODB_URI = orgMONGODBURI;
    }
  });

  describe('when setting `process.env.MONGODB_URI`', () => {
    it('pass any args, returning MONGODB_URI', () => {
      const expected = 'test_db_uri';
      process.env.MONGODB_URI = expected;
      expect(resolve()).toBe(expected);
    });

    it('passsing whatever args is ignored', () => {
      const expected = 'test_db_uri';
      process.env.MONGODB_URI = expected;
      expect(resolve('test')).toBe(expected);
      expect(resolve('test', 'test')).toBe(expected);
    });
  });

  describe('when NODE_ENV specified (development|test|production)', () => {
    let orgNODEENV;

    beforeEach(() => {
      orgNODEENV = process.env.NODE_ENV;
      delete process.env.NODE_ENV;
    });

    afterEach(() => {
      if (orgNODEENV != null) {
        process.env.NODE_ENV = orgNODEENV;
      }
    });

    it('resolving dbname defaults `development`', () => {
      const expected = 'mongodb://localhost:27017/dbname_development';
      expect(resolve('dbname')).toBe(expected);
    });

    it('resolving dbname using NODE_ENV', () => {
      let expected;

      process.env.NODE_ENV = 'development';
      expected = 'mongodb://localhost:27017/dbname_development';
      expect(resolve('dbname')).toBe(expected);

      process.env.NODE_ENV = 'test';
      expected = 'mongodb://localhost:27017/dbname_test';
      expect(resolve('dbname')).toBe(expected);

      process.env.NODE_ENV = 'production';
      expected = 'mongodb://localhost:27017/dbname_production';
      expect(resolve('dbname')).toBe(expected);
    });
  });

  it('resolving localhost mongodb uri using args', () => {
    const expected = 'mongodb://localhost:27017/dbname_test';
    expect(resolve('dbname', 'test')).toBe(expected);
  });
});
