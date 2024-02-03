import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../LoadingSpinner';
import ReactCountryFlag from 'react-country-flag';

const PlayerDisplay = ({ isLoading, playerData, user }) => {
  return (
    <>
      <div className="team_row_box">
        {playerData.length == 0 ? (
          <div className="team_row">
            <LoadingSpinner />
          </div>
        ) : (
          playerData.map((plyr, idx) => (
            <div className="team_row" key={idx}>
              <div className="stars">
                <i className="fa fa-star" aria-hidden="true"></i>
              </div>
              <div className="inner_team">
                <div className="logo_box">
                  {' '}
                  {plyr.players?.imgUrl ? (
                    <img
                      src={plyr.players?.imgUrl}
                      alt="Player"
                      style={{ width: '70px' }}
                    />
                  ) : (
                    <img
                      src={
                        plyr?.players.apidata
                          ? plyr?.players.apidata?.data?.platformInfo.avatarUrl
                          : plyr?.players?.imgUrl
                      }
                      alt=""
                      style={{ width: '150px' }}
                    />
                  )}
                  <a href={`/user/${plyr?.players?.user?.username}`}>
                    <h3>
                      {plyr?.players.name
                        ? plyr.players.name
                        : plyr?.players.apidata?.data?.platformInfo
                            ?.platformUserHandle}
                    </h3>
                  </a>
                  <ReactCountryFlag
                    countryCode={plyr.players?.nationality}
                    svg
                    style={{
                      width: '2em',
                      height: '2em'
                    }}
                  />
                </div>
                <>
                  <span className="logo">
                    <img
                      src={
                        plyr.players.current_videogame
                          ? plyr.players.current_videogame?.imgUrl
                          : '/assets/media/discover/team1.png'
                      }
                      alt="NO GAME"
                    />
                  </span>{' '}
                </>
                <span className="remarks">
                  <h4>ROLE</h4>
                  {plyr.players.attributes &&
                  plyr.players.attributes.roles?.length > 0 ? (
                    <>
                      {plyr.players.attributes.roles.map((rol,i) => (
                        <p key={i}>{rol} </p>
                      ))}
                    </>
                  ) : (
                    'No Role Specified'
                  )}
                </span>
                <div className="mores">
                  {' '}
                  <span>
                    {plyr.players.attributes &&
                    plyr.players.attributes.platform === 'PC' ? (
                      <img src="/assets/media/discover/desk.png" alt="" />
                    ) : plyr.players.attributes?.platform === 'Console' ? (
                      <img src="/assets/media/discover/console.png" alt="" />
                    ) : plyr.players.attributes?.platform === 'Mobile' ? (
                      <img
                        src="/assets/media/discover/mobile_game.png"
                        alt=""
                      />
                    ) : (
                      <p>No Platform mentioned</p>
                    )}
                  </span>{' '}
                  <span>
                    {plyr.players.attributes && plyr.players.attributes.mic ? (
                      <>
                        <img src="/assets/media/discover/mice.png" alt="" />{' '}
                        <b>On</b>
                      </>
                    ) : (
                      <>
                        {' '}
                        <img src="/assets/media/discover/mice.png" alt="" />
                        <b>Off</b>{' '}
                      </>
                    )}
                  </span>{' '}
                  <span>
                    <img src="/assets/media/discover/translator.png" alt="" />{' '}
                    {plyr.players.attributes?.language.length > 0 ? (
                      <>
                        {plyr.players.attributes?.language.map((tem,i) => (
                          <b key={i}>{tem}</b>
                        ))}
                      </>
                    ) : (
                      <p>No Language Available</p>
                    )}
                  </span>{' '}
                </div>
                <a href="#" className="join">
                  Invite to team
                </a>{' '}
              </div>

              <div className="overview_box">
                <h2>Players Overview</h2>
                <div className="team_overview">
                  <div className="over_prof">
                    <div className="pics">
                      {' '}
                      {plyr.players.current_team ? (
                        <img src={plyr.players.current_team.image_url} alt="" />
                      ) : (
                        <img src="/assets/media/discover/team1.png" alt="" />
                      )}{' '}
                    </div>
                    <h3>
                      {plyr.players ? plyr.players.nickName : 'no nickname'}
                    </h3>
                  </div>

                  <div className="ranking">
                    <h4>Current Team</h4>
                    <div className="past">
                      <img src="/assets/media/discover/icon1.png" alt="" />{' '}
                      <b>
                        {plyr.players.current_team
                          ? plyr.players.current_team.name
                          : 'NO TEAM'}
                      </b>{' '}
                      <ReactCountryFlag
                        countryCode={plyr.players?.nationality}
                        svg
                        style={{
                          width: '2em',
                          height: '2em'
                        }}
                      />
                    </div>
                    <h4>MMR Rating</h4>
                    <p>4790</p>
                    <h4>Experience:</h4>
                    <p>Local Lans, Competitive</p>
                  </div>
                  <div className="match">
                    <h4>Matches Played</h4>
                    <p>
                      {plyr.players ? plyr.players.total_games_played : '0'}{' '}
                      Games
                    </p>
                    <h4>Matches Won</h4>
                    <p>{plyr.players ? plyr.players.won : '0'} Victories</p>
                    <h4>Trophies</h4>
                    <p>78</p>
                  </div>
                  {/* <div className="percentage">
                  {' '}
                  <img
                    src="/assets/media/discover/chart.png"
                    style={{ width: '400px' }}
                    alt=""
                  />{' '}
                </div> */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default PlayerDisplay;
