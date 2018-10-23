import { resolve } from 'path';
import { readFileSync } from 'fs';
import LearnedCommander from '../LearnedCommander';
import Commander from '../Commander';
import Tactics from '../Tactics';
import Formation from '../Formation';
import { md5 } from '../concerns/identify';

process.env.TEST_SUITE = 'model-test-Formation';

describe('Formation association model', () => {
  describe('create associate', () => {
    beforeEach(async () => {
      const files = [
        '0022cae0ffb0ee3d8fce63d6d8cdc69f',
        '6709e590857413afa7934777258e9d2f',
        'b31f84c829733146801b5935d7891e73',
      ];
      const data = files.map((basename) => {
        const file = `${basename}.json`;
        const dataPath = resolve(__dirname, '../__factories__', file);
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
      expect(await subject.toString()).toBe(expectedStringId);
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
      expect(subject._id).toBe(md5(expectedIds.join()));
      expect(subject.name).toBe('test');
      subject.commanders.forEach((commander, index) => {
        expect(commander).toHaveProperty('_id', expectedIds[index]);
      });
      const expectedStringId = [
        '本営：★5・孫堅・呉・歩 (駆逐, 戦必断金)',
        '中衛：★3・董荼那・群・騎 (戦必断金, 頑抗)',
        '前衛：無し',
      ].join('\n');
      expect(await subject.toString()).toBe(expectedStringId);
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
        '中衛：無し',
        '前衛：★3・蒋琬・蜀・歩 (回避, 駆逐)',
      ].join('\n');
      expect(await subject.toString()).toBe(expectedStringId);
    });

    it('when passed 1 commander', async () => {
      const expectedIds = [
        '2f502d39145d35259eff1878cc78187d',
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
        '中衛：無し',
        '前衛：無し',
      ].join('\n');
      expect(await subject.toString()).toBe(expectedStringId);
    });
  });

  describe('.importSampleData', () => {
    beforeEach(async () => {
      const files = [
        'e0f015ef64ca6eef2ed4ad5debcd3fde', // S2陸遜
        '30f401ff9134eb74663697174aa3ff10', // 周瑜
        '29fb183da598388eee0cd2f73832de8e', // 呂蒙
        '9daf2ffe7eec142b9231445a8ee7d831', // 水淹七軍
        'c78a48266ec5166844c7df427834a520', // 渾水摸魚
        'a083468786c98194d8955d0aa7085a56', // 掎角之勢
        'a9f7deacd67d08a2ea7ff2d4255b4171', // 反計之策
      ];
      const data = files.map((basename) => {
        const file = `${basename}.json`;
        const dataPath = resolve(__dirname, '../__factories__', file);
        return JSON.parse(readFileSync(dataPath));
      });
      await Commander.importAll(data);
      await Tactics.importAll(data);
    });

    it('create a formation', async () => {
      await Formation.importSampleData();
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
      expect(await subject.toString()).toBe(expectedStringId);
    });
  });
});
