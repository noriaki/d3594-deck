import React from 'react';
import Head from 'next/head';

import DeckEditor from '../../components/DeckEditor';

const FormationEditPage = ({ formation }) => (
  <div>
    <Head>
      <title>
        {formation.name != null ? `${formation.name} | ` : ''}
        {formation.humanize}
      </title>
    </Head>
    <DeckEditor formation={formation} />
  </div>
);

FormationEditPage.getInitialProps = async ({ req, query }) => {
  const isServer = !!req;
  if (isServer) {
    const { formation } = query;
    return { formation };
  }
  const { id } = query;
  const res = await fetch(`/api/v1/f/${id}`, {
    headers: { Accept: 'application/json' },
  });
  const json = await res.json();
  return { formation: json };
};

export default FormationEditPage;
