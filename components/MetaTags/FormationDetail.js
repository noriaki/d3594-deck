import React from 'react';
import Head from 'next/head';

// stores
import { withStores } from '../../stores';

const FormationDetailMeta = ({ formation }) => {
  const {
    getURL,
    getTitle,
    getDescription,
    getImageURL,
    getPublishStatus,
  } = createActions(formation);
  const url = getURL();
  const title = getTitle();
  const description = getDescription();
  const imageURL = getImageURL();
  const isPublished = getPublishStatus();
  return (
    <Head>
      <title>{title}</title>
      { !isPublished && <meta name="robots" content="noindex,nofollow" /> }
      <meta name="description" content={description} />
      <meta itemProp="name" content={title} />
      <meta itemProp="description" content={description} />
      <meta itemProp="image" content={imageURL} />
      <meta name="image" content={imageURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:site" content="@gokuakunori" />
      <meta name="twitter:image:src" content={imageURL} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageURL} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content="ja_JP" />
      <meta property="og:type" content="website" />
    </Head>
  );
};

export default withStores(FormationDetailMeta);

const createActions = (store) => {
  const getURL = () => {
    const identifier = store.get('identifier');
    return `https://deck.d3594com/f/${identifier}`;
  };

  const getAppName = () => '大三国志 部隊編成アプリ';

  const getTitle = () => {
    const app = getAppName();
    const names = [...store.get('commanders')].map((commander) => {
      const { commander: c } = commander || {};
      return c ? `${c.name}${c.special || ''}` : '(未配置)';
    }).join('/');
    return `${names} - ${app}`;
  };

  const getCommanderDescription = ({
    name,
    special,
    stage,
    rarity,
    cost,
    team,
    distance,
    army,
  }) => [
    `${stage[0]}に登場した☆${rarity}でコスト${cost}、`,
    `${team}陣営に所属する攻撃距離${distance}の${army}兵である`,
    `${name}${special || ''}`,
  ].join('');

  const getAdditionalTacticsDescription = at => at.reduce((res, a) => (
    a === null ? res : [...res, `${a.type}戦法「${a.name}」`]
  ), []).join('と');

  const getDescription = () => {
    // common data
    let description = 'ゲーム「大三国志」の部隊編成の詳細。';
    description += [
      '総合ステータス(全武将Lv50時)は、',
      `総コスト ${store.get('cost')}、`,
      `部隊速度 ${store.get('velocity')}、`,
      `攻城値 ${store.get('siege')}。`,
    ].join('');

    // commanders and tactics
    const commanders = [...store.get('commanders')];
    const positions = ['本営', '中衛', '前衛'];
    description += '編成は、';
    description += commanders.map((lc, index) => {
      if (lc === null) {
        return `${positions[index]}は未配置`;
      }
      const { commander, tactics, additionalTactics: at } = lc;
      const commanderDescription = getCommanderDescription(commander);
      const tacticsDescription = getAdditionalTacticsDescription(at);
      return [
        `${positions[index]}には、${commanderDescription}`,
        `(初期戦法：${tactics.name})に、`,
        (
          tacticsDescription === ''
            ? 'まだ何も習得させず配置'
            : `${tacticsDescription}を習得させて配置`
        ),
      ].join('');
    }).join('。');
    description += '、という部隊の構成。';
    return description;
  };

  const getImageURL = () => {
    const identifier = store.get('identifier');
    return `https://d3594-ss.now.sh/${identifier}.png`;
  };

  const getPublishStatus = () => !!store.get('published');

  return {
    getURL,
    getAppName,
    getTitle,
    getDescription,
    getImageURL,
    getPublishStatus,
  };
};
