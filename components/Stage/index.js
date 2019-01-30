import React, { Children } from 'react';

// components
import Commander from './Commander';

// styles
import { withBaseStyles, withSearchStyles } from './styles';

// stores
import { withStores } from '../../stores';

const Stage = ({
  edit,
  formation, // from undux stores
  searcher, // from undux stores
}) => {
  const search = searcher.get('target') !== null;
  const withStyles = search ? withSearchStyles : withBaseStyles;
  const editable = !search && edit;
  const commanders = formation.get('commanders').map((commander, index) => {
    const key = `${index}:${commander != null ? commander.identifier : ''}`;
    return (
      <Commander
        key={key}
        commander={commander}
        search={search}
        editable={editable}
        position={index} />
    );
  });
  const StyledWrapper = withStyles(Wrapper);
  return <StyledWrapper>{commanders}</StyledWrapper>;
};

export default withStores(Stage);

const Wrapper = ({ classes, children, ...props }) => {
  const childProps = { classes, ...props };
  return (
    <div className={classes.root}>
      {Children.map(children, child => React.cloneElement(child, childProps))}
    </div>
  );
};
