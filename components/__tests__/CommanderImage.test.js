import { resolve } from 'path';
import { readFileSync } from 'fs';
import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import Commander from '../../server/models/Commander';
import Tactics from '../../server/models/Tactics';
import Formation from '../../server/models/Formation';

import { CommanderImage as CommanderImageComponent } from '../CommanderImage';

process.env.TEST_SUITE = 'component-test-CommanderImage';

describe('CommanderImage component', () => {
  let shallow;
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
        __dirname, '../../server/models/__factories__', file
      );
      return JSON.parse(readFileSync(dataPath));
    });
    await Commander.importAll(data);
    await Tactics.importAll(data);
    await Formation.importSampleData();
    shallow = createShallow();
  });

  it('pass correct commander prop', async () => {
    const commander = await Commander.findById('e0f015ef64ca6eef2ed4ad5debcd3fde');
    const wrapper = shallow(
      <CommanderImageComponent commander={commander} classes={{}} />
    );
    const subject = wrapper.find('img');
    expect(subject).toExist();
    expect(subject).toHaveProp('src', commander.imageURL);
    expect(subject).toHaveProp('alt', commander.name);
  });

  it('pass `null` commander prop', () => {
    const wrapper = shallow(
      <CommanderImageComponent commander={null} classes={{}} />
    );
    const subject = wrapper.find('img');
    expect(subject).toExist();
    expect(subject).toHaveProp('src', '/static/images/default-commander.png');
    expect(subject).toHaveProp('alt', '未配置');
  });

  it('pass `undefined` commander prop', () => {
    const wrapper = shallow(
      <CommanderImageComponent classes={{}} />
    );
    const subject = wrapper.find('img');
    expect(subject).toExist();
    expect(subject).toHaveProp('src', '/static/images/default-commander.png');
    expect(subject).toHaveProp('alt', '未配置');
  });
});
