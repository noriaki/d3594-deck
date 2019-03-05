import React from 'react';
import Link from 'next/link';
import moment from 'moment';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

moment.locale('ja-JP');

const styles = (theme) => {
  const { unit } = theme.spacing;
  const { dark: color, contrastText } = theme.palette.primary;

  return ({
    container: {
      backgroundColor: color,
      padding: unit * 2,
    },
    title: {
      color: contrastText,
    },
    subtitle: {
      color: darken(contrastText, 0.3),
    },
    card: {
      marginBottom: unit,
    },
    text: {
      fontSize: '.6rem',
    },
    actionArea: {
      paddingRight: unit * 2,
      paddingBottom: unit * 2,
      paddingLeft: unit * 2,
      justifyContent: 'space-between',
    },
  });
};

export const LatestFormationsComponent = ({ formations, classes }) => {
  const {
    container,
    title,
    subtitle,
    card,
    text,
    actionArea,
  } = classes;
  const buildCard = ({ identifier, updatedAt, humanize }) => (
    <Card key={identifier} square className={card}>
      <CardMedia component="img" image={getImageUrl(identifier)} alt={humanize} />
      <CardContent>
        <Typography component="p" className={text}>
          { textOfHumanizeFormation(humanize) }
        </Typography>
      </CardContent>
      <CardActions className={actionArea}>
        <Typography
          component="time"
          datetime={moment(updatedAt).format()}
          title={moment(updatedAt).format()}
          className={text}>
          { moment(updatedAt).fromNow() }
        </Typography>
        <div>
          <Link href={`/f?id=${identifier}`} as={`/f/${identifier}`} passHref>
            <Button
              variant="outlined"
              color="primary"
              size="small"
              component="a">
              詳細を見る
            </Button>
          </Link>
        </div>
      </CardActions>
    </Card>
  );

  return (
    <Paper square component="section" className={container}>
      <Typography variant="h4" component="h3" className={title}>
        最近保存された部隊
      </Typography>
      <Typography component="p" paragraph color="textSecondary" className={subtitle}>
        このアプリで最近編成・保存された部隊をリアルタイムで表示しています。
        詳細を見るをタップすると部隊ステータスや戦法効果なども確認できます。
      </Typography>
      { formations.map(buildCard) }
    </Paper>
  );
};

export default withStyles(styles)(LatestFormationsComponent);

const getImageUrl = id => `https://d3594-ss.now.sh/${id}.png`;

const textOfHumanizeFormation = (humanizeString) => {
  const [first, ...others] = humanizeString.split('\n');
  return others.reduce((ret, c) => [...ret, <br key={c} />, c], [first]);
};
