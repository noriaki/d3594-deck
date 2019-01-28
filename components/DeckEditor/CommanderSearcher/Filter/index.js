import React, { Fragment } from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';

// components
import RarityFilter from './RarityFilter';
import ArmyFilter from './ArmyFilter';
import TeamFilter from './TeamFilter';
import DistanceFilter from './DistanceFilter';
import CostFilter from './CostFilter';

const styles = {
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export const FilterComponent = ({ classes, filter, onChange }) => {
  const handleChange = target => (event) => {
    const { value } = event.target;
    onChange(target, value);
  };
  return (
    <Fragment>
      <div className={classes.root}>
        <RarityFilter rarity={filter.rarity} onChange={handleChange} />
        <ArmyFilter army={filter.army} onChange={handleChange} />
        <TeamFilter team={filter.team} onChange={handleChange} />
      </div>
      <div className={classes.root}>
        <DistanceFilter distance={filter.distance} onChange={handleChange} />
        <CostFilter cost={filter.cost} onChange={handleChange} />
      </div>
    </Fragment>
  );
};

export default withStyles(styles)(FilterComponent);
