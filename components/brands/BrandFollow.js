import React from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

const BrandFollow = ({ brandData, user }) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const followhandlesubmit = async (brandId) => {
    await fetch(`${baseURL}/api/brand/follow/${brandId}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
    refreshData();
  };

  const isFollow =
    brandData &&
    brandData.followers
      ?.filter((brand) => brand?.user === user?._id)
      .map((brand) => brand?.user).length > 0;

  return (
    <>
      <button onClick={() => followhandlesubmit(brandData?._id)}>
        {isFollow === true ? 'Following' : 'Follow'}
      </button>
    </>
  );
};

export default BrandFollow;
