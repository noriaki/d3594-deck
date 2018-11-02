import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const cssCardWidth = 'calc(calc(calc(100vw - 64px) / 13) * 4)';
const cssCardHeight = `calc(${cssCardWidth} / 0.729211087420043)`;

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    transform: 'translateZ(0)',
  },
  gridListTile: {
    height: cssCardHeight,
  },
  tileBarRoot: {
    height: theme.spacing.unit * 4,
    background: [
      'linear-gradient(to top',
      'rgba(0,0,0,0.7) 0%',
      'rgba(0,0,0,0.3) 70%',
      'rgba(0,0,0,0) 100%)',
    ].join(', '),
  },
  titleWrap: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  title: {
    fontSize: '0.8rem',
  },
});

const CommanderImage = ({ commander, classes }) => {
  const tileBarClasses = {
    root: classes.tileBarRoot,
    titleWrap: classes.titleWrap,
    title: classes.title,
  };
  return (
    <GridListTile
      cols={1}
      rows={1}
      component="div"
      className={classes.gridListTile}>
      <img src={commander.imageURL} alt={commander.name} />
      <GridListTileBar
        title={commander.name}
        titlePosition="bottom"
        classes={tileBarClasses} />
    </GridListTile>
  );
};

export default withStyles(styles)(CommanderImage);
