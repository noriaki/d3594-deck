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
  const { container } = classes;
  return (
    <div className={container}>
      <PositionImage
        classes={classes}
        position={position}
        horizontal={!!search} />
      <CommanderImage
        commander={commander}
        editable={editable}
        removable={editable && commander != null}
        classes={classes} />
      <Tactics
        tactics={tactics}
        classes={classes} />
      <Tactics
        tactics={additionalTactics[0]}
        editable={editable}
        removable={editable && additionalTactics[0] != null}
        classes={classes} />
      <Tactics
        tactics={additionalTactics[1]}
        editable={editable}
        removable={editable && additionalTactics[1] != null}
        classes={classes} />
    </div>
  );
};

export default Commander;
