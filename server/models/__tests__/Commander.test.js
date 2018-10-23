import { resolve } from 'path';
import { readFileSync } from 'fs';
import Commander from '../Commander';
import Tactics from '../Tactics';

process.env.TEST_SUITE = 'model-test-Commander';

describe('Commander model', () => {
  describe('associate Tactics', () => {
    let commander;
    beforeEach(async () => {
      const file = '0022cae0ffb0ee3d8fce63d6d8cdc69f.json';
      const dataPath = resolve(__dirname, '../__factories__', file);
      const data = JSON.parse(readFileSync(dataPath));
      commander = await Commander.import(data);
      await Tactics.importAll([data]);
    });

    /*
    afterEach(async () => {
      await Commander.deleteMany({});
      await Tactics.deleteMany({});
    });
     */

    it('commander has one specific tactics', async () => {
      const subject = await commander.specificTactics();
      expect(subject).not.toBeNull();
      expect(subject.identifier).toBe('fd5bad37f57c3ea79808e75b9acd64ae');
      expect(subject.ownerIds).toContain('0022cae0ffb0ee3d8fce63d6d8cdc69f');
    });
  });
});
