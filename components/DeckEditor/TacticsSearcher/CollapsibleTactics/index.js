import React, { PureComponent, createRef } from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Typography from '@material-ui/core/Typography';
import RootRef from '@material-ui/core/RootRef';

// components
import TacticsDetail from './Detail';

// stores
import { withStores } from '../../../../stores';

const styles = theme => ({
  container: {},
  root: {},
  image: {},
  captionContainer: {
    padding: 0,
    '&:last-child': { paddingBottom: 0 },
  },
});

export class CollapsibleTacticsComponent extends PureComponent {
  tacticsRef = createRef();

  handleClick = (event) => {
    const { tactics, onClick: handleClick } = this.props;
    handleClick(this.tacticsRef.current, tactics);
    event.preventDefault();
  };

  render = () => {
    const {
      tactics,
      classes,
    } = this.props;
    const { name, imageURL, imageSrcSet } = tactics;

    return (
      <RootRef rootRef={this.tacticsRef}>
        <Card elevation={0} square className={classes.root}>
          <CardActionArea component="a" onClick={this.handleClick}>
            <CardMedia
              component="img"
              title={name}
              alt={name}
              src={imageURL}
              srcSet={imageSrcSet.join(', ')}
              className={classes.image} />
            <CardContent className={classes.captionContainer}>
              <Typography align="center" variant="body2">{name}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </RootRef>
    );
  };
}

export default withStyles(styles)(CollapsibleTacticsComponent);
