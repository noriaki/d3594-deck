import React from 'react';
import Head from 'next/head';

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

const jpFontURI = 'https://fonts.googleapis.com/css?family=Noto+Sans+JP:400&subset=japanese';

const SsPage = ({ formation, classes }) => (
  <main className={classes.main}>
    <Head>
      {/* Japanese fonts */}
      <link rel="stylesheet" href={jpFontURI} />
    </Head>
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
