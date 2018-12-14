import React from 'react';

// components
import PositionImage from './PositionImage';
import CommanderImage from './CommanderImage';
import Tactics from './Tactics';

// stores
import { withStores } from '../../../../stores';

// actions
import { formationActions } from '../../../../actions';

const defaultCommander = { additionalTactics: [] };

const Commander = ({
  classes,
  formation: store, // from undux stores
  commander: propCommander,
  search,
  editable,
  position,
  commanderSearchHandler,
}) => {
  const {
    commander,
    tactics,
    additionalTactics,
  } = (propCommander || defaultCommander);
  const { container } = classes;
  const { removeCommander, removeTactics } = formationActions(store);
  const handleCommanderClick = (operation, identifier) => () => {
    switch (operation) {
    case 'add':
      commanderSearchHandler(true)();
      break;
    case 'edit':
      commanderSearchHandler(true)();
      break;
    case 'remove':
      removeCommander(identifier);
      break;
    default:
    }
  };
  const handleTacticsClick = (operation, identifier) => () => {
    switch (operation) {
    case 'remove':
      removeTactics(identifier);
      break;
    default:
    }
  };
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
        onClick={handleCommanderClick}
        classes={classes} />
      <Tactics
        tactics={tactics}
        classes={classes} />
      <Tactics
        tactics={additionalTactics[0]}
        editable={editable}
        removable={editable && additionalTactics[0] != null}
        onClick={handleTacticsClick}
        classes={classes} />
      <Tactics
        tactics={additionalTactics[1]}
        editable={editable}
        removable={editable && additionalTactics[1] != null}
        onClick={handleTacticsClick}
        classes={classes} />
    </div>
  );
};

export default withStores(Commander);
