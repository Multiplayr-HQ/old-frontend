import axios from 'axios';
import React, { useState } from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';

const TeamChallenge = ({ teams, team }) => {
  const [state, setState] = useState({
    User_team: '',
    game: '',
    players: '',
    opponent_team: team._id,
    startDate: '',
    startTime: '',
    format: '',
    entry_fee: null,
    challengeType: '',
    isOpenMatch: false,
    ChallType: 'Team'
  });

  function onChange(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setState({ ...state, [e.target.name]: value });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  const User_team = teams.filter((team) => {
    return team._id === parseInt(state.User_team);
  });

  var commonGames = User_team[0]?.games.filter(function (val1) {
    return team.games.some(function (val2) {
      return val1.gameId._id === val2.gameId;
    });
  });

  var specialPlayers = User_team[0]?.players.filter(function (val1) {
    return val1?.playerId.game === Number(state.game[0]);
  });

  const handleEditStat = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/api/challenges/create`, state, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'application/json'
        }
      });
      toast.success('The Challenge Has Been Sent');
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <>
      <a href="#!" className="model_show_btn btn">
        Challenge
      </a>
      <div className="common_model_box team_chal" id="big_poup">
        <a href="#!" className="model_close btn">
          X
        </a>

        <div className="inner_model_box">
          <div className="add_job_height">
            <h3>Challenge {team.name}</h3>

            <form onSubmit={handleEditStat} className="common_form">
              <div className="form-group">
                <select
                  name="User_team"
                  className="form-control"
                  id="teamselect"
                  onChange={onChange}
                >
                  <option value="">Select Your Team...</option>
                  {teams.map((team,i) => (
                    <option key={i} value={team._id}>{team.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <select
                  name="game"
                  id="game"
                  className="form-control"
                  onChange={onChange}
                >
                  <option value="">Select Game...</option>
                  {commonGames?.length === 0 ? (
                    <option value="">
                      No games available between the teams.
                    </option>
                  ) : (
                    commonGames?.map((cG,i) => (
                      <option key={i} value={cG.gameId?._id}>{cG.gameId?.name}</option>
                    ))
                  )}
                </select>
              </div>

              <div className="form-group">
                <select
                  name="players"
                  id="players"
                  className="form-control"
                  multiple
                  onChange={onChange}
                >
                  {specialPlayers && specialPlayers.length === 0 ? (
                    <option value="">No Common Players.</option>
                  ) : (
                    specialPlayers?.map((plyr,i) => (
                      <option key={i} value={plyr?.playerId?._id}>
                        {plyr.playerId?.apidata
                          ? plyr.playerId.apidata.data.platformInfo
                              .platformUserHandle
                          : plyr.playerId?.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="form-group">
                <select
                  name="format"
                  className="form-control"
                  onChange={onChange}
                >
                  <option value="">Choose the challenge format...</option>
                  <option value="Best of 3">Best of 3</option>
                  <option value="Best of 5">Best of 5</option>
                </select>
              </div>
              <div className="form-group">
                <select
                  name="challengeType"
                  className="form-control"
                  onChange={onChange}
                >
                  <option value="">Choose challenge type...</option>
                  <option value="Team Deathmatch">Team Deathmatch</option>
                  <option value="Deathmatch">Deathmatch</option>
                  <option value="Domination">Domination</option>
                </select>
              </div>
              <div className="form-group">
                <input
                  type="text"
                  onChange={onChange}
                  value={state.entry_fee}
                  name="entry_fee"
                  placeholder="Enter fees"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="date"
                  onChange={onChange}
                  name="startDate"
                  value={state.startDate}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <input
                  type="time"
                  name="startTime"
                  onChange={onChange}
                  value={state.startTime}
                  className="form-control"
                />
              </div>
              <button className="btn" type="submit">
                Done
              </button>
            </form>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    </>
  );
};

export default TeamChallenge;
