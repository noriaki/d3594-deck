import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';

// components
import RarityFilter from './RarityFilter';
import ArmyFilter from './ArmyFilter';
import TeamFilter from './TeamFilter';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export const FilterComponent = ({ classes, filter, handleChange }) => (
  <div className={classes.root}>
    <RarityFilter rarity={filter.rarity} handleChange={handleChange} />
    <ArmyFilter army={filter.army} handleChange={handleChange} />
    <TeamFilter team={filter.team} handleChange={handleChange} />
  </div>
);

export default withStyles(styles)(FilterComponent);
