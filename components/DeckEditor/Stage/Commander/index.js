import React from 'react';

// components
import PositionImage from './PositionImage';
import CommanderImage from './CommanderImage';
import Tactics from './Tactics';

// stores
import { withStores } from '../../../../stores';

// actions
import { searchActions, formationActions } from '../../../../actions';

const defaultCommander = { additionalTactics: [] };

const Commander = ({
  classes,
  searcher: searcherStore, // from undux stores
  formation: formationStore, // from undux stores
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
  const { setTargetByIdentifier } = searchActions(searcherStore);
  const { removeCommander, removeTactics } = formationActions(formationStore);
  const handleCommanderClick = (operation, identifier) => () => {
    switch (operation) {
    case 'add':
      setTargetByIdentifier(identifier);
      commanderSearchHandler(true)();
      break;
    case 'edit':
      setTargetByIdentifier(identifier);
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
    case 'add':
      setTargetByIdentifier(identifier);
      console.log('tacitcs.add');
      break;
    case 'edit':
      setTargetByIdentifier(identifier);
      console.log(`tacitcs.edit: ${identifier}`);
      break;
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
