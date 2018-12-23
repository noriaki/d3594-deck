import React, { Fragment, Component } from 'react';

// stores
import { Container, initialStates } from '../../stores';
import mapIds from '../../effects/concerns/mapIds';

// components
import Title from '../Title';
import Stage from './Stage';
import CommanderSearcher from './CommanderSearcher';

const SEARCH_COMMANDER_MODE = 'searchCommander';
const SEARCH_TACTICS_MODE = 'searchTactics';

class DeckEditor extends Component {
  state = {
    mode: null, // enum [null, SEARCH_COMMANDER_MODE, SEARCH_TACTICS_MODE]
    // mode: SEARCH_COMMANDER_MODE,
  };

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
  };

  render() {
    const { formation } = this.props;
    const searcher = mapIds(formation, initialStates.searcher);
    const states = { ...initialStates, formation, searcher };
    const { mode } = this.state;
    return (
      <Container initialStates={states}>
        <Fragment>
          <Title />
          <Stage
            edit
            search={mode !== null}
            commanderSearchHandler={this.toggleCommanderSearcher} />
          <CommanderSearcher
            open={mode === SEARCH_COMMANDER_MODE}
            onClose={this.toggleCommanderSearcher(false)}
            onOpen={this.toggleCommanderSearcher(true)} />
        </Fragment>
      </Container>
    );
  }
}

export default DeckEditor;
