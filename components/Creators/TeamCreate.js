import { useState, useEffect, useMemo } from 'react';
import baseURL from '@utils/baseURL';
import axios from 'axios';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';
import { teamformvalidate } from '@utils/valid';
import { useRouter } from 'next/router';
import countryList from 'react-select-country-list';
import TeamAddSearch from '../team/TeamAddSearch';
import SearchName from './SearchName';

const TeamCreate = ({ isClaim, user }) => {
  const showSecond = true;
  const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

  const [newTeam, setNewTeam] = useState();
  const [teams, setTeams] = useState([]);
  const [games, setGames] = useState([]);
  const [arenas, setArenas] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [selectedGame, setSelectedGame] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const router = useRouter();
  const [rigsData, setRigsData] = useState([]);
  const [state, setState] = useState({
    name: '',
    imgUrl: '/assets/media/default/tournament.jpg',
    coverPhoto: '/assets/media/profile/cover_bg.jpg',
    founded: '',
    prizepool: null,
    region: '',
    description: '',
    achievements: '',
    sponsor: '',
    arena: '',
    role: 'Owner',
    facebook: '',
    twitch: '',
    website: '',
    instagram: '',
    youtube: '',
    discord: '',
    isClaim
    // keyboard: '',
    // mouse: '',
    // monitor: '',
    // graphicsCard: '',
    // headphone: '',
    // processor: ''
  });

  useEffect(() => {
    //Games
    axios.get(`${baseURL}/api/all/games`).then((res) => setGames(res.data));

    // Teams
    axios.get(`${baseURL}/api/all/teams`).then((res) => setTeams(res.data));

    //arenas
    axios.get(`${baseURL}/api/all/arenas`).then((res) => setArenas(res.data));

    //Sponsors
    axios
      .get(`${baseURL}/api/all/sponsors`)
      .then((res) => setSponsors(res.data));

    // Rigs data
    axios.get(`${baseURL}/api/rigsdata/`).then((res) => setRigsData(res.data));
  }, []);

  const [step1, setStep1] = useState(false);
  const [showbtn, setShowbtn] = useState(true);
  const options = useMemo(() => countryList().getData(), []);

  function handleChange(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setState({ ...state, [e.target.name]: value });
    } else if (e.target.files) {
      console.log(e.target.files[0]);
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  const showstep2 = () => {
    if (state.name === '' || state.name.length <= 1) {
      toast.info('Team name should be atleast 2 characters long!');
    } else if (state.founded === '') {
      toast.info('Year is incorrect');
    } else if (state.game === '') {
      toast.info('please select minimum 1 game');
    } else {
      setStep1(true);
      setShowbtn(false);
    }
  };

  const showstep1 = () => {
    setStep1(false);
    setShowbtn(true);
  };

  const mutation = useMutation(
    async (formdata) =>
      await axios
        .post(`${baseURL}/api/teams/create`, formdata, {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => setNewTeam(res.data))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      let formdata = new FormData();

      Object.entries(state).map(([key, value]) => {
        formdata.append(key, value);
      });

      // setTeams((prevTeams) => [...prevTeams, { formdata }]);
      formdata.append('games', selectedGame);
      try {
        await mutation.mutateAsync(formdata);
        toast.success('Your Team has been successfully created! ');
        isClaim === true ? router.push('/dashboard') : null;
        console.log('formdata',formdata);
      } catch (err) {
        console.log(err);
        
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
    }
  };

  if (newTeam) {
    isClaim === true ? router.push(`/team/${newTeam._id}`) : null;
  }

  const handlemultiplegames = (game) => {
    let isGamePresent = selectedGame.indexOf(game._id);
    if (isGamePresent < 0) {
      selectedGame.push(game._id);
    } else {
      selectedGame.splice(isGamePresent, 1);
    }
  };

  useEffect(() => {
    $('.game-selection li').click(function () {
      $(this).toggleClass('slc_img');
    });
  });
 console.log('setnewteam ',newTeam);
  return (
    <>
      <div className="main_middle create_main_middle">
        <div className="white_bg create_bg">
          <div className="create_form_box">
            <div className="left_create_form">
              <img src="/assets/media/create_left_img.jpg" />

              <div className="create_heads">
                <h1>Create Team</h1>
                <p>
                  Create Team page and invite hundrends of gamers to
                  participate. Boost to increase the reach.
                </p>
              </div>
            </div>
            <div className="create_tournament">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                {!step1 ? (
                  <>
                    <h2>Step1</h2>
                    <SearchName
                      data={teams}
                      type="Team"
                      handleChange={handleChange}
                      isSearchOnly={false}
                      user={user}
                    />
                    <div className="form-group">
                      <div className="style_file_upload">
                        <input
                          type="file"
                          name="imgUrl"
                          id="imgUrl"
                          className="inputfile"
                          onChange={handleChange}
                        />
                        <label htmlFor="imgUrl">
                          <span>Upload Logo</span>
                        </label>
                      </div>
                      {/* <div className="style_file_upload cover_img">
                        <input
                          type="file"
                          name="coverPhoto"
                          id="coverPhoto"
                          className="inputfile"
                          onChange={handleChange}
                        />
                        <label for="coverPhoto">
                          <span>Upload Cover Photo</span>
                        </label>
                      </div> */}
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Year Founded
                      </label>
                      <input
                        type="date"
                        max="9999-12-31"
                        className="form-control"
                        placeholder="Year founded"
                        name="founded"
                        onChange={handleChange}
                        value={state.founded}
                      />
                      <p className="error">{formErrors.founded}</p>
                    </div>
                    <div className="pick_game">
                      <h2>Games</h2>
                      <ul className="game_search_result create_team_thumb game-selection">
                        {games &&
                          games.map((game) => (
                            <>
                            <li onClick={() => handlemultiplegames(game)} >
                              <img src={game.imgUrl} alt={game.name} />

                              <i className="fa fa-check" aria-hidden="true"></i>
                            </li>
                            </>
                            
                          ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <>
                    <h2>Step2</h2>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        Country
                      </label>
                      <select name="region" id="" onChange={handleChange}>
                        <option value="">Select Region...</option>
                        {options &&
                          options.map((opt) => (
                            <>
                              <option value={opt.value}>{opt.label}</option>
                            </>
                          ))}
                      </select>
                      <p className="error">{formErrors.region}</p>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        Website (Optional)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id=""
                        placeholder="Enter your website Name with Extension"
                        name="website"
                        onChange={handleChange}
                        value={state.website}
                      />
                      {/* <p>{formErrors.website}</p> */}
                    </div>
                    <div className="form-group">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          Description
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Description"
                          name="description"
                          onChange={handleChange}
                          value={state.description}
                        />
                        <p className="error">{formErrors.description}</p>
                      </div>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          Achievements (Optional)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleFormControlInput1"
                          placeholder="Achievements"
                          name="achievements"
                          onChange={handleChange}
                          value={state.achievements}
                        />
                        {/* <p>{formErrors.achievements}</p> */}
                      </div>

                      {/* <TeamAddSearch
                        sponsors={rigsData}
                        type="KEYBOARD"
                        states={state}
                        val="Keyboard"
                      /> */}

                      {/* <TeamAddSearch
                        sponsors={rigsData}
                        type="MOUSE"
                        states={state}
                        val="Mouse"
                      /> */}

                      <TeamAddSearch sponsors={sponsors} states={state} />

                      <TeamAddSearch
                        sponsors={arenas}
                        states={state}
                        type="ARENA"
                      />

                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                          Role (Optional)
                        </label>
                        <select name="role" onChange={handleChange}>
                          <option value="">Select Role...</option>
                          <option value="Admin">Admin</option>
                          <option value="Manager">Manager</option>
                          <option value="Owner">Owner</option>
                          <option value="CEO">CEO</option>
                        </select>
                      </div>

                      <div className="colm full_width">
                        <label htmlFor="exampleFormControlInput1">
                          Social Links (Optional)
                        </label>
                        <ul className="socail_url">
                          <li>
                            <input
                              type="text"
                              className="form-control facebook"
                              placeholder="Enter your Facebook user ID as per the URL"
                              name="facebook"
                              onChange={handleChange}
                              value={state.facebook}
                            />
                          </li>
                          <li>
                            <input
                              type="text"
                              className="form-control twitch"
                              placeholder="Enter your Twitch Channel name as per the URL"
                              name="twitch"
                              onChange={handleChange}
                              value={state.twitch}
                            />
                          </li>
                          <li>
                            <input
                              type="text"
                              className="form-control twitter"
                              placeholder="Enter @Twitter Name"
                              name="twitter"
                              onChange={handleChange}
                              value={state.twitter}
                            />
                          </li>
                          <li>
                            <input
                              type="text"
                              className="form-control instagram"
                              placeholder="Enter your Instagram User Name"
                              name="instagram"
                              onChange={handleChange}
                              value={state.instagram}
                            />
                          </li>
                          <li>
                            {' '}
                            <input
                              type="text"
                              className="form-control youtube"
                              placeholder="Enter your Youtube Channel Name as per the URL"
                              name="youtube"
                              onChange={handleChange}
                              value={state.youtube}
                            />
                          </li>
                          <li>
                            <input
                              type="text"
                              className="form-control discord"
                              placeholder="Enter your full Discord server link"
                              name="discord"
                              onChange={handleChange}
                              value={state.discord}
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <button
                      className="type_btn active"
                      onClick={() => setFormErrors(teamformvalidate(state))}
                      disabled={mutation.isLoading}
                    >
                      Create Team
                    </button>
                  </>
                )}
              </form>
              <button
                onClick={showstep1}
                className={`btn rgtside ${showbtn ? 'd-none' : ''}`}
              >
                Back
              </button>{' '}
              <button
                className={`btn rgtside ${showbtn ? '' : 'd-none'}`}
                onClick={showstep2}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamCreate;
