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

const SEARCH_COMMANDER_MODE = 'searchCommander';
const SEARCH_TACTICS_MODE = 'searchTactics';

export class DeckEditorComponent extends Component {
  state = {
    // mode: null, // enum [null, SEARCH_COMMANDER_MODE, SEARCH_TACTICS_MODE]
    mode: SEARCH_COMMANDER_MODE,
  }

  toggleCommanderSearcher = toOpen => () => {
    let nextMode = toOpen;
    const { mode: currentMode } = this.state;
    if (nextMode === undefined) {
      nextMode = (
        currentMode === SEARCH_COMMANDER_MODE ? null : SEARCH_COMMANDER_MODE
      );
    } else {
      nextMode = (toOpen === true ? SEARCH_COMMANDER_MODE : null);
    }
    this.setState({ mode: nextMode });
  }

  render() {
    const { classes } = this.props;
    const { mode } = this.state;
    return (
      <Fragment>
        <div className={classes.container}>
          <Button
            variant="outlined"
            onClick={this.toggleCommanderSearcher()}>
            {mode === SEARCH_COMMANDER_MODE ? 'Close' : 'Open'}
          </Button>
        </div>
        <CommanderSearcher
          open={mode === SEARCH_COMMANDER_MODE}
          onClose={this.toggleCommanderSearcher(false)}
          onOpen={this.toggleCommanderSearcher(true)} />
      </Fragment>
    );
  }
}

export default withStyles(styles)(DeckEditorComponent);
