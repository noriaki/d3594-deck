import React, { Component } from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Typography from '@material-ui/core/Typography';

// components
import HalfModalCloseIcon from '../../HalfModalCloseIcon';
import SearchField from './SearchField';
import Filter from './Filter';

const styles = theme => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    height: '80vh',
    width: '96vw',
    left: 'auto',
    right: 'auto',
    padding: theme.spacing.unit * 2,
    borderRadius: [
      theme.shape.borderRadius * 2, theme.shape.borderRadius * 2, 0, 0,
    ].map(u => `${u}px`).join(' '),
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit,
  },
});

export class CommanderSearcherComponent extends Component {
  state = {
    searchText: '',
    filter: {
      rarity: [5, 4, 3],
      army: ['弓', '歩', '騎'],
      team: ['群', '漢', '魏', '蜀', '呉'],
    },
  }

  updateSearchText = (value) => {
    const { searchText, ...other } = this.state;
    this.setState({ ...other, searchText: value });
  }

  updateFilter = target => (event) => {
    const { value } = event.target;
    const { filter, ...other } = this.state;
    this.setState({ ...other, filter: { ...filter, [target]: value } });
  }

  render() {
    const {
      open,
      onOpen: handleOpen,
      onClose: handleClose,
      classes,
    } = this.props;
    const {
      filter,
      searchText: text,
    } = this.state;
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onOpen={handleOpen}
        onClose={handleClose}
        ModalProps={{ keepMounted: true }}
        classes={{ modal: classes.modal, paper: classes.paper }}>
        <div className={classes.closeIcon}>
          <HalfModalCloseIcon onClick={handleClose} />
        </div>
        <SearchField onChange={this.updateSearchText} />
        <Filter filter={filter} onChange={this.updateFilter} />
        <Typography>SwipeableDrawer</Typography>
        <Typography>
          searchText:
          { text }
        </Typography>
      </SwipeableDrawer>
    );
  }
}

export default withStyles(styles)(CommanderSearcherComponent);
