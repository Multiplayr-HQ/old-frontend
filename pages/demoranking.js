import { useState, useEffect, useRef } from 'react';
// import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
// import TeamFilter from '@components/ranking/TeamFilter';
// import RankingTable from '@components/ranking/RankingTable';
// import FooterMain from '@components/FooterMain';
import AllScript from './AllScript';

// import { toast } from 'react-toastify';
// import { useForm } from 'react-hook-form';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useRouter } from 'next/router';
// import cookie from 'js-cookie';
// import { useQuery, useMutation } from 'react-query';
// import Filters from '@components/common/Filters';
// import { searchTeams } from '@utils/functionsHelper';
import RankingPage from '../components/ranking/RankingPage';
import Link from 'next/link';
// import next from 'next';

const Ranking = ({ user, games, profile }) => {
  const [teamsRanks, setTeamsRanks] = useState({ teams: [] });
  const [loading, setLoading] = useState(false);


  const [selectedGame, setSelectedGame] = useState({ _id: 20 });

  const [page, setPage] = useState(1);



  const handleSelectGame = async (obj) => {
    setTeamsRanks({ teams: [] });
    setSelectedGame(obj);
    setPage(1);
    await getData(1, obj);
    
    console.log("game id ", obj?._id);

    $('a.model_close').parent().removeClass('show_model');
  };

  const getData = async (pag, game) => {
    setLoading(true);
    console.log("gandu page : " ,pag);
    const res = await axios.get(`${baseURL}/api/rankings/bywinnings100/${game?._id}?page=${pag}`);
    setPage(pag+1);

    setTeamsRanks((p) => {
      let arr = [];
      arr = [...p.teams , ...res?.data?.teams];
      return {teams : arr};
    });

    setLoading(false);
    console.log("response data gandu :", res, "page : ", page);
  }

  console.log("gandu page : " , page);
  
  
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
                  </b>
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
                            <Link href="#!">
                              <a onClick={() => handleSelectGame(game)}>
                                {' '}
                                <img src={game.imgUrl} alt={game.name} />{' '}

                              </a>
                            </Link>
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
            {/* 
            <div className="white_bg">
              <div className="team_search">
                <div className="searchbox">
                  <h3>Search</h3>
                  <form
                    className="form w-100"
                    noValidate="noValidate"
                    onSubmit={handleSubmit}
                  >
                    <input
                      type="search"
                      placeholder="Search For Team..."
                      id="search"
                      name="search"
                      value={search}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <input type="submit" />
                  </form>
                </div>
              </div>

              
             <Filters filterType={'RANKINGS'} />   
             
            
            </div> */}
          </div>
          {/* <RankingTable
            teamranking={teamsRanks}
            searchResults={searchResults}

           
          /> */}
          <div className="prfoile_tab_data ">
            <RankingPage
              selectedGame={selectedGame}
              teamranking={teamsRanks}
              user={user}
            // gameChange={gameChange}
            />
          </div>

          <div>
            <button onClick={handlepageChange} className='pagination-btn' style={{ height: 40, width: 100 ,paddingTop:5 }}>Next   <i  style={{ height: 40, width: 30 ,paddingTop:5 }} className="fa fa-angle-right" aria-hidden="true"></i></button>
            
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

export default Ranking;
