import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const IndexPage = ({ classes }) => (
  <div>
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" color="inherit">D3594 Deck</Typography>
      </Toolbar>
    </AppBar>
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h3">張飛</Typography>
      <Typography>
        蜀の名将。劉備、関羽とは「桃園の誓い」を結んだ義兄弟。勇猛、無鉄砲、悪を非常に憎むことでよく知られている。
        長坂橋では二十騎ほどを率いて殿を務め、川に拠って橋を切り落とし、100万の曹軍を誰一人として寄せ付けなかった。
      </Typography>
      <Typography>
        <Link href="/f/43e0f069ab00049908ab34390a9c45ca">
          <a>formation link</a>
        </Link>
      </Typography>
    </Paper>
  </div>
);

IndexPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(IndexPage);
