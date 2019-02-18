import React from 'react';

// material-ui components
import Button from '@material-ui/core/Button';

// componentns
import GridListTileBar from '@material-ui/core/GridListTileBar';
import RemoveIcon from './RemoveIcon';
import AddCommander from './AddCommander';
import ResponsiveImage from '../../ResponsiveImage';

import Commander from '../../../server/models/classes/Commander';

const CommanderImage = ({
  classes,
  commander: propCommander,
  editable,
  removable,
  onClick: handleClickTo,
}) => {
  const {
    commanderImageRoot,
    commanderImageContainer,
    commanderImageTitleRoot: root,
    commanderImageTitleWrap: titleWrap,
    commanderImageTitleInner: title,
  } = classes;
  const {
    id,
    name,
    special,
    imageURL,
  } = (propCommander || Commander.initialize());
  const handleClickToEdit = (
    editable && propCommander ? handleClickTo('edit') : () => {}
  );
  const addable = editable && propCommander == null;

  return (
    <div className={commanderImageRoot}>
      <Button
        component="a"
        onClick={handleClickToEdit}
        className={commanderImageContainer}>
        <ResponsiveImage src={imageURL} alt={id} />
        <GridListTileBar
          title={`${name}${special || ''}`}
          titlePosition="bottom"
          classes={{ root, titleWrap, title }} />
        {removable && <RemoveIcon onClick={handleClickTo('remove')} />}
        {addable && <AddCommander onClick={handleClickTo('add')} />}
      </Button>
    </div>
  );
};

export default CommanderImage;
