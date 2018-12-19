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

  render = () => {
    const {
      commanders,
      onClick,
      classes,
    } = this.props;
    if (commanders === null) {
      return <div>Loading...</div>;
    }
    const handleClick = identifier => () => onClick(identifier);
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

  setGridListRef = (node) => { this.gridListRef = node; };

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

const buildGridListTile = (classes, handleClick) => c => (
  <GridListTile
    key={c._id}
    onClick={handleClick(c.identifier)}
    style={{ height: 'var(--ch)' }}>
    <img src={c.imageURL} alt={c.id} />
    <GridListTileBar
      title={`${c.name}${c.special || ''}`}
      titlePosition="bottom"
      classes={{ root: classes.tileBarRoot }} />
  </GridListTile>
);
