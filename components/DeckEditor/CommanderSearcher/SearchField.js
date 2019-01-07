import React, { PureComponent } from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// material-ui icons
import SearchIcon from '@material-ui/icons/SearchRounded';

const WAIT_INTERVAL = 700;
const KEYS = {
  ENTER: 13,
  SPACE: 32,
  BACKSPACE: 8,
  DELETE: 46,
};

class SearchField extends PureComponent {
  state = { value: this.props.defaultValue || '' }

  timer = null

  componentWillUnmount = () => {
    clearTimeout(this.timer);
  }

  handleChange = (event) => {
    clearTimeout(this.timer);
    this.setState({ value: event.target.value });
    this.timer = setTimeout(this.trigerChange, WAIT_INTERVAL);
  }

  handleKeyDown = (event) => {
    if (Object.values(KEYS).includes(event.keyCode)) {
      clearTimeout(this.timer);
      this.trigerChange();
    }
  }

  trigerChange = () => {
    const { onChange: handleChange } = this.props;
    const { value } = this.state;
    handleChange(value);
  }

  render() {
    const { value } = this.state;
    return (
      <TextField
        value={value}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        label={<LabelComponent />}
        type="search"
        fullWidth
        margin="dense"
        variant="outlined" />
    );
  }
}

export default SearchField;

const labelStyles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const LabelComponent = withStyles(labelStyles)(({ classes }) => (
  <span className={classes.container}>
    <SearchIcon fontSize="inherit" />
    検索
  </span>
));
