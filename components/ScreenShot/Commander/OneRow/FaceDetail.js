import React from 'react';
import classnames from 'classnames';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// components
import ResponsiveImage from '../../../ResponsiveImage';

const styles = theme => ({
  root: {
    width: 290,
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 82,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
  },
  imageNone: {
    height: '100%',
    backgroundColor: theme.palette.grey[600],
    border: `4px solid ${theme.palette.grey[700]}`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    height: 40,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: `0 ${theme.spacing.unit}px`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.3) 100%)',
  },
  text: {
    color: theme.palette.primary.contrastText,
    fontSize: 32,
  },
});

export const FaceDetailComponent = ({
  commander,
  classes,
}) => {
  const {
    root,
    image,
    imageNone,
    detail,
    text,
  } = classes;

  if (commander == null) {
    return (
      <div className={root}>
        <div className={classnames(image, imageNone)}>
          <Typography className={text}>未配置</Typography>
        </div>
      </div>
    );
  }

  const {
    id,
    cost,
    special,
    army,
    distance,
    imageURL,
  } = commander;
  const imageSrc = largeImageURL(imageURL);
  const Text = ({ children }) => (
    children && (
      <Typography variant="h6" className={text}>
        { children }
      </Typography>
    )
  );

  return (
    <div className={root}>
      <ResponsiveImage src={imageSrc} alt={id} className={image} />
      <div className={detail}>
        <Text>{ `Cost ${cost}` }</Text>
        <Text>{ special }</Text>
        <Text>{ `${army} ${distance}` }</Text>
      </div>
    </div>
  );
};

export default withStyles(styles)(FaceDetailComponent);

const largeImageURL = (url) => {
  const [filename, ...other] = url.split('/').reverse();
  const baseurl = other.reverse().join('/');
  const [basename, extname] = filename.split('.');
  return `${baseurl}/${basename}@3x.${extname}`;
};
