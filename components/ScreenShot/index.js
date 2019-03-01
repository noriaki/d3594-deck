import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';

// components
import OneRowCommander from './Commander/OneRow';
import CopyRights from './CopyRights';

// classes
import LearnedCommander from '../../server/models/classes/LearnedCommander';

const styles = {
  root: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
};

export const ScreenShotComponent = ({ commanders, classes }) => {
  const [honei, chuei, zenei] = commanders.map(
    c => c || LearnedCommander.initialize()
  );
  const { root } = classes;

  return (
    <div className={root}>
      <OneRowCommander pos="honei" commander={honei} />
      <OneRowCommander pos="chuei" commander={chuei} />
      <OneRowCommander pos="zenei" commander={zenei} />
      <CopyRights />
    </div>
  );
};

export default withStyles(styles)(ScreenShotComponent);
