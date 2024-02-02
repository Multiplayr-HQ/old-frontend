import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import baseURL from '@utils/baseURL';

const Games = ({ user, games, profile }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />
      <LeftNav user={user} />

      <div className="main_middle profile_middle">
        <div className="all_game_box">
          <h1>All Games</h1>

          <>
            <ul className="game_list_page">
              {games.map((games) => (
                <li key={games._id}>
                  <a href={`/games/${games._id}`}>
                    <img
                      src={games?.windowImg}
                      className="game_bg_img"
                      alt=""
                    />

                    <div className="imgs">
                      {' '}
                      <img src={games.imgUrl} alt={games.name} />
                    </div>
                    <div className="bottom_data">
                      <h3>{games.name}</h3>
                      {/* <div className="colm_box">
                        {' '}
                        <div className="clm">
                          {' '}
                          110k <br /> players{' '}
                        </div>{' '}
                        <div className="clm">
                          91
                          <br /> tournaments{' '}
                        </div>{' '}
                        <div className="clm">
                          168
                          <br /> communities
                        </div>
                      </div> */}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </>
        </div>
      </div>

      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(`${baseURL}/api/all/games`);
  const games = await response.json();

  return {
    props: { games }
  };
};

export default Games;
