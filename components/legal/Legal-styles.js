import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  root: {
    padding: '56px 1rem 0',
    '& > section': {
      margin: '2rem 0',
      '& ul > li': {
        margin: '.75rem 0',
      },
    },
  },
  header: {
    margin: '1.5rem 0',
    fontSize: '1.7rem',
  },
  subheader: {
    paddingLeft: '.7rem',
    borderLeft: '.3rem solid #9e9e9e',
  },
  updated: {
    fontSize: '.75rem',
    marginBottom: '.5rem',
  },
  link: {
    padding: 0,
    margin: '0 .3em',
    minHeight: 'unset',
    wordWrap: 'break-word',
    textTransform: 'none',
  },
});
