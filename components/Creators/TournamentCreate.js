import { useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import { tournamentformvalidate } from '@utils/valid';
import Router from 'next/router';
import baseURL from '@utils/baseURL';
import axios from 'axios';
import countryList from 'react-select-country-list';
import TournamentAddSponsor from '../tournament/TournamentAddSponsor';
import SearchName from './SearchName';
import GameMaps from './GameMaps';
import { handleMatchType } from '../../utils/functionsHelper';

const TournamentCreate = ({ user, isClaim }) => {
  const showSecond = false;
  const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

  const [games, setGames] = useState([]);
  const [organizers, setOrganizers] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  // const [series, setSeries] = useState([]);
  const [step1, setStep1] = useState(false);
  const [showbtn, setShowbtn] = useState(true);
  const [formErrors, setFormErrors] = useState({});
  const [newTour, setNewTour] = useState();
  const [newSpon, setNewSpon] = useState({
    sponsor: [],
    organizer: []
  });

  const [selectGames, setSelectGames] = useState({
    selectedMaps: [],
    game: ''
  });

  const [state, setState] = useState({
    user: user._id,
    name: '',
    imgUrl: '/assets/media/default/tournament.jpg',
    coverPhoto: '/assets/media/profile/cover_bg.jpg',
    game: '',
    currency: 'Rs',
    prizepool: null,
    category: '',
    tournamentType: '',
    Type: '',
    participants: '',
    minParticipants: '',
    entranceFee: null,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    location: '',
    address: '',
    organizer: newSpon.organizer || '',
    // cohosts: '',
    sponsor: newSpon.sponsor || '',
    description: '',
    // tickets: '',
    website: '',
    facebook: '',
    twitch: '',
    instagram: '',
    youtube: '',
    discord: '',
    file: null,
    // series: null,
    numberOfTeam: null,
    playType: '',
    minTeams: null,
    platform: '',
    isClaim,
    checkIn: '',
    teamSize: '',
    eligibleCountries: '',
    mode: '',
    matchType: ''
  });

  const options = useMemo(() => countryList().getData(), []);

  const [matchData, setmatchData] = useState('');
  useEffect(() => {
    setmatchData(handleMatchType(selectGames.game));
  }, [selectGames]);

  useEffect(() => {
    //Games
    axios.get(`${baseURL}/api/all/games`).then((res) => setGames(res.data));

    // Tournaments
    axios
      .get(`${baseURL}/api/all/tournaments`)
      .then((res) => setTournaments(res.data));

    //Organizers
    axios
      .get(`${baseURL}/api/all/organizers`)
      .then((res) => setOrganizers(res.data));

    //Sponsors
    axios
      .get(`${baseURL}/api/all/sponsors`)
      .then((res) => setSponsors(res.data));

    //Series
    // axios.get(`${baseURL}/api/all/series`).then((res) => setSeries(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      const formdata = new FormData();

      formdata.append('name', state.name);
      formdata.append('imgUrl', state.imgUrl);
      formdata.append('user', state.user);
      formdata.append('game', state.game);
      formdata.append('currency', state.currency);
      formdata.append('prizepool', state.prizepool);
      formdata.append('category', state.category);
      formdata.append('tournamentType', state.tournamentType);
      formdata.append('Type', state.Type);
      formdata.append('participants', state.participants);
      formdata.append('minParticipants', state.minParticipants);
      formdata.append('entranceFee', state.entranceFee);
      formdata.append('startDate', state.startDate);
      formdata.append('startTime', state.startTime);
      formdata.append('endDate', state.endDate);
      formdata.append('endTime', state.endTime);
      formdata.append('location', state.location);
      formdata.append('address', state.address);
      formdata.append('organizer', state.organizer);
      formdata.append('sponsor', state.sponsor);
      formdata.append('description', state.description);
      formdata.append('website', state.website);
      formdata.append('facebook', state.facebook);
      formdata.append('twitch', state.twitch);
      formdata.append('instagram', state.instagram);
      formdata.append('youtube', state.youtube);
      formdata.append('discord', state.discord);
      // formdata.append('series', Number(state.series));
      formdata.append('numberOfTeam', Number(state.numberOfTeam));
      formdata.append('playType', state.playType);
      formdata.append('minTeams', Number(state.minTeams));
      formdata.append('platform', state.platform);
      formdata.append('isClaim', state.isClaim);
      formdata.append('checkIn', state.checkIn);
      formdata.append('teamSize', state.teamSize);
      formdata.append('eligibleCountries', state.eligibleCountries);
      formdata.append('maps', selectGames.selectedMaps);
      formdata.append('mode', state.mode);
      formdata.append('matchType', state.matchType);

      try {
        await axios
          .post(`${baseURL}/api/tournaments/create`, formdata)
          .then((res) => setNewTour(res.data));

        toast.success('Your Tournament has been successfully created!');
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
    }
  };

  if (newTour) {
    isClaim === true ? Router.push(`/tour/${newTour.name}`) : null;
  }

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
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  const handleChangeCheck = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const showstep2 = () => {
    if (state.Type === '') {
      toast.info('Select a Type');
    } else if (state.name === '' || state.name.length <= 1) {
      toast.info('Tournament Name should have 2 characters minimum');
    } else if (state.game.length === 0) {
      toast.info('Please select a game');
    } else if (state.platform.length === 0) {
      toast.info('please select a platform');
    } else if (state.prizepool === null) {
      toast.info('please select a prizepool');
    } else if (state.category === '') {
      toast.info('Please select a category');
    } else if (state.playType === '') {
      toast.info('please select a Tournament Format');
    } else if (state.playType === 'TEAMS' && state.teamSize === '') {
      toast.info('Please select a team size');
    } else if (
      state.playType === 'TEAMS' &&
      state.numberOfTeam === null &&
      state.minTeams === null
    ) {
      toast.info('Total Number of Teams and Minimum teams required!');
    } else if (
      state.playType === 'SOLO' &&
      state.participants === '' &&
      state.minParticipants === ''
    ) {
      toast.info('Total Number of Players and Minimum players required!');
    } else {
      setStep1(true);
      setShowbtn(false);
    }
  };

  const showstep1 = () => {
    setStep1(false);
    setShowbtn(true);
  };

  let gamePlatform = games.filter((game) => game._id === selectGames.game);

  if (gamePlatform[0]?.platform.length > 0) {
    state.platform = gamePlatform[0]?.platform[0];
  }

  const handleGame = (e, gameId) => {
    e.preventDefault();
    setSelectGames({ game: gameId, selectedMaps: [] });
    state.game = gameId;
  };

  const [gotMaps, setGotMaps] = useState([]);

  useEffect(async () => {
    await axios
      .get(`${baseURL}/api/maps/${selectGames.game}`)
      .then((res) => setGotMaps(res.data));
  }, [selectGames.game]);

  const handleSelect = (e, plt) => {
    e.preventDefault();
    state.platform = plt;
  };

  useEffect(() => {
    $('.game-selection li').click(function () {
      $('.game-selection li').removeClass('slc_img');
      $(this).addClass('slc_img');
    });

    $('.big_btn input[type="radio"]').click(function () {
      $(this).parent().siblings('.big_btn').removeClass('radio_bg');
      $(this).parent().addClass('radio_bg');
    });

    $('.console_bg').click(function () {
      $('.console_bg').removeClass('active');
      $(this).addClass('active');
    });
  });

  return (
    <>
      <div className="main_middle create_main_middle">
        <div className="white_bg create_bg">
          <div className="create_form_box">
            <div className="left_create_form">
              <img src="/assets/media/create_left_img.jpg" />

              <div className="create_heads">
                <h1>Create Tournament</h1>
                <p>
                  Create tournament page and invite hundrends of gamers to
                  participate. Boost to increase the reach.
                </p>
              </div>
            </div>

            <div className="create_tournament">
              <form onSubmit={handleSubmit}>
                {!step1 ? (
                  <>
                    <h2>Step1</h2>

                    <label htmlFor="exampleFormControlInput1">Type</label>
                    <div className="btn_selection">
                      <div className="big_btn">
                        <span className="form-check-label terms"> Ladder</span>
                        <input
                          type="radio"
                          name="Type"
                          id=""
                          value="Ladder"
                          onChange={handleChangeCheck}
                        />
                      </div>

                      <div className="big_btn">
                        <span className="form-check-label terms"> Challenge</span>
                        <input
                          type="radio"
                          name="Type"
                          id=""
                          value="Challenge"
                          onChange={handleChangeCheck}
                        />
                      </div>

                      <div className="big_btn">
                        <span className="form-check-label terms"> Tournament</span>
                        <input
                          type="radio"
                          name="Type"
                          id=""
                          value="Tournament"
                          placeholder="Tournament"
                          onChange={handleChangeCheck}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <SearchName
                        data={tournaments}
                        type="Tournament"
                        handleChange={handleChange}
                        isSearchOnly={false}
                        user={user}
                      />
                      <p>{formErrors.name}</p>
                    </div>
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
                          className="inputfile inputfile-2"
                          onChange={handleChange}
                        />
                        <label htmlFor="coverPhoto">
                          <span>Upload Cover Photo</span>
                        </label>
                      </div> */}
                    </div>

                    <label htmlFor="exampleFormControlInput1">Games</label>
                    <ul className="game_search_result game-selection">
                      {games.map((game) => (
                        <>
                          <li onClick={(e) => handleGame(e, game._id)}>
                            <img src={game.imgUrl} alt={game.name} />
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </li>
                        </>
                      ))}
                    </ul>

                    {/* <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">
                        Series (Optional)
                      </label>
                      <select
                        className="game_search_result mscrollbar"
                        name="series"
                        value={state.series}
                        onChange={handleChange}
                      >
                        {series &&
                          series.map((ser, idx) => (
                            <option key={idx} value={ser._id}>
                              {' '}
                              {ser.name}{' '}
                            </option>
                          ))}
                      </select>
                    </div> */}

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Prize Pool</label>
                      <div className="prize_boxs">
                        {gamePlatform &&
                          gamePlatform.map((game) => (
                            <>
                              <div className="select_img">
                                <img src={game.imgUrl} alt="" />
                              </div>

                              {game.platform.map((plt) => (
                                <>
                                  <div className="console_bg active">
                                    {' '}
                                    {plt === 'PC' ? (
                                      <a
                                        href="#"
                                        onClick={(e) => handleSelect(e, plt)}
                                      >
                                        <img
                                          src="/assets/media/discover/desk.png"
                                          alt={game.name}
                                        />
                                      </a>
                                    ) : null}
                                    {plt === 'Console' ? (
                                      <a
                                        href="#"
                                        onClick={(e) => handleSelect(e, plt)}
                                      >
                                        <img
                                          src="/assets/media/discover/console.png"
                                          alt={game.name}
                                        />
                                      </a>
                                    ) : null}
                                    {plt === 'Mobile' ? (
                                      <a
                                        href="#"
                                        onClick={(e) => handleSelect(e, plt)}
                                      >
                                        <img
                                          src="/assets/media/discover/mobile_game.png"
                                          alt={game.name}
                                        />
                                      </a>
                                    ) : null}
                                  </div>
                                </>
                              ))}
                            </>
                          ))}

                        <select
                          name="currency"
                          id="currency"
                          onChange={handleChangeCheck}
                          value={state.currency}
                        >
                          <option value="Rs">INR (Rs) - Rupees</option>
                          <option value="$">USD($)- Dollars</option>
                        </select>
                        <input
                          type="number"
                          className="form-control"
                          placeholder=""
                          name="prizepool"
                          onChange={handleChange}
                          value={state.prizepool}
                        />
                      </div>
                      <p>{formErrors.prizepool}</p>
                    </div>

                    <div className="form-group">
                      {selectGames.game === 20 ||
                      selectGames.game === 3 ||
                      selectGames.game === 26 ? (
                        <label htmlFor="exampleFormControlTextarea1">Map</label>
                      ) : null}
                      {selectGames.game === 20 ||
                      selectGames.game === 3 ||
                      selectGames.game === 26 ? (
                        <GameMaps
                          gameId={selectGames.game}
                          maps={gotMaps}
                          states={selectGames}
                        />
                      ) : null}
                    </div>

                    {state.game === 20 ||
                    state.game === 23 ||
                    state.game === 3 ||
                    state.game === 26 ||
                    state.game === 1 ? (
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Match type</label>
                        <select
                          name="matchType"
                          value={state.matchType}
                          onChange={handleChangeCheck}
                        >
                          <option value="">Select Match Type...</option>
                          {matchData &&
                            matchData.map((match,i) => (
                              <option value={match} key={i}>{match}</option>
                            ))}
                        </select>
                      </div>
                    ) : null}

                    {state.game === 20 ? (
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Mode</label>
                        <div className="btn_selection">
                          <div className="big_btn">
                            <span className="form-check-label terms"> FPP</span>
                            <input
                              type="radio"
                              name="mode"
                              id=""
                              value="FPP"
                              onChange={handleChangeCheck}
                            />
                          </div>

                          <div className="big_btn">
                            <span className="form-check-label terms"> TPP</span>
                            <input
                              type="radio"
                              name="mode"
                              value="TPP"
                              onChange={handleChangeCheck}
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}

                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        Tournament Category
                      </label>
                      <div className="btn_selection">
                        <div className="big_btn">
                          <span className="form-check-label terms"> Online</span>
                          <input
                            type="radio"
                            name="category"
                            id=""
                            value="Online"
                            onChange={handleChangeCheck}
                          />
                        </div>

                        <div className="big_btn">
                          <span className="form-check-label terms"> LAN</span>
                          <input
                            type="radio"
                            name="category"
                            value="LAN"
                            onChange={handleChangeCheck}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        Tournament Format
                      </label>
                      <div className="btn_selection">
                        <div className="big_btn">
                          <span className="form-check-label terms">Solo</span>
                          <input
                            type="radio"
                            name="playType"
                            value="SOLO"
                            onChange={handleChangeCheck}
                          />
                        </div>

                        <div className="big_btn">
                          <span className="form-check-label terms">Teams</span>
                          <input
                            type="radio"
                            name="playType"
                            value="TEAMS"
                            onChange={handleChangeCheck}
                          />
                        </div>
                        {state.playType === 'TEAMS' ? (
                          <select
                            name="teamSize"
                            id="teamSize"
                            onClick={handleChangeCheck}
                          >
                            <option value="">Select Team Size</option>
                            <option value="1v1">1v1</option>
                            <option value="2v2">2v2</option>
                            <option value="3v3">3v3</option>
                            <option value="4v4">4v4</option>
                            <option value="5v5">5v5</option>
                          </select>
                        ) : null}
                        <p>{formErrors.teamSize}</p>
                      </div>
                    </div>
                    {state.playType === 'SOLO' ? (
                      <>
                        <div className="form-group">
                          <div className="colm">
                            <label htmlFor="exampleFormControlTextarea1">
                              Number of Participants
                            </label>
                            <input
                              type="number"
                              name="participants"
                              className="form-control"
                              onChange={handleChange}
                              value={state.participants}
                              placeholder=""
                            />
                          </div>

                          <div className="colm">
                            <label htmlFor="exampleFormControlTextarea1">
                              Minimum Participants
                            </label>
                            <input
                              type="number"
                              name="minParticipants"
                              className="form-control"
                              onChange={handleChange}
                              value={state.minParticipants}
                              placeholder=""
                            />
                          </div>
                        </div>
                      </>
                    ) : null}
                    {state.playType === 'TEAMS' ? (
                      <>
                        <div className="form-group">
                          <div className="date_time">
                            <div className="date_box">
                              <label htmlFor="exampleFormControlTextarea1">
                                Number of Teams
                              </label>
                              <input
                                type="number"
                                name="numberOfTeam"
                                className="form-control"
                                onChange={handleChange}
                                value={state.numberOfTeam}
                              />
                            </div>

                            <div className="time_box">
                              <label htmlFor="exampleFormControlTextarea1">
                                Minimum Teams
                              </label>
                              <input
                                type="number"
                                name="minTeams"
                                className="form-control"
                                onChange={handleChange}
                                value={state.minTeams}
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null}
                  </>
                ) : (
                  <>
                    <h2>Step2</h2>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1">
                        Tourament Type
                      </label>
                      <div className="btn_selection">
                        <div className="big_btn">
                          <span className= "form-check-label terms">
                            {' '}
                            Single Elimination
                          </span>
                          <input
                            type="radio"
                            name="tournamentType"
                            id=""
                            value="Single Elimination"
                            onChange={handleChangeCheck}
                          />
                        </div>

                        {/* <div className="big_btn">
                          <span className="form-check-label terms">
                            {' '}
                            Double Elimination
                          </span>
                          <input
                            type="radio"
                            name="tournamentType"
                            id=""
                            value="Double Elimination"
                            onChange={handleChangeCheck}
                          />
                        </div>

                        <div className="big_btn">
                          <span className="form-check-label terms">
                            {' '}
                            Round Robin
                          </span>
                          <input
                            type="radio"
                            name="tournamentType"
                            id=""
                            value="Round Robin"
                            onChange={handleChangeCheck}
                          />
                        </div> */}
                      </div>
                      <p>{formErrors?.tournamentType}</p>
                    </div>
                    {/* {state.tournamentType === 'Single Elimination' ? (
                      <>
                        <div className="form-group">
                          <div className="colm">
                            <label htmlFor="exampleFormControlTextarea1">
                              Number of Participants
                            </label>
                            <input
                              type="number"
                              name="participants"
                              className="form-control"
                              onChange={handleChange}
                              value={state.participants}
                              placeholder="Group Should be of Even Numbers"
                            />
                          </div>
                        </div>
                      </>
                    ) : null} */}
                    <div className="form-group">
                      <div className="date_time">
                        <div className="date_box">
                          <label htmlFor="exampleFormControlTextarea1">
                            Entrance fee
                          </label>
                          <input
                            type="number"
                            name="entranceFee"
                            className="form-control"
                            onChange={handleChange}
                            value={state.entranceFee}
                            placeholder={state.currency}
                          />
                          <p>{formErrors.entranceFee}</p>
                        </div>
                        <div className="time_box">
                          <label htmlFor="exampleFormControlTextarea1">
                            Check-in period
                          </label>
                          <input
                            type="number"
                            name="checkIn"
                            className="form-control"
                            onChange={handleChange}
                            value={state.checkIn}
                            placeholder="Minutes before start time"
                          />
                          <p>{formErrors.checkIn}</p>
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="date_time">
                        <div className="date_box">
                          <label htmlFor="exampleFormControlTextarea1">
                            Session Start Date
                          </label>
                          <input
                            type="date"
                            name="startDate"
                            max="9999-12-31"
                            onChange={handleChange}
                            value={state.startDate}
                          />
                          <p>{formErrors.startDate}</p>
                        </div>
                        <div className="time_box">
                          <label htmlFor="exampleFormControlTextarea1">
                            Session Start Time
                          </label>
                          <input
                            type="time"
                            name="startTime"
                            onChange={handleChange}
                            value={state.startTime}
                          />
                          {/* <p>{formErrors.startTime}</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="date_time">
                        <div className="date_box">
                          <label htmlFor="exampleFormControlTextarea1">
                            Session End Date
                          </label>
                          <input
                            type="date"
                            name="endDate"
                            max="9999-12-31"
                            onChange={handleChange}
                            value={state.endDate}
                          />
                          <p>{formErrors.endDate}</p>
                        </div>
                        <div className="time_box">
                          <label htmlFor="exampleFormControlTextarea1">
                            Session End Time
                          </label>
                          <input
                            type="time"
                            name="endTime"
                            value={state.endTime}
                            onChange={handleChange}
                          />
                          {/* <p>{formErrors.endTime}</p> */}
                        </div>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Sponsors (Optional)
                        </label>
                        <TournamentAddSponsor
                          states={newSpon}
                          sponsors={sponsors}
                          type="SPONSORS"
                        />
                      </div>

                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Organizer (Optional)
                        </label>
                        <TournamentAddSponsor
                          states={newSpon}
                          sponsors={organizers.concat(user)}
                          type="ORGANIZER"
                        />
                      </div>

                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Address{' '}
                          {state.category === 'Online' ? '(Optional)' : null}
                        </label>
                        <input
                          type="text"
                          name="address"
                          placeholder="Address"
                          onChange={handleChange}
                          value={state.address}
                        />
                        <p>{formErrors.address}</p>
                      </div>

                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">Location</label>
                        <select name="location" onChange={handleChangeCheck}>
                          <option value="">Select Location...</option>
                          {options &&
                            options.map((opt) => (
                              <>
                                <option value={opt.value}>{opt.label}</option>
                              </>
                            ))}
                        </select>
                        <p>{formErrors.location}</p>
                      </div>

                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Eligible Countries (Optional)
                        </label>
                        <select
                          name="eligibleCountries"
                          onChange={handleChange}
                          multiple={true}
                        >
                          {options &&
                            options.map((opt) => (
                              <>
                                <option value={opt.value}>{opt.label}</option>
                              </>
                            ))}
                        </select>
                      </div>

                      <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Description
                        </label>
                        <input
                          type="text"
                          name="description"
                          className="form-control"
                          placeholder="Description"
                          onChange={handleChange}
                          value={state.description}
                        />
                        <p>{formErrors.description}</p>
                      </div>
                      {/* <div className="colm">
                        <label htmlFor="exampleFormControlInput1">
                          Tickets (Optional)
                        </label>
                        <input
                          type="number"
                          name="tickets"
                          className="form-control"
                          placeholder="Tickets"
                          onChange={handleChange}
                          value={state.tickets}
                        />
                      </div> */}
                      <div className="colm colm100">
                        <label htmlFor="exampleFormControlInput1">
                          Website (Optional)
                        </label>
                        <input
                          type="text"
                          name="website"
                          className="form-control website"
                          placeholder="Enter Website Name with Extension"
                          onChange={handleChange}
                          value={state.website}
                        />
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
                    <input
                      type="submit"
                      className="btn"
                      value="Create Tournament"
                      onClick={() =>
                        setFormErrors(tournamentformvalidate(state))
                      }
                    />
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

export default TournamentCreate;
