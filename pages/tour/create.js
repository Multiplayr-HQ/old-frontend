import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';

import 'rc-time-picker/assets/index.css';

import TournamentCreate from '../../components/Creators/TournamentCreate';

const CreateTournament = ({ user, profile }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />
      <LeftNav user={user} />
      <TournamentCreate user={user} isClaim={true} />
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateTournament;
