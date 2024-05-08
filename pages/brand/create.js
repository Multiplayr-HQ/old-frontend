import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import 'rc-time-picker/assets/index.css';
import BrandCreate from '../../components/Creators/BrandCreate';

const CreateBrand = ({ user, profile }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />
      <LeftNav user={user} />
      <BrandCreate isClaim={true} user={user} />
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateBrand;
