import React from 'react';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import SignedHeader from '@components/SignedHeader';
import MetaDash from '@components/MetaDash';

const terms = () => {
  return (
    <>
      <MetaDash />
      {/* <SignedHeader />
      <LeftNav /> */}
      <div style={{ marginTop: '100px', marginLeft: '200px' }}>terms</div>
      <AllScript />
    </>
  );
};

export default terms;
