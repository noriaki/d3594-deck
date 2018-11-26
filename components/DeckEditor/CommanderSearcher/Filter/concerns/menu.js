import React from 'react';

// material-ui components
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const createText = (type, value) => {
  switch (type) {
  case 'rarity':
    return `\u2605${value}`;
  case 'army':
    return `${value}兵`;
  default:
    return value;
  }
};

export const buildItemIterator = (type, values) => value => (
  <MenuItem dense key={value} value={value}>
    <Checkbox checked={values.includes(value)} />
    <ListItemText primary={createText(type, value)} />
  </MenuItem>
);

export const menuProps = {
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

export default {
  buildItemIterator,
  menuProps,
};
