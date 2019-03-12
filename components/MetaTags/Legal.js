import React from 'react';
import Head from 'next/head';

import { name as appName } from '../../constants/app';

const LegalPageMetaTags = ({ title }) => (
  <Head>
    <title>{ `${title} | ${appName}` }</title>
    <meta name="robots" content="noindex,nofollow" />
  </Head>
);

export default LegalPageMetaTags;
