import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../../LoadingSpinner';
import FavTeam from '../../team/FavTeam';
import ReactCountryFlag from 'react-country-flag';
import Moment from 'moment';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import Cookies from 'js-cookie';
import TeamRequest from '../invites/TeamRequest';
import team from '../multiplayrDEV.teams.json';

const TeamDisplay = ({
  isLoading,
  // team,
  showfavs,
  profile,
  searchData,
  user
}) => {
  const [favouriteTeams, setfavouriteTeams] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/teams/favourites/team`, {
        headers: {
          Authorization: Cookies.get('token')
        }
      })
      .then((res) => {
        setfavouriteTeams(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

console.log("filter team  data in discover page ",team);
  return (
    <>
      <div className="team_row_box">
        {isLoading === true ? (
          <div className="team_row">
            <LoadingSpinner />
          </div>
        ) : team?.length === 0 ? (
          <div className="team_row">
            <p>No such teams found.</p>
          </div>
        ) : showfavs === true ? (
          favouriteTeams.map((team, idx) => (
            <div className="team_row" key={idx}>
              <FavTeam team={team.team} profile={profile} />
              <div className="inner_team">
                <div className="logo_box">
                  {' '}
                  <div className="role_pic">
                    <img src={team.team?.imgUrl} alt="" />
                  </div>
                  <a href={`/team/${team.team?._id}`}>
                    <h3>{team.team?.name}</h3>
                  </a>
                  <ReactCountryFlag
                    countryCode={team.team?.region}
                    svg
                    style={{
                      width: '2em',
                      height: '2em'
                    }}
                  />
                </div>
                {team.team.games.length <= 0 ? (
                  <p>No Game for this team</p>
                ) : (
                  <>
                    <span className="logo">
                      {team.team.games.map((im, tgx) => (
                        <img key={tgx} src={im.gameId?.imgUrl} alt="" />
                      ))}
                    </span>
                  </>
                )}
                <span className="remarks">
                  <h4>ROLE:</h4>
                  {team.attribute && team.attribute.role.length > 0 ? (
                    <p>{team.attribute.role}</p>
                  ) : (
                    'No Role Specified'
                  )}
                </span>
                <div className="mores plateform">
                  {' '}
                  <span>
                    {team.attribute && team.attribute.platform === 'PC' ? (
                      <img src="/assets/media/discover/desk.png" alt="" />
                    ) : team.attribute &&
                      team.attribute.platform === 'Console' ? (
                      <img src="/assets/media/discover/console.png" alt="" />
                    ) : team.attribute &&
                      team.attribute.platform === 'Mobile' ? (
                      <img
                        src="/assets/media/discover/mobile_game.png"
                        alt=""
                      />
                    ) : (
                      <p>No Platform mentioned</p>
                    )}
                  </span>{' '}
                  <span>
                    {team.attribute && team.attribute.mic ? (
                      <>
                        <img src="/assets/media/discover/mice.png" alt="" />
                        <b>On</b>
                      </>
                    ) : (
                      <>
                        <img src="/assets/media/discover/mice.png" alt="" />
                        <b>Off</b>
                      </>
                    )}
                  </span>
                  <span className="ml20">
                    <img src="/assets/media/discover/translator.png" alt="" />{' '}
                    {team.attribute && team.attribute?.language.length > 0 ? (
                      <>
                        {team.attribute?.language.map((tem, atx) => (
                          <b key={atx}>{tem}</b>
                        ))}
                      </>
                    ) : (
                      <p>No Language Available</p>
                    )}
                  </span>{' '}
                </div>
                {/* <TeamRequest team={team.team} user={user} profile={profile} /> */}
              </div>

              <div className="overview_box">
                <h2>Team Overview</h2>
                <div className="team_overview">
                  <div className="over_prof">
                    <div className="pics">
                      {' '}
                      <img src={team.team?.imgUrl} alt="" />{' '}
                    </div>
                    <h3>{team.team.name}</h3>
                  </div>

                  <div className="ranking">
                    <h4>Ranking</h4>

                    <div className="current_team">
                      <span className="ct">
                        <i className="fa fa-sort-asc" aria-hidden="true"></i>
                        {team.teamrank?.rank}
                      </span>
                      <span className="were">
                        Winning: {team.teamrank?.winning}{' '}
                      </span>
                    </div>

                    <h4>country</h4>
                    <p>
                      <ReactCountryFlag
                        countryCode={team.team.region}
                        svg
                        style={{
                          width: '2em',
                          height: '2em'
                        }}
                      />
                    </p>
                    <h4>Established</h4>
                    <p>{Moment(team.team.founded).format('MMM YYYY')}</p>
                  </div>
                  <div className="match">
                    <h4>Matches Played</h4>
                    <p>156 Games</p>
                    <h4>Matches Won</h4>
                    <p>131 Victories</p>
                    <h4>Manager</h4>
                    {team.team.employees.length !== 0 ? (
                      team.team.employees.map(
                        (role, etx) =>
                          role.role === 'manager' && (
                            <p key={etx}>{role.employeeId.username}</p>
                          )
                      )
                    ) : (
                      <p>Not Available</p>
                    )}
                  </div>
                  <div className="other">
                    <h4>From</h4>
                    <p>
                      <span className="red round"></span>{' '}
                      <span className="green round"></span>{' '}
                      <span className="red round"></span>{' '}
                    </p>
                    <h4>Trophies</h4>
                    <p>4</p>
                    <h4>Prize Earned</h4>
                    <p>USD 912.804</p>
                  </div>
                  <div className="percentage">
                    {' '}
                    <img
                      src="/assets/media/discover/percentage.png"
                      alt=""
                    />{' '}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : searchData.length > 0 ? (
          searchData.map((team, idx) => (
            <div className="team_row" key={idx}>
              <FavTeam team={team.team} profile={profile} />
              <div className="inner_team">
                <div className="logo_box">
                  {' '}
                  <div className="role_pic">
                    <img src={team.team?.imgUrl} alt="" />
                  </div>
                  <a href={`/team/${team.team?._id}`}>
                    <h3>{team.team?.name}</h3>
                  </a>
                  <ReactCountryFlag
                    countryCode={team.team.region}
                    svg
                    style={{
                      width: '2em',
                      height: '2em'
                    }}
                  />
                </div>
                {team.team.games && team.team.games.length <= 0 ? (
                  <p>No Game for this team</p>
                ) : (
                  <>
                    <span className="logo">
                      {team.team.games &&
                        team.team.games.map((im, ggx) => (
                          <img key={ggx} src={im.gameId?.imgUrl} alt="" />
                        ))}
                    </span>
                  </>
                )}
                <span className="remarks role_remk">
                  <h4>ROLE:</h4>
                  {team.attribute?.role.length > 0 ? (
                    <p>{team.attribute.role}</p>
                  ) : (
                    <p>No Role Specified</p>
                  )}
                </span>
                <div className="mores plateform">
                  {' '}
                  <span>
                    {team.attribute?.platform === 'PC' ? (
                      <img src="/assets/media/discover/desk.png" alt="" />
                    ) : team.attribute?.platform === 'Console' ? (
                      <img src="/assets/media/discover/console.png" alt="" />
                    ) : team.attribute?.platform === 'Mobile' ? (
                      <img
                        src="/assets/media/discover/mobile_game.png"
                        alt=""
                      />
                    ) : (
                      <p>No Platform mentioned</p>
                    )}
                  </span>{' '}
                  <span className="ml10">
                    {team.attribute?.mic ? (
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
                  <span className="ml10">
                    <img src="/assets/media/discover/translator.png" alt="" />{' '}
                    {team.attribute?.language?.length > 0 ? (
                      <>
                        {team.attribute?.language &&
                          team.attribute?.language.map((tem, idxx) => (
                            <b key={idxx}>
                              {tem.substring(0, 2).toUpperCase()}
                            </b>
                          ))}
                      </>
                    ) : (
                      <p>No Language Available</p>
                    )}
                  </span>{' '}
                </div>
                <TeamRequest team={team.team} user={user} profile={profile} />
              </div>

              <div className="overview_box">
                <h2>Team Overview</h2>
                <div className="team_overview">
                  <div className="over_prof">
                    <div className="pics">
                      {' '}
                      <img src={team.team?.imgUrl} alt="" />{' '}
                    </div>
                    <h3>{team.team.name}</h3>
                  </div>

                  <div className="ranking">
                    <h4>Ranking</h4>

                    <div className="current_team">
                      {!team.team.teamrank ? (
                        <p>No ranking</p>
                      ) : (
                        <>
                          <span className="ct">
                            <i
                              className="fa fa-sort-asc"
                              aria-hidden="true"
                            ></i>
                            {team.team.teamrank?.rank}
                          </span>
                          <span className="were">
                            Winning: {team.team.teamrank?.winning}{' '}
                          </span>
                        </>
                      )}
                    </div>

                    <h4>country</h4>
                    <p>
                      <ReactCountryFlag
                        countryCode={team.team.region}
                        svg
                        style={{
                          width: '2em',
                          height: '2em'
                        }}
                      />
                    </p>
                    <h4>Established</h4>
                    <p>{Moment(team.team.founded).format('MMM YYYY')}</p>
                  </div>
                  <div className="match">
                    <h4>Matches Played</h4>
                    <p>156 Games</p>
                    <h4>Matches Won</h4>
                    <p>131 Victories</p>
                    <h4>Manager</h4>
                    {team.team.employees && team.team.employees.length !== 0 ? (
                      team.team.employees &&
                      team.team.employees.map(
                        (role, txx) =>
                          role.role === 'manager' && (
                            <p key={txx}>{role.employeeId.username}</p>
                          )
                      )
                    ) : (
                      <p>Not Available</p>
                    )}
                  </div>
                  <div className="other">
                    <h4>From</h4>
                    <p>
                      <span className="red round"></span>{' '}
                      <span className="green round"></span>{' '}
                      <span className="red round"></span>{' '}
                    </p>
                    <h4>Trophies</h4>
                    <p>4</p>
                    <h4>Prize Earned</h4>
                    <p>USD 912.804</p>
                  </div>
                  <div className="percentage">
                    {' '}
                    <img
                      src="/assets/media/discover/percentage.png"
                      alt=""
                    />{' '}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          team.map((team, idx) => (
            <div className="team_row" key={idx}>
              <FavTeam team={team.team} profile={profile} />
              <div className="inner_team">
                <div className="logo_box">
                  {' '}
                  <div className="role_pic">
                    <img src={team.team?.imgUrl} alt="" />
                  </div>
                  {/* <a href={`/team/${team.team._id}`}>
                    <h3>{team.team.name}</h3>
                  </a> */}
                  <ReactCountryFlag
                    countryCode={team.team?.region}
                    svg
                    style={{
                      width: '2em',
                      height: '2em'
                    }}
                  />
                </div>
                {team.team?.games && team.team.games.length <= 0 ? (
                  <p>No Game for this team</p>
                ) : (
                  <>
                    <span className="logo">
                      {team.team?.games &&
                        team.team.games.map((game, gx) => (
                          <img key={gx} src={game.gameId?.imgUrl} alt="" />
                        ))}
                    </span>
                  </>
                )}
                <span className="remarks role_remk">
                  <h4>ROLE:</h4>
                  {team.attribute?.role?.length > 0 ? (
                    <p>{team.attribute.role}</p>
                  ) : (
                    <p>No Role Specified</p>
                  )}
                </span>
                <div className="mores plateform">
                  {' '}
                  <span>
                    {team.attribute?.platform === 'PC' ? (
                      <img src="/assets/media/discover/desk.png" alt="" />
                    ) : team.attribute?.platform === 'Console' ? (
                      <img src="/assets/media/discover/console.png" alt="" />
                    ) : team.attribute?.platform === 'Mobile' ? (
                      <img
                        src="/assets/media/discover/mobile_game.png"
                        alt=""
                      />
                    ) : (
                      <p>No Platform mentioned</p>
                    )}
                  </span>{' '}
                  <span className="ml10">
                    {team.attribute?.mic === true ? (
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
                  <span className="ml10">
                    <img src="/assets/media/discover/translator.png" alt="" />{' '}
                    {team.attribute?.language?.length > 0 ? (
                      <>
                        {team.attribute?.language.map((tem, tx) => (
                          <b key={tx}>{tem.substring(0, 2).toUpperCase()}</b>
                        ))}
                      </>
                    ) : (
                      <p>No Language Available</p>
                    )}
                  </span>{' '}
                </div>
                <TeamRequest team={team.team} user={user} profile={profile} />
              </div>

              <div className="overview_box">
                <h2>Team Overview</h2>
                <div className="team_overview">
                  <div className="over_prof">
                    <div className="pics">
                      {' '}
                      <img src={team.team?.imgUrl} alt="" />{' '}
                    </div>
                    <h3>{team.team?.name}</h3>
                  </div>

                  <div className="ranking">
                    <h4>Ranking</h4>

                    <div className="current_team">
                      {!team.attribute?.rank ? (
                        <p>No ranking</p>
                      ) : (
                        <>
                          <span className="ct">
                            <i
                              className="fa fa-sort-asc"
                              aria-hidden="true"
                            ></i>
                            {/* {team.attribute.rank} */}
                            --
                          </span>
                          {/* <span className="were">
                          Winning: {team.team.teamrank?.winning}{' '}
                        </span> */}
                        </>
                      )}
                    </div>

                    <h4>country</h4>
                    <p>
                      <ReactCountryFlag
                        countryCode={team.team?.region}
                        svg
                        style={{
                          width: '2em',
                          height: '2em'
                        }}
                      />
                    </p>
                    <h4>Established</h4>
                    <p>{Moment(team.team?.founded).format('MMM YYYY')}</p>
                  </div>
                  <div className="match">
                    <h4>Matches Played</h4>
                    <p>---</p>
                    <h4>Matches Won</h4>
                    <p>---</p>
                    <h4>Manager</h4>
                    {team.team?.employees.length !== 0 ? (
                      team.team?.employees &&
                      team.team.employees.map(
                        (role, tmx) =>
                          role.role === 'Manager' && (
                            <p key={tmx}>{role.employeeId.username}</p>
                          )
                      )
                    ) : (
                      <p>Not Available</p>
                    )}
                  </div>
                  <div className="other">
                    <h4>Form</h4>
                    <p>
                      <span className="red round"></span>{' '}
                      <span className="green round"></span>{' '}
                      <span className="red round"></span>{' '}
                    </p>
                    <h4>Trophies</h4>
                    <p>---</p>
                    <h4>Prize Earned</h4>
                    <p>---</p>
                  </div>
                  {/* <div className="percentage">
                  {' '}
                  <img
                    src="/assets/media/discover/percentage.png"
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

export default TeamDisplay;
