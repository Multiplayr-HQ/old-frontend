import { useState, useEffect } from 'react';
// import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
// import DateCal from '@components/calendar/DateCal';
// import Match from '@components/calendar/match';
// import FooterMain from '@components/FooterMain';
import AllScript from './AllScript';
import baseURL from '@utils/baseURL';

const Calendar = ({ user, profile, games }) => {
  const [selectedGame, setSelectedGame] = useState(null);

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
        <div className="calendar_page discovery_page">
          <div className="white_bg">
            <h2>GAME</h2>

            <div className="tit">
              <a href="#!" className="model_show_btn">
                <span>
                  <b className="icon">
                    <img src="/assets/media/ranking/console.png" alt="" />
                  </b>{' '}
                  Browse Games
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
                      {games &&
                        games.map((game, idx) => (
                          <li key={idx}>
                            <div className="game_pic">
                              <a
                                href="#!"
                                onClick={() => handleSelectGame(game)}
                              >
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

            {/* <DateCal
              gameId={selectedGame != null ? selectedGame._id : 'undefined'}
            /> */}
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

export default Calendar;
