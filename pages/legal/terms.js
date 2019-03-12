import React from 'react';

// components
import TitleBar from '../../components/TitleBar';
import Terms from '../../components/legal/Terms';
import Footer from '../../components/Footer';

// styles
import useLegalStyles from '../../components/legal/Legal-styles';

const TermsPage = () => {
  const legalStyleClasses = useLegalStyles();

  return (
    <main>
      <TitleBar />
      <Terms classes={legalStyleClasses} />
      <Footer />
    </main>
  );
};

export default TermsPage;
