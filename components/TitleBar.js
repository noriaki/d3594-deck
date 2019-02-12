import React from 'react';
import Link from 'next/link';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// components
import ResponsiveImage from './ResponsiveImage';

const styles = theme => ({
  appBar: {
    backgroundColor: 'transparent',
    color: theme.palette.common.white,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    padding: [theme.spacing.unit / 2, 0].map(p => `${p}px`).join(' '),
  },
  menuButton: {},
  logoArea: {
    flexGrow: 1,
  },
  logoLink: {
    padding: 0,
  },
  logoImage: {
    height: 48,
  },
});

export const TitleBarComponent = ({ classes }) => {
  const {
    appBar,
    toolbar,
    menuButton,
    logoArea,
    logoLink,
    logoImage,
  } = classes;

  return (
    <AppBar position="fixed" color="primary" elevation={0} className={appBar}>
      <Toolbar className={toolbar}>
        <div className={logoArea}>
          <Link href="/" passHref>
            <IconButton component="a" className={logoLink}>
              <ResponsiveImage
                src={logoImageURL}
                alt="大三国志 部隊編成(仮)"
                className={logoImage} />
            </IconButton>
          </Link>
        </div>
        <IconButton color="inherit" className={menuButton}>
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(TitleBarComponent);

const logoImageURL = '//s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com/assets/logo.png';
