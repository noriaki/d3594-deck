import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';

import { buildItemIterator, menuProps } from './concerns/menu';

const styles = theme => ({
  formControl: {
    width: `calc(calc(100% - ${theme.spacing.unit * 2}px) / 3)`,
  },
});

const baseRarity = [5, 4, 3, 2, 1];

const renderSortedValue = (selected) => {
  const sortedValue = baseRarity.filter(r => selected.includes(r));
  return `\u2605${sortedValue.join(',')}`;
};

export const RarityFilterComponent = ({ classes, rarity, handleChange }) => (
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
