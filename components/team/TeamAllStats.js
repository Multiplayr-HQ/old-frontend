import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseEsportsAPIURL from '@utils/baseEsportsAPIURL';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import cookie from 'js-cookie';

const TeamAllStats = ({ teamId }) => {
  const [stat, setStat] = useState({});

  useEffect(() => {
    //Get Team Stats
    const auth = {
      username: 'multiplyr',
      password: 'Multiplyr123$'
    };

    axios
      .get(`${baseEsportsAPIURL}/esport/matches/statistics/${teamId}`, { auth })
      .then((res) => setStat(res.data.data));
  }, []);
  console.log(stat);
  return (
    <div className="all_stats">
      <ul>
        <li>
          <img src="/assets/media/profile/fire1.png" alt="" />
          <div className="two_value">
            <span className="num">{stat?.matchesPlayed}</span>
            <span className="names">MATCHES PLAYED</span>
          </div>
        </li>
        <li>
          <img src="/assets/media/profile/won.png" alt="" />

          <div className="two_value">
            <span className="num">{stat?.matchesWon}</span>
            <span className="names">MATCHES WON</span>
          </div>
        </li>
        <li>
          <img src="/assets/media/profile/cup.png" alt="" />

          <div className="two_value">
            <span className="num">{stat?.tournamentWon}</span>
            <span className="names">TROPHIES</span>
          </div>
        </li>
        <li>
          <img src="/assets/media/profile/money.png" alt="" />
          <div className="two_value">
            <span className="num">{stat?.earnings}</span>
            <span className="names">EARNINGS</span>
          </div>
        </li>
        <li>
          <img src="/assets/media/profile/streak.png" alt="" />
          <div className="two_value">
            <span className="num">{stat?.tournamentPlayed}</span>
            <span className="names">TOURNAMENTS PLAYED</span>
          </div>
        </li>
        <li>
          <div className="two_value">
            <a href="#" className="names">
              All Stat
            </a>
          </div>{' '}
          <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
        </li>
      </ul>
    </div>
  );
};

export default TeamAllStats;
