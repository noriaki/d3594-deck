import React from 'react';

// material-ui styles
import { withStyles } from '@material-ui/core/styles';

// material-ui components
import Button from '@material-ui/core/Button';

// material-ui icons
import AddIcon from '@material-ui/icons/Add';

const styles = {
  root: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    color: 'rgba(233,233,233,1)',
    padding: 0,
    display: 'unset',
  },
  label: {
    height: 'calc(100% - .75rem)',
  },
  icon: {
    fontSize: '3rem',
  },
};

export const AddTacticsComponent = ({ classes, onClick: handleClick }) => {
  const { root, label } = classes;
  return (
    <Button fullWidth classes={{ root, label }} onClick={handleClick}>
      <AddIcon className={classes.icon} />
    </Button>
  );
};

export default withStyles(styles)(AddTacticsComponent);
