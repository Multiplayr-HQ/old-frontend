import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';

const GameTeams = ({ teams, game }) => {
  return (
    <ul className="communities teams">
      {!teams || teams.length === 0 ? (
        <li>
          <div className="activity_tag">
            <span className="act_name">No teams have {game.name}</span>
          </div>
        </li>
      ) : (
        teams.map((team, idx) => (
          <li key={idx}>
            <a href={`/team/${team._id}`}>
              <div className="imgs">
                {' '}
                <img src={team.imgUrl} alt={team.name} />{' '}
              </div>
              <div className="bottom_data">
                <h3>{team.name}</h3>
              </div>
            </a>
          </li>
        ))
      )}
    </ul>
  );
};

export default GameTeams;
