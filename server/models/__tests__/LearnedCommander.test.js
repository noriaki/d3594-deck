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
      commander = '0022cae0ffb0ee3d8fce63d6d8cdc69f'; // 蒋琬
      additionalTactics = [
        'b77da2245a0a101d91471ef95bef8f35', // 駆逐
        '2d3a4d3d6f2385138f5369e4e39f185e', // 回避
      ];
    });

    it('commander has associates commander, tactics, additionalTactics', async () => {
      const { identifier } = await LearnedCommander.createAssociation(
        commander, additionalTactics
      );
      const subject = await LearnedCommander.findById(identifier);

      expect(subject).not.toBeNull();
      expect(subject).toHaveProperty(
        'identifier', 'c7548c9fd014798fbcf40e593fe58ece');
      expect(subject.commander).toBeInstanceOf(Commander);
      expect(subject.commander).toHaveProperty(
        'identifier', '0022cae0ffb0ee3d8fce63d6d8cdc69f');
      expect(subject.tactics).toBeInstanceOf(Tactics);
      expect(subject.tactics).toHaveProperty(
        'identifier', 'fd5bad37f57c3ea79808e75b9acd64ae');
      expect(subject.additionalTactics).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            identifier: '2d3a4d3d6f2385138f5369e4e39f185e',
          }),
          expect.objectContaining({
            identifier: 'b77da2245a0a101d91471ef95bef8f35',
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
          'c7548c9fd014798fbcf40e593fe58ece'
        );
        expect(subject.humanize).toBe(
          '★3・蒋琬・蜀・歩 (駆逐, 回避)'
        );
      });

      it('set single tactics', async () => {
        await LearnedCommander.createAssociation(
          commander, [additionalTactics[0], null]
        );
        const subject = await LearnedCommander.findById(
          'b7d62259d10b4a5b5da22c25f233ac51'
        );
        expect(subject.humanize).toBe(
          '★3・蒋琬・蜀・歩 (駆逐, 未習得)'
        );
      });

      it('set single tactics skip one', async () => {
        await LearnedCommander.createAssociation(
          commander, [null, additionalTactics[1]]
        );
        const subject = await LearnedCommander.findById(
          '7f4d44c7a3ac54aeeaac2284db634388'
        );
        expect(subject.humanize).toBe(
          '★3・蒋琬・蜀・歩 (未習得, 回避)'
        );
      });
    });
  });
});
