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

const baseTeam = ['群', '漢', '魏', '蜀', '呉'];

const renderSortedValue = (selected) => {
  const sortedValue = baseTeam.filter(r => selected.includes(r));
  return sortedValue.join(',');
};

export const TeamFilterComponent = ({ classes, team, handleChange }) => (
  <FormControl margin="dense" className={classes.formControl}>
    <InputLabel htmlFor="select-team">兵種</InputLabel>
    <Select
      MenuProps={menuProps}
      multiple
      value={team}
      onChange={handleChange('team')}
      name="team"
      input={<Input id="select-team" />}
      renderValue={renderSortedValue}>
      { baseTeam.map(buildItemIterator('team', team)) }
    </Select>
  </FormControl>
);

export default withStyles(styles)(TeamFilterComponent);
