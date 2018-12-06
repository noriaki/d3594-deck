import React from 'react';

import PositionImage from './PositionImage';
import CommanderImage from './CommanderImage';
import Tactics from './Tactics';

const defaultCommander = { additionalTactics: [] };

const Commander = ({
  classes,
  commander: propCommander,
  search,
  editable,
  position,
}) => {
  const {
    commander,
    tactics,
    additionalTactics,
  } = (propCommander || defaultCommander);
  return (
    <div className={classes.root}>
      <PositionImage
        classes={classes}
        position={position}
        horizontal={!!search} />
      <CommanderImage
        commander={commander}
        removable={editable && commander != null}
        classes={classes} />
      <Tactics
        tactics={tactics}
        removable={editable && tactics != null}
        classes={classes} />
      <Tactics
        tactics={additionalTactics[0]}
        removable={editable && additionalTactics[0] != null}
        classes={classes} />
      <Tactics
        tactics={additionalTactics[1]}
        removable={editable && additionalTactics[1] != null}
        classes={classes} />
    </div>
  );
};

export default Commander;
