import LearnedCommander from '../LearnedCommander';
import Commander from '../Commander';
import Tactics from '../Tactics';

import { setupDB, teardownDB } from '../../../jest.helpers';

process.env.TEST_SUITE = 'model-test-LearnedCommander';

describe('LearnedCommander association model', () => {
  describe('create associate', () => {
    beforeEach(setupDB);
    afterEach(teardownDB);

    let commander;
    let additionalTactics;
    beforeEach(async () => {
      const commanderId = '0022cae0ffb0ee3d8fce63d6d8cdc69f'; // 蒋琬
      const tacticsIds = [
        'b77da2245a0a101d91471ef95bef8f35', // 駆逐
        '2d3a4d3d6f2385138f5369e4e39f185e', // 回避
      ];
      commander = await Commander.findById(commanderId);
      additionalTactics = await Tactics.where('_id').in(tacticsIds);
    });

    it('commander has associates commander, tactics, additionalTactics', async () => {
      const identifier = await LearnedCommander.createAssociation(
        commander, additionalTactics
      );
      const subject = await LearnedCommander.findById(identifier);
      expect(subject).not.toBeNull();
      expect(subject).toHaveProperty(
        'identifier', 'a7a476ff14e40130b89ba17a3d59b56a');
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

    describe('`.humanize` returning pretty text human friendly', () => {
      it('basic case, complete learned commander', async () => {
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

      it('set single tactics', async () => {
        await LearnedCommander.createAssociation(
          commander, [additionalTactics[0]]
        );
        const subject = await LearnedCommander.findById(
          'b92aba989efd73562c82e9e7c4047106'
        );
        expect(subject.humanize).toBe(
          '★3・蒋琬・蜀・歩 (回避, 未習得)'
        );
      });

      it('set single tactics skip one', async () => {
        await LearnedCommander.createAssociation(
          commander, [null, additionalTactics[1]]
        );
        const subject = await LearnedCommander.findById(
          'd5a6570a48bc98d2ef9bd8c6ff2040ec'
        );
        expect(subject.humanize).toBe(
          '★3・蒋琬・蜀・歩 (未習得, 駆逐)'
        );
      });
    });
  });
});
