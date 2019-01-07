import React from 'react';
import Head from 'next/head';

import { withStores } from '../stores';

const Title = ({ formation }) => {
  const name = formation.get('name');
  const humanizeId = formation.get('humanize');
  const title = name != null ? `${name} | ${humanizeId}` : humanizeId;
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
};

export default withStores(Title);
