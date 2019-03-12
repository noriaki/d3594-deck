import React from 'react';

// material-ui
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// styles
import useStyles from './Links-styles';

const LinksOfService = () => {
  const {
    root,
    link,
  } = useStyles();

  return (
    <Typography component="ul" color="textSecondary" className={root}>
      <li>
        <Button
          component="a"
          href="/legal/terms"
          color="inherit"
          className={link}>
          サービス利用規約
        </Button>
      </li>
      <li>
        <Button
          component="a"
          href="/legal/privacy"
          color="inherit"
          className={link}>
          プライバシーポリシー
        </Button>
      </li>
    </Typography>
  );
};

export default LinksOfService;
