import React, { useState, useEffect, useContext } from 'react';
import Moment from 'moment';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { profileTeam } from '../../utils/valid';
import ProfileRigsDelete from './ProfileRigsDelete';
import { DataContext } from '@store/GlobalState';

const ProfileTeams = ({ Userdata, user, teamsData, allGames, teamroles }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [teamNameIndicator, setTeamNameIndicator] = useState(false);
  const router = useRouter();
  const { setLoader } = useContext(DataContext);

  const refreshData = () => {
    // router.replace(router.asPath);
    router.reload();
  };

  useEffect(() => {
   const fetData= async()=> { await axios.get(`${baseURL}/api/all/teams`).then((res) => setAllTeams(res.data));};
   fetData();
  }, []);

  const [team, setTeam] = useState({
    teamId: null,
    game: '',
    role: '',
    teamStartDate: '',
    teamEndDate: ''
  });

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = allTeams?.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSelected = (data) => {
    setSearchText(data.name);
    team.teamId = data._id;
    setFilteredData([]);
  };

  function handleAddTeam(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setTeam({ ...team, [e.target.name]: value });
    } else if (e.target.files) {
      setTeam({ ...team, [e.target.name]: e.target.files[0] });
    } else {
      setTeam({ ...team, [e.target.name]: e.target.value });
    }
  }

  const onChange = (e) => {
    setTeam({ ...team, [e.target.name]: e.target.value });
  };

  const handleAddTeamSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);

    console.log("setAllTeams \t\t",allTeams );
    const teamExists = allTeams.some(team => team.name === searchText);

    // if (teamExists){
    //   setTeamNameIndicator(false);
    //   // console.log(" correct pass in list \t\t",searchText );
      

    // }else{
      // console.log(" Not in list \t\t",searchText );
      setTeamNameIndicator(true);
      // setLoader(false);
    //   return;
    // }

    const errors = profileTeam(team);
    setFormErrors(errors);

    if (Object.keys(formErrors).length === 0) {
      try {
        axios.post(`${baseURL}/api/profile/team/${Userdata?._id}`, team);
        toast.success('Added Team Successfully');
        $('a.model_close').parent().removeClass('show_model');
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
      setLoader(false);
      refreshData();
    }
  };

  return (
    <>
      <div className="tab hide" id="teams">
        <div className="sponser_btn">
          {' '}
          {Userdata?.user?._id === user?._id ? (
            <a href="#!" className="model_show_btn">
              <button className="btn">
                {' '}
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                Add Team
              </button>
            </a>
          ) : null}
          <div className="common_model_box add_tourn" id="big_poup">
            {' '}
            <a href="#!" className="model_close">
              {' '}
              X{' '}
            </a>
            <div className="inner_model_box">
              <h3>Team</h3>
              <form className="common_form" onSubmit={handleAddTeamSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Team</label>
                  <input
                    type="search"
                    id="team"
                    name="team"
                    placeholder="Enter Team Name"
                    value={searchText}
                    onChange={handleFilter}
                    autoComplete="off"
                    required
                  />
                  {/* { teamNameIndicator && (
                            <small className="text-xs text-red-600">
                              {' '}
                              This Team is invalid or not available{' '}
                            </small>
                          )} */}
                  {searchText?.length !== 0 ? (
                    <>
                      {filteredData?.length > 0 ? (
                        <>
                          <div className="custom-rig-tag">
                            <div className="rigs_items">
                              {!filteredData || filteredData.length === 0 ? (
                                <p>No Team found..</p>
                              ) : (
                                filteredData.map((data) => (
                                  <div
                                    onClick={() => handleSelected(data)}
                                    key={data?._id}
                                    className="items"
                                  >
                                    <span>
                                      <img
                                        src={data?.imgUrl}
                                        height={50}
                                        width={50}
                                      />
                                    </span>
                                    <p>
                                      {data?.name?.length > 20
                                        ? data?.name.substring(0, 20) + '...'
                                        : data?.name}
                                    </p>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>
                        </>
                      ) : null}
                    </>
                  ) : null}
                  <p>{formErrors?.team}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Games</label>

                  <select
                    className="form-control game_search_result"
                    multiple={true}
                    name="game"
                    value={team.game}
                    onChange={handleAddTeam}
                  >
                    {allGames &&
                      allGames.map((game, idx) => (
                        <option key={idx} value={game._id}>
                          {' '}
                          {game.name}{' '}
                        </option>
                      ))}
                  </select>
                  <p>{formErrors.game}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Roles</label>
                  <select
                    name="role"
                    className="form-control"
                    onChange={onChange}
                    value={team.role}
                  >
                    <option value="">Select Role...</option>
                    {teamroles &&
                      teamroles.map((tr, idx) => (
                        <option key={idx} value={tr}>
                          {tr}
                        </option>
                      ))}
                  </select>
                  <p>{formErrors.role}</p>
                </div>

                <div className="edit_two">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Start Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Start Date"
                      name="teamStartDate"
                      onChange={handleAddTeam}
                      value={team.teamStartDate}
                    />
                    <p>{formErrors.teamStartDate}</p>
                  </div>

                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">End Date</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="End Date"
                      name="teamEndDate"
                      onChange={handleAddTeam}
                      value={team.teamEndDate}
                    />
                    <p>{formErrors.teamEndDate}</p>
                  </div>
                  <button className="btn" type="submit">
                    Update
                  </button>
                </div>
              </form>
            </div>
            <div className="overlay"></div>
          </div>
        </div>
        <div>
          <ul className="stats_card stats_team">
            {teamsData && teamsData?.length === 0 ? (
              <p>{Userdata?.user?.name} has no teams.</p>
            ) : (
              teamsData &&
              teamsData.map((team, i) => (
                <li key={i}>
                  <div className="card_img">
                    {' '}
                    <img src={team?.team?.imgUrl} alt="" />{' '}
                  </div>
                  <div className="right_data">
                    <div className="card_games_tit">
                      <h3>
                        <a href={`/team/${team?.team?._id}`}>
                          Team {team?.team?.name} <br />{' '}
                        </a>
                        {Moment(team?.team?.founded).format('MMM YYYY')}
                      </h3>
                      <div className="gamer_pos">
                        <b>Captain</b> | <b>Assault</b>
                      </div>
                    </div>
                    <div className="card_details">
                      <div className="once">
                        <p>kills avg</p>
                        <span className="big_name"> -- </span>{' '}
                      </div>
                      <div className="once">
                        <p>KnockDowns avg</p>
                        <span className="big_name"> -- </span>{' '}
                      </div>
                      <div className="once">
                        <p>Damage Dealt avg</p>
                        <span className="big_name"> -- </span>{' '}
                      </div>
                      <div className="once">
                        <p>Win Rate</p>
                        <span className="big_name"> -- </span>{' '}
                      </div>
                    </div>
                  </div>
                  {team.type === 'ProfileTeam' ? (
                    <ProfileRigsDelete
                      type="ProfileTeamDel"
                      teamId={team?.team?._id}
                      profile={Userdata}
                      user={user}
                    />
                  ) : null}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default ProfileTeams;
