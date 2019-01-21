import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    height: '100%',
  },
});

export const ResultsComponent = ({
  tactics,
  onClick: handleClick,
  classes,
}) => {
  if (tactics === null) {
    return <div>Loading...</div>;
  }
  return <div>{tactics.map(t => t.name).join(', ')}</div>;
};

export default withStyles(styles)(ResultsComponent);
