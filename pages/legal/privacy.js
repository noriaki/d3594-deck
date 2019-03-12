import React from 'react';

// components
import TitleBar from '../../components/TitleBar';
import Privacy from '../../components/legal/Privacy';
import Footer from '../../components/Footer';

// styles
import useLegalStyles from '../../components/legal/Legal-styles';

const PrivacyPage = () => {
  const legalStyleClasses = useLegalStyles();

  return (
    <main>
      <TitleBar />
      <Privacy classes={legalStyleClasses} />
      <Footer />
    </main>
  );
};

export default PrivacyPage;
