import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// components
import PositionImage from '../../../Stage/Commander/PositionImage';
import FaceDetail from './FaceDetail';
import TacticsList from './TacticsList';

const styles = {
  root: {
    width: 1060,
    height: 180,
    position: 'relative',
  },
  positionRoot: {
    width: 82,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionImage: {
    width: 48,
  },
};

export const OneRowCommanderComponent = ({
  commander: learnedCommander,
  pos,
  classes,
}) => {
  const { root } = classes;
  const { positionRoot, positionImage } = classes;
  const imageClasses = { positionRoot, positionImage };

  const { commander, tactics, additionalTactics } = learnedCommander;
  const tacticsList = [tactics, ...additionalTactics];

  return (
    <Paper square className={root}>
      <PositionImage position={pos} classes={imageClasses} />
      <FaceDetail commander={commander} />
      <TacticsList list={tacticsList} />
    </Paper>
  );
};

export default withStyles(styles)(OneRowCommanderComponent);
