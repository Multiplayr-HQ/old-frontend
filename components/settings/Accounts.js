import Link from 'next/link';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import baseURL from '@utils/baseURL';
import { useState, useEffect } from 'react';

const AccountSettings = ({ user, profile }) => {
  const [selectedGame, setSelectedGame] = useState();
  const [games, setGames] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [states, setStates] = useState({
    facebook: profile.social?.facebook || '',
    instagram: profile.social?.instagram || '',
    twitch: profile.social?.twitch || '',
    youtube: profile.social?.youtube || '',
    discord: profile.social?.discord || '',
    website: profile.social?.website || '',
    userIgn: '',
    gameId: selectedGame?.game._id
  });

  const handleIGN = (e) => {
    e.preventDefault();
    setShowModal(!showModal);
  };

  const toggleModal = (e, gameId) => {
    setShowModal(!showModal);
    if (gameId !== 'undefined') {
      setStates({ ...states, gameId: gameId });
    }
  };

  useEffect(() => {
    axios.get(`${baseURL}/api/all/games`).then((res) => setGames(res.data));
  }, []);

  const handleChangeCheck = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

  const addgames =
    games &&
    games.filter(
      ({ _id }) => !profile.playergames.some((x) => x.game?._id == _id)
    );

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`${baseURL}/api/profile/settings/ACCOUNTS`, states, {
          headers: {
            Authorization: Cookies.get('token')
          }
        })
        .then(toast.success('Updated User'))
        .then(setStates({ ...states, userIgn: '' }));
    } catch (err) {
      console.log(err);
      toast.error('Cannot Update User');
    }
  };
  return (
    <>
      <div className="main_middle profile_middle">
        <div className="AccountSettings">
          <div className="white_bg">
            <div className="left_setting_menu">
              <div className="menu_bloc">
                <i className="fa fa-cog" aria-hidden="true"></i>
                <Link href={`/settings/general`}> General</Link>
                <ul>
                  <li>
                    {' '}
                    <Link href={`/settings/general#profile`}>Profile</Link>
                  </li>
                  <li>
                    <Link href={`/settings/general#personal`}>
                      Personal Information
                    </Link>
                  </li>
                  <li>
                    <Link href={`/settings/general#contact`}>
                      Contact Details
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="menu_bloc">
                <i className="fa fa-user" aria-hidden="true"></i>
                <Link href={`/settings/accounts`} className="active">
                  Accounts
                </Link>
                <ul>
                  <li>
                    {' '}
                    <Link href={`/settings/accounts#gaming`}>
                      Gaming Accounts
                    </Link>
                  </li>
                  <li>
                    <Link href={`/settings/accounts#social`}>Social Links</Link>
                  </li>
                </ul>
              </div>

              <div className="menu_bloc">
                <i className="fa fa-shield" aria-hidden="true"></i>
                <Link href={`/settings/security`}>Security & Privacy</Link>
                <ul>
                  <li>
                    {' '}
                    <Link href={`/settings/security#change`}>
                      Change Password
                    </Link>
                  </li>
                  {/* <li>
                    <Link href={`/settings/`}>Two-factor Authentication</Link>
                  </li> */}
                  <li>
                    <Link href={`/settings/security#block`}>Blocked Users</Link>
                  </li>
                  <li>
                    <Link href={`/settings/security#privacy`}>Privacy</Link>
                  </li>
                  {/* <li>
                    <Link href={`/settings/`}>Cookies</Link>
                  </li> */}
                  <li>
                    <Link href={`/settings/security#delete`}>
                      Delete Account
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="right_setting_data">
              <h1 id="gaming">Gaming Accounts</h1>

              <div className="blokes">
                <div className="flex1 accountbg">
                  {profile.playergames &&
                    profile.playergames.map((game) => (
                      <>
                        <span>
                          {' '}
                          <img
                            style={{ height: '40px', width: '40px' }}
                            src={game.game?.imgUrl}
                            alt={game.game?.name}
                          />
                        </span>
                      </>
                    ))}
                </div>
              </div>

              <div className="blokes">
                {addgames &&
                  addgames.map((game,i) => (
                    <div className="flex1 accountbg" key={i}>
                      <div className="game_pic">
                        <a href="#!">
                          <img
                            style={{ height: '40px', width: '40px' }}
                            src={game.imgUrl}
                            alt={game.name}
                          />
                        </a>
                      </div>
                      <button
                        className="btn"
                        onClick={(e) => toggleModal(e, game._id)}
                      >
                        Connect
                      </button>
                    </div>
                  ))}
              </div>

              {showModal && (
                <div className="account_model_box ">
                  <button className="model_close" onClick={toggleModal}>
                    X
                  </button>
                  <div className="inner_model_box">
                    <h3>Enter IGN</h3>
                    <input
                      type="text"
                      name="userIgn"
                      onChange={handleChangeCheck}
                      value={states.userIgn}
                    />
                    <button className="btn" onClick={handleIGN}>
                      Yes
                    </button>
                  </div>
                  <div className="overlay"></div>
                </div>
              )}

              <h2 id="social">Social Links</h2>
              <form className="common_form">
                <div className="form-group">
                  <label htmlFor="">Facebook</label>
                  <input
                    type="text"
                    name="facebook"
                    value={states.facebook}
                    onChange={handleChangeCheck}
                    className="form-control facebook"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    value={states.instagram}
                    onChange={handleChangeCheck}
                    className="form-control instagram"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Twitch</label>
                  <input
                    type="text"
                    name="twitch"
                    value={states.twitch}
                    onChange={handleChangeCheck}
                    className="form-control twitch"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Youtube</label>
                  <input
                    type="text"
                    name="youtube"
                    value={states.youtube}
                    onChange={handleChangeCheck}
                    className="form-control youtube"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Discord</label>
                  <input
                    type="text"
                    name="discord"
                    value={states.discord}
                    onChange={handleChangeCheck}
                    className="form-control discord"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Website</label>
                  <input
                    type="text"
                    name="website"
                    value={states.website}
                    onChange={handleChangeCheck}
                    className="form-control website"
                  />
                </div>
              </form>
              <button className="btn newbtn" onClick={handleUpdate}>
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSettings;
