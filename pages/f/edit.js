import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';

// components
import TitleBar from '../../components/TitleBar';
import DeckEditor from '../../components/DeckEditor';

const styles = theme => ({
  container: {
    paddingTop: 56,
  },
});

const FormationEditPage = ({ formation, classes }) => (
  <div>
    <TitleBar />
    <div className={classes.container}>
      <DeckEditor formation={formation} />
    </div>
  </div>
);

FormationEditPage.getInitialProps = async ({ req, query }) => {
  const isServer = !!req;
  if (isServer) {
    const { formation } = query;
    return { formation };
  }
  const { id } = query;
  const res = await fetch(`/api/v1/f/${id}`, {
    headers: { Accept: 'application/json' },
  });
  const json = await res.json();
  return { formation: json };
};

export default withStyles(styles)(FormationEditPage);
