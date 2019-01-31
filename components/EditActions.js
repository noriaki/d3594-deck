import React from 'react';
import Link from 'next/link';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';

// stores
import { withStores } from '../stores';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    margin: theme.spacing.unit,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

export const EditActionsComponent = ({ edit, formation, classes }) => {
  const identifier = formation.get('identifier');
  const path = edit ? '' : '/edit';
  const href = `/f${path}?id=${identifier}`;
  const as = `/f/${identifier}${path}`;
  const Icon = edit ? DoneIcon : EditIcon;
  const label = edit ? '保存' : 'コピーして編集';
  return (
    <div className={classes.root}>
      <Link href={href} as={as}>
        <Fab
          variant="extended"
          color="primary"
          component="a"
          aria-label={label}
          className={classes.fab}>
          <Icon className={classes.icon} />
          {label}
        </Fab>
      </Link>
    </div>
  );
};

export default withStores(withStyles(styles)(EditActionsComponent));