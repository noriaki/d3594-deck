import React from 'react';

// componentns
import GridListTileBar from '@material-ui/core/GridListTileBar';

const defaultCommander = {
  id: '未配置',
  name: '未配置',
  imageURL: '/static/images/default-commander.png',
};

const CommanderImage = ({
  classes,
  commander: propCommander,
  removable,
  onClick: handleClick,
}) => {
  const {
    commanderImageRoot,
    commanderImageTitleRoot: root,
    commanderImageTitleWrap: titleWrap,
    commanderImageTitleInner: title,
  } = classes;
  const { id, name, imageURL } = (propCommander || defaultCommander);

  return (
    <div className={commanderImageRoot}>
      <img src={imageURL} alt={id} />
      <GridListTileBar
        title={name}
        titlePosition="bottom"
        classes={{ root, titleWrap, title }} />
    </div>
  );
};

export default CommanderImage;
