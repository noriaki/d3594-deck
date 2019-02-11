import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';

// components
import TitleBar from '../../components/TitleBar';
import DeckEditor from '../../components/DeckEditor';
import Footer from '../../components/Footer';

// class
import Formation from '../../server/models/classes/Formation';

const styles = theme => ({
  container: {
    paddingTop: 56,
    marginBottom: theme.spacing.unit * 4,
  },
});

const FormationEditPage = ({ formation, classes }) => (
  <main>
    <TitleBar />
    <div className={classes.container}>
      <DeckEditor formation={formation} />
    </div>
    <Footer />
  </main>
);

FormationEditPage.getInitialProps = async ({ req, query }) => {
  const isServer = !!req;
  if (isServer) {
    const { formation } = query;
    return { formation };
  }
  const { id } = query;
  if (id == null) {
    return { formation: Formation.initialize() };
  }
  const res = await fetch(`/api/v1/f/${id}`, {
    headers: { Accept: 'application/json' },
  });
  const json = await res.json();
  return { formation: json };
};

export default withStyles(styles)(FormationEditPage);
