import Meta from '@components/Meta';
import { useState, useEffect, useContext, useMemo } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import valid from '@utils/valid';
import { useRouter } from 'next/router';
import { DataContext } from '@store/GlobalState';
import countryList from 'react-select-country-list';
import VerifyToken from '../components/VerifyToken';
import AllScript from './AllScript';
import Link from 'next/link';

const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
let cancel;
const strongRegex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?!.* ).{8,}$/;
const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{4,7})/;

const Signup = ({ games, avatars }) => {
  const router = useRouter();

  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone_number: ''
  });

  const [checkbox, setCheckbox] = useState(false);
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [verificationToken, setVerificationToken] = useState('');
  const [finishsubmit, setFinishSubmit] = useState(true);
  const [showIgn, setShowIgn] = useState('none');
  const [trigger, setTrigger] = useState(true);

  const [username, setUsername] = useState('');
  const [avatar, setAvatar] = useState();

  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);

  const [open, setOpen] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const [coverPic, setCoverPic] = useState([]);

  const { firstname, lastname, email, password, phone_number, gender } = user;

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const handleSelectAvatar = (avatar) => {
    setAvatar(avatar);

    $('.gamer_photo li').click(function () {
      $('.gamer_photo li').removeClass('active');
      $(this).addClass('active');
    });
  };

  const [country, setCountry] = useState('');
  const options = useMemo(() => countryList().getData(), []);

  const changeHandler = (e) => {
    setCountry(e.target.value);
  };
  const checkboxHandler = (e) => {
    setCheckbox(e.target.checked);
  };
  const [selectedGame, setSelectedGame] = useState();
  const [userign, setUserign] = useState('');

  const handleSelectGame = (game) => {
    setSelectedGame(game);
    setShowIgn('');
  };

  const handleUserign = (e) => {
    setUserign(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    setFormLoading(true);
    console.log('calling handle post ....');

    try {
      var name = firstname + ' ' + lastname;

      try {
        var avatarImage = avatar?.image;
        var gameId = selectedGame ? selectedGame._id : '';
        const formdata = new FormData();

        formdata.append('name', name);
        formdata.append('username', username);
        formdata.append('email', email);
        formdata.append('password', password);
        formdata.append('phone_number', phone_number);
        formdata.append('gender', gender);
        formdata.append('avatarImage', avatarImage);
        formdata.append('gameId', gameId);
        formdata.append('userign', userign);
        formdata.append('coverPic', coverPic);
        formdata.append('country', country);

        const res = await axios.post(`${baseURL}/api/signup`, formdata);

        setVerificationToken(res?.data?.verificationToken);
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
        toast.info(res.data.msg);
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
    } catch (error) {
      toast.error(
        'Oops! Sorry we cannot register at this time. Please try later.'
      );
    }
    setFormLoading(false);
  };

  const checkUsername = async () => {
    setUsernameLoading(true);
    try {
      cancel && cancel();
      const CancelToken = axios.CancelToken;
      const res = await axios.get(`${baseURL}/api/signup/${username}`, {
        cancelToken: new CancelToken((canceler) => {
          cancel = canceler;
        })
      });
      if (error !== null) setError(null);
      if (res.data.msg === 'Username available') {
        setUsernameAvailable(true);
        setUser((prevState) => ({ ...prevState, username }));
      }
    } catch (err) {
      setUsernameAvailable(false);
      setError('Username not available');
    }
    setUsernameLoading(false);
  };

  useEffect(() => {
    const isUser = Object.values({
      firstname,
      lastname,
      email,
      password,
      phone_number,
      gender
    }).every((item) => Boolean(item));
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  var gameId = selectedGame?._id;
  var avatarImage;
  if (avatar?.image) {
    avatarImage = avatar?.image;
  } else if (coverPic) {
    avatarImage = coverPic;
  }
  useEffect(() => {
    const isUser = Object.values({
      avatarImage,
      // gameId,
      country: country
    }).every((item) => Boolean(item));
    isUser ? setFinishSubmit(false) : setFinishSubmit(true);
  }, [
    country,
    avatarImage
    // , gameId
  ]);

  useEffect(() => {
    username === '' ? setUsernameAvailable(false) : checkUsername();
  }, [username]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setOpen(!open);
  };

  // const [step1, setStep1] = useState(true);
  const [step1, setStep1] = useState(true);
  const [showbtn, setShowbtn] = useState(true);

  const showstep2 = async (e) => {
    //Validate the sign up form
    e.preventDefault();

    const errMsg = valid(
      firstname,
      lastname,
      email,
      password,
      phone_number,
      gender
    );

    if (errMsg) {
      toast.info(errMsg);
      return dispatch({ type: 'NOTIFY', payload: { error: errMsg } });
    }

    setStep1(false);
    setShowbtn(false);
  };

  const showstep1 = () => {
    setStep1(true);
    setShowbtn(true);
  };

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });

    $('.msScroll_all').mCustomScrollbar({
      autoHideScrollbar: true
    });
  }, [trigger]);
  return (
    <>
      <div id="kt_body" className="bg-body">
        <Meta />
        <div className="singup_page_box">
          <form
            className="form w-100"
            noValidate="novalidate"
            id="kt_sign_up_form"
            onSubmit={handleSubmit}
          >
            {step1 ? (
              <>
                <div className="left_banner">
                  <span className="logo">
                    {' '}
                    <img src="/assets/media/login/logo.png" alt="" />
                  </span>

                  <h1>
                    A true Esports <br />
                    platform that brings <br />
                    all of Esports ecosystem <br />
                    in one place.
                  </h1>

                  <span className="props1 props">
                    {' '}
                    <img src="/assets/media/login/1.png" alt="" />
                  </span>
                  <span className="props2 props">
                    {' '}
                    <img src="/assets/media/login/2.png" alt="" />
                  </span>
                  <span className="props3 props">
                    {' '}
                    <img src="/assets/media/login/3.png" alt="" />
                  </span>
                  <span className="props4 props">
                    {' '}
                    <img src="/assets/media/login/4.png" alt="" />
                  </span>
                  <span className="props5 props">
                    {' '}
                    <img src="/assets/media/login/5.png" alt="" />
                  </span>
                  <span className="props6 props">
                    {' '}
                    <img src="/assets/media/login/6.png" alt="" />
                  </span>
                  <span className="props7 props">
                    {' '}
                    <img src="/assets/media/login/7.png" alt="" />
                  </span>
                  <span className="props8 props">
                    {' '}
                    <img src="/assets/media/login/8.png" alt="" />
                  </span>
                  <span className="props9 props">
                    {' '}
                    <img src="/assets/media/login/9.png" alt="" />
                  </span>
                </div>

                <div className="right_form">
                  <div className="d-flex flex-column flex-column-fluid align-center">
                    <h2>Create an Account</h2>
                    <div className="form_box">
                      <input type="hidden" name="remember" value="true" />
                      <div className="fv-row mb-7">
                        <label className="form-label"> Email </label>
                        <input
                          className="form-control form-control-lg form-control-solid"
                          type="email"
                          placeholder=""
                          name="email"
                          value={email}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </div>
                      <div className="row fv-row mb-7">
                        <div className="col-xl-6">
                          <label className="form-label"> First Name </label>
                          <input
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            placeholder=""
                            name="firstname"
                            minLength="4"
                            maxLength="18"
                            size="10"
                            value={firstname}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                        </div>
                        <div className="col-xl-6">
                          <label className="form-label">Last Name </label>
                          <input
                            className="form-control form-control-lg form-control-solid"
                            type="text"
                            placeholder=""
                            name="lastname"
                            minLength="4"
                            maxLength="18"
                            size="10"
                            value={lastname}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                        </div>
                      </div>
                      <div className="fv-row mb-7">
                        <label className="form-label"> Phone Number </label>
                        <input
                          className="form-control form-control-lg form-control-solid"
                          type="text"
                          placeholder=""
                          name="phone_number"
                          value={phone_number}
                          onChange={handleChange}
                          autoComplete="off"
                        />
                      </div>
                      <div className="fv-row mb-7">
                        <label className="form-label"> Gender</label>
                        <select
                          className="select"
                          name="gender"
                          value={gender}
                          onChange={handleChange}
                        >
                          <option value="">Select Gender...</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Others">Others</option>
                        </select>
                      </div>
                      <div className="fv-row mb-7">
                        <label className="form-label"> Username </label>
                        <input
                          className="form-control form-control-lg form-control-solid ${
                    username !== '' && !usernameAvailable ? 'bg-red-100' : ''
                  }"
                          type="text"
                          placeholder="something_legendary"
                          name="username"
                          value={username}
                          onChange={(e) => {
                            setUsername(e.target.value);
                            if (usernameRegex.test(e.target.value)) {
                              setUsernameAvailable(true);
                            } else {
                              setUsernameAvailable(false);
                            }
                          }}
                          autoComplete="off"
                        />
                        {username !== '' &&
                          !usernameLoading &&
                          !usernameAvailable && (
                            <small className="text-xs text-red-600">
                              {' '}
                              This username is invalid or not available{' '}
                            </small>
                          )}{' '}
                      </div>
                      <div
                        className="mb-10 fv-row"
                        data-kt-password-meter="true"
                      >
                        <div className="mb-1">
                          <label className="form-label">Password </label>
                          <div className="position-relative mb-3">
                            <input
                              className="form-control input form-control-lg form-control-solid"
                              type={passwordShown ? 'text' : 'password'}
                              placeholder=""
                              name="password"
                              value={password}
                              onChange={handleChange}
                              autoComplete="off"
                              id="password"
                              aria-label="password"
                            />
                            <span
                              className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                              data-kt-password-meter-control="visibility"
                            >
                              {' '}
                              {/* <i className="bi bi-eye-slash"  id="togglePassword"></i> */}{' '}
                              <i
                                className={`bi  ${
                                  open ? 'bi-eye' : 'bi-eye-slash'
                                }`}
                                onClick={togglePassword}
                              ></i>{' '}
                            </span>{' '}
                          </div>
                          <div
                            className="d-flex align-items-center mb-3"
                            data-kt-password-meter-control="highlight"
                          >
                            {mediumRegex.test(password) ? (
                              <>
                                {' '}
                                {strongRegex.test(password) ? (
                                  <>
                                    <div className=" active flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                    <div className=" active flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                    <div className=" active flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                    <div className=" active flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                    <div className=" active flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                  </>
                                ) : (
                                  <>
                                    {' '}
                                    {password.length === 0 ? null : (
                                      <>
                                        <div className=" active flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                        <div className=" active flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                        <div className=" active flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                        <div className="  flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                        <div className="  flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                      </>
                                    )}
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                {password.length > 0 && password.length < 8 ? (
                                  <>
                                    <div className=" active flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                    <div className="  flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                    <div className="  flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                    <div className="  flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                    <div className="  flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                  </>
                                ) : (
                                  <>
                                    <div className="  flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                    <div className="  flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                    <div className="  flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                    <div className="  flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                    <div className="  flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <p>
                          {mediumRegex.test(password) ? (
                            <>
                              {' '}
                              {strongRegex.test(password) ? (
                                'Strong'
                              ) : (
                                <> {password.length === 0 ? null : 'Medium'}</>
                              )}
                            </>
                          ) : (
                            <>
                              {password.length > 0 && password.length < 8
                                ? 'Weak'
                                : null}
                            </>
                          )}
                        </p>
                        <div
                          className="text-muted"
                          style={{ fontSize: '10px' }}
                        >
                          {' '}
                          Use 8 or more characters with a mix of atleast 1
                          Uppercase,1 Lowercase and numbers.{' '}
                        </div>
                      </div>
                      <div className="fv-row mb-10">
                        <label className="form-check form-check-custom form-check-solid form-check-inline">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="checkbox"
                            value={checkbox}
                            onClick={(e) => checkboxHandler(e)}
                          />
                          <span className="form-check-label terms">
                            {' '}
                            By creating an account, you agree to our
                            <a href="#"> Terms of use</a> &{' '}
                            <a href="#"> Privacy Policy.</a>{' '}
                          </span>{' '}
                        </label>
                      </div>
                      <div className="text-center">
                        <button
                          className={`btn rgtside ${showbtn ? '' : 'd-none'}`}
                          onClick={showstep2}
                          disabled={
                            submitDisabled ||
                            !usernameAvailable ||
                            checkbox === false
                          }
                        >
                          Continue
                        </button>
                      </div>
                      {/* <div className="d-flex align-items-center mt-5 mb-5">
                        <div className="border-bottom border-gray-300 mw-50 w-100"></div>
                        <span className="fw-bold text-gray-400 fs-7 mx-2">
                          OR
                        </span>
                        <div className="border-bottom border-gray-300 mw-50 w-100"></div>
                      </div>

                      <h4>Sign up with</h4>

                      <div className="singup_icons">
                        <a href="#">
                          {' '}
                          <i className="fa fa-google" aria-hidden="true"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-facebook" aria-hidden="true"></i>
                        </a>
                        <a href="#">
                          {' '}
                          <i className="fa fa-twitch" aria-hidden="true"></i>
                        </a>
                        <a href="#">
                          {' '}
                          <i className="fa fa-steam" aria-hidden="true"></i>
                        </a>
                        <a href="#">
                          {' '}
                          <img src="https://img.icons8.com/fluency/48/000000/discord.png" />
                        </a>
                      </div> */}

                      <div className="mb-10 text-center">
                        <div className="text-gray-400 already">
                          {' '}
                          Already have an account?{' '}
                          <Link  href="/login">
                          <a className="link-primary fw-bolder">
                            {' '}
                            Sign in{' '}
                          </a>
                          </Link>{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="game_sect">
                  <div className="left_game">
                    <img src="/assets/media/login/left_game.jpg" alt="" />
                  </div>

                  <div className="right_game_form">
                    <h1>Put your game face on</h1>
                    <h4>Upload a picture or choose on avatar</h4>

                    <div className="gamer_photo">
                      <div className="gamer_dp">
                        {avatar ? (
                          <img src={avatar.image} alt="" />
                        ) : (
                          <img src="/assets/media/login/left_game.jpg" alt="" />
                        )}
                      </div>
                      <ul>
                        <li className="uploads active flex flex-col items-center justify-center">
                          <div className="style_file_upload1">
                            <input
                              type="file"
                              name="coverPhoto"
                              id="coverPhoto"
                              className="inputfile"
                              onChange={(e) => {
                                setCoverPic(e.target.files[0]);
                              }}
                            />
                            <label htmlFor="coverPhoto" >
                              <span className='flex flex-col items-center justify-center'>
                                {' '}
                                <i
                                  className="fa fa-cloud-upload"
                                  aria-hidden="true"
                                ></i>
                                <p> Upload</p>
                              </span>
                            </label>
                          </div>
                        </li>

                        {avatars &&
                          avatars.map((avatar,i) => ((user?.gender==avatar?.gender)?
                            (<li className="" key={i}>
                            { console.log("inside signup user gender is ", user.gender,"avatar gender is ")}
                              <div className="form-group">
                                <a
                                  href="#!"
                                  onClick={() => handleSelectAvatar(avatar)}
                                >
                                  <img src={avatar.image} alt={avatar.title} />
                                </a>
                              </div>
                            </li>):(<li className="" key={i}>
                            { console.log("inside signup else section user gender  is ", user.gender,"avatar gender is ")}
                              <div className="form-group">
                                <a
                                  href="#!"
                                  onClick={() => handleSelectAvatar(avatar)}
                                >
                                  <img src={avatar.image} alt={avatar.title} />
                                </a>
                              </div>
                            </li>)
                          ))}
                      </ul>
                    </div>

                    <div className="pick_game">
                      <h2>Games (Optional) </h2>
                      <ul>
                        {games &&
                          games.slice(0, 4).map((game,i) => (
                            <li key={i}>
                              <a
                                href="#!"
                                onClick={() => handleSelectGame(game)}
                              >
                                <img src={game.imgUrl} alt={game.name} />
                              </a>
                              <div
                                className="hovers"
                                style={{ display: showIgn }}
                              >
                                <span>
                                  <i
                                    className="fa fa-check"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                <input
                                  type="text"
                                  name="userign"
                                  onChange={handleUserign}
                                  value={userign}
                                />
                              </div>
                            </li>
                          ))}
                      </ul>

                      <a
                        href="#!"
                        className="model_show_btn"
                        onClick={() => setTrigger(!trigger)}
                      >
                        see all
                      </a>
                      <div className="common_model_box" id="see_all">
                        <a href="#!" className="model_close">
                          X
                        </a>

                        <div className="inner_model_box">
                          <h3>All Games</h3>
                          <div className="poup_height msScroll_all">
                            <ul>
                              {games &&
                                games.map((game,i) => (
                                  <li key={i}>
                                    <a
                                      href="#!"
                                      onClick={() => handleSelectGame(game)}
                                    >
                                      <img src={game.imgUrl} alt={game.name} />
                                    </a>
                                    <div
                                      className="hovers"
                                      style={{ display: showIgn }}
                                    >
                                      <span>
                                        <i
                                          className="fa fa-check"
                                          aria-hidden="true"
                                        ></i>
                                      </span>
                                      <input
                                        type="text"
                                        name="userign"
                                        onChange={handleUserign}
                                        value={userign}
                                      />
                                    </div>
                                  </li>
                                ))}
                            </ul>
                          </div>
                        </div>
                        <div className="overlay"></div>
                      </div>
                    </div>

                    <div className="form-group">
                      <h2>Country</h2>
                      <select name="country" onChange={changeHandler}>
                        <option value="">Select Country...</option>
                        {options.map((opt) => (
                          <>
                            <option value={opt.value}>{opt.label}</option>
                          </>
                        ))}
                      </select>
                    </div>

                    <div className="two_btn signup2">
                      <button
                        onClick={showstep1}
                        className={`btn3 btn rgtside ${
                          showbtn ? 'd-none' : ''
                        }`}
                      >
                        Back
                      </button>{' '}
                      <VerifyToken
                        verificationToken={verificationToken}
                        finishsubmit={finishsubmit}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const response = await fetch(`${baseURL}/api/all/games`);
  const games = await response.json();

  const resp = await fetch(`${baseURL}/api/all/avatars`);
  const avatars = await resp.json();

  return {
    props: { games, avatars }
  };
};

export default Signup;
