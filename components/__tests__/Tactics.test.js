import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';
import CardMedia from '@material-ui/core/CardMedia';

import Tactics from '../../server/models/Tactics';

import { TacticsComponent } from '../Tactics';

import { setupDB, teardownDB } from '../../jest.helpers';

process.env.TEST_SUITE = 'component-test-Tactics';

describe('Tactics component', () => {
  beforeEach(setupDB);
  afterEach(teardownDB);

  let shallow;
  beforeEach(() => {
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
