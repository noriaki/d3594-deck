import React, { PureComponent } from 'react';
import groupBy from 'lodash.groupby';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Popover from '@material-ui/core/Popover';
import Collapse from '@material-ui/core/Collapse';

import Tactics from './CollapsibleTactics';
import TacticsDetail from './CollapsibleTactics/Detail';
import { baseTypes } from '../../../server/models/classes/Tactics';

const styles = theme => ({
  root: {
    height: '100%',
    overflowY: 'auto',
  },
  groupedTacticsListContainer: {
    padding: 0,
    display: 'flex',
    flexWrap: 'wrap',
  },
  typeHeader: {
    width: '100%',
    padding: 0,
    lineHeight: '2rem',
    backgroundColor: theme.palette.background.paper,
  },
  tacticsContainer: {
    width: '25%',
    padding: [0, 2, 4].map(s => `${s}px`).join(' '),
  },
});

export class ResultsComponent extends PureComponent {
  state = { anchorEl: null, targetTactics: null };

  componentWillUnmount = () => {
    this.removeTouchStart();
  };

  listenTouchStart = () => {
    if (this.resultsRef != null) {
      this.resultsRef.addEventListener('touchstart', this.handleTouchStart);
    }
  };

  removeTouchStart = () => {
    if (this.resultsRef != null) {
      this.resultsRef.removeEventListener(
        'touchstart', this.handleTouchStart
      );
    }
  };

  handleTouchStart = () => {
    if (this.resultsRef != null) {
      this.resultsRef.addEventListener(
        'touchmove', this.handleTouchMove, { passive: false }
      );
      this.resultsRef.addEventListener(
        'touchend', this.handleTouchEnd
      );
      this.resultsRef.addEventListener(
        'touchcancel', this.handleTouchEnd
      );
    }
  };

  handleTouchMove = (event) => {
    event.preventDefault();
    if (this.resultsRef != null && this.resultsRef.scrollTop !== 0) {
      event.stopPropagation();
    }
  };

  handleTouchEnd = () => {
    this.removeTouchListeners();
  };

  removeTouchListeners = () => {
    if (this.resultsRef != null) {
      this.resultsRef.removeEventListener(
        'touchmove', this.handleTouchMove, { passive: false }
      );
      this.resultsRef.removeEventListener(
        'touchend', this.handleTouchEnd
      );
      this.resultsRef.removeEventListener(
        'touchcancel', this.handleTouchEnd
      );
    }
  };

  handleCloseDetail = () => {
    this.setState({ anchorEl: null, targetTactics: null });
  };

  handleToggleDetail = (anchorElement, tactics) => {
    const { targetTactics } = this.state;
    if (targetTactics && tactics.identifier === targetTactics.identifier) {
      this.handleCloseDetail();
    } else {
      this.setState({ anchorEl: anchorElement, targetTactics: tactics });
    }
  };

  isOpen = () => {
    const { anchorEl } = this.state;
    return !!anchorEl;
  }

  renderTypedList = typeList => baseTypes.map((type) => {
    if (typeList[type] == null || typeList[type].length === 0) {
      return null;
    }
    const {
      classes: { groupedTacticsListContainer, typeHeader },
    } = this.props;
    return (
      <li key={type}>
        <ul className={groupedTacticsListContainer}>
          <ListSubheader className={typeHeader}>{type}</ListSubheader>
          { this.renderTacticsList(typeList[type]) }
        </ul>
      </li>
    );
  });

  renderTacticsList = tacticsList => tacticsList.map((tactics) => {
    const { classes: { tacticsContainer } } = this.props;
    const { open } = this.state;
    return (
      <ListItem key={tactics.identifier} className={tacticsContainer}>
        <Tactics
          open={open}
          tactics={tactics}
          onClick={this.handleToggleDetail} />
      </ListItem>
    );
  });

  render = () => {
    const {
      tactics,
      classes,
    } = this.props;
    if (tactics === null) {
      return <div>Loading...</div>;
    }
    const groupedTactics = groupBy(tactics, 'type');
    const { root } = classes;
    const { anchorEl, targetTactics } = this.state;
    console.log(anchorEl);
    return (
      <RootRef rootRef={this.setRef}>
        <List className={root} subheader={<li />}>
          { this.renderTypedList(groupedTactics) }
          <Popover
            open={this.isOpen()}
            onClose={this.handleCloseDetail}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            hideBackdrop
            disablePortal>
            { /* container={this.resultsRef}> */ }
            <TacticsDetail tactics={targetTactics} />
          </Popover>
        </List>
      </RootRef>
    );
  };

  setRef = (node) => {
    this.removeTouchStart();
    this.resultsRef = node;
    this.listenTouchStart();
  };
}

export default withStyles(styles)(ResultsComponent);
