import React from 'react';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import baseURL from '@utils/baseURL';
import BrandDisplay from '../../components/brands/BrandDisplay';

const BrandDetail = ({ user, profile, data }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />
      <LeftNav user={user} />
      <BrandDisplay brandData={data} user={user} />
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const response = await fetch(`${baseURL}/api/brand/${id}`);
  const data = await response.json();

  return {
    props: { data }
  };
};

export default BrandDetail;
