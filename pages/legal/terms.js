import React from 'react';

// components
import TitleBar from '../../components/TitleBar';
import Terms from '../../components/legal/Terms';
import Footer from '../../components/Footer';
import LegalPageMetaTags from '../../components/MetaTags/Legal';

// styles
import useLegalStyles from '../../components/legal/Legal-styles';

const TermsPage = () => {
  const legalStyleClasses = useLegalStyles();

  return (
    <main>
      <LegalPageMetaTags title="サービス利用規約" />
      <TitleBar />
      <Terms classes={legalStyleClasses} />
      <Footer />
    </main>
  );
};

export default TermsPage;
