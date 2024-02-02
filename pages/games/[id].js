import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import Game from '@components/games/Game';
import baseURL from '@utils/baseURL';

const Games = ({ user, data, profile }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />
      <LeftNav user={user} />

      <Game user={user} data={data} />

      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  if (!isNaN(id)) {
    try {
      const response = await fetch(`${baseURL}/api/games/${id}`);
      const data = await response.json();

      return {
        props: {
          data
        }
      };
    } catch {
      return {
        props: {}
      };
    }
  } else {
    return {
      props: {}
    };
  }
};

export default Games;
