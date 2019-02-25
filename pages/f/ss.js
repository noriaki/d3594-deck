import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';

// components
import FormationScreenShot from '../../components/ScreenShot';

// class
import FormationClass from '../../server/models/classes/Formation';

const styles = theme => ({
  '@global': {
    html: {
      minHeight: 'unset',
      fontSize: 'unset',
      maxWidth: 'unset',
      margin: 0,
      backgroundColor: theme.palette.common.white,
    },
    body: {
      height: 'unset',
    },
  },
  main: {
    width: 1200,
    height: 628,
    position: 'relative',
  },
});

const SsPage = ({ formation, classes }) => (
  <main className={classes.main}>
    <FormationScreenShot commanders={formation.commanders} />
  </main>
);

SsPage.getInitialProps = async ({ req, query }) => {
  const isServer = !!req;
  if (isServer) {
    const { formation } = query;
    return { formation };
  }
  const { id } = query;
  if (id == null) {
    return { formation: FormationClass.initialize() };
  }
  return {};
};

export default withStyles(styles)(SsPage);