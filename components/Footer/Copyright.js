import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TwitterCircleIcon from 'mdi-material-ui/TwitterCircle';

const styles = {
  profile: {
    display: 'inline-flex',
  },
  profileLink: {
    padding: 0,
    minHeight: 'unset',
    lineHeight: 1,
    textTransform: 'none',
  },
  twitterIcon: {
    margin: '0 .1em',
    fontSize: '1rem',
  },
};

export const CopyrightComponent = ({ classes }) => (
  <Typography
    variant="body2"
    component="p"
    color="textSecondary"
    className={classes.profile}>
    (c) 2019 極悪のり
    <Button
      variant="text"
      component="a"
      href="https://twitter.com/gokuakunori"
      size="small"
      color="primary"
      className={classes.profileLink}>
      <TwitterCircleIcon className={classes.twitterIcon} />
      @gokuakunori
    </Button>
  </Typography>
);

export default withStyles(styles)(CopyrightComponent);
