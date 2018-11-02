import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = () => ({
  captionContainer: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
    textAlign: 'center',
  },
});

const Tactics = ({ tactics, classes }) => (
  <Card elevation={0}>
    <CardMedia
      component="img"
      alt={tactics.name}
      src={tactics.imageURL}
      srcSet={tactics.imageSrcSet.join(', ')}
      title={tactics.name} />
    <CardContent className={classes.captionContainer}>
      <Typography gutterBottom variant="caption">
        {tactics.name}
      </Typography>
    </CardContent>
  </Card>
);

export default withStyles(styles)(Tactics);
