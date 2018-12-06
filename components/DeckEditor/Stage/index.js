import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';

// components
import Commander from './Commander';

// styles
import { baseStyles, searchStyles } from './styles';

const positions = ['honei', 'chuei', 'zenei'];

const Stage = ({
  search,
  edit,
  formation,
}) => {
  const styles = search ? searchStyles : baseStyles;
  const StyledCommander = withStyles(styles)(Commander);
  const editable = !search && edit;
  return formation.commanders.map((commander, i) => (
    <StyledCommander
      key={positions[i]}
      commander={commander}
      search={search}
      editable={editable}
      position={positions[i]} />
  ));
};


export default Stage;
