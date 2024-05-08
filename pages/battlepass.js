import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from './AllScript';
import { parseCookies } from 'nookies';
import { toast } from 'react-toastify';
import RewardList from '../components/battlepass/RewardList';
import TaskList from '../components/battlepass/TaskList';
import Moment from 'moment';
import SubcriptionCard from '../components/common/SubcriptionCard';

const Battlepass = ({ user, data, profile }) => {

  const [bpData, setBpData] = useState(data);
  const [pageNumber, setPageNumber] = useState(0);
  const rewardPerPage = 5;
  const rewardVisited = pageNumber * rewardPerPage;

  const displayRewards = data.freelevels.slice(
    rewardVisited,
    rewardVisited + rewardPerPage
  );
  const displayLevels = data.freelevels.slice(
    rewardVisited,
    rewardVisited + rewardPerPage
  );

  const { battlepass, freelevels, paidlevels } = bpData;
  let x = Moment.duration(
    Moment(battlepass.endDate).diff(Moment().startOf('day'))
  )
    .asDays()
    .toString()
    .slice(0, 2);
  let daysLeft = Number(x);
  const pricingMonthly = [
    {
      id: 1,
      title: 'Quarterly',
      price: '799'
    },
    {
      id: 2,
      title: 'Yearly',
      price: '2999'
    }
  ];

  const pageCount = Math.ceil(data.freelevels.length / rewardPerPage);

  const handleNext = (e, type) => {
    e.preventDefault();
    if (type === 'Next') {
      setPageNumber(pageNumber + 1);
    } else {
      setPageNumber(pageNumber - 1);
    }
  };

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} profile={profile} />

      <LeftNav user={user} />

      <div className="main_middle battlepass_box">
        <div className="season_box">
          <div className="season_header">
            <div>
              <img src="/assets/media/logo-new.png" alt="" />
              <h1>{battlepass.title}</h1>
              <p>Ends in {daysLeft} day(s)</p>
            </div>
            <div>
              <img src="/assets/media/season/pass-btn.png" alt="" />

              <div className="buy_btn_box">
                {pricingMonthly.map((pM) => (
                  <>
                    <div className="buy_btn">
                      <p>{pM.title}</p>
                      <SubcriptionCard
                        user={user}
                        id={pM.id}
                        title={pM.title}
                        price={pM.price}
                      />
                    </div>
                  </>
                ))}
              </div>

              <ul>
                <li>Access to Multiplayr Premium Tournaments/Ladders.</li>
                <li>Access to unlimited number of tournaments</li>
                <li>Win amazing rewards, bonuses on every level. </li>
              </ul>
            </div>
          </div>

          <div className="left_season">
            <div className="top_raw">
              <div className="numbg_box">
                <span className="num_img"> {battlepass.level} </span>

                <span className="level"> {battlepass.level} /25 levels</span>
                <span className="numbg">
                  {battlepass.xp_points} / 4000 <b>XP</b>
                </span>
              </div>

              <div className="pages">
                {' '}
                page {pageNumber + 1}/{pageCount}
                <span>
                  {' '}
                  <button
                    className="btn"
                    disabled={pageNumber === 0 ? true : false}
                    onClick={(e) => handleNext(e, 'Prev')}
                  >
                    <i className="fa fa-chevron-left" aria-hidden="true" />
                  </button>
                </span>
                <span>
                  {' '}
                  <button
                    className="btn"
                    disabled={displayRewards.length < 5 ? true : false}
                    onClick={(e) => handleNext(e, 'Next')}
                  >
                    <i className="fa fa-chevron-right" aria-hidden="true" />
                  </button>
                </span>
              </div>
            </div>
            <div className="bottom_raw">
              <div className="left_two_box">
                <span className="free">
                  <b>Free</b>
                </span>
                <span className="battle">
                  <b>
                    BATTLE PASS{' '}
                    {battlepass.isBPUser ? (
                      <i className="fa fa-lock" aria-hidden="true"></i>
                    ) : (
                      <i className="fa fa-unlock-alt" aria-hidden="true"></i>
                    )}
                  </b>
                </span>
              </div>
              <div className="steps_box">
                <ul className="boxes">
                  {freelevels
                    .slice(rewardVisited, rewardVisited + rewardPerPage)
                    .map((display) => {
                      return display.reward.map((rwd,i) =>
                        rwd.rewardId.type === 'free' ? (
                          <RewardList key={i}
                            battlepass={battlepass}
                            rewards={battlepass.completed_rewards}
                            reward={rwd.rewardId}
                          />
                        ) : (
                          <li key={i}></li>
                        )
                      );
                    })}
                </ul>

                <ul className="step_line">
                  {displayLevels &&
                    displayLevels.map((lev,i) => (
                      <li key={i}
                        className={`${
                          lev._id <= battlepass?.level ? 'active' : ''
                        }`}
                      >
                        <span>{lev._id}</span>
                      </li>
                    ))}
                </ul>

                <ul className="boxes">
                  {paidlevels
                    .slice(rewardVisited, rewardVisited + rewardPerPage)
                    .map((display) => {
                      return display.reward.map((rwd,i) =>
                        rwd.rewardId.type === 'paid' ? (
                          <RewardList key={i}
                            battlepass={battlepass}
                            rewards={battlepass.completed_rewards}
                            reward={rwd.rewardId}
                          />
                        ) : (
                          <li key={i}></li>
                        )
                      );
                    })}
                </ul>
              </div>
            </div>
          </div>

          <div className="right_season">
            <h2>Tasks</h2>

            <ul className="profile_tab_btn three_nav">
              <li className="active">
                <a href="#!" rel="week1">
                  Week1
                </a>
              </li>
              <li className="">
                <a href="#!" rel="week2">
                  Week2
                </a>
              </li>
              <li className="">
                <a href="#!" rel="week3">
                  Week3
                </a>
              </li>
              <li className="">
                <a href="#!" rel="week4">
                  Week4
                </a>
              </li>
              <li className="">
                <a href="#!" rel="week5">
                  Week5
                </a>
              </li>
            </ul>

            <div className="prfoile_tab_data">
              <div className="tab " id="week1">
                <ul>
                  <TaskList
                    week="Week 1"
                    battlepass={bpData.battlepass}
                    user={user}
                  />
                </ul>
              </div>
              <div className="tab hide" id="week2">
                <TaskList
                  week="Week 2"
                  battlepass={bpData.battlepass}
                  user={user}
                />
              </div>
              <div className="tab hide" id="week3">
                <TaskList
                  week="Week 3"
                  battlepass={bpData.battlepass}
                  user={user}
                />
              </div>
              <div className="tab hide" id="week4">
                <TaskList
                  week="Week 4"
                  battlepass={bpData.battlepass}
                  user={user}
                />
              </div>
              <div className="tab hide" id="week5">
                <TaskList
                  week="Week 5"
                  battlepass={bpData.battlepass}
                  user={user}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};
export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  const response = await fetch(`${baseURL}/api/battlepass`, {
    method: 'GET',
    headers: {
      Authorization: token
    }
  });
  const data = await response.json();

  return {
    props: { data }
  };
};
export default Battlepass;
