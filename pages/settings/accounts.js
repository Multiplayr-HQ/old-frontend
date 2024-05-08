import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import AccountSettings from '../../components/settings/Accounts';
import { useEffect } from 'react';

const Accounts = ({ user, profile }) => {
  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} profile={profile} />

      <LeftNav user={user} />

      <AccountSettings user={user} profile={profile} />

      <AllScript />
    </>
  );
};

export default Accounts;
