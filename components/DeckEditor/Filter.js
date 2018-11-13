import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  label: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const baseRarity = [5, 4, 3, 2, 1];

const menuProps = {
  anchorOrigin: {
    vertical: 'center',
    horizontal: 'left',
  },
  transformOrigin: {
    vertical: 'top',
    horizontal: 'left',
  },
  getContentAnchorEl: null,
};

export class FilterComponent extends PureComponent {
  render() {
    const {
      classes,
      rarity,
      handleChange,
    } = this.props;
    const buildRaritySelectItem = r => (
      <MenuItem dense key={r} value={r}>
        <Checkbox checked={rarity.includes(r)} />
        <ListItemText primary={`★${r}`} />
      </MenuItem>
    );
    return (
      <div className={classes.root}>
        <FormControl margin="dense" variant="outlined">
          <InputLabel
            className={classes.label}
            ref={(el) => { this.labelRef = ReactDOM.findDOMNode(el); }}
            htmlFor="select-rarity">
            <span>稀少度</span>
          </InputLabel>
          <Select
            MenuProps={menuProps}
            multiple
            value={rarity}
            onChange={handleChange('rarity')}
            name="rarity"
            input={<OutlinedInput labelWidth={this.labelRef ? this.labelRef.offsetWidth : 0} id="select-rarity" />}
            renderValue={selected => `★${selected.join(',')}`}>
            { baseRarity.map(buildRaritySelectItem) }
          </Select>
        </FormControl>
      </div>
    );
  }
}

export default withStyles(styles)(FilterComponent);
