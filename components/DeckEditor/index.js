import React, { Fragment, Component } from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// components
import CommanderSearcher from './CommanderSearcher';

const styles = theme => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh',
  },
});

export class DeckEditorComponent extends Component {
  state = {
    mode: null, // enum [null, 'searchCommander', 'searchTactics']
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
        <CommanderSearcher
          open={openSearcher}
          onClose={this.toggleSearcher(false)}
          onOpen={this.toggleSearcher(true)} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(DeckEditorComponent);
