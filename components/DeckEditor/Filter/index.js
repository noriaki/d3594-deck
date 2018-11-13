import React, { PureComponent } from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  formControl: {
    width: `calc(calc(100% - ${theme.spacing.unit * 2}px) / 3)`,
  },
});

const baseRarity = [5, 4, 3, 2, 1];
const baseArmy = ['弓', '歩', '騎'];
const baseTeam = ['群', '漢', '魏', '蜀', '呉'];

const menuProps = {
  anchorOrigin: {
    vertical: 'center',
    horizontal: 'center',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'center',
  },
  getContentAnchorEl: null,
};

export class FilterComponent extends PureComponent {
  render() {
    const {
      classes,
      rarity,
      army,
      team,
      handleChange,
    } = this.props;
    const buildRaritySelectItem = r => (
      <MenuItem dense key={r} value={r}>
        <Checkbox checked={rarity.includes(r)} />
        <ListItemText primary={`★${r}`} />
      </MenuItem>
    );
    const buildArmySelectItem = a => (
      <MenuItem dense key={a} value={a}>
        <Checkbox checked={army.includes(a)} />
        <ListItemText primary={`${a}兵`} />
      </MenuItem>
    );
    const buildTeamSelectItem = t => (
      <MenuItem dense key={t} value={t}>
        <Checkbox checked={team.includes(t)} />
        <ListItemText primary={t} />
      </MenuItem>
    );
    return (
      <div className={classes.root}>
        <FormControl margin="dense" className={classes.formControl}>
          <InputLabel htmlFor="select-rarity">稀少度</InputLabel>
          <Select
            MenuProps={menuProps}
            multiple
            value={rarity}
            onChange={handleChange('rarity')}
            name="rarity"
            input={<Input id="select-rarity" />}
            renderValue={selected => `★${selected.join(',')}`}>
            { baseRarity.map(buildRaritySelectItem) }
          </Select>
        </FormControl>
        <FormControl margin="dense" className={classes.formControl}>
          <InputLabel htmlFor="select-army">兵種</InputLabel>
          <Select
            MenuProps={menuProps}
            multiple
            value={army}
            onChange={handleChange('army')}
            name="army"
            input={<Input id="select-army" />}
            renderValue={selected => selected.join(',')}>
            { baseArmy.map(buildArmySelectItem) }
          </Select>
        </FormControl>
        <FormControl margin="dense" className={classes.formControl}>
          <InputLabel htmlFor="select-team">陣営</InputLabel>
          <Select
            MenuProps={menuProps}
            multiple
            value={team}
            onChange={handleChange('team')}
            name="team"
            input={<Input id="select-team" />}
            renderValue={selected => selected.join(',')}>
            { baseTeam.map(buildTeamSelectItem) }
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(FilterComponent);
