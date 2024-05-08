import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';

import MatchTable from '@components/matches/matchtable';
import MatchBoard from '@components/matches/matchboard';
import StatsChart from '@components/matches/statschart';

import FooterMain from '@components/FooterMain';
import AllScript from './AllScript';

const Matches = ({ user, profile }) => {
  return (
    <>
      <MetaDash />

      <SignedHeader user={user} profile={profile} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">
        <div className="match_page">
          <MatchBoard />
          <MatchTable />
          <StatsChart />
        </div>
      </div>

      <AllScript />
    </>
  );
};

export default Matches;
