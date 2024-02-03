import axios from 'axios';
import { useState, useEffect } from 'react';
import baseURL from '@utils/baseURL';
import { useRouter } from 'next/router';

import GameVideos from './GameVideos';
import GameTournaments from './GameTournaments';
import GameLeagues from './GameLeagues';
import GameTeams from './GameTeams';
import GamePlayers from './GamePlayers';
import GameCommunities from './GameCommunities';
import Matches from '@components/team/Matches';
import GameFollow from './GameFollow';
import Cookies from 'js-cookie';

const Game = ({ user, data }) => {
  const [game, setGame] = useState(data?.games);
  const [players, setPlayers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  let [tabData, setTabData] = useState([]);

  const handleTabs = async (Type) => {
    console.log(Type);
    await axios
      .get(`${baseURL}/api/games/gamedata/${Type}/${game._id}`, {
        headers: {
          Authorization: Cookies.get('token')
        }
      })
      .then((res) => setTabData(res.data));
  };

  // useEffect(() => {
  //   axios
  //     .get(`${baseURL}/api/player/playersbyteamsbygame/${game._id}`)
  //     .then((res) => {
  //       setPlayers(res.data);
  //     });

  //   axios
  //     .get(`${baseURL}/api/tournaments/tournamentsbygame/${game._id}`)
  //     .then((res) => {
  //       setTournaments(res.data);
  //     });
  // }, []);
  const newPlyr = players.slice(1, 4);

  return (
    <div>
      <div className="main_middle profile_middle">
        <div className="profile_box tournament_dp_box games_page">
          <div className="profile_cover_photo">
            {' '}
            <img src={game?.coverphoto} alt="cover image" />{' '}
          </div>
          <div className="profile_dp_box">
            <div className="profile_pic">
              {' '}
              <img src={game?.imgUrl} alt="" />{' '}
            </div>
            <div className="profile_details">
              <div className="top_details">
                <div className="name_box">
                  <div className="flag_tick_flow">
                    {' '}
                    <span className="game_name">{game?.name}</span>{' '}
                    <div className="tick">
                      {/* {' '}
                      <span className="active">
                        {' '}
                        <i className="fa fa-check" aria-hidden="true"></i>{' '}
                      </span>{' '} */}
                    </div>
                    <div className="button">
                      {' '}
                      <a href="#" className="btn">
                        {' '}
                        <GameFollow game={data.games} user={user} />
                      </a>{' '}
                    </div>
                  </div>
                  <span className="follower">
                    {data?.games?.followers.length} Followers{' '}
                  </span>
                </div>
              </div>
            </div>
            <div className="bottom_details games_bottom">
              <div className="games_btn_thumb">
                <a href="#" className="btn">
                  {' '}
                  <i className="fa fa-steam-square" aria-hidden="true"></i>{' '}
                  Download at Steam <span>free</span>
                </a>
                <a href="#" className="btn">
                  {' '}
                  <i className="fa fa-cloud-download" aria-hidden="true"></i> PS
                  Store <span>free</span>
                </a>
              </div>
            </div>
          </div>
          <div className="tournament_sponsers">
            <div className="logos">
              <h5>OFFICIAL TOURNAMENTS</h5>
              {tournaments.length > 0 ? (
                <>
                  {tournaments &&
                    tournaments.slice(0, 3).map((tournament,i) => (
                      <span key={i}>
                        <img
                          src={tournament.tournament.imgUrl}
                          alt={tournament.tournament.name}
                        />{' '}
                      </span>
                    ))}
                </>
              ) : (
                <p>No Official Tournaments</p>
              )}
            </div>
          </div>
          <div className="bio_box  game_bio">
            <div className="left_bio">
              <div className="top_bio">
                <h3>ABOUT THE GAME</h3>
                <div className="socail">
                  {' '}
                  <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                    {' '}
                    <i
                      className="fa fa-facebook-official"
                      aria-hidden="true"
                    ></i>{' '}
                  </a>{' '}
                  <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                    {' '}
                    <i className="fa fa-instagram" aria-hidden="true"></i>{' '}
                  </a>{' '}
                  <a href="https://www.twitch.tv/" target="_blank" rel="noreferrer">
                    {' '}
                    <i className="fa fa-twitch" aria-hidden="true"></i>{' '}
                  </a>{' '}
                  <a href="https://store.steampowered.com/" target="_blank" rel="noreferrer">
                    {' '}
                    <i
                      className="fa fa-steam-square"
                      aria-hidden="true"
                    ></i>{' '}
                  </a>{' '}
                </div>
              </div>
              <p>{game?.description} </p>
              <div className="games">
                <h3>PUBLISHER: </h3>
                <span>
                  {' '}
                  {!game?.publisher || game?.publisher.length === 0 ? (
                    <p>No publisher...</p>
                  ) : (
                    <>
                      <img src={game?.publisher.imgUrl} />{' '}
                      <b>{game?.publisher.name}</b>
                    </>
                  )}
                </span>
              </div>

              <div className="games">
                <h3>PLATFORM: </h3>
                <p>{game?.platform}</p>{' '}
              </div>
            </div>
            <div className="right_team_bio">
              {/* <div className="games">
                <h2>PLAYERS: </h2>
                <a href="#" target="_blank" rel="noreferrer">
                  {' '}
                  <img src={newPlyr[0]?.current_team?.image_url} alt="" />{' '}
                </a>{' '}
                <a href="#">
                  {' '}
                  <img src={newPlyr[1]?.current_team?.image_url} alt="" />{' '}
                </a>{' '}
                <a href="#" target="_blank" rel="noreferrer">
                  {' '}
                  <img src={newPlyr[2]?.current_team?.image_url} alt="" />{' '}
                </a>{' '}
                {players.length === 0 ? (
                  <p>No Players for This Game.</p>
                ) : (
                  <p> + {players.length - 3} </p>
                )}
              </div> */}
              {/* <div className="internet games_internet">
                <ul>
                  <li>
                    {' '}
                    LEAgUES/TOURNAMENTS: <b>+87</b>{' '}
                  </li>
                  <li>
                    {' '}
                    COMMUNITIES: <b>+506</b>{' '}
                  </li>
                  <li>
                    {' '}
                    steaming: <b>+744</b>{' '}
                  </li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
        <ul className="profile_tab_btn">
          <li className="active">
            {' '}
            <a
              href="#!"
              rel="tournament"
              onClick={() => handleTabs('TOURNAMENTS')}
            >
              {' '}
              TOURNAMENTS{' '}
            </a>
          </li>

          {/* <li>
            {' '}
            <a href="#!" rel="league" onClick={() => handleTabs('LEAGUES')}>
              {' '}
              LEAGUES{' '}
            </a>{' '}
          </li>
          <li>
            {' '}
            <a href="#!" rel="ladder" onClick={() => handleTabs('LADDER')}>
              {' '}
              LADDER{' '}
            </a>{' '}
          </li>
          <li>
            {' '}
            <a href="#!" rel="matches" onClick={() => handleTabs('MATCHES')}>
              {' '}
              MATCHES{' '}
            </a>{' '}
          </li>
          <li>
            {' '}
            <a href="#!" rel="video">
              {' '}
              VIDEOS/STREAMS{' '}
            </a>{' '}
          </li> */}
          <li>
            {' '}
            <a href="#!" rel="teams" onClick={() => handleTabs('TEAMS')}>
              {' '}
              TEAMS{' '}
            </a>{' '}
          </li>
          {/* <li>
            {' '}
            <a href="#!" rel="players">
              {' '}
              PLAYERS{' '}
            </a>{' '}
          </li> */}
          <li>
            {' '}
            <a href="#!" rel="communities">
              {' '}
              COMMUNITIES{' '}
            </a>{' '}
          </li>
        </ul>
        <div className="prfoile_tab_data">
          <div className="tab" id="tournament">
            {/* /* ---- start game row --- */}
            <GameTournaments user={user} tournaments={tabData} />

            {/* /* ---- end game row --- */}
          </div>

          <div className="tab hide" id="league">
            {/* /* ---- start game row --- */}

            <GameLeagues leagues={tabData} game={game} />

            {/* /* ---- end game row --- */}
          </div>
          <div className="tab hide" id="ladder">
            {/* /* ---- start game row --- */}

            <div className="game_row">
              {' '}
              <span className="star live">
                <i className="fa fa-star" aria-hidden="true"></i>
              </span>
              <div className="game_pos">
                <div className="game_loc">
                  {' '}
                  <img src="/assets/media/category/game_loc.jpg" alt="" />{' '}
                </div>
                <span className="tour_logo">
                  {' '}
                  <img src="/assets/media/category/game1.png" alt="" />{' '}
                </span>{' '}
              </div>
              <div className="right_game_details">
                <div className="top_game">
                  <div className="date">
                    <h3>MANILA MASTERS TORONTO</h3>
                    09.OCT.2021
                  </div>
                  <div className="reg">
                    <button className="active">LIVE</button>
                  </div>
                </div>
                <div className="bottom_game">
                  <div className="users">
                    <img src="/assets/media/category/users.png" alt="" />
                  </div>
                  <div className="games">
                    <h3>Games:</h3>
                    <div className="game_logo">
                      <img src="/assets/media/category/game1.png" alt="" /> COD
                      4,
                    </div>
                    <div className="game_logo">
                      <img src="/assets/media/category/game2.png" alt="" /> DOTA
                      2,
                    </div>
                    <div className="game_logo">
                      <img src="/assets/media/category/game3.png" alt="" /> CSGO
                    </div>
                  </div>
                  <div className="prize leagues">
                    <h3>PRIZE POOL:</h3>
                    <span>Rs. 45,00,000</span>
                  </div>
                </div>
              </div>
            </div>

            {/* /* ---- end game row --- */}
          </div>
          <div className="tab hide" id="matches">
            <Matches teamMatches={data?.matchArray} />
          </div>
          <div className="tab hide" id="video">
            <GameVideos user={user} game={game} />
          </div>
          <div className="tab hide" id="teams">
            <GameTeams user={user} teams={tabData} game={game} />
          </div>
          <div className="tab hide" id="players">
            <GamePlayers user={user} game={game} />
          </div>
          <div className="tab hide" id="communities">
            <GameCommunities user={user} game={game} />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Game;
