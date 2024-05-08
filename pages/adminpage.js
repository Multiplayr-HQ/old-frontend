import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import baseURL from '@utils/baseURL';
import AllScript from './AllScript';
import AdminTournaments from '../components/adminfiles/AdminTournaments';
import AdminChallenges from '../components/adminfiles/AdminChallenges';
import SupportAdmin from '../components/adminfiles/SupportAdmin';

const Adminpage = ({ user, data, profile }) => {
  return (
    <>
      <MetaDash />

      <SignedHeader user={user} profile={profile} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">
        {user && user.isSuperAdmin ? (
          <>
            <AdminChallenges challenges={data.challenges} />
            <br /> <br />
            <AdminTournaments
              tournaments={data.tournaments}
              numberOfTournament={7}
            />
          </>
        ) : (
          <>
            <SupportAdmin user={user} data={data} profile={profile} />
          </>
        )}
      </div>
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(`${baseURL}/api/admin/admindata`);
  const data = await response.json();

  return {
    props: { data }
  };
};

export default Adminpage;
