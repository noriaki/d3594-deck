import { get, post } from 'microrouter';
import { createServer } from 'microrouter-test-server';

import formationRouters from '../formation';
import Formation from '../../../models/Formation';

import { setupDB, teardownDB } from '../../../../jest.helpers';

process.env.TEST_SUITE = 'route-test-api-formation';

describe('Routes: `/f`', () => {
  beforeEach(setupDB);
  afterEach(teardownDB);

  let server;
  const routes = [
    get('/f/:id', formationRouters.show),
    post('/f', formationRouters.create),
  ];

  beforeEach(async () => {
    server = await createServer(routes);
  });

  afterEach(async () => {
    await server.close();
  });

  describe('get (GET /f/:id)', () => {
    it('show formation', async () => {
      const id = '43e0f069ab00049908ab34390a9c45ca';
      const result = JSON.parse(await server.get(`/f/${id}`));
      expect(result).toHaveProperty('name', '大都督（呉レンジャー）');
    });
  });

  describe('create (POST /f)', () => {
    beforeEach(async () => {
      await Formation.deleteMany({});
    });

    let payload;
    beforeEach(() => {
      payload = [
        {
          // 陸遜S2
          commander: { identifier: 'e0f015ef64ca6eef2ed4ad5debcd3fde' },
          additionalTactics: [
            { identifier: '3f5a7a77ecd8df99438d1faf9221d5e0' }, // 不攻
            { identifier: '57ab3a19350045df5dfcf65ed187792a' }, // 十面埋伏
          ],
        },
        {
          // 周瑜
          commander: { identifier: '30f401ff9134eb74663697174aa3ff10' },
          additionalTactics: [
            { identifier: '270f3fbedde0140b6c679b17d79df385' }, // 水淹七軍
            { identifier: 'e4dedbfa9c3109173f166c83c4f8e5d6' }, // 渾水獏魚
          ],
        },
        {
          // 呂蒙
          commander: { identifier: '29fb183da598388eee0cd2f73832de8e' },
          additionalTactics: [
            { identifier: '967e6d8582235fe4682e46708c6f0752' }, // 掎角之勢
            { identifier: 'c44f950c80d01601ec8bf31f75d89a40' }, // 反計之策
          ],
        },
      ];
    });

    it('a formation in new commanders who has tactics', async () => {
      const expectedId = '43e0f069ab00049908ab34390a9c45ca';
      const results = await server.post('/f', {
        json: true, resolveWithFullResponse: true, body: payload,
      });
      expect(results).toHaveProperty('statusCode', 201);
      expect(results).toHaveProperty('body.identifier', expectedId);
    });

    it('a formation in exists commanders who has tactics', async () => {
      const expectedId = '43e0f069ab00049908ab34390a9c45ca';
      const results = await server.post('/f', {
        json: true, resolveWithFullResponse: true, body: payload,
      });
      expect(results).toHaveProperty('statusCode', 201);
      expect(results).toHaveProperty('body.identifier', expectedId);
    });

    it('a formation in one less commander, one less tactics', async () => {
      payload = [payload[0], null, payload[1]];
      payload[2].additionalTactics[0] = null;
      const expectedId = '688d618a2fd4261edb5b972681873209';
      const results = await server.post('/f', {
        json: true, resolveWithFullResponse: true, body: payload,
      });
      expect(results).toHaveProperty('statusCode', 201);
      expect(results).toHaveProperty('body.identifier', expectedId);
    });

    it('nothing, returning exist formation when already saved', async () => {
      await Formation.importSampleData();
      const expectedId = '43e0f069ab00049908ab34390a9c45ca';
      const results = await server.post('/f', {
        json: true, resolveWithFullResponse: true, body: payload,
      });
      expect(results).toHaveProperty('statusCode', 200);
      expect(results).toHaveProperty('body.identifier', expectedId);
    });
  });
});
