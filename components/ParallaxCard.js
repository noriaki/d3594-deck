import React, { PureComponent } from 'react';
import { Parallax } from 'react-parallax';
import Link from 'next/link';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
  header: {
    margin: 0,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.light,
  },
  media: {
    height: 220,
  },
  actionArea: {
    padding: theme.spacing.unit * 2,
    justifyContent: 'flex-end',
  },
});

export class ParallaxCardComponent extends PureComponent {
  render = () => {
    const {
      classes,
      image,
      title,
      subtitle,
      alt = title || '',
      text = '',
      linkText = 'Share',
      url,
    } = this.props;
    const linkOpts = typeof url === 'string' ? { href: url } : url;

    return (
      <Card square>
        <CardHeader
          title={title}
          titleTypographyProps={{ variant: 'h5' }}
          subheader={subtitle}
          avatar={<Avatar className={classes.avatar}><DoneIcon /></Avatar>}
          classes={{ root: classes.header }}
          component="h3" />
        <Parallax bgImage={image} bgImageAlt={alt} strength={200}>
          <div className={classes.media} />
        </Parallax>
        <CardContent>
          <Typography component="p">
            {text}
          </Typography>
        </CardContent>
        <CardActions className={classes.actionArea}>
          <div>
            <Link {...linkOpts}>
              <Button component="a" variant="outlined" color="primary">
                {linkText}
              </Button>
            </Link>
          </div>
        </CardActions>
      </Card>
    );
  };
}

export default withStyles(styles)(ParallaxCardComponent);
