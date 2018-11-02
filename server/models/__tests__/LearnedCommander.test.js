import { resolve } from 'path';
import { readFileSync } from 'fs';
import LearnedCommander from '../LearnedCommander';
import Commander from '../Commander';
import Tactics from '../Tactics';

process.env.TEST_SUITE = 'model-test-LearnedCommander';

describe('LearnedCommander association model', () => {
  describe('create associate', () => {
    beforeEach(async () => {
      const file = '0022cae0ffb0ee3d8fce63d6d8cdc69f.json';
      const dataPath = resolve(__dirname, '../__factories__', file);
      const data = JSON.parse(readFileSync(dataPath));
      await Commander.importData(data);
      await Tactics.importAll([data]);
    });

    it('commander has associates commander, tactics, additionalTactics', async () => {
      const commander = await Commander.findById('0022cae0ffb0ee3d8fce63d6d8cdc69f');
      const additionalTactics = await Tactics.find({ origin: '分析' }).sort('_id');
      await LearnedCommander.createAssociation(
        commander, additionalTactics
      );
      const subject = await LearnedCommander.findById(
        'a7a476ff14e40130b89ba17a3d59b56a'
      );
      expect(subject).not.toBeNull();
      expect(subject.commander).toBeInstanceOf(Commander);
      expect(subject.commander).toHaveProperty(
        '_id', '0022cae0ffb0ee3d8fce63d6d8cdc69f');
      expect(subject.tactics).toBeInstanceOf(Tactics);
      expect(subject.tactics).toHaveProperty(
        '_id', 'fd5bad37f57c3ea79808e75b9acd64ae');
      expect(subject.additionalTactics).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            _id: '2d3a4d3d6f2385138f5369e4e39f185e',
          }),
          expect.objectContaining({
            _id: 'b77da2245a0a101d91471ef95bef8f35',
          }),
        ])
      );
    });

    it('`.humanize` returning pretty text human friendly', async () => {
      const commander = await Commander.findById(
        '0022cae0ffb0ee3d8fce63d6d8cdc69f');
      const additionalTactics = await Tactics.find({
        origin: '分析',
      }).sort('_id');
      await LearnedCommander.createAssociation(
        commander, additionalTactics
      );
      const subject = await LearnedCommander.findById(
        'a7a476ff14e40130b89ba17a3d59b56a'
      );

      expect(subject.humanize).toBe(
        '★3・蒋琬・蜀・歩 (回避, 駆逐)'
      );
    });
  });
});
