import { useState, useEffect } from 'react';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import Teams from '@components/discover/Teams';
import Coaches from '@components/discover/Coaches';
import Players from '@components/discover/Players';
import Arenas from '@components/discover/Arenas';
import Jobs from '@components/discover/Jobs';
import baseURL from '@utils/baseURL';
import AllScript from './AllScript';

const Discover = ({ user, profile, games }) => {
  let myState = {};

  const [filterType, setFilterType] = useState('TEAMS');
  const [selectedGame, setSelectedGame] = useState(null);

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  myState.selectedFilters = selectedFilters;
  myState.setSelectedFilters = setSelectedFilters;

  myState.filteredResults = filteredResults;
  myState.setFilteredResults = setFilteredResults;

  useEffect(() => {
    setFilterType(filterType);
  }, [filterType]);

  const handleFType = async (val) => {
    if (typeof val !== 'undefined') {
      setFilterType(val);
    }
  };

  const handleSelectGame = async (obj) => {
    setSelectedGame(obj);
    //myState.setFilteredResults([]);
    $('a.model_close').parent().removeClass('show_model');
  };

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

      <div className="main_middle profile_middle">
        <div className="discovery_page">
          <div className="white_bg">
            <h2>GAME</h2>

            <div className="tit">
              <a href="#!" className="model_show_btn">
                <span>
                  <b className="icon">
                    <img
                      src={
                        selectedGame
                          ? selectedGame.imgUrl
                          : '/assets/media/ranking/console.png'
                      }
                      alt={selectedGame ? selectedGame.name : ''}
                    />
                  </b>{' '}
                  {selectedGame ? selectedGame.name : 'Browse Games'}
                </span>
                <i className="fa fa-angle-right" aria-hidden="true"></i>

                <div className="hover_games">
                  <div className="other_logo">
                    <img
                      src={selectedGame ? selectedGame.imgUrl : ''}
                      alt={selectedGame ? selectedGame.name : ''}
                    />
                  </div>
                </div>
              </a>

              <div className="common_model_box" id="more_games">
                <a href="#!" className="model_close">
                  X
                </a>
                <div className="inner_model_box">
                  <h3>Games</h3>

                  <div className="poup_height msScroll_all">
                    <ul className="">
                      {games.map((game, idx) => (
                        <li key={idx}>
                          <div className="game_pic">
                            <a href="#!" onClick={() => handleSelectGame(game)}>
                              {' '}
                              <img src={game.imgUrl} alt={game.name} />{' '}
                            </a>
                          </div>
                          <p>{game.name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="overlay"></div>
              </div>
            </div>

            <ul className="profile_tab_btn discover_tab_btn">
              <li className={filterType == 'TEAMS' ? 'active' : ''}>
                <a href="#!" onClick={() => handleFType('TEAMS')}>
                  TEAMS{' '}
                </a>
              </li>
              <li className={filterType == 'PLAYERS' ? 'active' : ''}>
                <a href="#!" onClick={() => handleFType('PLAYERS')}>
                  {' '}
                  PLAYERS
                </a>
              </li>
              <li className={filterType == 'COACHES' ? 'active' : ''}>
                <a href="#!" onClick={() => handleFType('COACHES')}>
                  {' '}
                  COACHES{' '}
                </a>
              </li>
              <li className={filterType == 'ARENAS' ? 'active' : ''}>
                <a href="#!" onClick={() => handleFType('ARENAS')}>
                  {' '}
                  ARENAS
                </a>
              </li>
              <li className={filterType == 'JOBS' ? 'active' : ''}>
                <a href="#!" onClick={() => handleFType('JOBS')}>
                  {' '}
                  JOBS{' '}
                </a>
              </li>
            </ul>
          </div>

          <div className="prfoile_tab_data ">
            {filterType == 'TEAMS' ? (
              <Teams
                user={user}
                profile={profile}
                selectedGame={selectedGame}
              />
            ) : (
              ''
            )}

            {filterType == 'PLAYERS' ? (
              <Players
                user={user}
                profile={profile}
                selectedGame={selectedGame}
              />
            ) : (
              ''
            )}

            {filterType == 'COACHES' ? (
              <Coaches
                user={user}
                profile={profile}
                myState={myState}


                selectedGame={selectedGame}
              />
            ) : (
              ''
            )}

            {filterType == 'ARENAS' ? (
              <Arenas
                user={user}
                profile={profile}
                myState={myState}
                selectedGame={selectedGame}
              />
            ) : (
              ''
            )}

            {filterType == 'JOBS' ? (
              <Jobs
                user={user}
                profile={profile}
                myState={myState}
                selectedGame={selectedGame}
              />
            ) : (
              ''
            )
            }
            {console.log(myState, "this is myState")}
          </div>
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

export default Discover;
