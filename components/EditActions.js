import React from 'react';
import Link from 'next/link';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import AddIcon from '@material-ui/icons/Add';

// stores
import { withStores } from '../stores';

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    margin: `0 ${theme.spacing.unit}px`,
  },
  icon: {
    marginRight: theme.spacing.unit,
  },
});

export const EditActionsComponent = ({ edit, formation, classes }) => {
  const identifier = formation.get('identifier');
  const isDisable = [...formation.get('commanders')][0] == null;
  const path = edit ? '' : '/edit';
  const href = `/f${path}?id=${identifier}`;
  const as = `/f/${identifier}${path}`;
  const Icon = edit ? DoneIcon : EditIcon;
  const label = edit ? '保存' : '部隊をコピーして編集';
  const NewBotton = (
    <Link href="/f/edit" as="/f/new" passHref>
      <Button
        variant="outlined"
        color="primary"
        size="small"
        component="a"
        aria-label="新規作成">
        <AddIcon className={classes.icon} />
        新規作成
      </Button>
    </Link>
  );
  return (
    <div className={classes.root}>
      <Link href={href} as={as} passHref>
        <Button
          disabled={isDisable}
          variant="outlined"
          color="primary"
          size="small"
          component="a"
          aria-label={label}>
          <Icon className={classes.icon} />
          {label}
        </Button>
      </Link>
      { !edit && NewBotton }
    </div>
  );
};

export default withStores(withStyles(styles)(EditActionsComponent));
