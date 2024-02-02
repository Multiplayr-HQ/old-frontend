import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import Moment from 'moment';

const ProfileMatches = ({ user, Userdata, teamMatchesList }) => {
  return (
    <div className="tab hide" id="matches">
      {' '}
      {teamMatchesList.teamMatches?.length == 0 ? (
        <p>
          {' '}
          Player info is not attached to the profile. Please ensure that player
          is assigned to this profile.{' '}
        </p>
      ) : (
        teamMatchesList.type === 'MATCHES' &&
        teamMatchesList.teamMatches.map((result, index) => (
          <div className="next_matches" key={index}>
            <div className="bdr_clr_green">
              <div className="single_team">
                <h2>Team : </h2>
                <h3>{result.team.name} </h3>
                <img src={result.team.imgUrl} alt="" />
              </div>

              <div className="user_vs_player">
                <h2>PLAYERS :</h2>
                <ul>
                  {result.team.players.map((player, index) => (
                    <>
                      {' '}
                      <li>
                        {player.playerId?.imgUrl ? (
                          <img
                            src={player.playerId?.imgUrl}
                            alt={player.playerId.name}
                          />
                        ) : (
                          <img src="/assets/media/user.png" alt="" />
                        )}
                        <h4>{player.playerId?.name}</h4>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </div>

            <div className="stats_table">
              <table className="table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Versus</th>
                    <th>Competition</th>
                    <th>Instance</th>
                    <th>Time</th>
                    <th>Score</th>
                    <th>Watch</th>
                    <th>Tickets</th>
                  </tr>
                </thead>
                <tbody>
                  {result.matches.map((match, index) => {
                    return (
                      <>
                        <tr key={index}>
                          <td>
                            {Moment(match.startDate).format('DD-MM-YYYY')}
                          </td>
                          <td>
                            {match.opponents.map((res, idx) =>
                              result.team._id != res.opponent._id ? (
                                <>
                                  <span className="dp">
                                    <img src={res.opponent.image_url} alt="" />
                                  </span>{' '}
                                  <span className="dp_name">
                                    <b>{res.opponent.name}</b>
                                  </span>
                                </>
                              ) : (
                                ''
                              )
                            )}
                          </td>
                          <td>{match.name}</td>
                          <td>Semi-Finals</td>
                          <td>{Moment(match.startDate).format('h:m')}</td>
                          <td>
                            {match.results[0].score} - {match.results[1].score}
                          </td>
                          <td>View Match</td>
                          <td>
                            <a href="#">Buy Match Tickets</a>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProfileMatches;
