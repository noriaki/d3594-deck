import React from 'react';

// componentns
import GridListTileBar from '@material-ui/core/GridListTileBar';
import RemoveIcon from './RemoveIcon';
import AddCommander from './AddCommander';

const defaultCommander = {
  id: '未配置',
  name: '未配置',
  imageURL: '/static/images/default-commander.png',
};

const CommanderImage = ({
  classes,
  commander: propCommander,
  editable,
  removable,
  onClick: handleClick,
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
  } = (propCommander || defaultCommander);

  return (
    <div className={commanderImageRoot}>
      <div className={commanderImageContainer}>
        <img src={imageURL} alt={id} />
        <GridListTileBar
          title={`${name}${special || ''}`}
          titlePosition="bottom"
          classes={{ root, titleWrap, title }} />
        {removable && <RemoveIcon onClick={handleClick} />}
        {editable && propCommander == null && <AddCommander onClick={handleClick} />}
      </div>
    </div>
  );
};

export default CommanderImage;
