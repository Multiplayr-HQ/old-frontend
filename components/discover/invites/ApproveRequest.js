import React from 'react';
import baseURL from '@utils/baseURL';
import Cookies from 'js-cookie';

const ApproveRequest = ({ player, team, handleJoines, type }) => {
  const playerId = player?.teamId ? player.playerId : player.playerId._id;

  const reqhandlesubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${baseURL}/api/teams/accept/${team._id}/${playerId}/${type}`,
      {
        method: 'PUT',
        headers: {
          Authorization: Cookies.get('token')
        }
      }
    );

    const data = await res.json();
    handleJoines(data.joines);
  };

  return (
    <>
      <button className="btn" onClick={reqhandlesubmit}>
        Approve
      </button>
    </>
  );
};

export default ApproveRequest;
