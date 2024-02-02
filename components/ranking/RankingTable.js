import { MPNumberFormat } from '../../utils/helpers';
import { format } from 'date-fns';
import LoadingSpinner from '../LoadingSpinner';

const RankingTable = ({ teamranking, searchResults }) => {
  if (teamranking) {
    return (
      <div className="ranking_table">
        {teamranking.length == 0 ? (
          <div className="team_row">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="table">
            <div className="heads_row">
              <div className="heads">ranking</div>
              <div className="heads">team</div>
              <div className="heads">Points</div>
              <div className="heads">TOURNAMENTS </div>
              {/* <div className="heads">MATCHES WON</div>
              <div className="heads">win%</div>
              <div className="heads">form</div> */}
              <div className="heads">PRIZE MONEY</div>
            </div>

            {!teamranking || teamranking.length === 0 ? (
              <div className="activity_tag">
                <span className="act_name">No teams are ranked yet ...</span>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((result, idx) => (
                <div className="row_box" key={idx}>
                  <div className="cols_box">
                    <div className="cols">
                      {result.rank ? result.rank : 'Not Ranked'}
                    </div>
                    <div className="cols">
                      <a href={`/team/${result.team._id}`}>
                        {result.team.name}
                      </a>
                    </div>
                    <div className="cols">
                      {result.team_points ? result.team_points : 'Not Defined'}
                    </div>
                    <div className="cols">
                      {result.tournament ? result.tournament.length : 0}
                    </div>
                    <div className="cols">
                      {result.team_points ? result.team_points : '0'}/ 0
                    </div>
                    <div className="cols">tdb</div>
                    <div className="cols">
                      {' '}
                      <span className="round green"></span>{' '}
                      <span className="round green"></span>{' '}
                      <span className="round red"></span>{' '}
                      <span className="round red"></span>{' '}
                      <span className="round green"></span>{' '}
                    </div>
                    <div className="cols">$45,000</div>
                  </div>

                  {!result.tournament || result.tournament.length === 0 ? (
                    <div className="more_data">
                      <div className="activity_tag">
                        <span className="act_name">
                          No TOURNAMENTS played yet by this team ...
                        </span>
                      </div>
                    </div>
                  ) : (
                    result.tournament.map((tresult, idx) => (
                      <div className="more_data" key={idx}>
                        <div className="pic">
                          <div className="tumb">
                            <img src={tresult.imgUrl} alt="" />
                          </div>
                          <h3>{tresult.name}</h3>
                        </div>
                        <div className="total">
                          <p>
                            <MPNumberFormat
                              value={tresult.prizepool}
                              currency={result.currency}
                            />
                          </p>
                          <p>TOTAL PRIZE POOL EARNED</p>
                        </div>
                        <div className="chart">
                          <img src="/assets/media/ranking/chart.png" alt="" />
                        </div>
                        <div className="follows">
                          <button>Follow</button>
                          <div className="ate">
                            {' '}
                            {result.matches[0]
                              ? result.matches[0].teams[0].teamName.substring(
                                  0,
                                  7
                                ) + '...'
                              : 'Not Mentioned'}{' '}
                            <span className="circle"></span> 16-3{' '}
                            <span className="circle"></span>{' '}
                            {result.matches[0]
                              ? result.matches[0].teams[1].teamName.substring(
                                  0,
                                  7
                                ) + '...'
                              : 'Not Mentioned'}{' '}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ))
            ) : (
              teamranking.map((result, idx) => (
                <div className="row_box" key={idx}>
                  <div className="cols_box">
                    <div className="cols">
                      {result.rank ? result.rank : 'Not Ranked'}
                    </div>
                    <div className="cols">
                      <a href={`/team/${result.team._id}`}>
                        {result.team.name}
                      </a>
                    </div>
                    <div className="cols">
                      {result.points ? result.points : 'Not Defined'}
                    </div>
                    <div className="cols">{result.totalTournaments}</div>
                    {/* <div className="cols">
                      {result.points ? result.points : '0'}
                      ---
                      / 0
                    </div> */}
                    {/* <div className="cols">tdb</div>
                    <div className="cols">
                      {' '}
                      <span className="round green"></span>{' '}
                      <span className="round green"></span>{' '}
                      <span className="round red"></span>{' '}
                      <span className="round red"></span>{' '}
                      <span className="round green"></span>{' '}
                    </div> */}
                    {result.team.team_winnings ? (
                      <div className="cols">
                        Rs: {result.team.team_winnings}
                      </div>
                    ) : (
                      'No Winnings Yet'
                    )}
                  </div>

                  {!result.tournament || result.tournament.length === 0 ? (
                    <div className="more_data">
                      <div className="activity_tag">
                        <span className="act_name">
                          No TOURNAMENTS played yet by this team ...
                        </span>
                      </div>
                    </div>
                  ) : (
                    result.tournament.map((tresult, idx) => (
                      <div className="more_data" key={idx}>
                        <div className="pic">
                          <div className="tumb">
                            <img src={tresult.imgUrl} alt="" />
                          </div>
                          <h3>{tresult.name}</h3>
                        </div>
                        <div className="total">
                          <p>
                            <MPNumberFormat
                              value={tresult.prizepool}
                              currency={result.currency}
                            />
                          </p>
                          <p>TOTAL PRIZE POOL EARNED</p>
                        </div>
                        <div className="chart">
                          <img src="/assets/media/ranking/chart.png" alt="" />
                        </div>
                        <div className="follows">
                          <button>Follow</button>
                          <div className="ate">
                            {' '}
                            {result.matches[0]
                              ? result.matches[0].teams[0].teamName.substring(
                                  0,
                                  7
                                ) + '...'
                              : 'Not Mentioned'}{' '}
                            <span className="circle"></span> 16-3{' '}
                            <span className="circle"></span>{' '}
                            {result.matches[0]
                              ? result.matches[0].teams[1].teamName.substring(
                                  0,
                                  7
                                ) + '...'
                              : 'Not Mentioned'}{' '}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default RankingTable;
