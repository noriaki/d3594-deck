import { resolve } from 'path';
import { readFileSync } from 'fs';
import { get } from 'microrouter';
import { createServer } from 'microrouter-test-server';

import commanderRouters from '../commander';
import Commander from '../../../models/Commander';

process.env.TEST_SUITE = 'route-test-api-commander';

describe('Routes: `/c`', () => {
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
    beforeEach(async () => {
      const files = [
        '0022cae0ffb0ee3d8fce63d6d8cdc69f', // 蒋琬,蜀,歩,3
        '30f401ff9134eb74663697174aa3ff10', // 周瑜,呉,弓,5
        '5abed51fa17562728f0b54288c547c56', // 朱儁,漢,弓,4
        'a9f7deacd67d08a2ea7ff2d4255b4171', // 張角,群,騎,5
        'c78a48266ec5166844c7df427834a520', // 張春華,魏,弓,5
        'e0f015ef64ca6eef2ed4ad5debcd3fde', // S2陸遜,呉,歩,5
      ];
      const data = files.map((basename) => {
        const file = `${basename}.json`;
        const dataPath = resolve(
          __dirname, '../../../models/__factories__', file
        );
        return JSON.parse(readFileSync(dataPath));
      });
      await Commander.importAll(data);
    });

    it('returning valid object shape', async () => {
      const options = { qs: { text: '周瑜' }, json: true };
      const expectedKeys = ['_id', 'identifier', 'name', 'imageURL'].sort();
      const subjects = await server.get('/c', options);
      expect(subjects).toHaveLength(1);
      const subject = Object.keys(subjects[0]).sort();
      expect(subject).toEqual(expectedKeys);
    });

    it('retrieve by text search (column `name`)', async () => {
      const options = {
        qs: {
          text: '張',
          // filter: {
          //   rarity: [5, 4, 3, 2, 1],
          //   army: ['弓', '歩', '騎'],
          //   team: ['群', '漢', '魏', '蜀', '呉'],
          // },
        },
        json: true,
      };
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
      const options = {
        qs: {
          filter: {
            rarity: [4, 3],
          },
        },
        json: true,
      };
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
      const options = {
        qs: {
          filter: {
            army: ['歩'],
          },
        },
        json: true,
      };
      const expectedIds = [
        '0022cae0ffb0ee3d8fce63d6d8cdc69f', // 蒋琬,蜀,歩,3
        'e0f015ef64ca6eef2ed4ad5debcd3fde', // S2陸遜,呉,歩,5
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
      const options = {
        qs: {
          filter: {
            team: ['呉'],
          },
        },
        json: true,
      };
      const expectedIds = [
        '30f401ff9134eb74663697174aa3ff10', // 周瑜,呉,弓,5
        'e0f015ef64ca6eef2ed4ad5debcd3fde', // S2陸遜,呉,歩,5
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
  });
});
