import { useState, useEffect } from 'react';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import TournamentRows from '@components/tournament/TournamentRows';
import AllScript from './AllScript';
import baseURL from '@utils/baseURL';
import axios from 'axios';

const Tournament = ({ user, games, profile, teams }) => {
  const [selectedGame, setSelectedGame] = useState(null);
  var [tournament, setTournament] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const handleSelectGame = async (obj) => {
    setTournament(  [] );
    setSelectedGame(obj);

    // setSelectedGame(obj);
    setPage(1);
    await getData(1, obj);
    
    console.log("game id ", obj?._id);
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



  const getData = async (pag, game) => {
    setLoading(true);
    console.log("gandu page : " ,pag);
    const res = await axios.get(`${baseURL}/api/tournaments/tournamentsbygame/${game?._id}?page=${pag}`);
    setPage(pag+1);

    setTournament((p) => {

    let arr = [];
    arr = [...p , ...res?.data];
    return  arr;
    });

    setLoading(false);
    console.log("response data gandu :", res, "page : ", page);
  }


  useEffect(() => {
    getData(1, selectedGame);
  }, []);

  const handlepageChange = async () => {
    if(loading===true){
      console.log("gandu wait");
      return;
    }
    await getData(page, selectedGame);
  }
  console.log("selected game now",selectedGame);
  console.log("tournament in now",tournament);
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
                    {selectedGame ? (
                      <img
                        src={selectedGame.imgUrl}
                        alt=""
                        style={{ width: '26px', height: '18px' }}
                      />
                    ) : (
                      <img src="/assets/media/ranking/console.png" alt="" />
                    )}
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
          </div>
          <div className="prfoile_tab_data ">
            <TournamentRows
              user={user}
              profile={profile}
              tournament={tournament}
              selectedGame={selectedGame}
              teams={teams}
            />
          </div>
        </div>
        <div>
            <button onClick={handlepageChange} className='pagination-btn' style={{ height: 40, width: 100 }}>Next <i  style={{ height: 40, width: 30 ,paddingTop:5 }} className="fa fa-angle-right" aria-hidden="true"></i></button>
            {/* page : {page-1} */}
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

export default Tournament;
