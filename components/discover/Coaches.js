import Filters from '../common/Filters';
import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import Rating from './Rating';
import ReactCountryFlag from 'react-country-flag';
import LoadingSpinner from '../LoadingSpinner';

const Coaches = ({ user, profile, myState }) => {
  const [coach, setCoach] = useState([]);
  const [sessionCoach, setSessionCoach] = useState({ key: null, value: null });

  useEffect(() => {
    if (myState.selectedFilters.length > 0) {
      setCoach(myState.filteredResults);
    } else {
      if (sessionCoach.key === null) {
        axios.get(`${baseURL}/api/all/coaches`).then((res) => {
          setCoach(res.data);
          setSessionCoach({ key: 'COACHSET', value: res.data });
        });
      }
    }
  }, [myState, coach]);

  return (
    <div className="tab" id="coaches">
      <div className="white_bg">
        <div className="team_search">
          <div className="searchbox">
            <h3>Search</h3>
            <input type="search" placeholder="Search" />
            <input type="submit" />
          </div>
          <div className="advance">
            <div className="views">
              <h3>ADVANCED FILTER </h3>
              EXCLUDE “ALREADY VIEWED”
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customCheck1"
                ></label>
              </div>
            </div>
            <h3>Favourite</h3>
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitch1"
              ></label>
            </div>
          </div>
        </div>

        <Filters filterType={'COACHES'} myState={myState} />
      </div>

      {coach.length == 0 ? (
        <div className="team_row">
          <LoadingSpinner />
        </div>
      ) : (
        coach.map((coach, i) => (
          <div className="team_row" key={i}>
            <div className="stars">
              <i className="fa fa-star" aria-hidden="true"></i>
            </div>
            <div className="inner_team">
              <div className="logo_box">
                {' '}
                <div className="role_pic">
                  {' '}
                  <img src={coach?.coaches?.user?.profilePicUrl} alt="" />
                </div>
                <h3>{coach.coaches.user.name}</h3>
                <ReactCountryFlag
                  countryCode={coach.coaches.region}
                  svg
                  style={{
                    width: '2em',
                    height: '2em'
                  }}
                />
              </div>
              <span className="logo">
                <img src="/assets/media/discover/apex.png" alt="" />{' '}
                <img src="/assets/media/discover/icon2.png" alt="" />
              </span>{' '}
              <span className="remarks">
                <h4>
                  EXPERIENCE: <b>{coach.coaches.experience} Year</b>{' '}
                </h4>
              </span>
              <div className="mores plateform">
                <Rating value={coach.coaches.coach_rating} />
                <span className="ml10">
                  {coach.coaches.attributes.platform === 'PC' ? (
                    <img src="/assets/media/discover/desk.png" alt="" />
                  ) : coach.coaches.attributes.platform === 'Console' ? (
                    <img src="/assets/media/discover/console.png" alt="" />
                  ) : coach.coaches.attributes.platform === 'Mobile' ? (
                    <img src="/assets/media/discover/mobile_game.png" alt="" />
                  ) : (
                    <p>No Platform mentioned</p>
                  )}
                </span>
                <span className="ml10">
                  <img src="/assets/media/discover/translator.png" alt="" />
                  {coach.coaches.attributes.language?.length > 0 ? (
                    <>
                      {coach.coaches.attributes.language.map((lan, i) => (
                        <b key={i}>{lan}</b>
                      ))}
                    </>
                  ) : (
                    <p>No Language Available</p>
                  )}
                </span>
              </div>
              <a href="#" className="join">
                SCHEDULE SESSION
              </a>{' '}
            </div>

            <div className="overview_box">
              <h2>Coaches Overview</h2>
              <div className="team_overview coach_overview">
                <div className="over_prof">
                  <div className="pics">
                    <img src={coach.coaches.user.profilePicUrl} alt="" />
                  </div>
                  <h3>{coach.coaches.user.username}</h3>
                </div>

                <div className="ranking">
                  <h4>Teams Coached</h4>
                  <div className="past">
                    <img src="/assets/media/discover/icon1.png" alt="" />{' '}
                    {coach.teams.map((tem) => (
                      <>
                        <b> {tem.name} </b>{' '}
                      </>
                    ))}
                  </div>
                  <h4>Players Coached</h4>
                  <p>{coach.coaches.players_coached}</p>
                  <h4>Tier Level:</h4>
                  <p>{coach.coaches.tier_level}</p>
                </div>
                <div className="match">
                  <h4>FEATURED REVIEW</h4>

                  {coach.reviews.map((rew) => (
                    <>
                      {' '}
                      <p> {rew.review} </p>
                      <p>
                        <Rating value={rew.rating} />- {rew.reviewer.name}
                      </p>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Coaches;
