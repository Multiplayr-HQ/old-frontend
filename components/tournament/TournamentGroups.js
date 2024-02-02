import React, { useState } from 'react';

const TournamentGroups = ({ group, playType, tournamentType }) => {
  if (group) {
    return (
      <>
        <div className="group">
          <div className="title_bg">{tournamentType}</div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Competitor</th>
                <th scope="col">
                  <b>M</b> <b>W</b> <b>D</b> <b>L</b> <b>P</b>
                </th>
              </tr>
            </thead>
            <tbody>
              {playType === 'TEAMS'
                ? group &&
                  group.teams.map((team) => (
                    <>
                      <tr>
                        <td>
                          <img src={team.teamId.imgUrl} alt="" />
                          <strong>{team.teamId.name}</strong>
                        </td>
                        <td>
                          <b>{team.matches}</b> <b>{team.won}</b>{' '}
                          <b>{team.draw}</b> <b>{team.loss}</b>{' '}
                          <b>{team.points}</b>
                        </td>
                      </tr>
                    </>
                  ))
                : group &&
                  group.participants.map((participant) => (
                    <>
                      <tr>
                        <td>
                          <img
                            src={participant.participantId.profilePicUrl}
                            alt=""
                          />
                          <strong>{participant.participantId.username}</strong>
                        </td>
                        <td>
                          <b>{participant.matches}</b> <b>{participant.won}</b>{' '}
                          <b>{participant.draw}</b> <b>{participant.loss}</b>{' '}
                          <b>{participant.points}</b>
                        </td>
                      </tr>
                    </>
                  ))}
            </tbody>
          </table>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default TournamentGroups;
