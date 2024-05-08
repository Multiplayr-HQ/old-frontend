import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ApproveRequest from '../discover/invites/ApproveRequest';
import DeclineRequest from '../discover/invites/DeclineRequest';

const TeamJoines = ({
  data,
  user,
  isManager,
  isAdmin,
  isCEO,
  isSupportAdmin,
  isOwner,
  team
}) => {
  const [joines, setJoines] = useState(data?.joines);

  useEffect(() => {
    setJoines(data.joines);
  }, [data.joines]);

  const handleJoines = (data) => {
    setJoines(data);
  };
  return (
    <>
      <div className="team_member no-bdr">
        {isAdmin || isOwner || isCEO || isManager || isSupportAdmin ? (
          <ul>
            {joines &&
              joines?.map((req,i) => (
                <li key={i}>
                  <div className="dp">
                    {req.playerId.apidata?.data?.platformInfo ? (
                      <img
                        src={
                          req?.playerId.apidata?.data?.platformInfo.avatarUrl
                            ? req?.playerId.apidata.data?.platformInfo.avatarUrl
                            : req?.playerId?.imgUrl
                        }
                        alt={
                          req?.playerId.apidata?.data?.platformInfo
                            .platformUserHandle
                        }
                      />
                    ) : (
                      <img
                        src={
                          req?.playerId.user
                            ? req?.playerId.user?.profilePicUrl
                            : req?.playerId?.imgUrl
                        }
                        alt={req?.playerId.user?.username}
                      />
                    )}
                  </div>
                  <h2>
                    {req.playerId?.apidata.data?.platformInfo
                      ? req.playerId.apidata.data?.platformInfo
                          .platformUserHandle
                      : req.playerId?.name}
                  </h2>
                  <p>Sent Request To Join!</p>
                  <div className="two_btn">
                    <ApproveRequest
                      player={req}
                      team={team}
                      handleJoines={handleJoines}
                      type="TEAM"
                    />
                    <DeclineRequest
                      player={req}
                      team={team}
                      handleJoines={handleJoines}
                      type="TEAM"
                    />
                  </div>
                </li>
              ))}
          </ul>
        ) : null}
      </div>
    </>
  );
};

export default TeamJoines;
