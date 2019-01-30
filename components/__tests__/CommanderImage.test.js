import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import Commander from '../../server/models/Commander';

import { CommanderImageComponent } from '../CommanderImage';

import { setupDB, teardownDB } from '../../jest.helpers';

process.env.TEST_SUITE = 'component-test-CommanderImage';

describe('CommanderImage component', () => {
  beforeEach(setupDB);
  afterEach(teardownDB);

  let shallow;
  beforeEach(() => {
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
