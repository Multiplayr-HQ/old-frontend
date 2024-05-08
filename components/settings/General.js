import Link from 'next/link';
import baseURL from '@utils/baseURL';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import countryList from 'react-select-country-list';
import { useMutation } from 'react-query';
import moment from 'moment';
import { useState, useEffect, useMemo } from 'react';

const GeneralSettings = ({ user, profile }) => {
  const name = user.name.split(' ');
  const [avatar, setAvatar] = useState({ image: user?.profilePicUrl });

  var avatarImage;
  if (!avatar?.image.includes('res')) {
    avatarImage = avatar?.image;
  } else {
    avatarImage = user?.profilePicUrl;
  }

  const [states, setStates] = useState({
    firstName: name[0],
    lastName: name[1],
    username: user.username,
    profilePicUrl: avatar.image,
    bio: profile.bio,
    country: user.country || '',
    gender: profile.gender || '',
    DOB: moment(profile?.DOB).format('yyyy-MM-DD') || '',
    timeZone: '',
    phoneNumber: user.phone_number || null,
    email: user.email || ''
  });

  const handleSelectAvatar = (avatar) => {
    setAvatar({ image: avatar?.image });
    setStates({ ...states, profilePicUrl: avatar?.image });

    $('.gamer_photo li').click(function () {
      $('.gamer_photo li').removeClass('active');
      $(this).addClass('active');
    });
  };

  const [avatars, setAvatars] = useState([]);

  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  const handleChangeCheck = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    axios.get(`${baseURL}/api/all/avatars`).then((res) => setAvatars(res.data));
  }, []);

  const handleCoverSubmit = async (e) => {
    e.preventDefault();
    var img = e.target.files[0];
    const formdata = new FormData();
    formdata.append('coverPic', img);
    try {
      await axios.put(`${baseURL}/api/auth/coverPic`, formdata, {
        headers: {
          Authorization: Cookies.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('User settings have been updated');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const mutation = useMutation(
    async (formdata) =>
      await axios.post(`${baseURL}/api/auth/profilePic`, formdata, {
        headers: {
          Authorization: Cookies.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      })
  );

  const handleProfilePic = async (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    const formdata = new FormData();
    formdata.append('profilePic', file);

    try {
      await mutation.mutateAsync(formdata);
      toast.success('User settings have been updated');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    try {
      axios
        .put(`${baseURL}/api/profile/settings/GENERAL`, states, {
          headers: {
            Authorization: Cookies.get('token')
          }
        })
        .then(toast.success('Updated User'));
    } catch (err) {
      toast.error('Cannot Update User');
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
              <h2 id="#profile">Profile</h2>
              <form className="">
                <h4>Avatar</h4>
                <div className="form-group">
                  <div className="gamer_photo">
                    <div className="gamer_dp">
                      {avatar ? (
                        <img src={avatar.image} alt="" />
                      ) : (
                        <img src="/assets/media/login/left_game.jpg" alt="" />
                      )}
                    </div>
                    <ul>
                      <li className="uploads active">
                        <div className="style_file_upload1">
                          <input
                            id="user-photo"
                            name="user-photo"
                            type="file"
                            className="custom-file-input"
                            onChange={handleProfilePic}
                            accept="image/*"
                          />
                          <label htmlFor="user-photo">
                            <span>
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
                        avatars.map((avatar,i) => (
                          <li className="" key={i}>
                            <div className="form-group">
                              <a
                                href="#!"
                                onClick={() => handleSelectAvatar(avatar)}
                              >
                                <img src={avatar.image} alt={avatar.title} />
                              </a>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
                <h4>Background</h4>
                <div className="form-group">
                  <span className="edit_cover_photo ">
                    <div className="style_file_upload">
                      <input
                        type="file"
                        name="coverPhoto"
                        id="coverPhoto"
                        className="inputfile"
                        onChange={handleCoverSubmit}
                      />
                      <label htmlFor="coverPhoto">
                        <span>
                          {' '}
                          <i
                            className="fa fa-camera"
                            aria-hidden="true"
                          ></i>{' '}
                          Upload Photo
                        </span>
                      </label>
                    </div>
                  </span>
                </div>
              </form>

              <h2 id="personal">Personal</h2>
              <form className="common_form">
                <div className="two_btn">
                  <div className="form-group">
                    <label htmlFor="">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      onChange={handleChangeCheck}
                      value={states.firstName}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor=""> Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      onChange={handleChangeCheck}
                      value={states.lastName}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    onChange={handleChangeCheck}
                    value={states.username}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="">Bio</label>
                  <textarea
                    type="textarea"
                    className="form-control"
                    name="bio"
                    onChange={handleChangeCheck}
                    value={states.bio}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="">Gender</label>
                  <select
                    name="gender"
                    id="gender"
                    className="select"
                    onChange={handleChangeCheck}
                    value={states.gender}
                  >
                    <option value="">Select Gender...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    name="DOB"
                    onChange={handleChangeCheck}
                    value={states.DOB}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="">Country</label>
                  <select
                    value={states.country}
                    name="country"
                    onChange={handleChangeCheck}
                  >
                    <option value="">Select Country...</option>
                    {options &&
                      options.map((opt) => (
                        <>
                          <option value={opt.value}>{opt.label}</option>
                        </>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="">Timezone</label>
                  <input
                    disabled={true}
                    type="text"
                    className="form-control"
                    value=""
                  />
                </div>
              </form>

              <h2 id="contact">Contact Details</h2>
              <form className="common_form">
                <div className="form-group">
                  <label htmlFor="">Phone No.</label>
                  <input
                    type="number"
                    className="form-control"
                    name="phoneNumber"
                    onChange={handleChangeCheck}
                    value={states.phoneNumber}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="">Email Id:</label>
                  <input
                    type="text"
                    disabled={true}
                    className="form-control"
                    name="email"
                    onChange={handleChangeCheck}
                    value={states.email}
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

export default GeneralSettings;
