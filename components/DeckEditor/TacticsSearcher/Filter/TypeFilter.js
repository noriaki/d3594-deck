import React from 'react';
import map from 'lodash.map';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { baseTypes } from '../../../../server/models/classes/Tactics';

const styles = {
  formControl: {
    // width: '33.333%',
    paddingLeft: 1,
    paddingRight: 1,
  },
};

const buildCheckboxes = (checkedTypes, handleChangeOf) => (
  map(baseTypes, (key, value) => {
    const checkbox = (
      <Checkbox
        checked={checkedTypes.includes(value)}
        onChange={handleChangeOf(value)}
        value={key} />
    );
    return <FormControlLabel key={key} control={checkbox} label={value} />;
  })
);

export const TypeFilterComponent = ({
  classes,
  type,
  onChange: handleChange,
}) => {
  const onCheckboxChange = value => (event) => {
    const nextTypes = Object.keys(baseTypes).filter(t => (
      t === value ? event.target.checked : type.includes(t)
    ));
    handleChange('type', nextTypes);
  };
  return (
    <FormControl margin="dense" className={classes.formControl}>
      <FormLabel htmlFor="select-army">種別</FormLabel>
      <FormGroup>
        {buildCheckboxes(type, onCheckboxChange)}
      </FormGroup>
    </FormControl>
  );
};

export default withStyles(styles)(TypeFilterComponent);
