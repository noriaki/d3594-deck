import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import { buildItemIterator, menuProps } from './concerns/menu';
import { baseRarity } from '../../../../server/models/classes/Commander';

const styles = {
  formControl: {
    width: '33.333%',
    paddingLeft: 1,
    paddingRight: 1,
  },
};

const renderSortedValue = (selected) => {
  const sortedValue = baseRarity.filter(r => selected.includes(r));
  return `\u2605${sortedValue.join(',')}`;
};

export const RarityFilterComponent = ({
  classes,
  rarity,
  onChange: handleChange,
}) => (
  <FormControl margin="dense" className={classes.formControl}>
    <InputLabel htmlFor="select-rarity">稀少度</InputLabel>
    <Select
      MenuProps={menuProps}
      multiple
      value={rarity}
      onChange={handleChange('rarity')}
      name="rarity"
      input={<Input id="select-rarity" />}
      renderValue={renderSortedValue}>
      { baseRarity.map(buildItemIterator('rarity', rarity)) }
    </Select>
  </FormControl>
);

export default withStyles(styles)(RarityFilterComponent);
