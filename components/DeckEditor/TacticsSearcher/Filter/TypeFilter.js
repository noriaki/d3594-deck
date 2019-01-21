import React from 'react';
import map from 'lodash.map';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {
  baseTypes,
  baseTypesMap,
} from '../../../../server/models/classes/Tactics';

const styles = {
  formControl: {
    // width: '33.333%',
    paddingLeft: 1,
    paddingRight: 1,
  },
};

const DenseCheckbox = withStyles({
  root: {
    padding: '.2rem',
    marginLeft: '-.4rem',
  },
})(Checkbox);

const DenseFormControlLabel = withStyles({
  root: {
    marginLeft: 0,
    marginRight: '1rem',
  },
})(FormControlLabel);

const buildCheckboxes = (checkedTypes, handleChangeOf) => (
  map(baseTypesMap, (key, value) => {
    const checkbox = (
      <DenseCheckbox
        checked={checkedTypes.includes(value)}
        onChange={handleChangeOf(value)}
        value={key} />
    );
    return (
      <DenseFormControlLabel key={key} control={checkbox} label={value} />
    );
  })
);

export const TypeFilterComponent = ({
  classes,
  type,
  onChange: handleChange,
}) => {
  const onCheckboxChange = value => (event) => {
    const nextTypes = baseTypes.filter(t => (
      t === value ? event.target.checked : type.includes(t)
    ));
    handleChange('type', nextTypes);
  };
  return (
    <FormControl
      component="fieldset"
      margin="dense"
      fullWidth
      className={classes.formControl}>
      <FormLabel component="legend">種別</FormLabel>
      <FormGroup row style={{ justifyContent: 'space-between' }}>
        {buildCheckboxes(type, onCheckboxChange)}
      </FormGroup>
    </FormControl>
  );
};

export default withStyles(styles)(TypeFilterComponent);
