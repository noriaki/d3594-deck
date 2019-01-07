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
    color: 'rgba(233,233,233,1)',
    padding: 0,
  },
  label: {
    display: 'block',
    position: 'relative',
    paddingTop: '100%',
    overflow: 'hidden',
  },
  iconWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: '3rem',
  },
};

export const AddTacticsComponent = ({ classes, onClick: handleClick }) => {
  const { root, label } = classes;
  return (
    <Button fullWidth classes={{ root, label }} onClick={handleClick}>
      <span className={classes.iconWrap}>
        <AddIcon className={classes.icon} />
      </span>
    </Button>
  );
};

export default withStyles(styles)(AddTacticsComponent);
