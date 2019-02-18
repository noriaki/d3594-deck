import React from 'react';

// components
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import RemoveIcon from './RemoveIcon';
import AddTactics from './AddTactics';

import TacticsClass from '../../../server/models/classes/Tactics';

const defaultTactics = {
  name: '未習得',
};

const Tactics = ({
  classes,
  tactics: propTactics,
  editable,
  removable,
  onClick: handleClickTo = () => {},
}) => {
  const {
    tacticsRoot,
    tacticsContainer,
    tacticsImage,
    tacticsCaptionContainer,
  } = classes;
  const tactics = (propTactics || defaultTactics);
  const imageURL = TacticsClass.buildImageURL(tactics);
  const imageSrcSet = TacticsClass.getImageSrcSet(tactics);
  const handleClickToEdit = (
    editable && propTactics ? handleClickTo('edit') : () => {}
  );
  const addable = editable && propTactics == null;

  return (
    <Card elevation={0} square className={tacticsRoot}>
      <CardActionArea
        component="a"
        onClick={handleClickToEdit}
        className={tacticsContainer}>
        <CardMedia
          component="img"
          alt={tactics.name}
          src={imageURL}
          srcSet={imageSrcSet.join(', ')}
          title={tactics.name}
          className={tacticsImage} />
        {removable && <RemoveIcon onClick={handleClickTo('remove')} />}
        {addable && <AddTactics onClick={handleClickTo('add')} />}
        <CardContent className={tacticsCaptionContainer}>
          <Typography align="center" variant="body2">
            {tactics.name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default Tactics;
