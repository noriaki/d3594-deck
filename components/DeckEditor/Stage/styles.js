import merge from 'lodash.merge';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {},
  container: {},
  positionRoot: {},
  positionImage: {},
  commanderImageRoot: {},
  commanderImageContainer: {},
  commanderImageTitleRoot: {},
  commanderImageTitleWrap: {},
  commanderImageTitleInner: {},
  tacticsRoot: {},
  tacticsImage: {},
  tacticsCaptionContainer: {},
});

export const baseStyles = theme => merge({}, styles(theme), {
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& > div': {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
    },
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      marginLeft: theme.spacing.unit / 2,
      marginRight: theme.spacing.unit / 2,
    },
  },
  positionRoot: {
    width: '1rem',
    alignSelf: 'flex-start',
  },
  positionImage: {
    width: '1.5rem',
  },
  commanderImageRoot: {
    boxSizing: 'border-box',
    flexShrink: 0,
    width: 'calc((100vw - 64px) * 4 / 13)',
    height: 'calc(((100vw - 64px) * 4 / 13) * 1.371345029239765)',
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
    height: '2rem',
    background: [
      'linear-gradient(to top',
      'rgba(0,0,0,0.7) 0%',
      'rgba(0,0,0,0.3) 70%',
      'rgba(0,0,0,0) 100%)',
    ].join(', '),
  },
  commanderImageTitleWrap: {
    marginLeft: '.5rem',
    marginRight: '.5rem',
  },
  commanderImageTitleInner: {
    lineHeight: 'unset',
  },
  tacticsCaptionContainer: {
    padding: 0,
    '&:last-child': { paddingBottom: 0 },
  },
});

export const searchStyles = theme => merge({}, styles(theme), {
  root: {
    height: 'calc(var(--ivh, 1vh) * 20)',
    display: 'flex',
    padding: [
      theme.spacing.unit / 2,
      theme.spacing.unit,
    ].map(u => `${u}px`).join(' '),
  },
  container: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 3fr',
    gridTemplateRows: '.75rem 3fr 2fr 2fr 2fr',
    gridGap: `${theme.spacing.unit / 4}px`,
  },
  positionRoot: {
    gridColumn: '1 / 4',
    gridRow: '1',
  },
  positionImage: {
    display: 'block',
    height: '.75rem',
  },
  commanderImageRoot: {
    gridColumn: '1 / 3',
    gridRow: '2 / -1',
  },
  commanderImageContainer: {
    '& img': {
      width: '100%',
    },
  },
  commanderImageTitleRoot: {
    display: 'none',
  },
  tacticsRoot: {
    padding: '.0625rem .125rem',
    background: 'rgba(255,255,255,0.8)',
    gridColumn: '2 / 4',
    gridRow: '3',
    display: 'flex',
    alignItems: 'center',
    '&:nth-child(4)': {
      gridRow: '4',
    },
    '&:nth-child(5)': {
      gridRow: '5',
    },
  },
  tacticsImage: {
    height: '1rem',
    width: '1rem',
    marginRight: '.25rem',
  },
  tacticsCaptionContainer: {
    padding: 0,
    '&:last-child': { paddingBottom: 0 },
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
