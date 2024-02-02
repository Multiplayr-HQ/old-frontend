import baseURL from '@utils/baseURL';
import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { teamsquadformvalidate } from '@utils/valid';
import countryList from 'react-select-country-list';
import { useRouter } from 'next/router';

const TeamSquadEdit = ({
  squad,
  isManager,
  isAdmin,
  isOwner,
  isCEO,
  isSupportAdmin
}) => {
  const [editSquadData, setEditSquadData] = useState({
    game: squad.game?._id,
    country: squad.country,
    players: squad.players.map((plr) => plr.player)
  });

  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();
  const options = useMemo(() => countryList().getData(), []);
  const [games, setGames] = useState([]);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    //Games
    axios.get(`${baseURL}/api/all/games`).then((res) => setGames(res.data));
  }, []);

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
      setEditSquadData({ ...editSquadData, [e.target.name]: value });
    } else if (e.target.files) {
      console.log(e.target.files[0]);
      setEditSquadData({
        ...editSquadData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setEditSquadData({ ...editSquadData, [e.target.name]: e.target.value });
    }
  }

  const handleEditStat = async (e) => {
    e.preventDefault();

    if (Object.keys(formErrors).length === 0) {
      try {
        await axios.patch(`${baseURL}/api/squads/${squad._id}`, editSquadData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        toast.success('The Record has been Updated.');
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
      $('a.model_close').parent().removeClass('show_model');
      refreshData();
    } else {
      toast.error('All fields are required.');
    }
  };

  return (
    <div className="sqd_edit_btn">
      {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? (
        <a href="#!" className="model_show_btn btn">
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </a>
      ) : null}
      <div className="common_model_box">
        <a href="#!" className="model_close">
          X
        </a>

        <div className="inner_model_box">
          <h3>Edit A Squad</h3>

          <form className="common_form" onSubmit={handleEditStat}>
            <div className="colm rows">
              <select
                className="form-control text-capitalize"
                multiple={false}
                name="game"
                id="game"
                value={editSquadData.game}
                onChange={onChange}
              >
                <option value="">Select Game...</option>
                {games.map((game, idx) => (
                  <option key={idx} value={game._id}>
                    {game.name}
                  </option>
                ))}
              </select>
              <p>{formErrors.game}</p>
            </div>
            <div className="colm rows">
              <select
                name="country"
                value={editSquadData.country}
                id=""
                onChange={onChange}
              >
                <option value="">Select Country...</option>
                {options.map((opt) => (
                  <>
                    <option value={opt.value}>{opt.label}</option>
                  </>
                ))}
              </select>
            </div>
            <select
              className="custom-select text-capitalize"
              multiple={true}
              name="players"
              value={editSquadData.players}
              onChange={onChange}
            >
              {editSquadData.players &&
                editSquadData.players.map((ply, idx) => (
                  <option key={idx} value={ply?._id}>
                    {' '}
                    {ply?.apidata?.data?.platformInfo
                      ? ply.apidata.data?.platformInfo.platformUserIdentifier
                      : ply?.user?.name}{' '}
                  </option>
                ))}
            </select>
            <p>{formErrors.players}</p>
            <button
              onClick={() =>
                setFormErrors(teamsquadformvalidate(editSquadData))
              }
              className="btn"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default TeamSquadEdit;
