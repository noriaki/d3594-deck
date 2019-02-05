import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// stores
import { Container as StoreContainer, initialStates } from '../../stores';

// components
import Title from '../../components/Title';
import Stage from '../../components/Stage';
import EditActions from '../../components/EditActions';
import TitleBar from '../../components/TitleBar';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    padding: theme.spacing.unit,
  },
  container: {
    paddingTop: 56,
  },
});

const FormationDetailPage = ({ classes, formation }) => (
  <div>
    <TitleBar />
    <div className={classes.container}>
      <Paper className={classes.paper}>
        <StoreContainer initialStates={{ ...initialStates, formation }}>
          <Title />
          <Stage />
          <EditActions />
        </StoreContainer>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h3">コスト</Typography>
        <Typography>{formation.cost}</Typography>
        <Typography variant="h5" component="h3">速度</Typography>
        <Typography>{formation.velocity}</Typography>
        <Typography variant="h5" component="h3">攻城</Typography>
        <Typography>{formation.siege}</Typography>
        <pre>{formation.humanize}</pre>
      </Paper>
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
