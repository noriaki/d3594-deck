import React, { Fragment, Component } from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

// components
import HalfModalCloseIcon from '../HalfModalCloseIcon';
import Search from './Search';
import Filter from './Filter';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh',
  },
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

export class DeckEditorComponent extends Component {
  state = {
    openSearcher: true,
    query: '',
    filter: {
      rarity: [5, 4, 3],
      army: ['歩'],
      team: ['群', '魏', '蜀'],
    },
  }

  toggleSearcher = open => () => {
    let nextOpen = open;
    const { openSearcher } = this.state;
    if (nextOpen === undefined) { nextOpen = !openSearcher; }
    this.setState({
      openSearcher: nextOpen,
    });
  }

  updateQuery = (event) => {
    const { query, ...other } = this.state;
    this.setState({ ...other, query: event.target.value });
  }

  updateFilter = target => (event) => {
    const { value } = event.target;
    const { filter, ...other } = this.state;
    this.setState({ ...other, filter: { ...filter, [target]: value } });
  }

  render() {
    const { classes } = this.props;
    const { openSearcher, filter } = this.state;
    return (
      <Fragment>
        <div className={classes.container}>
          <Button variant="outlined" onClick={this.toggleSearcher()}>
            {openSearcher ? 'Close' : 'Open'}
          </Button>
        </div>
        <SwipeableDrawer
          anchor="bottom"
          open={openSearcher}
          onClose={this.toggleSearcher(false)}
          onOpen={this.toggleSearcher(true)}
          classes={{ modal: classes.modal, paper: classes.paper }}>
          <div className={classes.closeIcon}>
            <HalfModalCloseIcon onClick={this.toggleSearcher(false)} />
          </div>
          <Search handleChange={this.updateQuery} />
          <Filter filter={filter} handleChange={this.updateFilter} />
          SwipeableDrawer
        </SwipeableDrawer>
      </Fragment>
    );
  }
}

export default withStyles(styles)(DeckEditorComponent);
