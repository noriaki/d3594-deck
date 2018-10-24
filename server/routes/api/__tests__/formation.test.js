import { resolve } from 'path';
import { readFileSync } from 'fs';
import { get } from 'microrouter';
import { createServer } from 'microrouter-test-server';

import Commander from '../../../models/Commander';
import Tactics from '../../../models/Tactics';

import formationRouters from '../formation';
import Formation from '../../../models/Formation';

describe('Routes: `/f`', () => {
  let server;
  const routes = [
    get('/f/:id', formationRouters.show),
  ];

  beforeEach(async () => {
    server = await createServer(routes);
  });

  afterEach(async () => {
    await server.close();
  });

  describe('get', () => {
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
        const dataPath = resolve(
          __dirname, '../../../models/__factories__', file
        );
        return JSON.parse(readFileSync(dataPath));
      });
      await Commander.importAll(data);
      await Tactics.importAll(data);
    });

    it('show formation (/f/:id)', async () => {
      await Formation.importSampleData();
      const id = '43e0f069ab00049908ab34390a9c45ca';
      const result = JSON.parse(await server.get(`/f/${id}`));
      expect(result).toHaveProperty('name', '大都督（呉レンジャー）');
    });
  });
});
