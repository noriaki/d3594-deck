import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import { buildItemIterator, menuProps } from './concerns/menu';
import { baseDistance } from '../../../../server/models/classes/Commander';

const styles = {
  formControl: {
    width: '50%',
    paddingLeft: 1,
    paddingRight: 1,
  },
};

const renderSortedValue = selected => (
  baseDistance.filter(r => selected.includes(r)).join(', ')
);

export const DistanceFilterComponent = ({
  classes,
  distance,
  onChange: handleChange,
}) => (
  <FormControl margin="dense" className={classes.formControl}>
    <InputLabel htmlFor="select-distance">攻撃距離</InputLabel>
    <Select
      MenuProps={menuProps}
      multiple
      value={distance}
      onChange={handleChange('distance')}
      name="distance"
      input={<Input id="select-distance" />}
      renderValue={renderSortedValue}>
      { baseDistance.map(buildItemIterator('distance', distance)) }
    </Select>
  </FormControl>
);

export default withStyles(styles)(DistanceFilterComponent);
