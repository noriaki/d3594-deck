import React, { Component } from 'react';
import qs from 'qs';
import isEqual from 'lodash.isequal';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
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

export class FetchAndDisplayComponent extends Component {
  state = {
    commanders: null,
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    if (!isEqual(nextProps.query, prevState.prevQuery)) {
      return {
        commanders: null,
        prevQuery: nextProps.query,
      };
    }
    return null;
  }

  componentDidMount = () => {
    const { query } = this.props;
    this.fetch(query);
  }

  componentDidUpdate = () => {
    const { commanders } = this.state;
    if (commanders === null) {
      const { query } = this.props;
      this.fetch(query);
    }
  }

  render = () => {
    const { commanders } = this.state;
    const { classes } = this.props;
    if (commanders === null) {
      return <div>Loading...</div>;
    }
    return (
      <GridList cols={3} spacing={2} cellHeight="auto" className={classes.root}>
        {commanders.map(buildGridListTile(classes))}
      </GridList>
    );
  }

  fetch = async (query) => {
    const uri = `/api/v1/c?${qs.stringify(query)}`;
    const response = await fetch(uri, {
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    });
    const commanders = await response.json();
    this.setState({ commanders });
  };
}

export default withStyles(styles)(FetchAndDisplayComponent);

const buildGridListTile = classes => c => (
  <GridListTile key={c._id} style={{ height: '38%' }}>
    <img src={c.imageURL} alt={c.id} />
    <GridListTileBar
      title={`${c.name}${c.special || ''}`}
      titlePosition="bottom"
      classes={{ root: classes.tileBarRoot }} />
  </GridListTile>
);
