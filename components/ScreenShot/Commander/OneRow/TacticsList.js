import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';

// classes
import TacticsClass from '../../../../server/models/classes/Tactics';

// components
import Tactics from './Tactics';

const initializeTactics = TacticsClass.initialize.bind(TacticsClass);

const styles = theme => ({
  root: {
    width: 688,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 372,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '0 41px',
  },
});

export const TacticsListComponent = ({ list, classes }) => {
  const { root } = classes;
  const [sTactics, a0Tactics, a1Tactics] = list.map(initializeTactics);

  return (
    <div className={root}>
      <Tactics tactics={sTactics} />
      <Tactics tactics={a0Tactics} />
      <Tactics tactics={a1Tactics} />
    </div>
  );
};

export default withStyles(styles)(TacticsListComponent);
