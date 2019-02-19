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
    const { key: position } = positionsMap[index + 1];
    const key = propCommander ? propCommander.identifier : `null-${index}`;

    return [
      ...list,
      <Divider key={`hr-before-${key}`} className={divider} />,
      <TacticsDetailList
        key={key}
        position={position}
        commander={propCommander}
        classes={innerClasses} />,
    ];
  }, [(
    <TacticsDetailList
      key={honeiCommander ? honeiCommander.identifier : 'null-0'}
      position={positionsMap[0].key}
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

  return (
    <div className={container}>
      <Typography component="h3" variant="h6">
        <PositionImage
          horizontal
          position={position}
          classes={{ positionRoot, positionImage }} />
        <div className={header}>
          { commander ? commander.id : '未配置' }
        </div>
      </Typography>
      { commander && (
        <TacticsListItem
          commander={commander}
          tactics={tactics}
          additionalTactics={additionalTactics} />
      ) }
    </div>
  );
};
