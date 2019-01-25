import React, { Component } from 'react';
import groupBy from 'lodash.groupby';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import Tactics from '../../Stage/Commander/Tactics';
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
  tacticsRoot: {},
  tacticsImage: {},
  tacticsCaptionContainer: {
    padding: 0,
    '&:last-child': { paddingBottom: 0 },
  },
});

export class ResultsComponent extends Component {
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

  render = () => {
    const {
      tactics,
      onClick: handleClick,
      classes,
    } = this.props;
    if (tactics === null) {
      return <div>Loading...</div>;
    }
    const groupedTactics = groupBy(tactics, 'type');
    const {
      root,
      ...nextClasses
    } = classes;
    const mapper = buildTacticsList(groupedTactics, handleClick, nextClasses);
    return (
      <RootRef rootRef={this.setRef}>
        <List className={root} subheader={<li />}>
          {baseTypes.map(mapper)}
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

const buildTacticsList = (tacticsList, handleClick, classes) => (type) => {
  if (tacticsList[type].length === 0) { return null; }
  const {
    groupedTacticsListContainer,
    typeHeader,
    ...nextClasses
  } = classes;
  return (
    <li key={type}>
      <ul className={groupedTacticsListContainer}>
        <ListSubheader className={typeHeader}>{type}</ListSubheader>
        {tacticsList[type].map(buildTactics(handleClick, nextClasses))}
      </ul>
    </li>
  );
};

const buildTactics = (onClick, classes) => (tactics) => {
  const {
    tacticsContainer,
    ...nextClasses
  } = classes;
  const handleClick = () => onClick({ tactics });
  return (
    <ListItem key={tactics.identifier} className={tacticsContainer}>
      <Tactics
        tactics={tactics}
        onClick={handleClick}
        classes={nextClasses} />
    </ListItem>
  );
};
