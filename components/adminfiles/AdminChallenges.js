import React from 'react';
import RoomDetails from './RoomDetails';
import Moment from 'moment';

const AdminChallenges = ({ challenges }) => {
  return (
    <>
      <h1>Latest Challenges</h1>
      <div className="table">
        <div className="heads_row">
          <div className="heads">ChallengeId</div>
          <div className="heads">Challenge Type</div>
          <div className="heads">Challenger</div>
          <div className="heads">Challenged</div>
          <div className="heads">Game</div>
          <div className="heads">Match</div>
          <div className="heads">Start Time</div>
          <div className="heads">Room Details</div>
          <div className="heads">Actions</div>
        </div>
        {!challenges || challenges.length === 0 ? (
          <div className="activity_tag">
            <span className="act_name">No challenges are yet...</span>
          </div>
        ) : (
          challenges.map((result, idx) => (
            <div className="row_box" key={idx}>
              <div className="cols_box">
                {result.isOpenMatch === false ? (
                  <>
                    <div className="cols">{result._id.substring(0, 14)}</div>
                    <div className="cols">{result.ChallType}</div>
                    <div className="cols">{result?.User_team?.name}</div>
                    <div className="cols">{result?.opponent_team?.name}</div>
                    <div className="cols">{result.game.name}</div>
                    <div className="cols">
                      <p>{result?.User_team?.name}</p>
                      VS
                      <p>{result?.opponent_team?.name}</p>
                    </div>
                  </>
                ) : result.isOpenMatch === true &&
                  result.ChallType === 'Team' ? (
                  <>
                    <div className="cols">{result._id.substring(0, 14)}</div>
                    <div className="cols">{result.ChallType}</div>
                    <div className="cols">{result?.User_team?.name}</div>
                    <div className="cols">
                      {result.opponent_team ? result.opponent_team.name : '---'}
                    </div>
                    <div className="cols">{result.game.name}</div>
                    <div className="cols">
                      <p>{result?.User_team?.name}</p>
                      VS
                      <p>
                        {result.opponent_team
                          ? result.opponent_team.name
                          : '---'}
                      </p>
                    </div>
                  </>
                ) : result.isOpenMatch === true &&
                  result.ChallType === 'Solo' ? (
                  <>
                    <div className="cols">{result._id.substring(0, 14)}</div>
                    <div className="cols">{result.ChallType}</div>
                    {result.players.map(
                      (ply,i) =>
                        ply.teamId !== null && (
                          <div className="cols" key={i}>
                            {
                              ply?.playerId?.apidata?.data.platformInfo
                                .platformUserHandle
                            }
                          </div>
                        )
                    )}
                    {result.players.length === 1 ? (
                      <div className="cols">---</div>
                    ) : (
                      result.players.map(
                        (ply,i) =>
                          ply.teamId === null && (
                            <div className="cols" key={i}>
                              {
                                ply?.playerId?.apidata?.data.platformInfo
                                  .platformUserHandle
                              }
                            </div>
                          )
                      )
                    )}
                    <div className="cols">{result.game.name}</div>
                    <div className="cols">
                      <p>
                        {
                          result?.players[0]?.playerId?.apidata?.data
                            .platformInfo.platformUserHandle
                        }
                      </p>
                      VS
                      <p>
                        {
                          result?.players[1]?.playerId?.apidata?.data
                            .platformInfo.platformUserHandle
                        }
                      </p>
                    </div>
                  </>
                ) : null}

                <div className="cols">
                  {Moment(result.startDate).format('DD/MMM/YYYY')}
                  <br />
                  {result.startTime}
                </div>
                <div className="cols">
                  Room Id: {result.room?.roomId ? result.room.roomId : '---'}
                  <br />
                  Room Password:{' '}
                  {result.room?.roompwd ? result.room.roompwd : '---'}
                </div>

                <RoomDetails data={result} type="challenges" />
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default AdminChallenges;
