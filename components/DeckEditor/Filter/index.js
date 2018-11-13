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

export const FilterComponent = ({
  classes,
  rarity,
  army,
  team,
  handleChange,
}) => (
  <div className={classes.root}>
    <RarityFilter rarity={rarity} handleChange={handleChange} />
    <ArmyFilter army={army} handleChange={handleChange} />
    <TeamFilter team={team} handleChange={handleChange} />
  </div>
);

export default withStyles(styles)(FilterComponent);
