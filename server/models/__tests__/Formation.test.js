import { resolve } from 'path';
import { readFileSync } from 'fs';
import LearnedCommander from '../LearnedCommander';
import Commander from '../Commander';
import Tactics from '../Tactics';
import Formation from '../Formation';

process.env.TEST_SUITE = 'model-test-Formation';

describe('LearnedCommander association model', () => {
  describe('create associate', () => {
    beforeEach(async () => {
      const files = [
        '0022cae0ffb0ee3d8fce63d6d8cdc69f',
        '6709e590857413afa7934777258e9d2f',
        'b31f84c829733146801b5935d7891e73',
      ];
      const data = files.map((basename) => {
        const file = `${basename}.json`;
        const dataPath = resolve(__dirname, '../../../data/commanders', file);
        return JSON.parse(readFileSync(dataPath));
      });
      await Commander.importAll(data);
      await Tactics.importAll(data);
      await Promise.all(files.map(async (id, i) => {
        const commander = await Commander.findById(id);
        await LearnedCommander.createAssociation(
          commander,
          await Tactics.find({ origin: '分析' }).sort('_id').limit(2).skip(i)
        );
      }));
    });

    it('ret: formation has associates commanders', async () => {
      const expectedIds = [
        '2f502d39145d35259eff1878cc78187d',
        '724e437dcc3793990ee83726be27a3bb',
        'a7a476ff14e40130b89ba17a3d59b56a',
      ];
      const commanders = await LearnedCommander.where('_id').in(expectedIds);
      await Formation.createAssociation(commanders, 'test');

      const subject = await Formation.findOne().populate('commanders');
      expect(subject).not.toBeNull();
      expect(subject.name).toBe('test');
      subject.commanders.forEach((commander, index) => {
        expect(commander).toHaveProperty('_id', expectedIds[index]);
      });
    });
  });
});
