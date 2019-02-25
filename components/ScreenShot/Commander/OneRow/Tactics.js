import React from 'react';
import classnames from 'classnames';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// classes
import Tactics from '../../../../server/models/classes/Tactics';

const styles = theme => ({
  root: {
    width: 202,
    position: 'relative',
    padding: [theme.spacing.unit * 2, 41, 0].map(s => `${s}px`).join(' '),
  },
  image: {
    width: '100%',
  },
  textContainer: {
    position: 'absolute',
    top: 108,
    width: '100%',
    height: 56,
    display: 'flex',
    justifyContent: 'center',
    marginLeft: -41,
    backgroundColor: 'rgba(255,255,255,0.6)',
  },
  text: {
    fontSize: 40,
  },
  textDefault: {
    color: theme.palette.grey[700],
  },
});

export const TacticsComponent = ({ tactics, classes }) => {
  const {
    root,
    image,
    textContainer,
    text,
    textDefault,
  } = classes;
  const { identifier, name } = tactics;
  const src = Tactics.buildImageURL(tactics, null, '2x');
  const textClasses = classnames(text, { [textDefault]: !identifier });

  return (
    <div className={root}>
      <img src={src} alt={name} className={image} />
      <div className={textContainer}>
        <Typography variant="h6" className={textClasses}>{name}</Typography>
      </div>
    </div>
  );
};

export default withStyles(styles)(TacticsComponent);
