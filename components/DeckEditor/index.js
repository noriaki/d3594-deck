import React, { Fragment, PureComponent } from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

// components
import HalfModalCloseIcon from '../HalfModalCloseIcon';

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
      theme.spacing.unit, theme.spacing.unit, 0, 0,
    ].map(u => `${u}px`).join(' '),
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: theme.spacing.unit * 2,
  },
});

export class DeckEditorComponent extends PureComponent {
  state = {
    openSearcher: true,
  }

  toggleSearcher = open => () => {
    let nextOpen = open;
    const { openSearcher } = this.state;
    if (nextOpen === undefined) { nextOpen = !openSearcher; }
    this.setState({
      openSearcher: nextOpen,
    });
  }

  render() {
    const { classes } = this.props;
    const { openSearcher } = this.state;
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
          SwipeableDrawer
        </SwipeableDrawer>
      </Fragment>
    );
  }
}

export default withStyles(styles)(DeckEditorComponent);
