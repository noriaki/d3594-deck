import React, { Component } from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

// components
import HalfModalCloseIcon from '../../HalfModalCloseIcon';
import SearchField from '../SearchField';
import Filter from './Filter';
import Results from './Results';

// stores
import { withStores } from '../../../stores';

// actions
import { searchActions } from '../../../actions';

const styles = theme => ({
  modal: {
    display: 'flex',
    justifyContent: 'center',
  },
  paper: {
    height: '77%',
    height: 'calc(var(--ivh, 1vh) * 80 - 56px)', // eslint-disable-line no-dupe-keys
    width: '96%',
    width: 'calc(var(--ivw, 1vw) * 96)', // eslint-disable-line no-dupe-keys
    left: 'auto',
    right: 'auto',
    padding: [
      theme.spacing.unit * 2, theme.spacing.unit * 2, 0,
    ].map(u => `${u}px`).join(' '),
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

export class TacticsSearcherComponent extends Component {
  componentDidMount = () => {
    const { tacticsSearcher } = this.props;
    tacticsSearcher.set('init')(true);
  };

  handleOpen = () => {};

  handleClose = () => {
    const { searcher } = this.props;
    searcher.set('target')(null);
  };

  render() {
    const {
      classes,
      tacticsSearcher, // from undux stores
    } = this.props;
    const open = tacticsSearcher.get('open');
    const {
      updateText,
      updateFilter,
      selectData,
    } = searchActions(tacticsSearcher);
    const { filter } = tacticsSearcher.get('query');
    const acquirer = tacticsSearcher.get('acquirer');
    const tactics = tacticsSearcher.get('results');
    return (
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        ModalProps={{ keepMounted: true }}
        classes={{ modal: classes.modal, paper: classes.paper }}>
        <div className={classes.closeIcon}>
          <HalfModalCloseIcon onClick={this.handleClose} />
        </div>
        <div>
          <SearchField onChange={updateText} />
        </div>
        <div>
          <Filter filter={filter} onChange={updateFilter} />
        </div>
        <Results tactics={tactics} acquirer={acquirer} onClick={selectData} />
      </SwipeableDrawer>
    );
  }
}

export default withStores(
  withStyles(styles)(TacticsSearcherComponent)
);
