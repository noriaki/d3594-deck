import React from 'react';

// components
import PositionImage from './PositionImage';
import CommanderImage from './CommanderImage';
import Tactics from './Tactics';

// stores
import { withStores } from '../../../stores';

// actions
import {
  searchActions,
  formationActions,
  tacticsActions,
} from '../../../actions';

// classes
import LearnedCommander from '../../../server/models/classes/LearnedCommander';

const positions = ['honei', 'chuei', 'zenei'];

const Commander = ({
  classes,
  formation, // from undux stores
  searcher, // from undux stores
  commander: propCommander,
  search,
  editable,
  position,
}) => {
  const {
    commander,
    tactics,
    additionalTactics,
  } = (propCommander || LearnedCommander.initialize());
  const { container } = classes;
  const { setTarget } = searchActions(searcher);
  const { removeCommander, removeTactics } = formationActions(formation);
  const { generateId, scrollToTactics } = tacticsActions();
  const targets = LearnedCommander.paths(position);
  const handleCommanderClick = operation => (event) => {
    switch (operation) {
    case 'add':
    case 'edit':
      setTarget(targets.commander);
      break;
    case 'remove':
      removeCommander(targets.index);
      break;
    default:
    }
    event.stopPropagation();
  };
  const handleTacticsClick = pos => operation => (event) => {
    switch (operation) {
    case 'add':
      setTarget(targets.tactics[pos]);
      break;
    case 'edit':
      setTarget(targets.tactics[pos]);
      break;
    case 'remove':
      removeTactics(targets.tactics[pos]);
      break;
    case 'scroll':
      scrollToTactics(generateId('detail', position, pos))(event);
      break;
    default:
    }
    event.stopPropagation();
  };
  return (
    <div className={container}>
      <PositionImage
        classes={classes}
        position={positions[position]}
        horizontal={!!search} />
      <CommanderImage
        commander={commander}
        editable={editable}
        removable={editable && commander != null}
        onClick={handleCommanderClick}
        classes={classes} />
      <Tactics
        tactics={tactics}
        onClick={handleTacticsClick(0)}
        classes={classes} />
      <Tactics
        tactics={additionalTactics[0]}
        editable={editable && commander != null}
        removable={editable && additionalTactics[0] != null}
        onClick={handleTacticsClick(1)}
        classes={classes} />
      <Tactics
        tactics={additionalTactics[1]}
        editable={editable && commander != null}
        removable={editable && additionalTactics[1] != null}
        onClick={handleTacticsClick(2)}
        classes={classes} />
    </div>
  );
};

export default withStores(Commander);
