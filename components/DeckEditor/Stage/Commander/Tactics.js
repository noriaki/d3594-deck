import React from 'react';

// components
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import RemoveIcon from './RemoveIcon';
import AddTactics from './AddTactics';

const defaultSrcSet = [
  '/static/images/default-tactics.png',
  '/static/images/default-tactics@2x.png 2x',
  '/static/images/default-tactics@3x.png 3x',
];
const defaultTactics = {
  imageURL: defaultSrcSet[0],
  imageSrcSet: defaultSrcSet,
  name: '未習得',
};

const Tactics = ({
  classes,
  tactics: propTactics,
  editable,
  removable,
  onClick: handleClick,
}) => {
  const {
    tacticsRoot,
    tacticsImage,
    tacticsCaptionContainer,
  } = classes;
  const { name, imageURL, imageSrcSet } = (propTactics || defaultTactics);

  return (
    <Card elevation={0} square className={tacticsRoot}>
      <CardMedia
        component="img"
        alt={name}
        src={imageURL}
        srcSet={imageSrcSet.join(', ')}
        title={name}
        className={tacticsImage} />
      {removable && <RemoveIcon onClick={handleClick} />}
      {editable && propTactics == null && <AddTactics onClick={handleClick} />}
      <CardContent className={tacticsCaptionContainer}>
        <Typography align="center" variant="body2">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Tactics;
