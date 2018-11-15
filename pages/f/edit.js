import React from 'react';

import DeckEditor from '../../components/DeckEditor';

const FormationEditPage = ({ formation }) => (
  <div>
    <DeckEditor />
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
