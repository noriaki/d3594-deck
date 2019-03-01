import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

// stores
import { Container as StoreContainer, initialStates } from '../../stores';

// components
import FormationDetailMeta from '../../components/MetaTags/FormationDetail';
import Stage from '../../components/Stage';
import FormationDetail from '../../components/Stage/Detail';
import EditActions from '../../components/EditActions';
import Notice from '../../components/Notice';
import TitleBar from '../../components/TitleBar';
import Footer from '../../components/Footer';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingLeft: 0,
    paddingRight: 0,
    padding: theme.spacing.unit,
  },
  container: {
    paddingTop: 56,
  },
  section: {
    marginBottom: theme.spacing.unit * 3,
  },
});

const FormationDetailPage = ({ classes, formation }) => (
  <main>
    <TitleBar />
    <div className={classes.container}>
      <StoreContainer initialStates={{ ...initialStates, formation }}>
        <section className={classes.section}>
          <Paper square className={classes.paper}>
            <Stage />
          </Paper>
          <Notice />
          <EditActions />
        </section>
        <section className={classes.section}>
          <FormationDetail />
          <EditActions />
        </section>
        <FormationDetailMeta />
      </StoreContainer>
    </div>
    <Footer />
  </main>
);

FormationDetailPage.getInitialProps = async ({ req, query }) => {
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

FormationDetailPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  formation: PropTypes.objectOf(PropTypes.oneOfType(
    [PropTypes.string, PropTypes.number, PropTypes.array]
  )).isRequired,
};

export default withStyles(styles)(FormationDetailPage);
