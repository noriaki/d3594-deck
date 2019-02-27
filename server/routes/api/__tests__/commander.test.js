import { get } from 'microrouter';
import { createServer } from 'microrouter-test-server';

import commanderRouters from '../commander';
import Commander from '../../../models/Commander';
import {
  baseArmy,
  baseTeam,
  baseDistance,
  baseCost,
} from '../../../models/classes/Commander';

import { setupDB, teardownDB } from '../../../../jest.helpers';

process.env.TEST_SUITE = 'route-test-api-commander';

describe('Routes: `/c`', () => {
  beforeEach(setupDB);
  afterEach(teardownDB);

  beforeEach(async () => {
    const commanderIds = [
      '30f401ff9134eb74663697174aa3ff10', // 周瑜,呉,弓,5
      'e0f015ef64ca6eef2ed4ad5debcd3fde', // 陸遜(S2),呉,歩,5
      'a9f7deacd67d08a2ea7ff2d4255b4171', // 張角,群,騎,5
      'c78a48266ec5166844c7df427834a520', // 張春華,魏,弓,5
      '5abed51fa17562728f0b54288c547c56', // 朱儁,漢,弓,4
      '0022cae0ffb0ee3d8fce63d6d8cdc69f', // 蒋琬,蜀,歩,3
    ];
    await Commander.where('identifier').nin(commanderIds).deleteMany();
  });

  let server;
  const routes = [
    get('/c', commanderRouters.search),
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
          rarity: [5, 4, 3],
          army: baseArmy,
          team: baseTeam,
          distance: baseDistance,
          cost: baseCost,
        },
      };
    });

    it('returning sorted results', async () => {
      const options = { qs: query, json: true };
      /*
       * sort by:
       *   1. rarity(desc)
       *   2. cost(desc)
       *   3. team['群', '魏', '蜀', '呉', '漢']
       *   4. army['弓', '歩', '騎']
       *   5. identifier(asc)
       */
      const expectedIds = [
        '30f401ff9134eb74663697174aa3ff10', // 周瑜,呉,弓,5
        'e0f015ef64ca6eef2ed4ad5debcd3fde', // 陸遜(S2),呉,歩,5
        'a9f7deacd67d08a2ea7ff2d4255b4171', // 張角,群,騎,5
        'c78a48266ec5166844c7df427834a520', // 張春華,魏,弓,5
        '5abed51fa17562728f0b54288c547c56', // 朱儁,漢,弓,4
        '0022cae0ffb0ee3d8fce63d6d8cdc69f', // 蒋琬,蜀,歩,3
      ];
      const subjects = await server.get('/c', options);
      expect(subjects).toHaveLength(expectedIds.length);
      expect(subjects.map(s => s.identifier)).toEqual(expectedIds);
    });

    it('returning valid object shape', async () => {
      query.text = '周瑜';
      const options = { qs: query, json: true };
      const expectedKeys = [
        '_id', 'id', 'identifier', 'name', 'special', 'image',
        'imageURL', 'nameSvgURL', 'armySvgURL', 'teamSvgURL',
      ].sort();
      const subjects = await server.get('/c', options);
      expect(subjects).toHaveLength(1);
      const subject = Object.keys(subjects[0]).sort();
      expect(subject).toEqual(expectedKeys);
    });

    it('retrieve by text search (column `name`)', async () => {
      query.text = '張';
      const options = { qs: query, json: true };
      const expectedIds = [
        'a9f7deacd67d08a2ea7ff2d4255b4171', // 張角,群,騎,5
        'c78a48266ec5166844c7df427834a520', // 張春華,魏,弓,5
      ];
      const subjects = await server.get('/c', options);
      expect(subjects).toHaveLength(expectedIds.length);
      expect(subjects).toEqual(
        expect.arrayContaining(
          expectedIds.map(
            identifier => expect.objectContaining({ identifier })
          )
        )
      );
    });

    it('retrieve by `rarity` filter', async () => {
      query.filter.rarity = [4, 3];
      const options = { qs: query, json: true };
      const expectedIds = [
        '0022cae0ffb0ee3d8fce63d6d8cdc69f', // 蒋琬,蜀,歩,3
        '5abed51fa17562728f0b54288c547c56', // 朱儁,漢,弓,4
      ];
      const subjects = await server.get('/c', options);
      expect(subjects).toHaveLength(expectedIds.length);
      expect(subjects).toEqual(
        expect.arrayContaining(
          expectedIds.map(
            identifier => expect.objectContaining({ identifier })
          )
        )
      );
    });

    it('retrieve by `army` filter', async () => {
      query.filter.army = ['歩'];
      const options = { qs: query, json: true };
      const expectedIds = [
        '0022cae0ffb0ee3d8fce63d6d8cdc69f', // 蒋琬,蜀,歩,3
        'e0f015ef64ca6eef2ed4ad5debcd3fde', // 陸遜(S2),呉,歩,5
      ];
      const subjects = await server.get('/c', options);
      expect(subjects).toHaveLength(expectedIds.length);
      expect(subjects).toEqual(
        expect.arrayContaining(
          expectedIds.map(
            identifier => expect.objectContaining({ identifier })
          )
        )
      );
    });

    it('retrieve by `team` filter', async () => {
      query.filter.team = ['呉'];
      const options = { qs: query, json: true };
      const expectedIds = [
        '30f401ff9134eb74663697174aa3ff10', // 周瑜,呉,弓,5
        'e0f015ef64ca6eef2ed4ad5debcd3fde', // 陸遜(S2),呉,歩,5
      ];
      const subjects = await server.get('/c', options);
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
        const subjects = await server.get('/c', options);
        expect(subjects).toHaveLength(0);
        expect(subjects).toEqual([]);
      });

      it('no match `filter.rarity`', async () => {
        query.filter.rarity = [];
        const options = { qs: query, json: true };
        const subjects = await server.get('/c', options);
        expect(subjects).toHaveLength(0);
        expect(subjects).toEqual([]);
      });

      it('no match `filter.army`', async () => {
        query.filter.army = [];
        const options = { qs: query, json: true };
        const subjects = await server.get('/c', options);
        expect(subjects).toHaveLength(0);
        expect(subjects).toEqual([]);
      });

      it('no match `filter.team`', async () => {
        query.filter.team = [];
        const options = { qs: query, json: true };
        const subjects = await server.get('/c', options);
        expect(subjects).toHaveLength(0);
        expect(subjects).toEqual([]);
      });
    });
  });
});
