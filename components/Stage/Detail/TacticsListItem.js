import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

// constants
import { host as assetHost } from '../../../constants/assets';

// actions
import { tacticsActions } from '../../../actions';

// components
import ResponsiveImage from '../../ResponsiveImage';
import TacticsIcon from '../Commander/Tactics';

const styles = theme => ({
  list: {
    paddingBottom: 0,
  },
  item: {
    padding: 0,
    marginBottom: theme.spacing.unit * 2,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  divider: {
    margin: theme.spacing.unit * 2,
  },
});

const { generateId } = tacticsActions();
export const TacticsListItemComponent = ({
  tactics,
  additionalTactics = [],
  position,
  classes,
}) => (
  <List className={classes.list}>
    <ListItem className={classes.item}>
      <TacticsTable
        id={generateId('detail', position, 0)}
        tactics={tactics} />
    </ListItem>
    <Divider variant="middle" className={classes.divider} />
    <ListItem className={classes.item}>
      <TacticsTable
        id={generateId('detail', position, 1)}
        tactics={additionalTactics[0]} />
    </ListItem>
    <Divider variant="middle" className={classes.divider} />
    <ListItem className={classes.item}>
      <TacticsTable
        id={generateId('detail', position, 2)}
        tactics={additionalTactics[1]} />
    </ListItem>
  </List>
);

export default withStyles(styles)(TacticsListItemComponent);

const stylesTacticsTable = theme => ({
  container: {
    '& > $tacticsDescription': {
      paddingTop: 0,
      paddingRight: theme.spacing.unit * 2,
      paddingLeft: theme.spacing.unit * 2,
      fontSize: theme.typography.pxToRem(12),
    },
  },
  header: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
  status: {
    '& > div:nth-child(2n-1)': {
      textAlign: 'center',
    },
  },
  tacticsDescription: {},
  tacticsRoot: {},
  tacticsContainer: {
    display: 'inline-flex',
    flexDirection: 'column-reverse',
  },
  tacticsImage: {
    width: '60%',
  },
  tacticsCaptionContainer: {
    padding: 0,
    '& > p': {
      fontSize: theme.typography.pxToRem(16),
      fontWeight: 600,
    },
  },
  unlearned: {
    width: '100%',
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

const scrollTop = () => (event) => {
  event.preventDefault();
  document.getElementById('pagetop')
    .scrollIntoView({ block: 'start', behavior: 'smooth' });
};

const TacticsTable = withStyles(stylesTacticsTable)(({
  id = null,
  tactics,
  classes,
}) => {
  if (tactics == null) {
    return (
      <ResponsiveImage
        alt="未習得"
        src={`${assetHost}/assets/tacticsTablePlaceholder.png`}
        className={classes.unlearned} />
    );
  }
  const {
    origin,
    type,
    distance,
    target,
    permissions = [],
    rate,
    description,
  } = tactics;
  const {
    container,
    header,
    status,
    tacticsDescription,
    tacticsRoot,
    tacticsContainer,
    tacticsImage,
    tacticsCaptionContainer,
  } = classes;
  const tacticsIconClasses = {
    tacticsRoot,
    tacticsContainer,
    tacticsImage,
    tacticsCaptionContainer,
  };
  const isSpecifc = origin === '固有(初期)';
  const head = isSpecifc ? origin : '習得戦法';

  return (
    <Typography id={id} component="div">
      <Grid container spacing={16} className={container}>
        <Grid item xs={4}>
          <Typography
            component="h4"
            variant="subtitle2"
            gutterBottom
            align="center"
            className={header}>
            { head }
          </Typography>
          <TacticsIcon
            tactics={tactics}
            onClick={scrollTop}
            classes={tacticsIconClasses} />
        </Grid>
        <Grid
          item
          xs={8}
          container
          spacing={8}
          alignContent="flex-start"
          className={status}>
          <Grid item xs={3}>種別</Grid>
          <Grid item xs={9}>{type}</Grid>
          <Grid item xs={3}>距離</Grid>
          <Grid item xs={9}>{distance}</Grid>
          <Grid item xs={3}>対象</Grid>
          <Grid item xs={9}>{target}</Grid>
          { !isSpecifc && <Grid item xs={3}>兵種</Grid> }
          { !isSpecifc && <Grid item xs={9}>{permissions.join(', ')}</Grid> }
          <Grid item xs={3}>確率</Grid>
          <Grid item xs={9}>{rate || '--'}</Grid>
        </Grid>
        <Grid item xs={12} className={tacticsDescription}>{description}</Grid>
      </Grid>
    </Typography>
  );
});
