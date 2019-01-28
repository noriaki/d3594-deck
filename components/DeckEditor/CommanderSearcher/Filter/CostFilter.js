import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import { buildItemIterator, menuProps } from './concerns/menu';
import { baseCost } from '../../../../server/models/classes/Commander';

const styles = {
  formControl: {
    width: '50%',
    paddingLeft: 1,
    paddingRight: 1,
  },
};

const renderSortedValue = selected => (
  baseCost.filter(r => selected.includes(r)).join(', ')
);

export const CostFilterComponent = ({
  classes,
  cost,
  onChange: handleChange,
}) => (
  <FormControl margin="dense" className={classes.formControl}>
    <InputLabel htmlFor="select-cost">コスト</InputLabel>
    <Select
      MenuProps={menuProps}
      multiple
      value={cost}
      onChange={handleChange('cost')}
      name="cost"
      input={<Input id="select-cost" />}
      renderValue={renderSortedValue}>
      { baseCost.map(buildItemIterator('cost', cost)) }
    </Select>
  </FormControl>
);

export default withStyles(styles)(CostFilterComponent);
