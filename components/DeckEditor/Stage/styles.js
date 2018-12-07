import merge from 'lodash.merge';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  container: {
    display: 'flex',
  },
  commanderImageRoot: {
    boxSizing: 'border-box',
    flexShrink: 0,
  },
  commanderImageContainer: {
    height: '100%',
    display: 'block',
    position: 'relative',
    overflow: 'hidden',
    '& img': {
      top: '50%',
      width: '100%',
      position: 'relative',
      transform: 'translateY(-50%)',
    },
  },
  commanderImageTitleRoot: {
    height: theme.spacing.unit * 4,
    background: [
      'linear-gradient(to top',
      'rgba(0,0,0,0.7) 0%',
      'rgba(0,0,0,0.3) 70%',
      'rgba(0,0,0,0) 100%)',
    ].join(', '),
  },
  commanderImageTitleWrap: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  commanderImageTitleInner: {},
});

export const baseStyles = theme => merge({}, styles(theme), {
  root: {
    flexDirection: 'column',
    '& > div': {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
    },
  },
  container: {
    alignItems: 'center',
    '& > div': {
      marginLeft: theme.spacing.unit / 2,
      marginRight: theme.spacing.unit / 2,
    },
  },
  positionRoot: {
    width: theme.spacing.unit * 2,
    alignSelf: 'flex-start',
  },
  positionImage: {
    width: theme.spacing.unit * 3,
  },
  commanderImageRoot: {
    width: 'calc((100vw - 64px) * 4 / 13)',
    height: 'calc(((100vw - 64px) * 4 / 13) * 1.371345029239765)',
  },
  tacticsCaptionContainer: {
    padding: 0,
    '&:last-child': { paddingBottom: 0 },
    textAlign: 'center',
  },
});

export const searchStyles = theme => merge({}, styles(theme), {
  container: {
    flexDirection: 'column',
  },
});

export const withBaseStyles = withStyles(baseStyles);

export const withSearchStyles = withStyles(searchStyles);

export default {
  baseStyles,
  searchStyles,
  withBaseStyles,
  withSearchStyles,
};
