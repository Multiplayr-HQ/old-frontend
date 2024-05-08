import React from 'react';
import { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';
import { toast } from 'react-toastify';
import BrandCreate from '../Creators/BrandCreate';
import TournamentCreate from '../Creators/TournamentCreate';
import TeamCreate from '../Creators/TeamCreate';
import ClaimCard from './ClaimCard';
import baseURL from '../../utils/baseURL';
import ChallengesDisplay from '../challenges/ChallengesDisplay';
import BracketCard from './BracketCard';

const SupportAdmin = ({ user, data, profile }) => {
  const [show, setShow] = useState(false);
  const [type, setType] = useState('TEAMS');
  let [tabData, setTabData] = useState([]);

  const handleShow = (type) => {
    setShow(true);
    setType(type);
  };

  const handleTabs = async (Type) => {
    try {
      await axios
        .get(`${baseURL}/api/admin/supportadmindata/${Type}`, {
          headers: {
            Authorization: cookie.get('token')
          }
        })
        .then((res) => setTabData(res.data));
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  useEffect(() => {
    handleTabs('TEAMS');
  }, []);

  return (
    <>
      <div className="create_menu">
        <ul>
          <li>
            <a href="#" onClick={() => handleShow('Team')}>
              <i className="fa fa-users" aria-hidden="true"></i>
              <p>create a Team </p>
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleShow('Tournament')}>
              <i className="fa fa-trophy" aria-hidden="true"></i>
              <p> create a Tournament</p>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-comments" aria-hidden="true"></i>
              <p> create a Community </p>
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleShow('Brand')}>
              <i className="fa fa-briefcase" aria-hidden="true"></i>
              <p> create a Brand </p>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-gamepad" aria-hidden="true"></i>
              <p> create an Arena </p>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>
              <p> create a Company </p>
            </a>
          </li>
        </ul>
        <div className="message">
          <h3>The power of Esports tools are in your hands</h3>
          <p>
            Make use of the Help section to learn more to make a better use of
            the plateform
          </p>
        </div>

        <a href="#" className="close">
          <i className="fa fa-times-circle" aria-hidden="true"></i>
        </a>
      </div>
      {show === true ? (
        type === 'Brand' ? (
          <BrandCreate isClaim={false} />
        ) : type === 'Team' ? (
          <TeamCreate isClaim={false} user={user} />
        ) : type === 'Tournament' ? (
          <TournamentCreate user={user} isClaim={false} />
        ) : null
      ) : null}
      <ul className="profile_tab_btn three_nav">
        <li className="active">
          <a href="#!" rel="Teams" onClick={() => handleTabs('TEAMS')}>
            Teams
          </a>
        </li>
        <li>
          <a
            href="#!"
            rel="Tournaments"
            onClick={() => handleTabs('TOURNAMENTS')}
          >
            Tournaments
          </a>
        </li>
        <li>
          <a href="#!" rel="Brands" onClick={() => handleTabs('BRANDS')}>
            Brands
          </a>
        </li>
        <li>
          <a
            href="#!"
            rel="TournamentBracket"
            onClick={() => handleTabs('TOUR BRACKET')}
          >
            Tour Bracket Management
          </a>
        </li>
        <li>
          <a href="#!" rel="Challenges">
            Wagers
          </a>
        </li>
      </ul>
      <div className="prfoile_tab_data">
        <div className="tab hide" id="Tournaments">
          <div className="white_bg challenge_card_box">
            <ul className="challenge_card">
              <ClaimCard data={tabData} user={user} />
            </ul>
          </div>
        </div>

        <div className="tab hide" id="Brands">
          <div className="white_bg challenge_card_box">
            <ul className="challenge_card">
              <ClaimCard data={tabData} user={user} />
            </ul>
          </div>
        </div>

        <div className="tab" id="Teams">
          <div className="white_bg challenge_card_box">
            <ul className="challenge_card">
              <ClaimCard data={tabData} user={user} />
            </ul>
          </div>
        </div>
        <div className="tab" id="TournamentBracket">
          <div className="white_bg challenge_card_box">
            <ul className="challenge_card">
              <BracketCard tournaments={tabData} user={user} />
            </ul>
          </div>
        </div>
        <div className="tab" id="Challenges">
          <div className="white_bg challenge_card_box">
            <ul className="challenge_card">
              {!data.challenges || data.challenges.length === 0 ? (
                <div>
                  <span>No Wagers here.</span>
                </div>
              ) : (
                data.challenges.map((chall,i) => (
                  <ChallengesDisplay key={i}
                    user={user}
                    chall={chall}
                    profile={profile}
                    type="SupportAdmin"
                  />
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SupportAdmin;
