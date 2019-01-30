import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';

// components
import TypeFilter from './TypeFilter';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export const FilterComponent = ({
  classes,
  filter,
  onChange: handleChange,
}) => (
  <div className={classes.root}>
    <TypeFilter type={filter.type} onChange={handleChange} />
  </div>
);

export default withStyles(styles)(FilterComponent);
