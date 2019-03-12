import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  root: {
    padding: 0,
    marginBottom: '1rem',
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'space-evenly',
    '& > li': {
      listStyle: 'none',
    },
  },
  link: {
    // color: '#333',
    textTransform: 'none',
  },
});
