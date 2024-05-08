import { useState, useEffect } from 'react';
import baseURL from '@utils/baseURL';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ToggleButton from 'react-toggle-button';

const SecuritySettings = ({ user, profile }) => {
  const [state, setState] = useState({
    currentPassword: '',
    newPassword: '',
    retryPassword: '',
    isStatVisible: profile?.isStatVisible || false,
    isWagerVisible: profile?.isWagerVisible || false,
    isShortcutVisible: profile?.isShortcutVisible
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [blockData, setBlockData] = useState(profile.blockList);

  const router = useRouter();

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const togglePassword = (e, type) => {
    e.preventDefault();
    if (type === 'new') {
      setNewPasswordShown(!newPasswordShown);
    } else {
      setPasswordShown(!passwordShown);
    }
  };

  const handleDelectAccount = async (e) => {
    e.preventDefault();
    try {
      await axios
        .delete(`${baseURL}/api/profile/`, {
          headers: {
            Authorization: Cookies.get('token')
          }
        })
        .then(Cookies.remove('token'));
      toast.success('Account Deleted!');
      router.push('/login');
    } catch (err) {
      toast.error('Error Deleting');
    }
  };

  const handleUnblock = async (e, userId) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `${baseURL}/api/profile/block/UNBLOCK`,
          { userId },
          {
            headers: {
              Authorization: Cookies.get('token')
            }
          }
        )
        .then((res) => handleBlocks(res.data));
      $('a.model_close').parent().removeClass('show_model');
      toast.success('Unblocked User');
    } catch (err) {
      console.log(err);
      toast.error('Error Unblocking User');
    }
  };

  const handleBlocks = (data) => {
    setBlockData(data);
  };

  useEffect(() => {
    setBlockData(blockData);
  }, [blockData]);

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`${baseURL}/api/profile/settings/SECURITY`, state, {
          headers: {
            Authorization: Cookies.get('token')
          }
        })
        .then((res) =>
          res.data.msg === 'Success'
            ? toast.success('User Updated')
            : toast.error(res.data.msg)
        );
    } catch (err) {
      toast.error('Cannot update user');
    }
  };

  return (
    <>
      <div className="main_middle profile_middle">
        <div className="setting_pages">
          <div className="white_bg">
            <div className="left_setting_menu">
              <div className="menu_bloc">
                <i className="fa fa-cog" aria-hidden="true"></i>
                <Link href="/settings/general" className="active">
                  General
                </Link>
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
                <Link href="/settings/accounts">Accounts</Link>
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
                <Link href={`/settings/security`} className="active">
                  Security & Privacy
                </Link>
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
              <h1 id="change">Change Password</h1>
              <form className="common_form changePas">
                <div className="form-group eyesbox">
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    className="form-control"
                    name="currentPassword"
                    onChange={handleChange}
                    value={state.currentPassword}
                    placeholder="Enter Current Password"
                  />
                  <span
                    className={passwordShown ? '' : ' eyehide'}
                    onClick={togglePassword}
                  >
                    <i className="fa fa-eye" aria-hidden="true"></i>
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="form-group eyesbox">
                  <input
                    type={newPasswordShown ? 'text' : 'password'}
                    className="form-control"
                    name="newPassword"
                    onChange={handleChange}
                    value={state.newPassword}
                    placeholder="Enter New Password"
                  />
                  <span
                    className={newPasswordShown ? '' : ' eyehide'}
                    onClick={(e) => togglePassword(e, 'new')}
                  >
                    <i className="fa fa-eye" aria-hidden="true"></i>
                    <i className="fa fa-eye-slash" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="form-group">
                  <input
                    type={newPasswordShown ? 'text' : 'password'}
                    className="form-control"
                    name="retryPassword"
                    onChange={handleChange}
                    value={state.retryPassword}
                    placeholder="Re-Enter New Password"
                  />
                </div>
              </form>

              <div className="blokes">
                <h2 id="block">Blocked Users</h2>

                <div className="flex1">
                  <p>
                    View the users you have blocked. You can unblock them here.
                  </p>
                  <div className="rightBox">
                    <a href="#!" className="model_show_btn">
                      <button className="btn"> View Blocked Users</button>
                    </a>

                    <div
                      className="common_model_box edit_profile"
                      id="big_poup"
                    >
                      <a href="#!" className="model_close">
                        X
                      </a>
                      <div className="inner_model_box">
                        <div className="add_job_height">
                          <h3>Blocked User&apos;s</h3>
                          <form className="common_form" onSubmit="">
                            {blockData && blockData.length > 0 ? (
                              <ul className="unblock">
                                {blockData &&
                                  blockData.map((block,i) => (
                                    <li key={i}>
                                      <div className="flex">
                                        <img
                                          src={block.user.profilePicUrl}
                                          alt={block.user.name}
                                        />
                                        <a
                                          href={`/user/${block.user.username}`}
                                        >
                                          <h6>{block.user.name}</h6>
                                          <p>@{block.user.username}</p>
                                        </a>
                                      </div>
                                      <button
                                        className="btn"
                                        onClick={(e) =>
                                          handleUnblock(e, block.user._id)
                                        }
                                      >
                                        Unblock
                                      </button>
                                    </li>
                                  ))}
                              </ul>
                            ) : (
                              <p>No Data Found</p>
                            )}
                          </form>
                        </div>
                      </div>
                      <div className="overlay"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="blokes">
                <h2 id="privacy">Privacy</h2>

                <div className="flex1 mb-5">
                  <p>Review our Teams of Service</p>
                  <div className="rightBox">
                    <Link href="/legal/terms">
                      <button className="btn">Review</button>
                    </Link>
                  </div>
                </div>

                <div className="flex1 mb-5">
                  <p>
                    Hide your statistics, remember pleople can still view your
                    team statistics on teams page.
                  </p>
                  <div className="rightBox">
                    <ToggleButton
                      value={state.isStatVisible || false}
                      onToggle={(value) => {
                        setState({ ...state, isStatVisible: !value });
                      }}
                    />
                  </div>
                </div>

                <div className="flex1 mb-5">
                  <p>Deactivate 1v1 wager challenges</p>
                  <div className="rightBox">
                    <ToggleButton
                      value={state.isWagerVisible || false}
                      onToggle={(value) => {
                        setState({ ...state, isWagerVisible: !value });
                      }}
                    />
                  </div>
                </div>
                <div className="flex1 mb-5">
                  <p>Show Shortcuts In Dashboard</p>
                  <div className="rightBox">
                    <ToggleButton
                      value={state.isShortcutVisible}
                      onToggle={(value) => {
                        setState({ ...state, isShortcutVisible: !value });
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="blokes">
                <h2 id="delete">Delete Account</h2>

                <div className="flex1">
                  <p>
                    Deleting your account will erase your personal profile from
                    our platform. You can recover your account within 30 days of
                    deletion, after that it will be permanently deleted.
                  </p>
                  <div className="rightBox">
                    <a href="#!" className="model_show_btn more">
                      <button className="btn red">Delete Account</button>
                    </a>
                    <div className="common_model_box" id="share_prof">
                      <a href="#!" className="model_close">
                        X
                      </a>

                      <div className="inner_model_box">
                        <h3>Account Delete</h3>
                        <h4>Are you sure you want to delete your account?</h4>
                        <button className="btn">No</button>
                        <button className="btn" onClick={handleDelectAccount}>
                          Yes
                        </button>
                      </div>
                      <div className="overlay"></div>
                    </div>
                  </div>
                </div>
                <button className="btn" onClick={handleUpdate}>
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SecuritySettings;
