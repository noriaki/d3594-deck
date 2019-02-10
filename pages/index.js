import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TwitterCircleIcon from 'mdi-material-ui/TwitterCircle';

// components
import ResponsiveImage from '../components/ResponsiveImage';
import ParallaxCard from '../components/ParallaxCard';
import Gallery from '../components/Gallery';

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
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: `${theme.spacing.unit * 2}px 0`,
  },
  profile: {
    display: 'inline-flex',
  },
  profileLink: {
    padding: 0,
    minHeight: 'unset',
    lineHeight: 1,
    textTransform: 'none',
  },
  twitterIcon: {
    margin: '0 .1em',
    fontSize: '1rem',
  },
});

const IndexPage = ({ classes }) => (
  <main className={classes.container}>
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
    <Gallery />
    <Paper component="footer" square elevation={0} className={classes.footer}>
      <Typography
        variant="body2"
        component="p"
        color="textSecondary"
        className={classes.profile}>
        (c) 2019 極悪のり
        <Link href="https://twitter.com/gokuakunori">
          <Button
            variant="text"
            component="a"
            size="small"
            color="primary"
            className={classes.profileLink}>
            <TwitterCircleIcon className={classes.twitterIcon} />
            @gokuakunori
          </Button>
        </Link>
      </Typography>
    </Paper>
  </main>
);

IndexPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(IndexPage);

const logoImageURL = '//s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com/assets/logo.png';

const editFormationImageURL = '//s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com/assets/editFormation.jpg';

const selectCommandersAndTacticsImageURL = '//s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com/assets/selectCommandersAndTactics.jpg';
