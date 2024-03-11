import Script from 'next/script';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
// import Match from '@components/calendar/match';
// import FooterMain from '@components/FooterMain';
import AllScript from '../AllScript';
import TeamCreate from '../../components/Creators/TeamCreate';

const CreateTeam = ({ user, profile }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />
      <LeftNav user={user} />
      <TeamCreate isClaim={true} user={user} />
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateTeam;
