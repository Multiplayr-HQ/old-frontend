import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import Matches from '../team/Matches';

const BracketCard = ({ tournaments, user }) => {
  const [trigger, setTrigger] = useState(true);
  const [steps, setSteps] = useState({
    step1: true,
    step2: false
  });
  const [tabData, setTabData] = useState([]);
  const [matchesTrigger, setMatchesTrigger] = useState(true);

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, [trigger]);

  const handleShuffleMatches = async (tourId) => {
    try {
      axios
        .get(`${baseURL}/api/admin/shuffle/${tourId}`, tabData)
        .then((res) => setTabData(res.data));
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const handleTabs = async (Type, tourId) => {
    if (Type === 'SEED') {
      setSteps({ ...steps, step1: true, step2: false });
    } else {
      setSteps({ ...steps, step1: false, step2: true });
    }
    await axios
      .get(`${baseURL}/api/admin/bracketData/${Type}/${tourId}`, {
        headers: {
          Authorization: Cookies.get('token')
        }
      })
      .then((res) => {
        setTabData(res.data.data),
          setMatchesTrigger(res.data.isMatchPlayersSet);
      });
  };

  const handleMatchesData = async (tourId, data) => {
    console.log(data);
    await axios
      .put(`${baseURL}/api/admin/setMatchesWithPlayers/${tourId}`, data)
      .then((res) => {
        setTabData(res.data.matches),
          setMatchesTrigger(res.data.isMatchPlayersSet);
      });
  };

  return (
    <>
      {tournaments && tournaments.length === 0 ? (
        <p>No data</p>
      ) : (
        tournaments.map((tour,i) => (
          <li key={i}>
            <div className="row1">
              <div className="card_img">
                <div className="img">
                  <img
                    src={tour ? tour.imgUrl : null}
                    alt={tour ? tour.name : null}
                  />
                </div>
                <a href={`/tour/${tour?.name}`}>{tour ? tour.name : null}</a>
              </div>
            </div>
            <div className="row1">
              <span>
                <b>ApplyDate:</b>
                {/* {Moment(tour.applyDate).format('DD MMM YYYY')} */}
              </span>

              <span>
                <b>PlayType</b>
                <p>{tour ? tour.playType : null}</p>
              </span>
            </div>
            <div className="row1">
              <div className="loc_box edit_pof">
                <a
                  href="#!"
                  className="model_show_btn btn"
                  onClick={() => setTrigger(!trigger)}
                >
                  View Match Details
                </a>

                <div className="common_model_box edit_profile" id="big_poup">
                  <a href="#!" className="model_close">
                    X
                  </a>
                  <div className="inner_model_box">
                    <div className="add_job_height">
                      <h3>{tour ? tour.name : null} Matches</h3>

                      <ul className="profile_tab_btn">
                        <li>
                          <a
                            href="#!"
                            className="active"
                            onClick={() => handleTabs('SEED', tour._id)}
                            rel="feed"
                          >
                            Seeds
                          </a>
                        </li>
                        <li>
                          <a
                            href="#!"
                            className="active"
                            rel="teams"
                            onClick={() => handleTabs('MATCHES', tour._id)}
                          >
                            Matches
                          </a>
                        </li>
                      </ul>

                      <div className="prfoile_tab_data">
                        {steps.step2 ? (
                          <>
                            <Matches
                              teamMatches={tabData}
                              isMatchPlayersSet={matchesTrigger}
                            />
                          </>
                        ) : null}

                        {steps.step1 ? (
                          <>
                            {tabData.length > 0 &&
                              tabData.map((data) => (
                                <>
                                  <img
                                    style={{ height: '50px', width: '50px' }}
                                    src={
                                      data?.teamId
                                        ? data?.teamId?.imgUrl
                                        : data?.user?.profilePicUrl
                                    }
                                    alt={data?.name}
                                  />
                                  <p>
                                    {data?.teamId
                                      ? data?.teamId?.name
                                      : data?.user?.name}
                                  </p>
                                </>
                              ))}
                            <button
                              className="btn"
                              style={{ marginBottom: '10px' }}
                              onClick={() => handleShuffleMatches(tour?._id)}
                            >
                              Shuffle Seeds
                            </button>
                            <button
                              className="btn"
                              style={{ marginBottom: '10px' }}
                              onClick={() =>
                                handleMatchesData(tour?._id, tabData)
                              }
                            >
                              Update Matches
                            </button>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="overlay"></div>
              </div>
            </div>
          </li>
        ))
      )}
    </>
  );
};

export default BracketCard;
