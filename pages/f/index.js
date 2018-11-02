import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Formation from '../../components/Formation';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    padding: theme.spacing.unit,
  },
});

const FormationDetailPage = ({ classes, formation }) => (
  <div>
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" color="inherit">{formation.name}</Typography>
      </Toolbar>
    </AppBar>
    <Paper className={classes.paper}>
      <Formation commanders={formation.commanders} />
    </Paper>
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h3">コスト</Typography>
      <Typography>{formation.cost}</Typography>
      <Typography variant="h5" component="h3">速度</Typography>
      <Typography>{formation.velocity}</Typography>
      <Typography variant="h5" component="h3">攻城</Typography>
      <Typography>{formation.siege}</Typography>
      <pre>{formation.humanize}</pre>
    </Paper>
  </div>
);

FormationDetailPage.getInitialProps = async ({ req, query }) => {
  const isServer = !!req;
  if (isServer) {
    const { formation } = query;
    return { formation };
  }
  const { id } = query;
  const res = await fetch(`/api/v1/f/${id}`, {
    headers: { Accept: 'application/json' },
  });
  const json = await res.json();
  return { formation: json };
};

FormationDetailPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  formation: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number, PropTypes.array]
  )).isRequired,
};

export default withStyles(styles)(FormationDetailPage);
