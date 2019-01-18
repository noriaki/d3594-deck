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
    background: 'rgba(0,0,0,.3)',
    padding: 0,
  },
  label: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: 'translate(0, -1rem)',
  },
  icon: {
    fontSize: '3.5rem',
  },
};

export const AddCommanderComponent = ({ classes, onClick: handleClick }) => {
  const { root, label } = classes;
  return (
    <Button fullWidth classes={{ root, label }} onClick={handleClick}>
      <AddIcon className={classes.icon} />
      <span>武将配置</span>
    </Button>
  );
};

export default withStyles(styles)(AddCommanderComponent);
