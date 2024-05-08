import React, { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import baseURL from '@utils/baseURL';
import axios from 'axios';

const PostChallenge = ({ games, teams }) => {
  const [gotMaps, setGotMaps] = useState([]);
  const [state, setState] = useState({
    ChallType: 'Solo',
    User_team: '',
    game: '',
    players: '',
    opponent_team: null,
    startDate: '',
    startTime: '',
    format: '',
    entry_fee: null,
    challengeType: '',
    isOpenMatch: true,
    maps: ''
  });

  const UserTeam = teams.filter((team) => {
    return team._id === parseInt(state.User_team);
  });

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

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

  useEffect(() => {
    axios
      .get(`${baseURL}/api/maps/${state.game[0]}`)
      .then((res) => setGotMaps(res.data));
  }, [state.game]);

  const handleEditStat = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${baseURL}/api/challenges/postchallenge/create`,
        state,
        {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success('The Challenge Has Been Sent');
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };
  const handleChangeCheck = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div>
        <a href="#!" className="model_show_btn btn">
          <i className="fa fa-plus-circle" aria-hidden="true"></i> Post
          Challenge
        </a>

        <div className="common_model_box post_chllang" id="big_poup">
          <a href="#!" className="model_close">
            X
          </a>

          <div className="inner_model_box">
            <h3>Post a Challenge</h3>

            <form className="common_form" onSubmit={handleEditStat}>
              <div className="btn_selection">
                <div className="big_btn">
                  <span className="form-check-label terms">Solo</span>
                  <input
                    type="radio"
                    name="ChallType"
                    value="Solo"
                    onChange={handleChangeCheck}
                  />
                </div>

                <div className="big_btn">
                  <span className="form-check-label terms">Team</span>
                  <input
                    type="radio"
                    name="ChallType"
                    value="Team"
                    onChange={handleChangeCheck}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="">Format</label>
                <select name="format" onChange={onChange}>
                  <option value="">Choose Format...</option>
                  <option value="Best of 3">Best of 3</option>
                  <option value="Best of 5">Best of 5</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="">Maps</label>
                <select name="maps" onChange={onChange}>
                  <option value="">Choose Map...</option>
                  {gotMaps &&
                    gotMaps.map((map,i) => (
                      <option value={map._id} key={i}>{map.name}</option>
                    ))}
                </select>
              </div>

              {state.ChallType === 'Team' ? (
                <>
                  <div className="form-group">
                    <label> Choose your Team</label>
                    <select
                      name="User_team"
                      id="teamselect"
                      onChange={onChange}
                    >
                      <option value="">Choose your Team...</option>
                      {teams.map((team, idtx) => (
                        <option value={team._id} key={idtx}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Choose a game</label>
                    <select name="game" id="game" onChange={onChange}>
                      <option value="">Choose a game...</option>
                      {UserTeam &&
                        UserTeam[0]?.games.map((game,i) => (
                          <option value={game.gameId._id} key={i}>
                            {game.gameId.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </>
              ) : state.ChallType === 'Solo' ? (
                <div className="form-group">
                  <label>Choose a game</label>
                  <select name="game" id="game" onChange={onChange}>
                    <option value="">Choose a game...</option>
                    {games &&
                      games.map((game,i) => (
                        <option key={i} value={game._id}>{game.name}</option>
                      ))}
                  </select>
                </div>
              ) : null}

              <div className="form-group">
                <label htmlFor="">Challenge Type</label>
                <select name="challengeType" onChange={onChange}>
                  <option value="">Choose Challenge Type...</option>
                  <option value="Team Deathmatch">Team Deathmatch</option>
                  <option value="Deathmatch">Deathmatch</option>
                  <option value="Domination">Domination</option>
                </select>
              </div>
              <div className="form-group">
                <label> &nbsp; </label>
                <input
                  type="text"
                  onChange={onChange}
                  value={state.entry_fee}
                  name="entry_fee"
                  placeholder="Enter fees"
                />
              </div>

              <div className="form-group">
                <label> &nbsp; </label>
                <input
                  type="time"
                  name="startTime"
                  onChange={onChange}
                  value={state.startTime}
                />
              </div>
              <div className="form-group">
                <label> &nbsp; </label>
                <input
                  type="date"
                  onChange={onChange}
                  name="startDate"
                  value={state.startDate}
                />
              </div>

              <button className="btn" type="submit">
                Submit
              </button>
            </form>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default PostChallenge;
