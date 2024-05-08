import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import FavTournament from '../tournament/FavTournament';
import { format } from 'date-fns';
import { MPNumberFormat } from '../../utils/helpers';
import Tournament_Reg from '../tournament/TournamentRegister';
import ImageDropzone from '../common/ImageDropzone';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { profileTournaments } from '../../utils/valid';

const ProfileTournament = ({
  user,
  profile,
  allGames,
  teamroles,
  teams,
  tournamentData
}) => {
  const [allTournaments, setAllTournaments] = useState([]);
  const [organizer, setOrganizer] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [images, setImages] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const [tournament, setTournament] = useState({
    tournamentId: '',
    organizer: '',
    games: '',
    team: null,
    role: '',
    year: '',
    image: [],
    team_ranking: null,
    winnings: null,
    currency: 'Rs'
  });

  const router = useRouter();

  const refreshData = () => {
    // router.replace(router.asPath);
    router.reload()
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/tournaments/`)
      .then((res) => setAllTournaments(res.data));
    axios
      .get(`${baseURL}/api/all/organizers`)
      .then((res) => setOrganizer(res.data));
  }, []);

  const handleAddTournamentSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    if (Object.keys(formErrors).length === 0) {
      formdata.append('tournamentId', tournament.tournamentId);
      formdata.append('organizer', tournament.organizer);
      formdata.append('games', tournament.games);
      formdata.append('team', tournament.team);
      formdata.append('role', tournament.role);
      formdata.append('year', tournament.year);
      formdata.append('image', tournament.image);
      formdata.append('team_ranking', tournament.team_ranking);
      formdata.append('winnings', tournament.winnings);
      formdata.append('currency', tournament.currency);
      try {
        await axios.post(
          `${baseURL}/api/profile/tournaments/${profile?._id}`,
          formdata
        );
        toast.success('Tournament Added Successfully, Our Team Will Verify.');
        $('a.model_close').parent().removeClass('show_model');
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
      refreshData();
    }
  };

  const [filteredData, setFilteredData] = useState([]);
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setSearchText(searchWord);
    const newFilter = allTournaments?.filter((value) => {
      return value.tournament.name
        .toLowerCase()
        .includes(searchWord.toLowerCase());
    });

    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };
  const handleSelected = (data) => {
    setSearchText(data.name);
    tournament.tournamentId = data._id;
    setFilteredData([]);
  };
  const handleAddTournament = (e) => {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setTournament({ ...tournament, [e.target.name]: value });
    } else if (e.target.files) {
      setTournament({ ...tournament, [e.target.name]: e.target.files[0] });
    } else {
      setTournament({ ...tournament, [e.target.name]: e.target.value });
    }
  };
  const onChangeTour = (e) => {
    setTournament({ ...tournament, [e.target.name]: e.target.value });
  };
  const handlePhotoSubmit = async (e) => {
    e.preventDefault();
    for (const key of Object.keys(images)) {
      setTournament({ ...tournament, image: images[key] });
    }
    toast.success('Proof Uploaded');
  };

  return (
    <>
      <div className="tab hide" id="tournaments">
        <div className="sponser_btn">
          {' '}
          {profile?.user?._id === user._id ? (
            <a href="#!" className="model_show_btn">
              <button className="btn">
                {' '}
                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                Add Tournament
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
              <h3>Tournament</h3>
              <form
                className="common_form"
                onSubmit={handleAddTournamentSubmit}
              >
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Tournament Name
                  </label>
                  <input
                    type="search"
                    id="tournamentId"
                    name="tournamentId"
                    className="form-control"
                    value={searchText}
                    onChange={handleFilter}
                    autoComplete="off"
                  />
                  {searchText.length !== 0 ? (
                    <>
                      {filteredData.length > 0 ? (
                        <>
                          <div className="custom-rig-tag">
                            <div className="rigs_items">
                              {!filteredData || filteredData.length === 0 ? (
                                <p>No Tournament found..</p>
                              ) : (
                                filteredData.map((data) => (
                                  <div
                                    onClick={() =>
                                      handleSelected(data.tournament)
                                    }
                                    key={data.tournament?._id}
                                    className="items"
                                  >
                                    <span>
                                      <img
                                        src={data?.tournament.imgUrl}
                                        height={50}
                                        width={50}
                                      />
                                    </span>
                                    <p>
                                      {data?.tournament.name?.length > 20
                                        ? data.tournament.name.substring(
                                            0,
                                            20
                                          ) + '...'
                                        : data.tournament.name}
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
                  <p>{formErrors.tournamentId}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Orgazised By</label>

                  <select
                    className="form-control game_search_result"
                    multiple={false}
                    name="organizer"
                    value={tournament.organizer}
                    onChange={onChangeTour}
                  >
                    <option value="">Select Organizer...</option>
                    {organizer &&
                      organizer.map((organizer, idx) => (
                        <option key={idx} value={organizer._id}>
                          {' '}
                          {organizer.name}{' '}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Games</label>

                  <select
                    className="form-control game_search_result"
                    multiple={true}
                    name="games"
                    value={tournament.games}
                    onChange={handleAddTournament}
                  >
                    {allGames &&
                      allGames.map((game, idx) => (
                        <option key={idx} value={game._id}>
                          {' '}
                          {game.name}{' '}
                        </option>
                      ))}
                  </select>
                  <p>{formErrors.games}</p>
                </div>

                <div className="edit_two">
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Your Team</label>
                    <select
                      name="team"
                      className="form-control"
                      onChange={onChangeTour}
                      value={tournament.team}
                    >
                      <option value="">Select Team...</option>
                      {teams &&
                        teams.map((tem) => (
                          <option value={tem?._id} key={tem?._id}>
                            {tem.name}
                          </option>
                        ))}

                      {profile?.teams &&
                        profile?.teams?.map(
                          (tem) =>
                           (
                              <option key={tem?._id} value={tem?.teamId?._id}>
                                {tem?.teamId?.name}
                              </option>
                            )
                        )}
                    </select>
                    <p>{formErrors?.team}</p>
                  </div>
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Roles</label>
                    <select
                      name="role"
                      className="form-control"
                      onChange={onChangeTour}
                      value={tournament.role}
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
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Year</label>
                  <input
                    type="date"
                    className="form-control"
                    name="year"
                    onChange={handleAddTournament}
                    value={tournament.year}
                  />
                  <p>{formErrors.year}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">
                    Your Team Ranking
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    name="team_ranking"
                    onChange={handleAddTournament}
                    value={tournament.team_ranking}
                  />
                  <p>{formErrors.team_ranking}</p>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Price</label>
                  <select
                    name="currency"
                    id="currency"
                    onChange={onChangeTour}
                    value={tournament.currency}
                  >
                    <option value="Rs">INR (Rs) - Rupees</option>
                    <option value="$">USD($)- Dollars</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Winnings</label>
                  <input
                    type="number"
                    className="form-winnings form-control"
                    name="winnings"
                    onChange={handleAddTournament}
                    value={tournament.winnings}
                  />
                  <p>{formErrors.winnings}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Upload Proof</label>
                  <div className="add_photos">
                    <ImageDropzone setImages={setImages} />
                    {images.length > 0 ? (
                      <div className="upload_btn">
                        <a
                          href="#!"
                          className="btn"
                          onClick={handlePhotoSubmit}
                        >
                          UPLOAD NOW{' '}
                        </a>
                      </div>
                    ) : (
                      ''
                    )}
                    <div className="overlay"></div>
                  </div>
                </div>
                <button
                  className="btn"
                  onClick={() => setFormErrors(profileTournaments(tournament))}
                >
                  Update
                </button>
              </form>
            </div>
            <div className="overlay"></div>
          </div>
        </div>

        <div className="new_tournament test">
          {tournamentData.Alltournaments &&
            tournamentData.Alltournaments.map((tournament, i) => (
              <div className="tournamnet_new_row" key={i}>
                <div className="tour_img_name">
                  <span className="imgs">
                    <img
                      src={tournament.tournament.imgUrl}
                      alt={tournament.tournament.name}
                    />
                  </span>
                  <span>
                    <a href={`/tour/${tournament.tournament.name}`}>
                      <h4>{tournament.tournament.name}</h4>
                    </a>
                    <p>
                      {format(
                        new Date(tournament?.tournament?.startDate),
                        'yyyy'
                      )}
                    </p>
                  </span>
                </div>

                <div className="tour_game_team">
                  <ul>
                    <li>
                      <b>Game:</b>
                      {tournament.tournament.games.map((game) => (
                        <>
                          <img
                            src={game.gameId.imgUrl}
                            alt={game.gameId.name}
                          />
                        </>
                      ))}
                    </li>
                    <li>
                      <b>Team:</b>
                      {tournament.type === 'TeamTournament' ? (
                        <>
                          {tournament?.tournament?.teams.map((team) => (
                            <>
                              <img
                                src={team?.teamId?.imgUrl}
                                alt={team?.teamId?.name}
                              />
                              {team.teamId.name}
                            </>
                          ))}
                        </>
                      ) : (
                        <>
                          {tournament.type === 'profileTournament' ? (
                            <>
                              <img
                                src={tournament.proteam.imgUrl}
                                alt={tournament.proteam.name}
                              />
                              {tournament.proteam.name}
                            </>
                          ) : (
                            <p>No Team</p>
                          )}
                        </>
                      )}
                    </li>
                  </ul>
                </div>

                <div className="tour_game_team">
                  {tournament.type === 'profileTournament' ? (
                    <ul>
                      <li>Ranking: {tournament.ranking}</li>
                      <li>Winnings: {tournament.winnings}</li>
                    </ul>
                  ) : (
                    <ul>
                      <li>Ranking: --</li>
                      <li>Winnings: --</li>
                    </ul>
                  )}
                </div>

                <button className="btn">VIEW MATCHES</button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);


  const respons = await fetch(`${baseURL}/api/all/teams`);
    const teams = await respons.json();


  return {
    props: {teams }
  };
};




export default ProfileTournament;
