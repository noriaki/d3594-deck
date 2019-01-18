import React, { Component } from 'react';
import EventListener from 'react-event-listener';
import debounce from 'lodash.debounce';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const styles = theme => ({
  root: {
    height: '100%',
  },
  tileBarRoot: {
    height: theme.spacing.unit * 3,
  },
});

export class ResultsComponent extends Component {
  handleResize = () => {
    this.setDimensionVars(this.gridListRef);
  }

  componentDidUpdate = () => {
    this.setDimensionVars(this.gridListRef);
  };

  componentWillUnmount = () => {
    this.removeTouchStart();
  };

  listenTouchStart = () => {
    if (this.gridListRef != null) {
      this.gridListRef.addEventListener('touchstart', this.handleTouchStart);
    }
  };

  removeTouchStart = () => {
    if (this.gridListRef != null) {
      this.gridListRef.removeEventListener(
        'touchstart', this.handleTouchStart
      );
    }
  };

  handleTouchStart = () => {
    if (this.gridListRef != null) {
      this.gridListRef.addEventListener(
        'touchmove', this.handleTouchMove, { passive: false }
      );
      this.gridListRef.addEventListener(
        'touchend', this.handleTouchEnd
      );
      this.gridListRef.addEventListener(
        'touchcancel', this.handleTouchEnd
      );
    }
  };

  handleTouchMove = (event) => {
    event.preventDefault();
    if (this.gridListRef != null && this.gridListRef.scrollTop !== 0) {
      event.stopPropagation();
    }
  };

  handleTouchEnd = () => {
    this.removeTouchListeners();
  };

  removeTouchListeners = () => {
    if (this.gridListRef != null) {
      this.gridListRef.removeEventListener(
        'touchmove', this.handleTouchMove, { passive: false }
      );
      this.gridListRef.removeEventListener(
        'touchend', this.handleTouchEnd
      );
      this.gridListRef.removeEventListener(
        'touchcancel', this.handleTouchEnd
      );
    }
  };

  render = () => {
    const {
      commanders,
      onClick: handleClick,
      classes,
    } = this.props;
    if (commanders === null) {
      return <div>Loading...</div>;
    }
    return (
      <RootRef rootRef={this.setGridListRef}>
        <GridList
          cols={3}
          spacing={2}
          cellHeight="auto"
          className={classes.root}>
          {commanders.map(buildGridListTile(classes, handleClick))}
          <EventListener
            target="window"
            onResize={debounce(this.handleResize)} />
        </GridList>
      </RootRef>
    );
  };

  setGridListRef = (node) => {
    this.removeTouchStart();
    this.gridListRef = node;
    this.listenTouchStart();
  };

  setDimensionVars = (element) => {
    if (element != null) {
      const ieh = element.clientHeight;
      const iew = element.clientWidth;
      element.style.setProperty('--ieh', `${ieh}px`);
      element.style.setProperty('--iew', `${iew}px`);
      this.setCardHeightVars(element, iew);
    }
  };

  setCardHeightVars = (element, width) => {
    if (element != null) {
      const cardHeight = ((width - 6) / 3) * 1.371345029239765;
      element.style.setProperty('--ch', `${cardHeight}px`);
    }
  };
}

export default withStyles(styles)(ResultsComponent);

const buildGridListTile = (classes, handleClick) => commander => (
  <GridListTile
    key={commander._id}
    onClick={handleClick({ commander })}
    style={{ height: 'var(--ch)' }}>
    <img src={commander.imageURL} alt={commander.id} />
    <GridListTileBar
      title={`${commander.name}${commander.special || ''}`}
      titlePosition="bottom"
      classes={{ root: classes.tileBarRoot }} />
  </GridListTile>
);
