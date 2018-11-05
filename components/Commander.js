import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import ResponsiveImage from './ResponsiveImage';
import CommanderImage from './CommanderImage';
import Tactics from './Tactics';

const styles = theme => ({
  container: {
    // ...theme.mixins.gutters(),
    // paddingTop: theme.spacing.unit,
    // paddingBottom: theme.spacing.unit,
    margin: `${theme.spacing.unit}px 0`,
    display: 'grid',
    gridTemplateColumns: `${theme.spacing.unit * 2}px 4fr repeat(3, 3fr)`,
    gridColumnGap: `${theme.spacing.unit}px`,
    alignItems: 'center',
  },
  position: {
  },
  positionImage: {
    width: `${theme.spacing.unit * 3}px`,
  },
  commander: {
  },
  tactics: {
  },
});

const defaultCommander = { additionalTactics: [] };

export const Commander = ({ commander, position, classes }) => {
  const finalCommander = commander || defaultCommander;
  const { tactics, additionalTactics } = finalCommander;
  return (
    <div className={classes.container}>
      <div className={classes.position}>
        <ResponsiveImage
          className={classes.positionImage}
          src={`/static/images/${position}.png`} />
      </div>
      <div className={classes.commander}>
        <CommanderImage commander={finalCommander.commander} />
      </div>
      <div className={classes.tactics}>
        <Tactics tactics={tactics} />
      </div>
      <div className={classes.tactics}>
        <Tactics tactics={additionalTactics[0]} />
      </div>
      <div className={classes.tactics}>
        <Tactics tactics={additionalTactics[1]} />
      </div>
    </div>
  );
};

export default withStyles(styles)(Commander);
