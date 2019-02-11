import React from 'react';
import Head from 'next/head';

const title = '大三国志 部隊編成アプリ';
const description = 'ゲーム｢大三国志｣の部隊を自由に編成して共有できるアプリ。分城を増やさなくても、校場や統帥庁のLvを上げなくても、 好きなだけ部隊が組める。 経験値を気にせず戦法を付け外しできる。 そんな夢のようなアプリ、できました。';
const image = 'https://s3-ap-northeast-1.amazonaws.com/assets.deck.d3594.com/assets/cover.jpg';

const MetaTagsComponent = () => (
  <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta itemProp="name" content={title} />
    <meta itemProp="description" content={description} />
    <meta itemProp="image" content={image} />
    <meta name="image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:site" content="@gokuakunori" />
    <meta name="twitter:image:src" content={image} />
    <meta name="og:title" content={title} />
    <meta name="og:description" content={description} />
    <meta name="og:image" content={image} />
    <meta name="og:url" content="https://deck.d3594.com" />
    <meta name="og:site_name" content={title} />
    <meta name="og:locale" content="ja_JP" />
    <meta name="og:type" content="website" />
  </Head>
);

export default MetaTagsComponent;
