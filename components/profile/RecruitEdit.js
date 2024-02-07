import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react';
import baseURL from '../../utils/baseURL';
import countryList from 'react-select-country-list';
import { toast } from 'react-toastify';
import { regionsData } from '../../utils/functionsHelper';
import { LanguageData } from '../../utils/functionsHelper';
import ToggleButton from 'react-toggle-button';
import {useRouter } from 'next/router';

const RecruitEdit = ({ attributeData, profile }) => {
  const [allgames, setAllgames] = useState([]);
  const [states, setStates] = useState({
    games: attributeData.games[0]?.gameId?._id,
    role: attributeData.role[0],
    regions: attributeData.regions,
    Mic: attributeData.mic || false,
    language: attributeData.language,
    type: attributeData.type,
    salary: attributeData.salary,
    rank: attributeData?.rank,
    platform: attributeData.platform,
    gender: attributeData?.gender
  });
  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    axios.get(`${baseURL}/api/all/games`).then((res) => setAllgames(res.data));
  }, []);

  function handleSubmit(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setStates({ ...states, [e.target.name]: value });
    } else if (e.target.files) {
      console.log(e.target.files[0]);
      setStates({ ...states, [e.target.name]: e.target.files[0] });
    } else {
      setStates({ ...states, [e.target.name]: e.target.value });
    }
  }

  const onChange = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

  const router= useRouter();

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${baseURL}/api/attribute/${attributeData.attributeId}`,
        states
      );
      router.reload();
      
      toast.success('Recruitment card Edited Successfully');
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  $('a.model_show_btn').click(function () {
    $(this).next().addClass('show_model');
  });

  $('a.model_close').click(function () {
    $(this).parent().removeClass('show_model');
  });

  return (
    <>
      <a href="#!" className="model_show_btn">
        <button className="btn">
          <i className="fa fa-pencil" aria-hidden="true"></i>
        </button>
      </a>

      <div className="common_model_box edit_profile" id="big_poup">
        <a href="#!" className="model_close">
          X
        </a>
        <div className="inner_model_box">
          <div className="add_job_height">
            <h3>Edit recruitement Card</h3>
            <form onSubmit={handleEdit} className="common_form">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Game</label>
                <select
                  name="games"
                  id="games"
                  value={states.games}
                  onChange={onChange}
                  className="form-control"
                >
                  <option value="">Select Game</option>
                  {allgames.map((game,i) => (
                    <option key={i} value={game?._id}>{game.name}</option>
                  ))}
                </select>
              </div>

              <div className="edit_four">
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Platform</label>
                  <select
                    id="platform"
                    name="platform"
                    onChange={onChange}
                    value={states.platform}
                    className="form-control text-capitalize"
                  >
                    <option value="">Select Platform...</option>
                    <option value="PC">PC</option>
                    <option value="Console">Console</option>
                    <option value="Mobile">Mobile</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Role</label>
                  <select
                    name="role"
                    onChange={onChange}
                    value={states.role}
                    multiple={false}
                    className="form-control"
                  >
                    <option value="">Select Role...</option>
                    <option value="Sniper">Sniper</option>
                    <option value="AR">AR</option>
                    <option value="Shotgun">Shotgun</option>
                    <option value="Pistol">Pistol</option>
                    <option value="Marksman Rifle">Marksman Rifle</option>
                    <option value="SMGs">SMGs</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Region</label>
                  <select
                    name="regions"
                    onChange={onChange}
                    className="form-control"
                    value={states.regions}
                  >
                    <option value="">Select Region</option>
                    {regionsData &&
                      regionsData.map((role,i) => (
                        <option key={i} value={role}>{role}</option>
                      ))}
                  </select>
                </div>

                {attributeData.attributeType === 'PROFILE' ? (
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Gender</label>
                    <select
                      name="gender"
                      onChange={onChange}
                      disabled={true}
                      value={profile}
                    >
                      <option value={profile}>{profile}</option>
                    </select>{' '}
                  </div>
                ) : (
                  <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Gender</label>
                    <select
                      name="gender"
                      onChange={onChange}
                      className="form-control"
                      value={states.gender}
                    >
                      <option value="">Select Gender...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                )}
              </div>
              <div className="form-group">
                <div className="custom-control custom-switch">
                  <label>Mic</label>
                  <ToggleButton
                    value={states.Mic || false}
                    onToggle={(value) => {
                      setStates({ ...states, Mic: !value });
                    }}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Language</label>
                <select
                  name="language"
                  onChange={handleSubmit}
                  multiple={true}
                  value={states.language}
                  className="form-control"
                >
                  {LanguageData &&
                    LanguageData.map((lang,i) => (
                      <option  key={i} value={lang}>{lang}</option>
                    ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Type</label>
                <select
                  id="type"
                  name="type"
                  onChange={onChange}
                  value={states.type}
                  className="form-control"
                >
                  <option value="">Select Game Type</option>
                  <option value="Casual">Casual</option>
                  <option value="SemiPro">SemiPro</option>
                  <option value="Pro">Pro</option>
                  <option value="Gunman">Gunman</option>
                  <option value="Local Lan">Local Lan</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">Salary</label>
                <select
                  name="salary"
                  id="salary"
                  value={states.salary}
                  onChange={onChange}
                  className="form-control"
                >
                  <option value="">Select Salary</option>
                  <option value="Unpaid">Unpaid</option>
                  <option value="Paid">Paid</option>
                  <option value="prize_sharing">Prize money Sharing</option>
                </select>
              </div>
              {attributeData.attributeType === 'TEAM' ? (
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Minimum rank</label>
                  <input
                    type="text"
                    name="rank"
                    onChange={onChange}
                    value={states.rank}
                    className="form-control"
                  />
                </div>
              ) : null}

              <input className="btn" type="submit" value="Confirm" />
            </form>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    </>
  );
};

export default RecruitEdit;
