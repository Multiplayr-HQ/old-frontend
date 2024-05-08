import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import GeneralSettings from '../../components/settings/General';

const General = ({ user, profile, games }) => {
  return (
    <>
      <MetaDash />

      <SignedHeader user={user} profile={profile} />

      <LeftNav user={user} />

      <GeneralSettings user={user} profile={profile} />

      <AllScript />
    </>
  );
};

export default General;
