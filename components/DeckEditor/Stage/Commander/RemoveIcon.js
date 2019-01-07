import React from 'react';

// material-ui styles
import { withStyles } from '@material-ui/core/styles';

// material-ui icons
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';

const styles = {
  icon: {
    position: 'absolute',
    top: 0,
    right: 0,
    transform: 'translate(.2em, -.2em)',
    background: 'rgba(233,233,233,1)',
    color: 'rgba(203,9,46,.8)',
    borderRadius: '1em',
  },
};

export const RemoveIconComponent = ({ classes, onClick: handleClick }) => (
  <RemoveCircleIcon
    fontSize="inherit"
    onClick={handleClick}
    className={classes.icon} />
);

export default withStyles(styles)(RemoveIconComponent);
