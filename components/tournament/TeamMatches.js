import React from 'react';
import Moment from 'moment';

const TeamMatches = ({ user, tournament }) => {
  return (
    <div className="tab hide" id="matches">
      <h2>matches</h2>
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
            {tournament &&
              tournament.map((match, index) => {
                return (
                  <tr key={index}>
                    <td>{Moment(match.startDate).format('DD-MM-YYYY')}</td>
                    <td>
                      {match.opponents.length === 0 ? (
                        <h6>---</h6>
                      ) : (
                        match.opponents.map((opp,idx) => {
                          return (
                            <div key={idx}>
                              <span className="dp">
                                <img src={opp.opponent.image_url} alt="" />
                              </span>{' '}
                              <span className="dp_name">
                                <b>{opp.opponent.name}</b>
                                {/* {match.region} */}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </td>
                    <td>{match.name}</td>
                    <td>Semi-Finals</td>
                    <td>{Moment(match.startDate).format('h:m')}</td>
                    <td>
                      {match.results[0]?.score}-{match.results[1]?.score}
                    </td>
                    <td>
                      <a
                        href={
                          match.streamsList[0]
                            ? match.streamsList[0].embed_url
                            : '-'
                        }
                      >
                        View Match
                      </a>
                    </td>
                    <td>
                      <a href="#">Tickets</a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamMatches;
