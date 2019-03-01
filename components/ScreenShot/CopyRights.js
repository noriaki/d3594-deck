import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: 1060,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const CopyRightsComponent = ({ classes }) => {
  const { root } = classes;

  return (
    <div className={root}>
      <Typography component="small">
        (c) 2019 @gokuakunori - deck.d3594.com
      </Typography>
      <Typography component="small">
        All Rights of the Game Material:
        (c) 2015 NetEase Inc,
        (c) WINKING DIGITAL ENTERTAINMENT Ltd.
        (c) WeGamesJapan Co.,ltd
      </Typography>
    </div>
  );
};

export default withStyles(styles)(CopyRightsComponent);
