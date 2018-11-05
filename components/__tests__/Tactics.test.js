import { resolve } from 'path';
import { readFileSync } from 'fs';
import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Commander from '../../server/models/Commander';
import Tactics from '../../server/models/Tactics';
import Formation from '../../server/models/Formation';

import { Tactics as TacticsComponent } from '../Tactics';

process.env.TEST_SUITE = 'component-test-Tactics';

describe('Tactics component', () => {
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

  it('pass correct tactics prop', async () => {
    const tactics = await Tactics.findById('e4dedbfa9c3109173f166c83c4f8e5d6');
    const wrapper = shallow(
      <TacticsComponent tactics={tactics} classes={{}} />
    );
    const subject = wrapper.find(CardMedia);
    expect(subject).toExist();
    expect(subject).toHaveProp('src', tactics.imageURL);
    expect(subject).toHaveProp('srcSet', tactics.imageSrcSet.join(', '));
    expect(subject).toHaveProp('alt', tactics.name);
    expect(subject).toHaveProp('title', tactics.name);
  });

  it('pass `null` tactics prop', () => {
    const srcset = [
      '/static/images/default-tactics.png',
      '/static/images/default-tactics@2x.png 2x',
      '/static/images/default-tactics@3x.png 3x',
    ];
    const expected = {
      src: srcset[0],
      srcSet: srcset.join(', '),
      name: '未習得',
    };
    const wrapper = shallow(
      <TacticsComponent tactics={null} classes={{}} />
    );
    const subject = wrapper.find(CardMedia);
    expect(subject).toExist();
    expect(subject).toHaveProp('src', expected.src);
    expect(subject).toHaveProp('srcSet', expected.srcSet);
    expect(subject).toHaveProp('alt', expected.name);
    expect(subject).toHaveProp('title', expected.name);
  });

  it('pass `undefined` tactics prop', () => {
    const srcset = [
      '/static/images/default-tactics.png',
      '/static/images/default-tactics@2x.png 2x',
      '/static/images/default-tactics@3x.png 3x',
    ];
    const expected = {
      src: srcset[0],
      srcSet: srcset.join(', '),
      name: '未習得',
    };
    const wrapper = shallow(
      <TacticsComponent classes={{}} />
    );
    const subject = wrapper.find(CardMedia);
    expect(subject).toExist();
    expect(subject).toHaveProp('src', expected.src);
    expect(subject).toHaveProp('srcSet', expected.srcSet);
    expect(subject).toHaveProp('alt', expected.name);
    expect(subject).toHaveProp('title', expected.name);
  });
});
