import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// material-ui icons
import SearchIcon from '@material-ui/icons/SearchRounded';

const Search = ({ handleChange }) => (
  <TextField
    onChange={handleChange}
    label={<LabelComponent />}
    type="search"
    fullWidth
    margin="dense"
    variant="outlined" />
);

export default Search;

const labelStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const LabelComponent = withStyles(labelStyles)(({ classes }) => (
  <span className={classes.container}>
    <SearchIcon fontSize="small" />
    検索
  </span>
));
