import React from 'react';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
  },
  list: {
    '& > li': {
      alignItems: 'flex-start',
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  updatesHeader: {
    padding: 0,
  },
  updates: {
    alignSelf: 'stretch',
    '& > ol': {
      width: 'calc(var(--ivw) * 63 + 1.5em)',
      paddingLeft: '1.5em',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  },
});

export const UpdateHistoryComponent = ({
  classes: {
    container,
    list,
    ...other
  },
}) => {
  const [latest, ...updates] = updateHistories;
  const updateHistoryItems = updates.reduce((history, update) => [
    ...history,
    <Divider key={`before-${update.version}`} variant="middle" />,
    <UpdateContent key={update.version} classes={other} {...update} />,
  ], [<UpdateContent key={latest.version} classes={other} {...latest} />]);

  return (
    <Paper component="section" square className={container}>
      <Typography component="h3" variant="h4">アプリ更新履歴</Typography>
      <List className={list}>{ updateHistoryItems }</List>
    </Paper>
  );
};

export default withStyles(styles)(UpdateHistoryComponent);

const UpdateContent = ({
  version,
  date,
  content,
  classes: {
    updatesHeader,
    updates,
  },
}) => (
  <ListItem>
    <ListItemText
      primary={version}
      primaryTypographyProps={{ variant: 'h6' }}
      secondary={date}
      className={updatesHeader} />
    <Typography component="div" className={updates}>{ content }</Typography>
  </ListItem>
);

const updateHistories = [
  {
    version: '1.0.1',
    date: '2019/02/13',
    content: (
      <ol>
        <li>
          最新OSのスマホでの利用を激しく推奨しますが、
          PCでもそれなりに使いやすくなるよう表示を調整しました
        </li>
        <li>このアプリ更新履歴を追加しました</li>
      </ol>
    ),
  },
  {
    version: '1.0.0',
    date: '2019/02/13',
    content: (
      <ol>
        <li>アプリを公開しました</li>
      </ol>
    ),
  },
];
