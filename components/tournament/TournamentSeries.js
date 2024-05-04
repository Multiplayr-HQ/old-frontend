import React from 'react';
import Moment from 'moment';

const TournamentSeries = ({ user}) => {

  const tournament = {
    seriesId: {
      fullName: "Example Series",
      startDate: "2024-04-01",
      endDate: "2024-04-30",
      season: "Spring",
      tier: "Tier 1",
      slug: "example-series"
    },
    leagues: [
      {
        leagueId: {
          name: "Example League 1",
          // imgUrl: "league1.jpg",
          startDate: "2024-04-01",
      endDate: "2024-04-30",
          url: "https://example.com/league1",
          slug: "example-league-1"
        }
      },
      {
        leagueId: {
          name: "Example League 2",
          // imgUrl: "league2.jpg",
          startDate: "2024-04-01",
      endDate: "2024-04-30",
          url: "https://example.com/league2",
          slug: "example-league-2"
        }
      }
    ]
  };

  return (
    <div className="groupds_box">
      <div className="group">
        <div className="title_bg">SERIES: {tournament?.seriesId?.fullName}</div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Series Details</th>
              <th scope="col">
                <b></b>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Start Date</td>
              <td>
                <strong>{tournament?.seriesId?.startDate}</strong>
              </td>
            </tr>
            <tr>
              <td>Start Date</td>
              <td>
                <strong>{tournament?.seriesId?.endDate}</strong>
              </td>
            </tr>
            <tr>
              <td>Season </td>
              <td>
                <strong>{tournament?.seriesId?.season}</strong>
              </td>
            </tr>
            <tr>
              <td>Tier </td>
              <td>
                <strong>{tournament?.seriesId?.tier}</strong>
              </td>
            </tr>
            <tr>
              <td>Slug </td>
              <td>
                <strong>{tournament?.seriesId?.slug}</strong>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {tournament?.leagues.map((result, idx) => (
        <div className="group" key={idx}>
          <p>
            {' '}
            <img src={result.leagueId.imgUrl} style={{ width: '40%' }} />{' '}
          </p>
          <div className="title_bg">LEAGUE: {result.leagueId.name}</div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Series Details</th>
                <th scope="col">
                  <b></b>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Start Date</td>
                <td>
                  <img src={result.leagueId.imgUrl} />
                </td>
              </tr>
              <tr>
                <td>URL </td>
                <td>
                  <strong>
                    <a href={`result.leagueId.url`} target="_blank" rel="noreferrer">
                      {result.leagueId.url}
                    </a>
                  </strong>
                </td>
              </tr>
              <tr>
                <td>Slug </td>
                <td>
                  <strong>{result.leagueId.slug}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default TournamentSeries;
