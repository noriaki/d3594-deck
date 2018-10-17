import resolve from '../resolveDbUri';

describe('db helpers: resolving DB URI', () => {
  let orgMONGODBURI;
  let orgNODEENV;
  let orgTESTSUITE;

  beforeEach(() => {
    orgMONGODBURI = process.env.MONGODB_URI;
    delete process.env.MONGODB_URI;
    orgNODEENV = process.env.NODE_ENV;
    delete process.env.NODE_ENV;
    orgTESTSUITE = process.env.TEST_SUITE;
    delete process.env.TEST_SUITE;
  });

  afterEach(() => {
    if (orgMONGODBURI != null) { process.env.MONGODB_URI = orgMONGODBURI; }
    if (orgNODEENV != null) { process.env.NODE_ENV = orgNODEENV; }
    if (orgTESTSUITE != null) { process.env.TEST_SUITE = orgTESTSUITE; }
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
      expect(resolve('test', 'test', 'test-suite')).toBe(expected);
    });
  });

  describe('when NODE_ENV specified (development|test|production)', () => {
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

    describe('and TEST_SUITE specified', () => {
      it('add to dbname suffix', () => {
        const expected = 'mongodb://localhost:27017/dbname_test-test-suite';
        process.env.NODE_ENV = 'test';
        process.env.TEST_SUITE = 'test-suite';
        expect(resolve('dbname')).toBe(expected);
      });

      it('only works NODE_ENV === test', () => {
        let expected;

        process.env.TEST_SUITE = 'test-suite';

        process.env.NODE_ENV = 'development';
        expected = 'mongodb://localhost:27017/dbname_development';
        expect(resolve('dbname')).toBe(expected);

        process.env.NODE_ENV = 'test';
        expected = 'mongodb://localhost:27017/dbname_test-test-suite';
        expect(resolve('dbname')).toBe(expected);

        process.env.NODE_ENV = 'production';
        expected = 'mongodb://localhost:27017/dbname_production';
        expect(resolve('dbname')).toBe(expected);
      });
    });
  });

  it('resolving localhost mongodb uri using args', () => {
    const expected = 'mongodb://localhost:27017/dbname_test';
    expect(resolve('dbname', 'test')).toBe(expected);
  });
});
