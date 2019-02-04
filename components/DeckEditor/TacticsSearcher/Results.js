import React, { PureComponent } from 'react';
import get from 'lodash.get';
import set from 'lodash.set';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Popper from '@material-ui/core/Popper';
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
    alignItems: 'flex-start',
  },
  popperArrow: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: '-0.9em',
    width: '3em',
    height: '1em',
    fontSize: 7,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
      borderWidth: '0 1em 1em 1em',
      borderColor: `transparent transparent ${theme.palette.common.white} transparent`,
    },
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

  handleToggleDetail = (anchorElement, tactics) => {
    const { anchorEl, targetTactics } = this.state;
    if (anchorEl) { anchorEl.parentNode.style.height = null; }
    if (targetTactics && tactics.identifier === targetTactics.identifier) {
      this.setState({ anchorEl: null, targetTactics: null });
    } else {
      this.setState({ anchorEl: anchorElement, targetTactics: tactics });
    }
  };

  setPopperPosition = (data) => {
    // popper position
    const popperHeight = get(data, 'offsets.popper.height');
    const referenceHeight = get(data, 'offsets.reference.height');
    const detailHeight = popperHeight + referenceHeight;
    set(data, 'offsets.popper.left', 0);
    const { anchorEl } = this.state;
    if (anchorEl) {
      anchorEl.parentNode.style.height = `${detailHeight + 24}px`;
    }

    // arrow position
    if (this.arrowRef && data.arrowElement == null) {
      set(data, 'arrowElement', this.arrowRef);
      const { width } = this.arrowRef.getBoundingClientRect();
      const referenceLeft = get(data, 'offsets.reference.left');
      const referenceWidth = get(data, 'offsets.reference.width');
      const left = referenceLeft + (referenceWidth / 2) - (width / 2);
      set(data, 'offsets.arrow.left', left);
    }

    return data;
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
    const { acquirer, classes: { tacticsContainer } } = this.props;
    const { open } = this.state;
    return (
      <ListItem key={tactics.identifier} className={tacticsContainer}>
        <Tactics
          open={open}
          tactics={tactics}
          acquirer={acquirer}
          onClick={this.handleToggleDetail} />
      </ListItem>
    );
  });

  render = () => {
    const {
      tactics,
      onClick,
      classes,
    } = this.props;
    if (tactics === null) {
      return <div>Loading...</div>;
    }
    const groupedTactics = tactics.reduce((ret, item) => ({
      ...ret, [item._id]: item.tactics,
    }), {});
    const { root, popperArrow } = classes;
    const { anchorEl, targetTactics } = this.state;
    const handleSelect = data => () => {
      this.handleToggleDetail(null, data.tactics);
      onClick(data)();
    };
    const CollapsibleTactics = ({ TransitionProps }) => (
      <Collapse {...TransitionProps}>
        <span className={popperArrow} ref={this.setArrowRef} />
        <TacticsDetail tactics={targetTactics} onClick={handleSelect} />
      </Collapse>
    );

    return (
      <RootRef rootRef={this.setRef}>
        <List className={root} subheader={<li />}>
          { this.renderTypedList(groupedTactics) }
          <Popper
            open={this.isOpen()}
            anchorEl={anchorEl}
            placement="bottom"
            disablePortal
            transition
            modifiers={{
              flip: { enabled: false },
              preventOverflow: { enabled: false },
              hide: { enabled: false },
              arrow: { enabled: true, element: this.arrowRef },
              offset: { enabled: true, fn: this.setPopperPosition },
            }}>
            { CollapsibleTactics }
          </Popper>
        </List>
      </RootRef>
    );
  };

  setRef = (node) => {
    this.removeTouchStart();
    this.resultsRef = node;
    this.listenTouchStart();
  };

  setArrowRef = (node) => {
    this.arrowRef = node;
  };
}

export default withStyles(styles)(ResultsComponent);
