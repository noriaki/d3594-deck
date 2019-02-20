import React from 'react';
import Head from 'next/head';

// material-ui
import { withStyles } from '@material-ui/core/styles';

// stores
import { Container as StoreContainer, initialStates } from '../../stores';

// components
import Title from '../../components/Title';
import TitleBar from '../../components/TitleBar';
import DeckEditor from '../../components/DeckEditor';
import FormationImage from '../../components/FormationImage';
import FormationDetail from '../../components/Stage/Detail';
import Footer from '../../components/Footer';

// class
import Formation from '../../server/models/classes/Formation';

const styles = theme => ({
  container: {
    paddingTop: 56,
    marginBottom: theme.spacing.unit * 4,
  },
  section: {
    marginBottom: theme.spacing.unit * 4,
  },
});

const FormationEditPage = ({ formation, classes }) => {
  const canonicalToDetail = formation.identifier && (
    <link rel="canonical" href={`/f/${formation.identifier}`} />
  );

  return (
    <main>
      <Head>
        { canonicalToDetail }
      </Head>
      <TitleBar />
      <div className={classes.container}>
        <StoreContainer initialStates={{ ...initialStates, formation }}>
          <Title />
          <section className={classes.section}>
            <DeckEditor />
          </section>
          <section className={classes.section}>
            <FormationImage />
          </section>
          <section className={classes.section}>
            <FormationDetail edit />
          </section>
        </StoreContainer>
      </div>
      <Footer />
    </main>
  );
};

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
