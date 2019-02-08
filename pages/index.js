import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

// components
import ResponsiveImage from '../components/ResponsiveImage';
import ParallaxCard from '../components/ParallaxCard';

const styles = theme => ({
  container: {
    '& > *': {
      marginBottom: theme.spacing.unit * 4,
    },
  },
  logoArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    height: 'calc(100vw / 1.618)', // golden ratio
  },
  logoImage: {},
  subtitle: {
    padding: `0 ${theme.spacing.unit}px`,
  },
  description: {
    padding: `0 ${theme.spacing.unit}px`,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const IndexPage = ({ classes }) => (
  <div className={classes.container}>
    <Typography component="h1" variant="h1" className={classes.logoArea}>
      <ResponsiveImage
        src={logoImageURL}
        alt="大三国志 部隊編成(仮)"
        className={classes.logoImage} />
    </Typography>
    <Typography component="h2" align="center" className={classes.subtitle}>
      ｢大三国志｣の部隊を自由に編成して共有できるアプリ
    </Typography>
    <Typography variant="body1" className={classes.description}>
      分城を増やさなくても、校場や統帥庁のLvを上げなくても、
      好きなだけ部隊が組める。 経験値を気にせず戦法を付け外しできる。
      そんな夢のようなアプリ、できました。
    </Typography>
    <ParallaxCard
      image={editFormationImageURL}
      title="部隊を自由に編成"
      subtitle="武将の交代、戦法の付け替え、自由自在。"
      text="武将や戦法をタップすると交換可能。右上の赤いアイコンをタップすると取り外しも可能です。"
      url="/f/new"
      linkText="新規作成" />
    <ParallaxCard
      image={selectCommandersAndTacticsImageURL}
      title="武将、戦法を検索"
      subtitle="武将347種、分析系戦法180種"
      text="名前や種類で絞り込み可能。1季〜征服季で入手可能なものを揃えました。"
      url="/f/new"
      linkText="新規作成" />
    <Paper className={classes.paper}>
      <Typography variant="h5" component="h3">張飛</Typography>
      <Typography>
        <Link href="/f/43e0f069ab00049908ab34390a9c45ca">
          <a>formation link</a>
        </Link>
      </Typography>
    </Paper>
  </div>
);

IndexPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(IndexPage);

const logoImageURL = '//s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com/assets/logo.png';

const editFormationImageURL = '//s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com/assets/editFormation.jpg';

const selectCommandersAndTacticsImageURL = '//s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com/assets/selectCommandersAndTactics.jpg';
