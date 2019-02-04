import React from 'react';

// components
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
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
    tacticsImage,
    tacticsCaptionContainer,
  } = classes;
  const tactics = (propTactics || defaultTactics);
  const imageURL = TacticsClass.buildImageURL(tactics);
  const imageSrcSet = TacticsClass.getImageSrcSet(tactics);

  return (
    <Card elevation={0} square className={tacticsRoot}>
      <CardMedia
        component="img"
        alt={tactics.name}
        src={imageURL}
        srcSet={imageSrcSet.join(', ')}
        title={tactics.name}
        onClick={propTactics && handleClickTo('edit')}
        className={tacticsImage} />
      {removable && <RemoveIcon onClick={handleClickTo('remove')} />}
      {editable && propTactics == null && <AddTactics onClick={handleClickTo('add')} />}
      <CardContent className={tacticsCaptionContainer}>
        <Typography align="center" variant="body2">
          {tactics.name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Tactics;
