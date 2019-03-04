import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// components
import TacticsListItem from './TacticsListItem';
import PositionImage from '../Commander/PositionImage';

// classes
import LearnedCommander from '../../../server/models/classes/LearnedCommander';
import { positionsMap } from '../../../server/models/classes/Formation';

const styles = theme => ({
  root: {
    padding: `${theme.spacing.unit * 2}px 0`,
  },
  divider: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 2,
  },
  container: {
  },
  positionRoot: {
    display: 'flex',
    alignItems: 'center',
  },
  positionImage: {
    width: '2em',
  },
  header: {
    paddingLeft: '1em',
  },
});

export const TacticsListComponent = ({
  commanders,
  classes,
}) => {
  const { root, divider, ...innerClasses } = classes;
  const [honeiCommander, ...others] = commanders;

  const lists = others.reduce((list, propCommander, index) => {
    const key = propCommander ? propCommander.identifier : `null-${index + 1}`;

    return [
      ...list,
      <Divider key={`hr-before-${key}`} className={divider} />,
      <TacticsDetailList
        key={key}
        position={index + 1}
        commander={propCommander}
        classes={innerClasses} />,
    ];
  }, [(
    <TacticsDetailList
      key={honeiCommander ? honeiCommander.identifier : 'null-0'}
      position={0}
      commander={honeiCommander}
      classes={innerClasses} />
  )]);

  return (
    <div className={root}>
      { lists }
    </div>
  );
};

export default withStyles(styles)(TacticsListComponent);

const TacticsDetailList = ({
  position,
  commander: orgCommander,
  classes: {
    container,
    positionRoot,
    positionImage,
    header,
  },
}) => {
  const {
    commander,
    tactics,
    additionalTactics,
  } = orgCommander || LearnedCommander.initialize();
  const { key: positionKey } = positionsMap[position];

  return (
    <div className={container}>
      <Typography component="h3" variant="h6">
        <PositionImage
          horizontal
          position={positionKey}
          classes={{ positionRoot, positionImage }} />
        <div className={header}>
          { commander ? commander.id : '未配置' }
        </div>
      </Typography>
      { commander && (
        <TacticsListItem
          commander={commander}
          tactics={tactics}
          additionalTactics={additionalTactics}
          position={position} />
      ) }
    </div>
  );
};
