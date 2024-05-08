import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from './AllScript';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import ChallengesDisplay from '../components/challenges/ChallengesDisplay';
import { parseCookies } from 'nookies';
import PostChallenge from '../components/challenges/PostChallenge';

const Challenges = ({ user, teams, profile, games }) => {
  const [challenges, setChallenges] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [playergames, setPlayergames] = useState([]);
  const [type, setType] = useState('All Challenges');

  let challengeType = 'All Challenges';

  useEffect(() => {
    if (selectedGame != null) {
      axios
        .get(`${baseURL}/api/challenges/challengesbygame/${selectedGame?._id}`)
        .then((res) => {
          setChallenges(res.data);
        });
    } else {
      axios
        .get(
          `${baseURL}/api/challenges/userchallenges/${challengeType}/${profile._id}`
        )
        .then((res) => {
          setChallenges(res.data.Challe);
          setPlayergames(res.data.games);
        });
    }
  }, [selectedGame]);

  const handleShow = async (type) => {
    setType(type);
    await axios
      .get(`${baseURL}/api/challenges/userchallenges/${type}/${profile._id}`)
      .then((res) => {
        setChallenges(res.data.Challe);
      });
  };

  const handleSelectGame = async (obj) => {
    setSelectedGame(obj);
    $('a.model_close').parent().removeClass('show_model');
  };

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} profile={profile} />

      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <div className="discovery_page challenge_page">
          <div className="white_bg">
            <div className="heads">
              <div>
                <h1>Play a challenge</h1>
                <p>
                  Startup a challenge against other players and earn real money
                  in the process!
                </p>
              </div>
              <PostChallenge games={playergames} teams={teams} />
            </div>
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
            <div className="filter_btns">
              <button
                className="btn"
                onClick={() => handleShow('All Challenges')}
              >
                All Challenges
              </button>
              <button
                className="btn"
                onClick={() => handleShow('My Challenges')}
              >
                My Challenges
              </button>
              {/* <button className="btn">Bounty</button> */}
              {/* <div className="advance">
                <h3>online matches</h3>
                <div className="custom-control custom-switch">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="customSwitch1"
                  />
                  <label
                    className="custom-control-label"
                    htmlFor="customSwitch1"
                  ></label>
                </div>
              </div>
              <h3>Sort By:</h3> <button className="btn">Day left</button>{' '}
              <button className="btn">Reward</button> */}
            </div>
          </div>

          <div className="white_bg challenge_card_box">
            <ul className="challenge_card">
              {type === 'All Challenges' ? (
                !challenges || challenges.length === 0 ? (
                  <div>
                    <span>
                      No Challenges for{' '}
                      {selectedGame ? selectedGame.name : 'you'}
                    </span>
                  </div>
                ) : (
                  challenges.map((chall,i) => (
                    <ChallengesDisplay key={i}
                      user={user}
                      chall={chall}
                      profile={profile}
                      type="Challenges"
                    />
                  ))
                )
              ) : type === 'My Challenges' ? (
                !challenges || challenges.length === 0 ? (
                  <div>
                    <span>
                      No Challenges for{' '}
                      {selectedGame ? selectedGame.name : 'you'}
                    </span>
                  </div>
                ) : (
                  challenges.map((chall,i) => (
                    <ChallengesDisplay key={i}
                      user={user}
                      chall={chall}
                      profile={profile}
                      type="Challenges"
                    />
                  ))
                )
              ) : null}
            </ul>

            {/* <p>Similar players you can challenge.</p>

            <ul className="challenge_card smil_card">
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>

              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
              <li>
                <div className="row1">
                  <div className="card_img">
                    {' '}
                    <div className="img"></div> Sonu sing
                  </div>{' '}
                </div>

                <div className="row1">
                  <span>
                    Game:
                    <img src="/assets/media/challenge/f.png" alt="" />
                  </span>

                  <span>
                    Rank:
                    <img src="/assets/media/challenge/rank.png" alt="" />
                    Platinum
                  </span>
                </div>

                <div className="row1">
                  <button className="btn">Challenge Now</button>
                </div>
              </li>
            </ul> */}
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const res = await fetch(`${baseURL}/api/all/games`);
  const games = await res.json();

  return {
    props: { games }
  };
};

export default Challenges;
