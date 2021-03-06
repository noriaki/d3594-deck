import React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

// components
import ResponsiveImage from '../components/ResponsiveImage';
import ParallaxCard from '../components/ParallaxCard';
import LatestFormations from '../components/LatestFormations';
import Gallery from '../components/Gallery';
import UpdateHistory from '../components/UpdateHistory';
import Footer from '../components/Footer';
import MetaTags from '../components/MetaTags';

// constants
import { host as assetHost } from '../constants/assets';

const styles = theme => ({
  container: {
    '& > *': {
      marginBottom: theme.spacing.unit * 4,
      '&:last-child': {
        marginBottom: 0,
      },
    },
  },
  logoArea: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary.main,
    height: 'calc(var(--ivw) * 100 / 1.618)', // golden ratio
  },
  logoImage: {},
  subtitle: {
    padding: `0 ${theme.spacing.unit}px`,
  },
  description: {
    padding: `0 ${theme.spacing.unit}px`,
  },
});

const IndexPage = ({ formations, classes }) => (
  <main className={classes.container}>
    <MetaTags />
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
      url={{ href: '/f/edit', as: '/f/new' }}
      linkText="新規作成" />
    <ParallaxCard
      image={selectCommandersAndTacticsImageURL}
      title="武将、戦法を検索"
      subtitle="武将352種、分析系戦法188種"
      text="名前や種類で絞り込み可能。1季〜征服季で入手可能なものを揃えました。"
      url={{ href: '/f/edit', as: '/f/new' }}
      linkText="新規作成" />
    { /* <LatestFormations formations={formations} /> */ }
    <Gallery />
    <UpdateHistory />
    <Footer />
  </main>
);

IndexPage.getInitialProps = async ({ req, query }) => {
  const isServer = !!req;
  if (isServer) {
    const { formations } = query;
    return { formations };
  }
  const res = await fetch('/api/v1/f/latest?limit=4', {
    headers: { Accept: 'application/json' },
  });
  const formations = await res.json();
  return { formations };
};

IndexPage.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(IndexPage);

const logoImageURL = `${assetHost}/assets/logo.png`;

const editFormationImageURL = `${assetHost}/assets/editFormation.jpg`;

const selectCommandersAndTacticsImageURL = `${assetHost}/assets/selectCommandersAndTactics.jpg`;
