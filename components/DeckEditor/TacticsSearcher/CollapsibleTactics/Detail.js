import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  root: {
    fontSize: '.75rem',
    padding: [
      theme.spacing.unit / 2, theme.spacing.unit,
    ].map(i => `${i}px`).join(' '),
  },
  gridCentering: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  learnButton: {
    padding: `.3rem ${theme.spacing.unit}px`,
    minHeight: 0,
  },
});

export const CollapsibleTacticsDetailComponent = ({
  tactics,
  onClick,
  classes,
}) => {
  const {
    name,
    type,
    permissions,
    rate,
    distance,
    target,
    description,
  } = tactics || {};
  const handleSelect = onClick({ tactics });

  return (
    <Paper className={classes.root}>
      <Grid container spacing={16} alignItems="flex-start">
        <Grid container spacing={8} item xs={12}>
          <Grid item xs={8} className={classes.gridCentering}>{name}</Grid>
          <Grid item xs={4} className={classes.gridCentering}>
            <Button
              variant="outlined"
              className={classes.learnButton}
              onClick={handleSelect}>
              習得
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={8} item xs={6}>
          <Grid item xs={5}>種別</Grid>
          <Grid item xs={7}>{type}</Grid>
          <Grid item xs={5}>距離</Grid>
          <Grid item xs={7}>{distance}</Grid>
          <Grid item xs={5}>対象</Grid>
          <Grid item xs={7}>{target}</Grid>
        </Grid>
        <Grid container spacing={8} item xs={6}>
          <Grid item xs={5}>兵種</Grid>
          <Grid item xs={7}>{permissions && permissions.join(', ')}</Grid>
          <Grid item xs={5}>確率</Grid>
          <Grid item xs={7}>{rate || '--'}</Grid>
        </Grid>
        <Grid item xs={12}>{description}</Grid>
      </Grid>
    </Paper>
  );
};

export default withStyles(styles)(CollapsibleTacticsDetailComponent);
