import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import SocialLink from '../common/SocialLink';
import { profileformvalidate } from '@utils/valid';
import Moment from 'moment';
import ToggleButton from 'react-toggle-button';
import { DataContext } from '@store/GlobalState';


const ProfileEdit = ({ Userdata, user, games, allteams }) => {
  const { setLoader } = useContext(DataContext);

  const name = user.name.split(' ');
  const [allroles, setAllroles] = useState([]);
  const [profile, setProfile] = useState(Userdata);
  const [step1, setStep1] = useState(true);
  const [showGameBox, setShowGameBox] = useState(true);
  const [selectedGame, setSelectedGame] = useState();
  const [openForm, setOpenForm] = useState(false);
  const [type, setType] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [trigger, setTrigger] = useState(false);

  const router = useRouter();





  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [states, setStates] = useState({
    profileType: 'Gamer',
    firstName: name[0],
    lastName: name[1],
    username: user.username,
    bio: profile.bio,
    Online: profile?.online_status || false,
    team: profile?.current_team || '',
    role: profile?.headline?.inGameRole,
    b_role: profile?.headline?.business_role,
    startDate: Moment(profile?.headline.startDate).format('yyyy-MM-DD') || '',
    game: profile?.headline?.game?._id,
    company: profile?.headline?.company,
    industry: profile?.headline?.industry,
    link: profile?.headline?.link,
    streamingPlatform: profile?.headline?.streamingPlatform,
    facebook: profile.social?.facebook || '',
    instagram: profile.social?.instagram || '',
    twitch: profile.social?.twitch || '',
    youtube: profile.social?.youtube || '',
    discord: profile.social?.discord || '',
    website: profile.social?.website || '',
    gameId: selectedGame?.game._id,
    userIgn: ''
  });

  const handleOnline = () => {
    if (states.Online === true) {
      states.Online = false;
    } else {
      states.Online = true;
    }
  };

  const handleSelectGame = async (obj) => {
    setStates({ ...states, gameId: obj._id });
    setStep1(false);
  };
  const handleopenForm = async (data) => {
    setOpenForm(true);
    setType(data);
  };
  const handleRoleForm = (e) => {
    setOpenForm(true);
    setType('');
  };

  const gamehandleSubmit = async (e) => {
    setShowGameBox(true);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/teamroles`)
      .then((res) => setAllroles(res.data));
  }, []);


  const handleChangeCheck = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

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




  const handleProfileEdit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors)?.length === 0) {
      try {
        setLoader(true);
        await axios.put(`${baseURL}/api/profile/type/${profile?._id}`, states);
        console.log(states, "/n here is my profile id", profile._id)
        // router.reload();
        // ;refreshData();
        toast.success('Profile Updated');


        $('a.model_close').trigger("click");
        setLoader(false);


      } catch (err) {

        toast.error(err.response?.data?.msg || 'An error occurred, please try again.');
      }
    } else {

      toast.error('Please correct the errors in the form.');
    }
  };


  // const handleProfileEdit = async (e) => {
  //   e.preventDefault();
  //   if (Object.keys(formErrors).length === 0) {
  //     try {
  //       await axios.put(`${baseURL}/api/profile/type/${profile?._id}`, states);
  //       toast.success('Profile Updated');
  //       $('a.model_close').parent().removeClass('show_model');
  //       // router.push(`/dashboard`);
  //       // refreshData();
  //       router.reload();
  //     } catch (err) {
  //       toast.error(err.response?.data?.msg || 'Please recheck your inputs');
  //     }
  //   }
  // };


  const User_team =
    allteams &&
    allteams.filter((tem) => {
      return tem.team?._id === parseInt(states.team);
    });

  const addgames =
    games &&
    games.filter(
      ({ _id }) => !profile.playergames.some((x) => x.game?._id == _id)
    );

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [teamData, setTeamData] = useState([]);

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = teamData?.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSelectedTeam = (data) => {
    setSearchText(data.name);
    states.team = data._id;
    setFilteredData([]);
  };

  useEffect(() => {
    axios.get(`${baseURL}/api/all/teams/`).then((res) => setTeamData(res.data));
  }, []);

  console.log("filter data profile",filteredData);

  return (
    <>
      <div className="loc_box edit_pof">
        {profile.user._id === user._id ? (
          <a href="#!" className="model_show_btn">
            <button className="btn">
              {' '}
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
              Profile Edit
            </button>
          </a>
        ) : null}
        <div className="common_model_box edit_profile" id="big_poup">
          <a href="#!" className="model_close">
            X
          </a>
          <div className="inner_model_box">
            <div className="add_job_height">
              <h3>Profile Edit</h3>
              <form className="common_form" onSubmit={handleProfileEdit}>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">
                    Profile Category
                  </label>
                  <div className="btn_selection">
                    <div className="big_btn">
                      <span className="form-check-label terms">Gamer</span>
                      <input
                        type="radio"
                        name="profileType"
                        value="Gamer"
                        onChange={handleChangeCheck}
                      />
                    </div>

                    <div className="big_btn">
                      <span className="form-check-label terms">Coach</span>
                      <input
                        type="radio"
                        name="profileType"
                        value="Coach"
                        onChange={handleChangeCheck}
                      />
                    </div>

                    <div className="big_btn">
                      <span className="form-check-label terms">Streamer</span>
                      <input
                        type="radio"
                        name="profileType"
                        value="Streamer"
                        onChange={handleChangeCheck}
                      />
                    </div>
                    <div className="big_btn">
                      <span className="form-check-label terms">Business</span>
                      <input
                        type="radio"
                        name="profileType"
                        value="Business"
                        onChange={handleChangeCheck}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    onChange={handleChangeCheck}
                    value={states.firstName}
                  />
                  <p>{formErrors.firstName}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="lastName"
                    onChange={handleChangeCheck}
                    value={states.lastName}
                  />
                  <p>{formErrors.lastName}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">User name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={handleChangeCheck}
                    value={states.username}
                  />
                  <p>{formErrors.username}</p>
                </div>

                <h2>
                  <label htmlFor="exampleFormControlInput1">Headline</label>
                </h2>
                <div className="edit_four">
                  {states.profileType === 'Business' ? (
                    <>
                      <div className="form-group">
                        <input
                          type="text"
                          name="company"
                          value={states.company}
                          onChange={handleChangeCheck}
                          placeholder="Company"
                          className="form-control"
                        />
                        <p>{formErrors.company}</p>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          name="industry"
                          value={states.industry}
                          onChange={handleChangeCheck}
                          placeholder="industry"
                          className="form-control"
                        />
                        <p>{formErrors.industry}</p>
                      </div>
                    </>
                  ) : null}
                  {states.profileType === 'Gamer' ? (
                    <>
                      <div className="form-group">
                        <select
                          name="team"
                          id="team"
                          value={states.team}
                          onChange={handleChangeCheck}
                          placeholder="Team Name"
                        >
                          <option value="">Select Team...</option>
                          {allteams &&
                            allteams.map((tem, i) => (
                              <option key={i} value={tem.team?._id}>
                                {tem.team?.name}
                              </option>
                            ))}
                        </select>
                        {/* <p>{formErrors.team}</p> */}
                      </div>
                    </>
                  ) : states.profileType === 'Coach' ? (
                    <div className="form-group">
                      <input
                        type="search"
                        id="team"
                        name="team"
                        className="form-control"
                        placeholder={`Enter team name`}
                        value={searchText}
                        onChange={handleFilter}
                        autoComplete="off"
                      />
                      {searchText.length !== 0 ? (
                        <>
                          {filteredData.length > 0 ? (
                            <div className="custom-rig-tag">
                              <div className="rigs_items">
                                {!filteredData || filteredData.length === 0 ? (
                                  <p>No team found..</p>
                                ) : (
                                  filteredData.map((data) => (
                                    <div
                                      onClick={() => handleSelectedTeam(data)}
                                      key={data._id}
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
                                        {data.name.length > 20
                                          ? data.name.substring(0, 20) + '...'
                                          : data.name}
                                      </p>
                                    </div>
                                  ))
                                )}
                              </div>
                            </div>
                          ) : null}
                        </>
                      ) : null}
                      {/* <p>{formErrors.Cteam}</p> */}
                    </div>
                  ) : null}
                  {states.profileType === 'Gamer' ||
                    states.profileType === 'Coach' ? (
                    <>
                      <div className="form-group">
                        <select
                          name="game"
                          id="team"
                          value={states.game}
                          onChange={handleChangeCheck}
                        >
                          <option value="">Select Game...</option>
                          {User_team &&
                            User_team[0]?.team?.games.map((game, i) => (
                              <option key={i} value={game.gameId._id}>
                                {game.gameId.name}
                              </option>
                            ))}
                        </select>
                        <p>{formErrors?.Ggame}</p>
                        <p>{formErrors?.Cgame}</p>
                      </div>
                    </>
                  ) : states.profileType === 'Streamer' ? (
                    <>
                      <div className="form-group">
                        <select
                          name="game"
                          id="team"
                          value={states.game}
                          onChange={handleChangeCheck}
                        >
                          <option value="">Select Game...</option>
                          {games &&
                            games.map((game, i) => (
                              <option key={i} value={game._id}>{game.name}</option>
                            ))}
                        </select>
                        <p>{formErrors.Sgame}</p>
                      </div>
                    </>
                  ) : null}

                  {states.profileType === 'Streamer' ? (
                    <>
                      <div className="form-group">
                        <input
                          type="text"
                          name="streamPlatform"
                          value={states.streamingPlatform}
                          onChange={handleChangeCheck}
                          placeholder="Streaming Platform"
                          className="form-control"
                        />
                        <p>{formErrors.platform}</p>
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          name="streamLink"
                          value={states.link}
                          onChange={handleChangeCheck}
                          className="form-control"
                          placeholder="Stream Link"
                        />
                        <p>{formErrors.link}</p>
                      </div>
                    </>
                  ) : null}

                  {states.profileType === 'Gamer' ? (
                    <>
                      <div className="form-group">
                        <select
                          name="role"
                          value={states.role}
                          onChange={handleChangeCheck}
                        >
                          <option value="">Select Role...</option>
                          {allroles &&
                            allroles.map((role, i) => (
                              <option key={i} value={role}>{role}</option>
                            ))}
                        </select>
                        {/* <p>{formErrors.Grole}</p> */}
                      </div>
                    </>
                  ) : states.profileType === 'Business' ? (
                    <>
                      <div className="form-group">
                        <select
                          name="b_role"
                          value={states.b_role}
                          onChange={handleChangeCheck}
                        >
                          <option value="">Select Role...</option>
                          {allroles &&
                            allroles.map((role, i) => (
                              <option key={i} value={role}>{role}</option>
                            ))}
                        </select>
                        <p>{formErrors.b_role}</p>
                      </div>
                    </>
                  ) : null}

                  <div className="form-group">
                    <input
                      type="date"
                      name="startDate"
                      value={states.startDate}
                      onChange={handleChangeCheck}
                      placeholder="Start Date"
                      className="form-control"
                    />
                  </div>
                  <p>{formErrors.startDate}</p>
                </div>

                <div className="form-group textarea">
                  <label htmlFor="exampleFormControlInput1">Bio</label>
                  <textarea
                    type="textarea"
                    className="form-control"
                    name="bio"
                    onChange={handleChangeCheck}
                    value={states.bio}
                  ></textarea>
                  <p>{formErrors.bio}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Games</label>
                  <div className="prof_games">
                    <div className="games">
                      <div className="tit">
                        {profile.playergames &&
                          profile.playergames.map((game) => (
                            <>
                              <span>
                                {' '}
                                <img
                                  src={game.game?.imgUrl}
                                  alt={game.game?.name}
                                />
                              </span>
                            </>
                          ))}
                        <a href="#!" className="model_show_btn">
                          <i
                            className="fa fa-plus-circle"
                            aria-hidden="true"
                          ></i>

                          <div className="hover_games">
                            <div className="other_logo">
                              <img
                                src={selectedGame ? selectedGame.imgUrl : ''}
                                alt={selectedGame ? selectedGame.name : ''}
                              />
                            </div>
                          </div>
                        </a>
                        {showGameBox ? (
                          <div
                            className="common_model_box prof_edit"
                            id="more_games"
                          >
                            <a href="#!" className="model_close">
                              X
                            </a>
                            <div className="inner_model_box">
                              <div
                                className="form w-100 add_game_box"
                                noValidate="novalidate"
                                id="edit_pro_add_game"
                              >
                                {step1 ? (
                                  <div className="poup_height msScroll_all">
                                    <ul>
                                      {addgames &&
                                        addgames.map((game, i) => (
                                          <li key={i}>
                                            <div className="game_pic">
                                              <a
                                                href="#!"
                                                onClick={() =>
                                                  handleSelectGame(game)
                                                }
                                              >
                                                <img
                                                  src={game.imgUrl}
                                                  alt={game.name}
                                                />
                                              </a>
                                            </div>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                ) : (
                                  <>
                                    <button
                                      className="btn"
                                      onClick={() => setStep1(true)}
                                    >
                                      Back
                                    </button>
                                    <div className="add_game_poup">
                                      <img
                                        src={selectedGame?.game.imgUrl}
                                        alt={selectedGame?.game.name}
                                      />

                                      <input
                                        type="text"
                                        name="userIgn"
                                        onChange={handleSubmit}
                                        value={states.userIgn}
                                      />
                                    </div>

                                    <button
                                      type="submit"
                                      className="btn"
                                      onClick={gamehandleSubmit}
                                    >
                                      <span className="indicator-label">
                                        Add Game
                                      </span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="overlay"></div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="">Social Links</label>

                  <div className="edit_four">
                    <div className="form-group">
                      <input
                        type="text"
                        name="facebook"
                        value={states.facebook}
                        onChange={handleChangeCheck}
                        className="form-control facebook"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="instagram"
                        value={states.instagram}
                        onChange={handleChangeCheck}
                        className="form-control instagram"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="twitch"
                        value={states.twitch}
                        onChange={handleChangeCheck}
                        className="form-control twitch"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="youtube"
                        value={states.youtube}
                        onChange={handleChangeCheck}
                        className="form-control youtube"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="discord"
                        value={states.discord}
                        onChange={handleChangeCheck}
                        className="form-control discord"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="website"
                        value={states.website}
                        onChange={handleChangeCheck}
                        className="form-control website"
                      />
                    </div>
                  </div>
                </div>
                <div className="custom-control custom-switch">
                  <label>Online Status</label>
                  <ToggleButton
                    value={states.Online || false}
                    onToggle={(value) => {
                      setStates({ ...states, Online: !value });
                    }}
                  />
                </div>
                <button
                  className="btn"
                  onClick={() => {
                    setFormErrors(profileformvalidate(states));
                    setTrigger(!trigger);

                  }}
                >
                  Update
                </button>
              </form>
            </div>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
