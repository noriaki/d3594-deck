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

export const FilterComponent = ({ classes, filter, onChange }) => (
  <div className={classes.root}>
    <RarityFilter rarity={filter.rarity} onChange={onChange} />
    <ArmyFilter army={filter.army} onChange={onChange} />
    <TeamFilter team={filter.team} onChange={onChange} />
  </div>
);

export default withStyles(styles)(FilterComponent);
