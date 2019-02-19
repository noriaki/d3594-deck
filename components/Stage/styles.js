import merge from 'lodash.merge';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {},
  container: {},
  positionRoot: {},
  positionImage: {},
  commanderImageRoot: {},
  commanderImageContainer: {
    padding: 0,
    borderRadius: 'unset',
    fontSize: 'inherit',
    fontWeight: 'unset',
    letterSpacing: 'unset',
    lineHeight: 'inherit',
    textTransform: 'unset',
    '& img': {
      width: '100%',
    },
  },
  commanderImageTitleRoot: {},
  commanderImageTitleWrap: {},
  commanderImageTitleInner: {},
  tacticsRoot: {},
  tacticsContainer: {},
  tacticsImage: {},
  tacticsCaptionContainer: {},
});

export const baseStyles = theme => merge({}, styles(theme), {
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing.unit * 2,
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
    width: 'calc((var(--ivw) * 100 - 64px) * 4 / 13)',
    height: 'calc(((var(--ivw) * 100 - 64px) * 4 / 13) * 1.371345029239765)',
  },
  commanderImageContainer: {
    height: '100%',
    display: 'block',
    position: 'relative',
    overflow: 'unset',
  },
  commanderImageTitleRoot: {
    height: theme.typography.pxToRem(13 * 2),
    background: [
      'linear-gradient(to top',
      'rgba(0,0,0,0.7) 0%',
      'rgba(0,0,0,0.3) 70%',
      'rgba(0,0,0,0) 100%)',
    ].join(', '),
  },
  commanderImageTitleWrap: {
    marginLeft: theme.typography.pxToRem(8),
    marginRight: theme.typography.pxToRem(8),
  },
  commanderImageTitleInner: {
    lineHeight: 'unset',
    fontSize: theme.typography.pxToRem(13),
  },
  tacticsRoot: {
    overflow: 'unset',
    position: 'relative',
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
    display: 'inline',
    position: 'unset',
  },
  commanderImageTitleRoot: {
    display: 'none',
  },
  tacticsRoot: {
    padding: '0 .125rem',
    background: 'rgba(255,255,255,0.8)',
    gridColumn: '2 / 4',
    gridRow: '3',
    alignItems: 'center',
    '&:nth-child(4)': {
      gridRow: '4',
    },
    '&:nth-child(5)': {
      gridRow: '5',
    },
  },
  tacticsContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
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
