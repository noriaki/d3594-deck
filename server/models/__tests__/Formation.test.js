import LearnedCommander from '../LearnedCommander';
import Formation from '../Formation';
import { md5 } from '../concerns/identify';

import { setupDB, teardownDB } from '../../../jest.helpers';

process.env.TEST_SUITE = 'model-test-Formation';

describe('Formation association model', () => {
  describe('initialize', () => {
    it('instance has 3 initial commanders', () => {
      const { commanders: subjects } = new Formation();
      expect(subjects).toHaveLength(3);
      subjects.forEach(subject => expect(subject).toBeNull());
    });
  });

  describe('with imported data', () => {
    beforeEach(setupDB);
    afterEach(teardownDB);

    describe('create associate', () => {
      beforeEach(async () => {
        await Formation.deleteMany({});
        await LearnedCommander.deleteMany({});
        const commanderIds = [
          '6709e590857413afa7934777258e9d2f', // 孫堅
          'b31f84c829733146801b5935d7891e73', // 董荼那
          '0022cae0ffb0ee3d8fce63d6d8cdc69f', // 蒋琬
        ];
        const tacticsIds = [
          [
            'b77da2245a0a101d91471ef95bef8f35', // 駆逐
            'b7f524a87084af9715720d1c7e506e28', // 戦必断金
          ],
          [
            'b7f524a87084af9715720d1c7e506e28', // 戦必断金
            'f299be62db77c354324a51175c49e0b0', // 頑抗
          ],
          [
            '2d3a4d3d6f2385138f5369e4e39f185e', // 回避
            'b77da2245a0a101d91471ef95bef8f35', // 駆逐
          ],
        ];
        await Promise.all(commanderIds.map(
          (commanderId, i) => (
            LearnedCommander.createAssociation(commanderId, tacticsIds[i])
          )
        ));
      });

      it('ret: formation has associates commanders', async () => {
        const expectedIds = [
          '2f502d39145d35259eff1878cc78187d',
          '724e437dcc3793990ee83726be27a3bb',
          'a7a476ff14e40130b89ba17a3d59b56a',
        ];
        const commanders = await LearnedCommander.where('_id').in(expectedIds);
        await Formation.createAssociation(commanders, 'test');

        const subject = await Formation.findOne();
        expect(subject).not.toBeNull();
        expect(subject._id).toBe(md5(expectedIds.join()));
        expect(subject.name).toBe('test');
        subject.commanders.forEach((commander, index) => {
          expect(commander).toHaveProperty('_id', expectedIds[index]);
        });
        const expectedStringId = [
          '本営：★5・孫堅・呉・歩 (駆逐, 戦必断金)',
          '中衛：★3・董荼那・群・騎 (戦必断金, 頑抗)',
          '前衛：★3・蒋琬・蜀・歩 (回避, 駆逐)',
        ].join('\n');
        expect(subject.humanize).toBe(expectedStringId);
      });

      it('when passed 2 commanders', async () => {
        const expectedIds = [
          '2f502d39145d35259eff1878cc78187d',
          '724e437dcc3793990ee83726be27a3bb',
        ];
        const commanders = await LearnedCommander.where('_id').in(expectedIds);
        await Formation.createAssociation(commanders, 'test');

        const subject = await Formation.findOne();
        expect(subject).not.toBeNull();
        expect(subject._id).toBe(md5([...expectedIds, null].join()));
        expect(subject.name).toBe('test');
        expect(subject.commanders[0]).toHaveProperty('_id', expectedIds[0]);
        expect(subject.commanders[1]).toHaveProperty('_id', expectedIds[1]);
        expect(subject.commanders[2]).toBeNull();
        const expectedStringId = [
          '本営：★5・孫堅・呉・歩 (駆逐, 戦必断金)',
          '中衛：★3・董荼那・群・騎 (戦必断金, 頑抗)',
          '前衛：未配置',
        ].join('\n');
        expect(subject.humanize).toBe(expectedStringId);
      });

      it('when passed 2 commanders, that is including `null`', async () => {
        const expectedIds = [
          '2f502d39145d35259eff1878cc78187d',
          null,
          'a7a476ff14e40130b89ba17a3d59b56a',
        ];
        const commanders = await Promise.all(expectedIds.map(
          id => (id ? LearnedCommander.findById(id) : null)
        ));
        await Formation.createAssociation(commanders, 'test');

        const subject = await Formation.findOne();
        expect(subject).not.toBeNull();
        expect(subject._id).toBe(md5(expectedIds.join()));
        expect(subject.name).toBe('test');
        expect(subject.commanders).toHaveLength(3);
        expect(subject.commanders[0]).toHaveProperty('_id', expectedIds[0]);
        expect(subject.commanders[1]).toBeNull();
        expect(subject.commanders[2]).toHaveProperty('_id', expectedIds[2]);
        const expectedStringId = [
          '本営：★5・孫堅・呉・歩 (駆逐, 戦必断金)',
          '中衛：未配置',
          '前衛：★3・蒋琬・蜀・歩 (回避, 駆逐)',
        ].join('\n');
        expect(subject.humanize).toBe(expectedStringId);
      });

      it('when passed 1 commander', async () => {
        const expectedIds = [
          '2f502d39145d35259eff1878cc78187d',
        ];
        const commanders = await LearnedCommander.where('_id').in(expectedIds);
        await Formation.createAssociation(commanders, 'test');

        const subject = await Formation.findOne();
        expect(subject).not.toBeNull();
        expect(subject._id).toBe(md5([...expectedIds, null, null].join()));
        expect(subject.name).toBe('test');
        expect(subject.commanders[0]).toHaveProperty('_id', expectedIds[0]);
        expect(subject.commanders[1]).toBeNull();
        expect(subject.commanders[2]).toBeNull();
        const expectedStringId = [
          '本営：★5・孫堅・呉・歩 (駆逐, 戦必断金)',
          '中衛：未配置',
          '前衛：未配置',
        ].join('\n');
        expect(subject.humanize).toBe(expectedStringId);
      });
    });

    describe('.importSampleData', () => {
      it('create a formation', async () => {
        const subject = await Formation.findById(
          '43e0f069ab00049908ab34390a9c45ca'
        );
        expect(subject).not.toBeNull();
        expect(subject.name).toBe('大都督（呉レンジャー）');
        const expectedStringId = [
          '本営：★5・陸遜(S2)・呉・歩 (不攻, 十面埋伏)',
          '中衛：★5・周瑜・呉・弓 (水淹七軍, 渾水摸魚)',
          '前衛：★5・呂蒙・呉・弓 (掎角之勢, 反計之策)',
        ].join('\n');
        expect(subject.humanize).toBe(expectedStringId);
      });

      it('.siege is sum of commanders siege', async () => {
        const subject = await Formation.findById(
          '43e0f069ab00049908ab34390a9c45ca'
        );
        expect(subject.siege).toBe(196);
      });

      it('.velocity is min of commanders velocity', async () => {
        const subject = await Formation.findById(
          '43e0f069ab00049908ab34390a9c45ca'
        );
        expect(subject.velocity).toBe(62);
      });

      it('.cost is sum of commanders cost', async () => {
        const subject = await Formation.findById(
          '43e0f069ab00049908ab34390a9c45ca'
        );
        expect(subject.cost).toBe(9.5);
      });
    });
  });
});
