import React from 'react';
import Link from 'next/link';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => {
  const { unit } = theme.spacing;
  const { dark: color, contrastText } = theme.palette.primary;
  const cardWidth = `((var(--ivw) * 100 - ${unit * 4}px) / 2) - ${unit / 2}px`;
  return ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      backgroundColor: color,
      padding: unit * 2,
    },
    title: {
      flexBasis: '100%',
      color: contrastText,
    },
    subtitle: {
      flexBasis: '100%',
      color: darken(contrastText, 0.3),
    },
    card: {
      width: `calc(${cardWidth})`,
      marginBottom: unit,
    },
    actionArea: {
      justifyContent: 'center',
    },
  });
};

export const GalleryComponent = ({ classes }) => {
  const {
    container,
    title,
    subtitle,
    card,
    actionArea,
  } = classes;
  const buildCard = id => (
    <Card key={id} square className={card}>
      <CardMedia component="img" image={getImageUrl(id)} />
      <CardActions className={actionArea}>
        <div>
          <Link href={`/f?id=${id}`} as={`/f/${id}`} passHref>
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
        ギャラリー
      </Typography>
      <Typography component="p" paragraph color="textSecondary" className={subtitle}>
        自分や他の人の編成した部隊を一覧で見られる機能を追加するまで、
        最強部隊決定トーナメント ハロウィン杯の参加部隊を載せておきます。
      </Typography>
      { formationIds.map(buildCard) }
    </Paper>
  );
};

export default withStyles(styles)(GalleryComponent);

const getImageUrl = id => (
  `//s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com/assets/formations/${id}.jpg`
);

const formationIds = [
  '1cb7dac3a4c360b71935e9fcd4ba60ab', // A1 曹純、馬超、張遼
  '31009228bf2702517261503f0aa30ce4', // A2 賈詡、劉備、張機
  '7b3e530f5918c6403fa95ce4c8c1f633', // A3 孫権、甘寧、孫策SP
  '3c1e72fb65463fc36ad9647c4d075724', // A4 霊帝、朱儁SP、何太后
  'a5b167decb0fbf73817e8e54fa621912', // B1 趙雲SP、蜀関羽、黄忠
  '59b95d13a6aecbdbce31db39f50807d5', // B2 夏侯淵、荀彧、曹操
  '9606a6eb1898b725abe5ef92550a74d4', // B3 陸遜SP、周瑜、呂蒙
  'e1cb138dfa585b312e0d74cea7676b9a', // B4 弓呂布、弓諸葛亮、張寧
];
