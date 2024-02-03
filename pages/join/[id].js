import { useState, useEffect } from 'react';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import baseURL from '../../utils/baseURL';
import Moment from 'moment';

import AllScript from '../AllScript';

const NFTGamesList = ({ user, challenge, profile }) => {
  const teamOne = challenge.players?.filter(
    (plr) => plr.teamId === challenge.User_team?._id
  );
  const teamTwo = challenge.players?.filter(
    (plr) => plr.teamId === challenge?.opponent_team?._id
  );

  let x = Moment.duration(
    Moment(challenge.startDate).diff(Moment().startOf('day'))
  )
    .asDays()
    .toString()
    .slice(0, 3);
  let daysLeft = Math.floor(Number(x));

  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />
      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <div className="join_game_box">
          <h1>Challenge</h1>
          <div className="points">
            <span>{Moment(challenge.startDate).format('DD/MMM/YYYY')}</span>{' '}
            <span>{challenge.startTime}</span>
          </div>
          <div className="vs_box">
            <div className="team1">
              {challenge.ChallType === 'Solo' ? (
                challenge.players.map((ply) =>
                  ply.playerId && ply.teamId !== null ? (
                    <>
                      <div className="imgs">
                        <img
                          src={
                            ply?.playerId.apidata?.data.platformInfo.avatarUrl
                              ? ply?.playerId.apidata.data.platformInfo
                                  .avatarUrl
                              : ply?.playerId.imgUrl
                          }
                          alt={
                            ply?.playerId.apidata?.data.platformInfo
                              .platformUserHandle
                          }
                        />
                      </div>
                      <span>
                        {
                          ply?.playerId.apidata?.data.platformInfo
                            .platformUserHandle
                        }
                      </span>
                    </>
                  ) : null
                )
              ) : (
                <>
                  <div className="imgs">
                    <img
                      src={challenge.User_team?.imgUrl}
                      alt={challenge.User_team?.name}
                    />
                  </div>
                  <span>{challenge.User_team?.name}</span>{' '}
                </>
              )}
            </div>
            <div className="vs">VS</div>
            <div className="team2">
              {challenge.ChallType === 'Solo' ? (
                challenge.players.map((ply) =>
                  ply.playerId && ply.teamId === null ? (
                    <>
                      <div className="imgs">
                        <img
                          src={
                            ply?.playerId.apidata?.data.platformInfo.avatarUrl
                              ? ply?.playerId.apidata.data.platformInfo
                                  .avatarUrl
                              : ply?.playerId.imgUrl
                          }
                          alt={
                            ply?.playerId.apidata?.data.platformInfo
                              .platformUserHandle
                          }
                        />
                      </div>
                      <span>
                        {
                          ply?.playerId.apidata?.data.platformInfo
                            .platformUserHandle
                        }
                      </span>
                    </>
                  ) : null
                )
              ) : (
                <>
                  <div className="imgs">
                    <img
                      src={challenge.opponent_team?.imgUrl}
                      alt={challenge.opponent_team?.name}
                    />
                  </div>
                  <span>{challenge.opponent_team?.name}</span>{' '}
                </>
              )}
            </div>
          </div>
          <div className="show_name_game">
            <h3>{challenge.game.name}</h3>
            <span className="rounds">
              Platform: {challenge.game?.platform.map((plt) => plt)}{' '}
            </span>{' '}
            {/* <span className="rounds">16 rounds</span>{' '} */}
          </div>
          <div className="time_connect">
            <h2>Time to connect</h2>
            <div className="time">{daysLeft} Day(s)</div>
            <div className="left_games">
              {challenge.isOpenMatch === false ? (
                <ul>
                  {teamOne.length > 0 &&
                    teamOne.map((team,i) => (
                      <li key={i}>
                        <div className="games_names">
                          <div className="img">
                            <img
                              src={
                                team?.playerId.apidata?.data.platformInfo
                                  .avatarUrl
                                  ? team?.playerId.apidata.data.platformInfo
                                      .avatarUrl
                                  : team?.playerId.imgUrl
                              }
                              alt={
                                team?.playerId.apidata?.data.platformInfo
                                  .platformUserHandle
                              }
                            />
                          </div>

                          <div className="tit">
                            {challenge.User_team.name}
                            <b>
                              <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                              {
                                team?.playerId.apidata?.data.platformInfo
                                  .platformUserHandle
                              }
                            </b>
                          </div>
                        </div>
                        <div className="ready">Ready</div>
                      </li>
                    ))}
                </ul>
              ) : challenge.isOpenMatch === true &&
                challenge.ChallType === 'Team' ? (
                <ul>
                  {teamOne.length > 0 &&
                    teamOne.map((team,i) => (
                      <li key={i}>
                        <div className="games_names">
                          <div className="img">
                            <img
                              src={
                                team?.playerId.apidata?.data.platformInfo
                                  .avatarUrl
                                  ? team?.playerId.apidata.data.platformInfo
                                      .avatarUrl
                                  : team?.playerId.imgUrl
                              }
                              alt={
                                team?.playerId.apidata?.data.platformInfo
                                  .platformUserHandle
                              }
                            />
                          </div>

                          <div className="tit">
                            {challenge.User_team.name}
                            <b>
                              <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                              {
                                team?.playerId.apidata?.data.platformInfo
                                  .platformUserHandle
                              }
                            </b>
                          </div>
                        </div>
                        <div className="ready">Ready</div>
                      </li>
                    ))}
                </ul>
              ) : null}
            </div>

            {challenge.room?.roomId > 0 ? (
              <>
                <div className="btn">
                  <p>Room ID: {challenge.room.roomId}</p>
                </div>
                <div className="btn ml20">
                  <p>Room PWD: {challenge.room.roompwd}</p>
                </div>
              </>
            ) : (
              <>
                <div className="btn ">
                  <p>Room ID: ---</p>
                </div>
                <div className="btn ml20">
                  <p>Room PWD: ---</p>
                </div>
              </>
            )}

            <div className="right_games">
              {challenge.isOpenMatch === false ? (
                <ul>
                  {teamTwo.length > 0 &&
                    teamTwo.map((team,i) => (
                      <li key={i}>
                        <div className="games_names">
                          <div className="img">
                            <img
                              src={
                                team?.playerId.apidata?.data.platformInfo
                                  .avatarUrl
                                  ? team?.playerId.apidata.data.platformInfo
                                      .avatarUrl
                                  : team?.playerId.imgUrl
                              }
                              alt={
                                team?.playerId.apidata?.data.platformInfo
                                  .platformUserHandle
                              }
                            />
                          </div>
                          <div className="tit">
                            {challenge.opponent_team.name}
                            <b>
                              <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                              {
                                team?.playerId.apidata?.data.platformInfo
                                  .platformUserHandle
                              }
                            </b>
                          </div>
                        </div>
                        <div className="ready">Ready</div>
                      </li>
                    ))}
                </ul>
              ) : challenge.isOpenMatch === true &&
                challenge.ChallType === 'Team' ? (
                <ul>
                  {teamTwo.length > 0 &&
                    teamTwo.map((team,i) => (
                      <li key={i}>
                        <div className="games_names">
                          <div className="img">
                            <img
                              src={
                                team?.playerId.apidata?.data.platformInfo
                                  .avatarUrl
                                  ? team?.playerId.apidata.data.platformInfo
                                      .avatarUrl
                                  : team?.playerId.imgUrl
                              }
                              alt={
                                team?.playerId.apidata?.data.platformInfo
                                  .platformUserHandle
                              }
                            />
                          </div>
                          <div className="tit">
                            {challenge.opponent_team.name}
                            <b>
                              <i className="fa fa-steam" aria-hidden="true"></i>{' '}
                              {
                                team?.playerId.apidata?.data.platformInfo
                                  .platformUserHandle
                              }
                            </b>
                          </div>
                        </div>
                        <div className="ready">Ready</div>
                      </li>
                    ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { id } = context.params;

  const response = await fetch(`${baseURL}/api/challenges/${id}`);
  const challenge = await response.json();

  return {
    props: { challenge }
  };
};

export default NFTGamesList;
