import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';

import grey from '@material-ui/core/colors/grey';

const degree = 20;

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  border: {
    backgroundColor: grey[300],
    height: theme.spacing.unit / 2,
    width: theme.spacing.unit * 2,
    borderRadius: theme.spacing.unit / 4,
  },
  left: {
    transform: `rotate(${degree}deg)`,
    marginRight: theme.spacing.unit / -4,
  },
  right: {
    transform: `rotate(-${degree}deg)`,
    marginLeft: theme.spacing.unit / -4,
  },
});

export const HalfModalCloseIconComponent = ({ classes, ...props }) => (
  <div className={classes.container} {...props}>
    <div className={classNames(classes.border, classes.left)} />
    <div className={classNames(classes.border, classes.right)} />
  </div>
);

export default withStyles(styles)(HalfModalCloseIconComponent);
