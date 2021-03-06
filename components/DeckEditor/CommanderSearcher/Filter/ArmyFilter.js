import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import { buildItemIterator, menuProps } from './concerns/menu';
import { baseArmy } from '../../../../server/models/classes/Commander';

const styles = {
  formControl: {
    width: '33.333%',
    paddingLeft: 1,
    paddingRight: 1,
  },
};

const renderSortedValue = (selected) => {
  const sortedValue = baseArmy.filter(r => selected.includes(r));
  return sortedValue.join(',');
};

export const ArmyFilterComponent = ({
  classes,
  army,
  onChange: handleChange,
}) => (
  <FormControl margin="dense" className={classes.formControl}>
    <InputLabel htmlFor="select-army">兵種</InputLabel>
    <Select
      MenuProps={menuProps}
      multiple
      value={army}
      onChange={handleChange('army')}
      name="army"
      input={<Input id="select-army" />}
      renderValue={renderSortedValue}>
      { baseArmy.map(buildItemIterator('army', army)) }
    </Select>
  </FormControl>
);

export default withStyles(styles)(ArmyFilterComponent);
