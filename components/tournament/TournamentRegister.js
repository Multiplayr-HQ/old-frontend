import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';
import axios from 'axios';
import Moment from 'moment';

const Tournament_Reg = ({ user, tournament, profile, teams }) => {
  const [isGamePlayer, setIsGamePlayer] = useState();
  const [trigger, setTrigger] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState({
    teamId: '',
    type: '',
    user: user._id
  });

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, [trigger]);

  const isRegistered =
    tournament?.registered?.filter((tour) => {
      return tour?.user?._id === user?._id;
    }).length > 0;

  const isTeamRegistered =
    tournament?.teams?.filter((team) => {
      return team?.teamId?._id === profile?.current_team?._id;
    }).length > 0;

  const isRegFull = tournament?.registered?.length === tournament?.participants;

  const isTeamRegFull = tournament?.numberOfTeam === tournament?.teams?.length;

  const handleChange = (e, type) => {
    e.preventDefault();
    if (type === 'REG') {
      setSelectedTeam({ ...selectedTeam, teamId: e.target.value, type });
    } else {
      setSelectedTeam({ ...selectedTeam, teamId: e.target.value, type });
    }
  };

  const reghandlesubmit = async (e) => {
    e.preventDefault();
    try {
      if (tournament.playType === 'SOLO') {
        axios
          .put(
            `${baseURL}/api/tournaments/register/${tournament._id}/${user._id}`
          )
          .then((res) => {
            if (res.data === false) {
              toast.warning(
                `Please connect ${tournament.games[0].gameId.name} to your profile.`
              );
            } else {
              if (isRegistered === false) {
                toast.success('Registered Successfully');
              } else {
                toast.success('Left Tournament');
              }
            }
          });
      } else {
        axios
          .put(
            `${baseURL}/api/tournaments/register/team/${tournament._id}/new`,
            { selectedTeam }
          )
          .then((res) =>
            res.data.msg === 'Registered Successfully' ||
            res.data.msg === 'Left the Tournament'
              ? toast.success(res.data.msg)
              : toast.warning(res.data.msg)
          );
        $('a.model_close').parent().removeClass('show_model');
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <>
      {tournament?.playType === 'TEAMS' ? (
        <>
          {isTeamRegistered ? (
            <>
              <div className="loc_box edit_pof">
                {Moment(tournament.startDate).isBefore() ? null : (
                  <a
                    href="#!"
                    className="model_show_btn btn"
                    onClick={() => setTrigger(!trigger)}
                  >
                    REGISTERED
                  </a>
                )}
                <div className="common_model_box" id="big_poup">
                  <a href="#!" className="model_close">
                    X
                  </a>
                  <div className="inner_model_box">
                    <div className="add_job_height">
                      <h3>Unregister a team</h3>
                      <form className="common_form">
                        <div className="colm rows">
                          <label htmlFor="exampleFormControlInput1">
                            Your Teams
                          </label>
                          <select
                            name="selectedTeam"
                            value={selectedTeam.teamId}
                            onChange={(e) => handleChange(e, 'UNREG')}
                          >
                            <option value="--">--</option>
                            {teams &&
                              teams.map((tem,i) => (
                                <option key={i} value={tem._id}>{tem.name}</option>
                              ))}
                          </select>
                          <button className="btn" onClick={reghandlesubmit}>
                            Confirm
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="overlay"></div>
                </div>
              </div>
            </>
          ) : (
            <>
              {isTeamRegFull !== true ? (
                <>
                  <div className="loc_box edit_pof">
                    {Moment(tournament.startDate).isBefore() ? null : (
                      <a
                        href="#!"
                        className="model_show_btn btn"
                        onClick={() => setTrigger(!trigger)}
                      >
                        Register
                      </a>
                    )}
                    <div className="common_model_box" id="big_poup">
                      <a href="#!" className="model_close">
                        X
                      </a>
                      <div className="inner_model_box">
                        <div className="add_job_height">
                          <h3>Register</h3>
                          <form className="common_form">
                            <div className="colm rows">
                              <label htmlFor="exampleFormControlInput1">
                                Your Teams
                              </label>
                              <select
                                name="selectedTeam"
                                value={selectedTeam.teamId}
                                onChange={(e) => handleChange(e, 'REG')}
                              >
                                <option value="--">--</option>
                                {teams &&
                                  teams.map((tem,i) => (
                                    <option key={i} value={tem._id}>{tem.name}</option>
                                  ))}
                              </select>
                              <button className="btn" onClick={reghandlesubmit}>
                                Confirm
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                      <div className="overlay"></div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <button disabled={true}>Slots Unavailable</button>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {isRegistered ? (
            <>
              <button className="join" onClick={reghandlesubmit}>
                REGISTERED
              </button>
            </>
          ) : (
            <>
              {isRegFull !== true ? (
                <>
                  {Moment(tournament.startDate).isBefore() ? null : (
                    <button onClick={reghandlesubmit} className="join">
                      REGISTER
                    </button>
                  )}
                </>
              ) : (
                <>
                  <button disabled={true}>Slots Unavailable</button>
                </>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Tournament_Reg;
