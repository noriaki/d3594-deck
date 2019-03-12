import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// components
import LinksOfService from './Links';
import Copyright from './Copyright';

const styles = theme => ({
  footer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: `${theme.spacing.unit * 2}px 0 ${theme.spacing.unit * 4}px`,
  },
});

export const FooterComponent = ({ classes }) => (
  <Paper component="footer" square elevation={0} className={classes.footer}>
    <LinksOfService />
    <Copyright />
  </Paper>
);

export default withStyles(styles)(FooterComponent);
