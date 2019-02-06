import React, { Fragment } from 'react';
import groupBy from 'lodash.groupby';

// material-ui
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

// stores
import { withStores } from '../../stores';

const to = unit => value => `${value}${unit}`;
const styles = theme => ({
  header: {
    margin: `0 ${theme.spacing.unit}px`,
  },
  paper: {
    padding: [0, theme.spacing.unit].map(to('px')).join(' '),
  },
  dl: {
    padding: '.5em 0',
    '& > *': {
      margin: '.5em 0',
    },
    '& > hr': {
      margin: '1em 0',
    },
  },
  dlBox: {
    display: 'flex',
    '& > dt': {
      width: '5em',
    },
    '& > dd': {
      display: 'inline-flex',
      alignItems: 'center',
      paddingLeft: '.5em',
    },
  },
  dlBoxColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    '& > dd': {
      margin: '.5em',
    },
  },
  chip: {
    height: 'auto',
  },
});

export const DetailComponent = ({ formation, classes }) => {
  const {
    header,
    paper,
    dl,
    dlBox,
    dlBoxColumn,
    chip,
  } = classes;
  const cost = formation.get('cost');
  const velocity = formation.get('velocity');
  const siege = formation.get('siege');
  const humanizeString = formation.get('humanize');
  const commanders = [...formation.get('commanders')];

  return (
    <Fragment>
      <div className={header}>
        <Typography component="h2" variant="h4">
          部隊データ
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          各数値は武将Lv 50, 各種営Lv MAX時
        </Typography>
      </div>
      <Paper square className={paper}>
        <dl className={dl}>
          <div className={dlBox}>
            <Typography variant="subtitle1" component="dt">
              <Chip label="速度" component="span" className={chip} />
            </Typography>
            <Typography variant="body1" component="dd">{velocity}</Typography>
          </div>
          <div className={dlBox}>
            <Typography variant="subtitle1" component="dt">
              <Chip label="攻城" component="span" className={chip} />
            </Typography>
            <Typography variant="body1" component="dd">{siege}</Typography>
          </div>
          <div className={dlBox}>
            <Typography variant="subtitle1" component="dt">
              <Chip label="コスト" component="span" className={chip} />
            </Typography>
            <Typography variant="body1" component="dd">{cost}</Typography>
          </div>
          <div className={dlBox}>
            <Typography variant="subtitle1" component="dt">
              <Chip label="兵種効果" component="span" className={chip} />
            </Typography>
            <Typography component="dd">
              {textOfSameArmyBonus(commanders)}
            </Typography>
          </div>
          <div className={dlBox}>
            <Typography variant="subtitle1" component="dt">
              <Chip label="陣営効果" component="span" className={chip} />
            </Typography>
            <Typography component="dd">
              {textOfSameTeamBonus(commanders)}
            </Typography>
          </div>
          <div className={dlBox}>
            <Typography variant="subtitle1" component="dt">
              <Chip label="連携効果" component="span" className={chip} />
            </Typography>
            <Typography component="dd" color="textSecondary">
              データ不足で調査中...
            </Typography>
          </div>
          <Divider variant="middle" />
          <div className={dlBoxColumn}>
            <Typography variant="subtitle1" component="dt">
              <Chip label="コピペ用の部隊編成" component="span" className={chip} />
            </Typography>
            <Typography component="dd">
              {textOfHumanizeFormation(humanizeString)}
            </Typography>
          </div>
        </dl>
      </Paper>
    </Fragment>
  );
};

export default withStores(withStyles(styles)(DetailComponent));

const textOfHumanizeFormation = (humanizeString) => {
  const [first, ...others] = humanizeString.split('\n');
  return others.reduce((ret, c) => [...ret, <br key={c} />, c], [first]);
};

const textOfSameArmyBonus = (commanders) => {
  const armyGroupedCommanders = groupBy(commanders, 'commander.army');
  const bonusArmy = Object.keys(armyGroupedCommanders).find(
    army => armyGroupedCommanders[army].length > 1
  );
  if (typeof bonusArmy === 'undefined') {
    return '--';
  }
  const bonusCommanders = armyGroupedCommanders[bonusArmy];
  const bonusRate = (bonusCommanders.length - 1) * 5.0;
  return [
    `${bonusArmy}兵系に`,
    armyBonusTypes[bonusArmy].map(b => `${b}上昇${bonusRate}%`).join('と'),
    'を付与。',
    <br key={bonusCommanders.map(c => c.identifier).join('-')} />,
    '対象武将は',
    bonusCommanders
      .map(c => `${c.commander.name}${c.commander.special || ''}`).join(', '),
  ];
};

const armyBonusTypes = {
  弓: ['防御', '速度'],
  歩: ['攻撃', '防御'],
  騎: ['攻撃', '速度'],
};

const textOfSameTeamBonus = (commanders) => {
  const teamGroupedCommanders = groupBy(commanders, 'commander.team');
  const bonusTeam = Object.keys(teamGroupedCommanders).find(
    team => teamGroupedCommanders[team].length > 1
  );
  if (typeof bonusTeam === 'undefined') {
    return '--';
  }
  const bonusCommanders = teamGroupedCommanders[bonusTeam];
  const bonusRate = teamBonusRates[bonusCommanders.length - 2];
  return [
    `${bonusTeam}陣営に`,
    teamBonusTypes.map(t => `${t}上昇${bonusRate}%`).join(', '),
    'を付与。',
    <br key={bonusCommanders.map(c => c.identifier).join('-')} />,
    '対象武将は',
    bonusCommanders
      .map(c => `${c.commander.name}${c.commander.special || ''}`).join(', '),
  ];
};

const teamBonusTypes = ['速度', '攻撃', '防御', '知略'];
const teamBonusRates = [8, 10];
