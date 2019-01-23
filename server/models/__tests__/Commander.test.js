import Commander from '../Commander';

import { setupDB, teardownDB } from '../../../jest.helpers';

process.env.TEST_SUITE = 'model-test-Commander';

describe('Commander model', () => {
  beforeEach(setupDB);
  afterEach(teardownDB);

  describe('associate Tactics', () => {
    it('commander has one specific tactics', async () => {
      const identifier = '0022cae0ffb0ee3d8fce63d6d8cdc69f';
      const commander = await Commander.findById(identifier);
      const subject = await commander.specificTactics();
      expect(subject).not.toBeNull();
      expect(subject.identifier).toBe('fd5bad37f57c3ea79808e75b9acd64ae');
      expect(subject.ownerIds).toContain('0022cae0ffb0ee3d8fce63d6d8cdc69f');
    });
  });
});
