import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import TeamFilter from '@components/ranking/TeamFilter';
import RankingTable from '@components/ranking/RankingTable';
import FooterMain from '@components/FooterMain';
import AllScript from './AllScript';

import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useQuery, useMutation } from 'react-query';
import Filters from '@components/common/Filters';
import { searchTeams } from '@utils/functionsHelper';
import RankingPage from '../components/ranking/RankingPage';
import Link from 'next/link';

const Ranking = ({ user, games, profile }) => {
  // const [searchObj, setSearchObj] = useState({
  //   search: '',
  //   filters: ''
  // });

  // const [searchText, setSearchText] = useState('');
  // const [status, setStatus] = useState('confirm');
  // const [searchResults, setSearchResults] = useState([]);
  // const [data, setData] = useState([]);
  const [teamsRanks, setTeamsRanks] = useState([]);
  // const router = useRouter();

  // let cancel;
  // var sdata;

  // const [showPassword, setShowPassword] = useState(false);
  // const [error, setError] = useState(null);
  // const [formLoading, setFormLoading] = useState(false);
  // const [submitDisabled, setSubmitDisabled] = useState(true);
  const [selectedGame, setSelectedGame] = useState({
    _id : 20
  });


  // const { search, filters } = searchObj;
  const [page , setPage] = useState(1);

  // const arr=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]

  useEffect (() => {
    const fet=async()=>{
     const res= await axios.get(`${baseURL}/api/rankings/bywinnings100/${selectedGame?._id}?page=1`)
      await setTeamsRanks(res.data);

    }

    fet()
  },[selectedGame]);


  // const gameChange = {};

  const handleSelectGame = async (obj) => {

    // gameChange = obj;


    setSelectedGame(obj);
    console.log("i am inhandle selectgame \t",obj)
    // setPage(1);
    $('a.model_close').parent().removeClass('show_model');
    // const response = await axios.get(`${baseURL}/api/rankings/bywinnings100/20`);
    // await setTeamsRanks(response.data);
    
   
    // await axios
    // // .get(`${baseURL}/api/rankings/bywinnings100/${selectedGame?._id}?page=${page}`)
    // .get(`${baseURL}/api/rankings/bywinnings100/${selectedGame?._id}`) 
    // // .then((res) => setTeamsRanks((prev) => [...prev , ...res.data]));
      
    //   // .then((res) => setTeamsRanks((prev) => [...prev , ...res.data]));
    // .then((res) => setTeamsRanks(res.data));
    
      
    // //   console.log('new team data',teamsRanks);
  };
  // console.log("games :",games);
  // console.log("selected games",selectedGame?._id);

  // console.log("set team ",teamsRanks);
  // };


  
  
  // Implement handleSelectGame and other necessary functions...

 
  

  // useEffect (async () => {
  //   const response = await axios.get(`${baseURL}/api/rankings/bywinnings100/${selectedGame?._id}?page=${page}`);
  //   setTeamsRanks((prev ) => [...prev,...response.data]);
  // },[page]);

 

  

  // useEffect(() => {
  //   $('a.model_show_btn').click(function () {
  //     $(this).next().addClass('show_model');
  //   });

  //   $('a.model_close').click(function () {
  //     $(this).parent().removeClass('show_model');
  //   });
  // }, []);

  // useEffect(() => {
    
  //   console.log("page in useeffect in ",page)
  //   handleSelectGame('Browse Games');
  //   // setPage((prev) => prev + 1);
  // },[]);
   
  

  

  // const handleScrollTop = () => {
  //   if ((window.innerHeight + document.documentElement.scrollTop + 1) >= document.documentElement.scrollHeight) {
  //     console.log("page before setPage in handleTop ",page);
  //     setPage((prev) => prev + 1);
  //     console.log("page after setPage in handleTop",page)
  //   }
  // };

  // useEffect (()=>{
  //   window.addEventListener("scroll",handleScrollTop);
  //   return () => window.removeEventListener("scroll",handleScrollTop);
  // },[]);
  // console.log('ranking page :', searchResults);
  // console.log('selectGame', selectedGame);
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
