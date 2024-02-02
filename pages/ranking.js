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

const Ranking = ({ user, games, profile }) => {
  const [searchObj, setSearchObj] = useState({
    search: '',
    filters: ''
  });

  const [searchText, setSearchText] = useState('');
  const [status, setStatus] = useState('confirm');
  const [searchResults, setSearchResults] = useState([]);
  const [data, setData] = useState([]);
  const [teamsRanks, setTeamsRanks] = useState([]);
  const router = useRouter();

  let cancel;
  var sdata;

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [selectedGame, setSelectedGame] = useState(undefined);

  const { search, filters } = searchObj;

  const handleChange = (e) => {
    setSearchObj((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sdata = await searchTeams(
      searchObj,
      setError,
      setFormLoading,
      toast,
      setStatus
    );
    setSearchResults(sdata);
  };

  const handleSelectGame = async (obj) => {
    setSelectedGame(obj);
    //myState.setFilteredResults([]);
    $('a.model_close').parent().removeClass('show_model');
    axios
      .get(`${baseURL}/api/rankings/bywinnings100/${selectedGame?._id}`)
      .then((res) => setTeamsRanks(res.data));
  };

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/rankings/bywinnings100/${selectedGame?._id}`)
      .then((res) => setTeamsRanks(res.data));
  }, [selectedGame]);

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

              {/*
             <Filters filterType={'RANKINGS'} />   
          */}
            </div>
          </div>
          <RankingTable
            teamranking={teamsRanks}
            searchResults={searchResults}
          />
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
