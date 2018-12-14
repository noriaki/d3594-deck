import React, { Children } from 'react';

// components
import Commander from './Commander';

// styles
import { withBaseStyles, withSearchStyles } from './styles';

// stores
import Store from '../../../stores';

const positions = ['honei', 'chuei', 'zenei'];

const Stage = ({
  search,
  edit,
  commanderSearchHandler,
  formation, // from undux stores
}) => {
  const withStyles = search ? withSearchStyles : withBaseStyles;
  const editable = !search && edit;
  const commanders = formation.get('commanders').map((commander, i) => (
    <Commander
      key={positions[i]}
      commander={commander}
      search={search}
      editable={editable}
      position={positions[i]}
      commanderSearchHandler={commanderSearchHandler} />
  ));
  const StyledWrapper = withStyles(Wrapper);
  return <StyledWrapper>{commanders}</StyledWrapper>;
};

export default Store.withStores(Stage);

const Wrapper = ({ classes, children, ...props }) => {
  const childProps = { classes, ...props };
  return (
    <div className={classes.root}>
      {Children.map(children, child => React.cloneElement(child, childProps))}
    </div>
  );
};
