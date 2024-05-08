import React from 'react';
import { useState } from 'react';
import TeamStatAdd from './TeamStatAdd';
import TeamStatDelete from './TeamStatDelete';
import TeamStatEdit from './TeamStatEdit';

const TeamStatistics = ({
  tournamentStatData,
  isManager,
  isAdmin,
  isOwner,
  isCEO
}) => {
  const [showform, setShowForm] = useState(false);
  const [editContactId, setEditContactId] = useState(null);

  const toggleShowform = () => {
    if (showform) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const handleEdit = (e, data) => {
    e.preventDefault();
    setEditContactId(data._id);
  };

  return (
    <div className="all_stat">
      <div className="tournament_table">
        <h2>all time stats</h2>
        {/* {isManager ? (
          <button onClick={toggleShowform} className="btn">
            Add Data
          </button>
        ) : null} */}
        <form onSubmit={(e) => e.preventDefault()}>
          <table className="table">
            <thead className="thead-light">
              <tr>
                <th scope="col">tournaments </th>
                <th scope="col">place</th>
                <th scope="col">mp </th>
                <th scope="col">wins</th>
                <th scope="col">loss</th>
                <th scope="col">win%</th>
                <th scope="col">w strk</th>
                {/* {isManager ? <th>Actions</th> : null} */}
              </tr>
            </thead>

            <tbody>
              <TeamStatAdd showform={showform} />
              {tournamentStatData?.map((tsd) => (
                <>
                  {editContactId === tsd._id ? (
                    <TeamStatEdit statData={tsd} />
                  ) : (
                    <tr>
                      <td>{tsd.tournamentId}</td>
                      <td>{tsd.place}</td>
                      <td>{tsd.mp}</td>
                      <td>{tsd.wins}</td>
                      <td>{tsd.loss}</td>
                      <td>{(tsd.wins / tsd.mp).toFixed(2)}</td>
                      <td>{tsd.w_streak}</td>
                      <td>
                        {/* {isManager ? (
                          <button
                            onClick={(e) => handleEdit(e, tsd)}
                            className="btn"
                          >
                            Edit
                          </button>
                        ) : null} */}
                        {/* <TeamStatDelete statData={tsd} isManager={isManager} /> */}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </form>
      </div>
      <div className="tournament_table">
        <h2>2021 stats</h2>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">tournaments </th>
              <th scope="col">place</th>
              <th scope="col">mp </th>
              <th scope="col">wins</th>
              <th scope="col">loss</th>
              <th scope="col">win%</th>
              <th scope="col">w strk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>115 </td>
              <td>16th</td>
              <td>767</td>
              <td>545</td>
              <td>323</td>
              <td>68%</td>
              <td>21</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tournament_table">
        <h2>league </h2>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">Season </th>
              <th scope="col">place</th>
              <th scope="col">mp </th>
              <th scope="col">wins</th>
              <th scope="col">loss</th>
              <th scope="col">win%</th>
              <th scope="col">w strk</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>gon fall 2021 </td>
              <td>16th</td>
              <td>767</td>
              <td>545</td>
              <td>323</td>
              <td>68%</td>
              <td>21</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="tournament_table">
        <h2>upcoming and recent matches </h2>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th scope="col">date </th>
              <th scope="col">time</th>
              <th scope="col">game </th>
              <th scope="col">opponent</th>
              <th scope="col">result</th>
              <th scope="col">STARTED</th>
              <th scope="col">match details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td> 24th nov 17 </td>
              <td>6:15 pm ist</td>
              <td> cod4</td>
              <td> vega esports</td>
              <td> win</td>
              <td> HOME</td>
              <td> view match </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamStatistics;
