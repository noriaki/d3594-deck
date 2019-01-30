import React from 'react';

// material-ui components
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({});

export const CollapsibleTacticsDetailComponent = ({
  tactics,
  onClick: handleClick,
  classes,
}) => {
  const {
    name,
    origin,
    permissions,
    rate,
    distance,
    target,
    description,
  } = tactics || {};

  return (
    <div>
      {name}
      {origin}
      {permissions && permissions.join(', ')}
      {rate}
      {distance}
      {target}
      {description}
    </div>
  );
};

export default withStyles(styles)(CollapsibleTacticsDetailComponent);
