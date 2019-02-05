import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
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
      <Typography component="div">
        <Grid container spacing={16} alignItems="flex-start">
          <Grid container spacing={8} item xs={12}>
            <Grid item xs={8} className={classes.gridCentering}>{name}</Grid>
            <Grid item xs={4} className={classes.gridCentering}>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.learnButton}
                onClick={handleSelect}>
                習得
              </Button>
            </Grid>
          </Grid>
          <Grid container spacing={8} item xs={6}>
            <Grid item xs={4}>種別</Grid>
            <Grid item xs={8}>{type}</Grid>
            <Grid item xs={4}>距離</Grid>
            <Grid item xs={8}>{distance}</Grid>
            <Grid item xs={4}>対象</Grid>
            <Grid item xs={8}>{target}</Grid>
          </Grid>
          <Grid container spacing={8} item xs={6}>
            <Grid item xs={4}>兵種</Grid>
            <Grid item xs={8}>{permissions && permissions.join(', ')}</Grid>
            <Grid item xs={4}>確率</Grid>
            <Grid item xs={8}>{rate || '--'}</Grid>
          </Grid>
          <Grid item xs={12}>{description}</Grid>
        </Grid>
      </Typography>
    </Paper>
  );
};

export default withStyles(styles)(CollapsibleTacticsDetailComponent);
