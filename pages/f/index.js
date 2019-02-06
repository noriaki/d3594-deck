import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// stores
import { Container as StoreContainer, initialStates } from '../../stores';

// components
import Title from '../../components/Title';
import Stage from '../../components/Stage';
import FormationDetail from '../../components/Stage/Detail';
import EditActions from '../../components/EditActions';
import TitleBar from '../../components/TitleBar';

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
    // margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 3,
  },
});

const FormationDetailPage = ({ classes, formation }) => (
  <div>
    <TitleBar />
    <div className={classes.container}>
      <StoreContainer initialStates={{ ...initialStates, formation }}>
        <section className={classes.section}>
          <Paper square className={classes.paper}>
            <Title />
            <Stage />
            <EditActions />
          </Paper>
        </section>
        <section className={classes.section}>
          <FormationDetail />
        </section>
      </StoreContainer>
    </div>
  </div>
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
