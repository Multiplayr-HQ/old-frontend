import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import TeamProfileBox from '@components/team/TeamProfileBox';
import TeamProfileData from '@components/team/TeamProfileData';
import FooterMain from '@components/FooterMain';
import AllScript from 'pages/AllScript';
import baseURL from '@utils/baseURL';
import { getData } from '@utils/fetchData';

const Team = ({ user, data, products, profile, teams }) => {
  let profileId = [];

  profile?.playergames.map((plyr) => {
    return (profileId = plyr.player?._id);
  });
  const isTeamPlayer =
    data?.players?.filter((tem) => {
      return tem._id === profileId;
    }).length > 0;

  const isManager =
    data?.team?.employees.filter(
      (emp) => emp.role === 'Manager' && emp.employeeId?._id === user._id
    ).length > 0;

  const isAdmin =
    data?.team?.employees.filter(
      (emp) => emp.role === 'Admin' && emp.employeeId?._id === user._id
    ).length > 0;

  const isOwner =
    data?.team?.employees.filter(
      (emp) => emp.role === 'Owner' && emp.employeeId?._id === user._id
    ).length > 0;

  const isCEO =
    data?.team?.employees.filter(
      (emp) => emp.role === 'CEO' && emp.employeeId?._id === user._id
    ).length > 0;

  const isSupportAdmin = data.team?.isClaimed === false && user.isSupportAdmin;
  console.log("team in team page ",data);

  if (data) {
    return (
      <>
        <MetaDash />

        <SignedHeader user={user} profile={profile} />

        <LeftNav user={user} />

        <div className="main_middle profile_middle">
          <TeamProfileBox
            user={user}
            data={data}
            isManager={isManager}
            isAdmin={isAdmin}
            isOwner={isOwner}
            isCEO={isCEO}
            isSupportAdmin={isSupportAdmin}
            teams={teams}
            profile={profile}
          />

          <TeamProfileData
            user={user}
            data={data}
            products={products}
            isManager={isManager}
            isAdmin={isAdmin}
            isOwner={isOwner}
            isCEO={isCEO}
            isSupportAdmin={isSupportAdmin}
            profile={profile}
            teams={teams}
          />
        </div>
        <AllScript />
      </>
    );
  } else {
    return null;
  }
};

export const getServerSideProps = async (context, query) => {
  const { teamId } = context.params;
  const page = query ? query.page || 1 : 1;
  const category = query ? query.category || 'all' : 'all';
  const sort = query ? query.sort || '' : '';
  const search = query ? query.search || 'all' : 'all';

  try {
    const response = await fetch(`${baseURL}/api/teams/${teamId}`);
    const data = await response.json();

    const res = await getData(
      `product?limit=${
        page * 6
      }&category=${category}&sort=${sort}&title=${search}`
    );

    return {
      props: {
        data,
        products: res.products,
        result: res.result
      }
    };
  } catch {
    return {
      props: {}
    };
  }
};

export default Team;
