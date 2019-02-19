import React, { Fragment } from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// components
import Stage from '../Stage';
import EditActions from '../EditActions';
import CommanderSearcher from './CommanderSearcher';
import TacticsSearcher from './TacticsSearcher';

const styles = theme => ({
  container: {
    paddingBottom: theme.spacing.unit * 2,
  },
});

const DeckEditor = ({
  classes: {
    container,
  },
}) => (
  <Fragment>
    <Paper square className={container}>
      <Stage edit />
      <EditActions edit />
    </Paper>
    <CommanderSearcher />
    <TacticsSearcher />
  </Fragment>
);

export default withStyles(styles)(DeckEditor);
