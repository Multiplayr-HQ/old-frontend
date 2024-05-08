import Meta from '@components/Meta';
import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { DataContext } from '@store/GlobalState';
import { postData } from '@utils/fetchData';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import Link from 'next/link';

const SignIn = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [passwordShown, setPasswordShown] = useState(false);
  const [open, setOpen] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [waitingMail, setWaitingMail] = useState('');

  const { email, password } = user;

  const handleChange = (e) => {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
    dispatch({ type: 'NOTIFY', payload: {} });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch({ type: 'NOTIFY', payload: { loading: true } });

      const respa = await axios.post(`${baseURL}/api/auth`, user);
      const res = respa.data;

      if (res.err)
        return dispatch({ type: 'NOTIFY', payload: { error: res.err } });

      dispatch({ type: 'NOTIFY', payload: { success: res.msg } });

      dispatch({
        type: 'AUTH',
        payload: {
          token: res.access_token,
          user: res.user
        }
      });

      cookie.set('refreshtoken', res.refresh_token, {
        path: 'api/auth/accessToken'
      });

      localStorage.setItem('firstLogin', true);
      setToken(res.token);
      //toast.info('Welcome back...' + res.user.name);
    } catch (error) {
      toast.info('Sorry! Please verify your login credentials and try again.');
    }
  };

  const setToken = (token) => {
    cookie.set('token', token);
  };

  useEffect(() => {
    const isUser = Object.values({ email, password }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
  }, [user]);

  useEffect(() => {
    if (Object.keys(auth).length !== 0) router.push('/dashboard');
  }, [auth]);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setOpen(!open);
  };

  const handleWaitSubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${baseURL}/api/all/waitinglist`, {
          waitingMail
        })
        .then((res) => {
          if (res.data.msg === 'Mail Already Exists') {
            toast.error(res.data.msg);
          } else {
            toast.success(res.data.msg);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      toast.info('Sorry Please Enter valid Email.');
    }
  };

  return (
    <div id="kt_body" className="bg-body">
      <Meta />

      <div className="singup_page_box">
        <div className="left_banner">
          <span className="logo">
            {' '}
            <img src="/assets/media/logo.png" alt="Logo" />
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
          <div className="d-flex flex-center flex-column flex-column-fluid">
            <h2>Log In</h2>
            <div className="form_box">
              <form
                className="form w-100"
                noValidate="noValidate"
                id="kt_sign_in_form"
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="remember" value="true" />

                <div className="fv-row mb-10">
                  <label className="form-label mb-10">Email</label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Email / PhoneNumber / Username"
                  />
                </div>
                <div className="fv-row mb-10">
                  <div className="d-flex flex-stack mb-2">
                    <label className="form-label">Password</label>
                  </div>
                  <div className="position-relative mb-3">
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type={passwordShown ? 'text' : 'password'}
                      name="password"
                      value={password}
                      onChange={handleChange}
                      autoComplete="off"
                    />
                    <span
                      className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                      data-kt-password-meter-control="visibility"
                    >
                      {' '}
                      {/* <i className="bi bi-eye-slash"  id="togglePassword"></i> */}{' '}
                      <i
                        className={`bi  ${open ? 'bi-eye' : 'bi-eye-slash'}`}
                        onClick={togglePassword}
                      ></i>{' '}
                    </span>{' '}
                  </div>
                </div>

                <div className="fv-row mb-10 remeberme">
                  <label className="form-check form-check-custom form-check-solid form-check-inline">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="toc"
                      value="1"
                    />
                    <span className="form-check-label terms"> Remember Me</span>{' '}
                  </label>

                  <Link href="/user/forgotpassword" className="link-primary fs-6 ">
                    Forgot Password ?
                  </Link>
                </div>

                <div className="text-center">
                  <button
                    type="submit"
                    id="kt_sign_in_submit"
                    className="btn mt-5 btn-lg btn-primary w-100 mb-5"
                  >
                    <span className="indicator-label">Log In and Play</span>
                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>

                  {/* <div className="d-flex align-items-center mt-5 mb-5">
                    <div className="border-bottom border-gray-300 mw-50 w-100"></div>
                    <span className="fw-bold text-gray-400 fs-7 mx-2">OR</span>
                    <div className="border-bottom border-gray-300 mw-50 w-100"></div>
                  </div> */}

                  {/* <h4>Log in with</h4> */}

                  {/* <div className="singup_icons">
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
                      Don&apos;t have an account?
                      <Link href="/signup">
                      <a className="link-primary fw-bolder" >
                        {' '}
                        Sign Up{' '}
                      </a></Link>{' '}
                    </div>
                  </div>
                </div>
              </form>
              <div className="join_box">
                <div>
                  <button
                    className="btn"
                    onClick={() => setIsWaiting(!isWaiting)}
                  >
                    {' '}
                    Join The Revolution{' '}
                  </button>
                </div>
                {isWaiting && (
                  <form onSubmit={handleWaitSubmit}>
                    <div className="join_revolution">
                      <input
                        type="text"
                        name="email"
                        value={waitingMail}
                        onChange={(e) => setWaitingMail(e.target.value)}
                        autoComplete="off"
                        placeholder="Email"
                      />
                      <button
                        className="btn"
                        type="submit"
                        disabled={waitingMail.length < 14}
                      >
                        submit
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
