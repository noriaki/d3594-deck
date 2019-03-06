import { setupDB, teardownDB } from '../../jest.helpers';
import perform from '../migrateOnceSetTimestampsWhereNotExistsOnFormation';
import Formation from '../../server/models/Formation';

process.env.TEST_SUITE = 'script-test-timestamps';

describe('scripts/migrateOnceSetTimestampsWhereNotExistsOnFormation', () => {
  describe('to perform case', () => {
    beforeEach(() => {
      Formation.schema.set('timestamps', false);
      Formation.schema.remove('createdAt');
      Formation.schema.remove('updatedAt');
    });
    beforeEach(setupDB);
    beforeEach(() => {
      Formation.schema.set('timestamps', true);
    });
    afterEach(teardownDB);

    it('setting timestamps { createdAt, updatedAt }', async () => {
      const count = await Formation.countDocuments();
      expect(await Formation.find({
        createdAt: { $exists: false },
        updatedAt: { $exists: false },
      })).toHaveLength(count);

      await perform();

      const subjects = await Formation.find();
      expect(subjects).toHaveLength(count);
      expect(subjects).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ])
      );

      expect(await Formation.find({
        $or: [
          { createdAt: { $exists: false } },
          { updatedAt: { $exists: false } },
        ],
      })).toHaveLength(0);
    });
  });

  describe('to not perform case', () => {
    beforeEach(setupDB);
    afterEach(teardownDB);

    it('will not changes', async () => {
      const count = await Formation.countDocuments();
      expect(await Formation.find({
        createdAt: { $exists: false },
        updatedAt: { $exists: false },
      })).toHaveLength(0);

      const identifier = '43e0f069ab00049908ab34390a9c45ca';
      const {
        createdAt: expectedCreatedAt,
        updatedAt: expectedUpdatedAt,
      } = await Formation.findOne({ identifier });

      await perform();

      const subjects = await Formation.find();
      expect(subjects).toHaveLength(count);
      expect(subjects).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            createdAt: expect.any(Date),
            updatedAt: expect.any(Date),
          }),
        ])
      );

      const subject = await Formation.findOne({ identifier });
      expect(subject).toHaveProperty('createdAt', expectedCreatedAt);
      expect(subject).toHaveProperty('updatedAt', expectedUpdatedAt);

      expect(await Formation.find({
        $or: [
          { createdAt: { $exists: false } },
          { updatedAt: { $exists: false } },
        ],
      })).toHaveLength(0);
    });
  });
});
