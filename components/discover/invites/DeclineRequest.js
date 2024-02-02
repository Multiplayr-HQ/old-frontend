import React, { useState } from 'react';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';

const DeclineRequest = ({ player, team, handleJoines, type }) => {
  const playerId = player?.teamId ? player.playerId : player.playerId._id;

  const reqhandlesubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `${baseURL}/api/teams/decline/${team._id}/${playerId}/${type}`,
      {
        method: 'PUT'
      }
    );
    const data = await res.json();
    handleJoines(data.joines);
  };

  return (
    <>
      <button className="btn" onClick={reqhandlesubmit}>
        Decline
      </button>
    </>
  );
};

export default DeclineRequest;
