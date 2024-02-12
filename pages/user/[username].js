import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import ProfileBox from '@components/profile/ProfileBox';
import ProfileData from '@components/profile/ProfileData';
import AllScript from '../AllScript';
import baseURL from '@utils/baseURL';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getData } from '@utils/fetchData';

import Loader from "@components/common/loader"; 
import { DataContext } from '@store/GlobalState';


const Profile = ({
  user,
  profile,
  Userdata,
  games,
  player,
  products,
  teams
}) => {
  const router = useRouter();

  const{loader,setLoader}=useContext(DataContext);


  if (Userdata) {
    return (
      <>
        <MetaDash />
        {loader && <Loader></Loader>}
        <SignedHeader user={user} profile={Userdata.profile} />
        <LeftNav user={user} />

        <div className="main_middle profile_middle">
          <ProfileBox
            user={user}
            Userdata={Userdata}
            games={games}
            player={player}
            teams={teams}
            profile={profile}
          />
          <ProfileData
            user={user}
            Userdata={Userdata}
            products={products}
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
  const { username } = context.params;
  const page = query ? query.page || 1 : 1;
  const category = query ? query.category || 'all' : 'all';
  const sort = query ? query.sort || '' : '';
  const search = query ? query.search || 'all' : 'all';

  try {
    const response = await fetch(`${baseURL}/api/profile/${username}`);
    const Userdata = await response.json();

    const res = await fetch(`${baseURL}/api/all/games`);
    const games = await res.json();

    const player = [];

    const resprod = await getData(
      `product?limit=${
        page * 6
      }&category=${category}&sort=${sort}&title=${search}`
    );

    return {
      props: {
        Userdata,
        games,
        player,
        products: resprod.products,
        result: resprod.result
      }
    };
  } catch {
    return {
      props: {}
    };
  }
};

export default Profile;
