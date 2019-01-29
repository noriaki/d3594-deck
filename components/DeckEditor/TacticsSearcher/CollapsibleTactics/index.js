import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';

// components
import TacticsDetail from './Detail';

// stores
import { withStores } from '../../../../stores';

const styles = theme => ({
  container: {},
  root: {},
  image: {},
  captionContainer: {
    padding: 0,
    '&:last-child': { paddingBottom: 0 },
  },
});

export const CollapsibleTacticsComponent = ({
  open,
  tactics,
  onClick: handleClick,
  onSelect: handleSelect,
  classes,
}) => {
  const { name, imageURL, imageSrcSet } = tactics;

  return (
    <div className={classes.container}>
      <Card elevation={0} square className={classes.root}>
        <CardActionArea component="a" onClick={handleClick}>
          <CardMedia
            component="img"
            title={name}
            alt={name}
            src={imageURL}
            srcSet={imageSrcSet.join(', ')}
            className={classes.image} />
          <CardContent className={classes.captionContainer}>
            <Typography align="center" variant="body2">{name}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
      {open && <TacticsDetail tactics={tactics} onClick={handleSelect} />}
    </div>
  );
};

export default withStores(
  withStyles(styles)(CollapsibleTacticsComponent)
);
