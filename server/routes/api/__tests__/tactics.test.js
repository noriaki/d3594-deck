import { get } from 'microrouter';
import { createServer } from 'microrouter-test-server';

import tacticsRouters from '../tactics';
import Tactics from '../../../models/Tactics';

import { setupDB, teardownDB } from '../../../../jest.helpers';

process.env.TEST_SUITE = 'route-test-api-tactics';

xdescribe('Routes: `/t`', () => {
  beforeEach(setupDB);
  afterEach(teardownDB);

  it('console', async () => {
    const tactics = await Tactics.find(
      { origin: { $in: ['典蔵', '典籍', '季専用', '分析'] } },
      'identifier name origin type stock permissions sortKey',
      { sort: 'sortKey' }
    );
    console.log(tactics.map(
      t => `'${t.identifier}', // ${t.name}-${t.origin}(${t.type})${t.permissions.join('')}`
    ).join('\n'));
    console.log(tactics.length);
    console.log(tactics.length);
  });
});

describe('Routes: `/t`', () => {
  beforeEach(setupDB);
  afterEach(teardownDB);

  beforeEach(async () => {
    const tacticsIds = [
      '89e523917d80d64315b7479efee8f98b', // 桃園結義-典蔵(指揮)
      '19b519c1849ff3d5171138f205e6dbd7', // 形兵之極-典籍(指揮)
      'ae8a6d9abc29bcd38ca84ec1553f8f62', // 形兵列陣-季専用(指揮)
      '3f5a7a77ecd8df99438d1faf9221d5e0', // 不攻-分析(指揮)
      '57ab3a19350045df5dfcf65ed187792a', // 十面埋伏-分析(主動)
      '270f3fbedde0140b6c679b17d79df385', // 水淹七軍-分析(主動)
      'e4dedbfa9c3109173f166c83c4f8e5d6', // 渾水摸魚-分析(主動)
      '7f13b5ee6d3d5983e272b3a719edba2e', // 火積-分析(追撃)弓
      'b77da2245a0a101d91471ef95bef8f35', // 駆逐-分析(追撃)
      'da77fbec8ae42d646aca4e1959dc6378', // 健卒不殆-分析(受動)弓歩
    ];
    await Tactics.where('identifier').nin(tacticsIds).deleteMany();
  });

  let server;
  const routes = [
    get('/t', tacticsRouters.search),
  ];

  beforeEach(async () => {
    server = await createServer(routes);
  });

  afterEach(async () => {
    await server.close();
  });

  describe('search', () => {
    let query;
    beforeEach(() => {
      query = {
        text: '',
        filter: {
          origin: ['典蔵', '典籍', '季専用', '分析'],
          type: ['指揮', '主動', '追撃', '受動'],
          permissions: ['弓', '歩', '騎'],
        },
      };
    });

    it('returning sorted results', async () => {
      const options = { qs: query, json: true };
      /*
       * sort by:
       *   1. type['指揮', '主動', '追撃', '受動']
       *   2. origin['典蔵', '典籍', '季専用', '分析']
       *   3. stock(asc)
       *   4. stage.length(desc)
       *   5. identifier(asc)
       */
      const expectedIds = [
        '89e523917d80d64315b7479efee8f98b', // 桃園結義-典蔵(指揮)
        '19b519c1849ff3d5171138f205e6dbd7', // 形兵之極-典籍(指揮)
        'ae8a6d9abc29bcd38ca84ec1553f8f62', // 形兵列陣-季専用(指揮)
        '3f5a7a77ecd8df99438d1faf9221d5e0', // 不攻-分析(指揮)
        '57ab3a19350045df5dfcf65ed187792a', // 十面埋伏-分析(主動)
        '270f3fbedde0140b6c679b17d79df385', // 水淹七軍-分析(主動)
        'e4dedbfa9c3109173f166c83c4f8e5d6', // 渾水摸魚-分析(主動)
        '7f13b5ee6d3d5983e272b3a719edba2e', // 火積-分析(追撃)弓
        'b77da2245a0a101d91471ef95bef8f35', // 駆逐-分析(追撃)
        'da77fbec8ae42d646aca4e1959dc6378', // 健卒不殆-分析(受動)弓歩
      ];
      const subjects = await server.get('/t', options);
      expect(subjects).toHaveLength(expectedIds.length);
      expect(subjects.map(s => s.identifier)).toEqual(expectedIds);
    });

    it('returning valid object shape', async () => {
      query.text = '十面埋伏';
      const options = { qs: query, json: true };
      const expectedKeys = [
        '_id',
        'identifier',
        'name',
        'origin',
        'type',
        'permissions',
        'rate',
        'distance',
        'target',
        'description',
        'sortKey',
        'id',
        'imageURL',
        'imageSrcSet',
      ].sort();
      const subjects = await server.get('/t', options);
      expect(subjects).toHaveLength(1);
      const subject = Object.keys(subjects[0]).sort();
      expect(subject).toEqual(expectedKeys);
    });

    it('retrieve by text search (column `name`)', async () => {
      query.text = '水';
      const options = { qs: query, json: true };
      const expectedIds = [
        '270f3fbedde0140b6c679b17d79df385', // 水淹七軍-分析(主動)
        'e4dedbfa9c3109173f166c83c4f8e5d6', // 渾水摸魚-分析(主動)
      ];
      const subjects = await server.get('/t', options);
      expect(subjects).toHaveLength(expectedIds.length);
      expect(subjects).toEqual(
        expect.arrayContaining(
          expectedIds.map(
            identifier => expect.objectContaining({ identifier })
          )
        )
      );
    });

    it('retrieve by `origin` filter', async () => {
      query.filter.origin = ['分析'];
      const options = { qs: query, json: true };
      const expectedIds = [
        '3f5a7a77ecd8df99438d1faf9221d5e0', // 不攻-分析(指揮)
        '57ab3a19350045df5dfcf65ed187792a', // 十面埋伏-分析(主動)
        '270f3fbedde0140b6c679b17d79df385', // 水淹七軍-分析(主動)
        'e4dedbfa9c3109173f166c83c4f8e5d6', // 渾水摸魚-分析(主動)
        '7f13b5ee6d3d5983e272b3a719edba2e', // 火積-分析(追撃)弓
        'b77da2245a0a101d91471ef95bef8f35', // 駆逐-分析(追撃)
        'da77fbec8ae42d646aca4e1959dc6378', // 健卒不殆-分析(受動)弓歩
      ];
      const subjects = await server.get('/t', options);
      expect(subjects).toHaveLength(expectedIds.length);
      expect(subjects).toEqual(
        expect.arrayContaining(
          expectedIds.map(
            identifier => expect.objectContaining({ identifier })
          )
        )
      );
    });

    it('retrieve by `type` filter', async () => {
      query.filter.type = ['指揮'];
      const options = { qs: query, json: true };
      const expectedIds = [
        '89e523917d80d64315b7479efee8f98b', // 桃園結義-典蔵(指揮)
        '19b519c1849ff3d5171138f205e6dbd7', // 形兵之極-典籍(指揮)
        'ae8a6d9abc29bcd38ca84ec1553f8f62', // 形兵列陣-季専用(指揮)
        '3f5a7a77ecd8df99438d1faf9221d5e0', // 不攻-分析(指揮)
      ];
      const subjects = await server.get('/t', options);
      expect(subjects).toHaveLength(expectedIds.length);
      expect(subjects).toEqual(
        expect.arrayContaining(
          expectedIds.map(
            identifier => expect.objectContaining({ identifier })
          )
        )
      );
    });

    it('retrieve by `permissions` filter', async () => {
      query.filter.permissions = ['騎'];
      const options = { qs: query, json: true };
      const expectedIds = [
        '89e523917d80d64315b7479efee8f98b', // 桃園結義-典蔵(指揮)
        '19b519c1849ff3d5171138f205e6dbd7', // 形兵之極-典籍(指揮)
        'ae8a6d9abc29bcd38ca84ec1553f8f62', // 形兵列陣-季専用(指揮)
        '3f5a7a77ecd8df99438d1faf9221d5e0', // 不攻-分析(指揮)
        '57ab3a19350045df5dfcf65ed187792a', // 十面埋伏-分析(主動)
        '270f3fbedde0140b6c679b17d79df385', // 水淹七軍-分析(主動)
        'e4dedbfa9c3109173f166c83c4f8e5d6', // 渾水摸魚-分析(主動)
        'b77da2245a0a101d91471ef95bef8f35', // 駆逐-分析(追撃)
      ];
      const subjects = await server.get('/t', options);
      expect(subjects).toHaveLength(expectedIds.length);
      expect(subjects).toEqual(
        expect.arrayContaining(
          expectedIds.map(
            identifier => expect.objectContaining({ identifier })
          )
        )
      );
    });

    describe('returning `[]` when no matching', () => {
      it('no match `text`', async () => {
        query.text = 'no match';
        const options = { qs: query, json: true };
        const subjects = await server.get('/t', options);
        expect(subjects).toHaveLength(0);
        expect(subjects).toEqual([]);
      });

      it('no match `filter.origin`', async () => {
        query.filter.origin = [];
        const options = { qs: query, json: true };
        const subjects = await server.get('/t', options);
        expect(subjects).toHaveLength(0);
        expect(subjects).toEqual([]);
      });

      it('no match `filter.type`', async () => {
        query.filter.type = [];
        const options = { qs: query, json: true };
        const subjects = await server.get('/t', options);
        expect(subjects).toHaveLength(0);
        expect(subjects).toEqual([]);
      });

      it('no match `filter.permissions`', async () => {
        query.filter.permissions = [];
        const options = { qs: query, json: true };
        const subjects = await server.get('/t', options);
        expect(subjects).toHaveLength(0);
        expect(subjects).toEqual([]);
      });
    });
  });
});
