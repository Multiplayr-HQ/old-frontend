import PropTypes from 'prop-types';
import Head from 'next/head';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import Badges from './badges';
import ProfileGameStat from './ProfileGameStat';
import { useRouter } from 'next/router';
import ReactCountryFlag from 'react-country-flag';
import ProfileEdit from './ProfileEdit';

const ProfileBox = ({ user, Userdata, profile, games, teams }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [selectedGame, setSelectedGame] = useState();
  const [showIgn, setShowIgn] = useState('none');
  const [step1, setStep1] = useState(true);
  const [later, setLater] = useState(false);

  const [coverPic, setCoverPic] = useState(null);
  const [userIgn, setUserIgn] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  let [tabData, setTabData] = useState([]);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const isFollow =
    Userdata.followers?.filter((x) => x.user === user._id).map((x) => x.user)
      .length > 0;

  const isBlocked =
    profile.blockList?.filter((y) => y.user._id === Userdata?.profile?.user._id)
      .length > 0;

  const isfollower =
    Userdata.following?.filter((z) => z.user === user._id).map((x) => x.user)
      .length > 0;

  const [follow, setFollow] = useState(isFollow);
  const [blocked, setBlocked] = useState(isBlocked);

  const followhandlesubmit = async (e) => {
    e.preventDefault();
    mutate({ follow });
    setFollow(true);
  };

  const addFollow = async () => {
    const res = await fetch(`${baseURL}/api/profile/follow/${SrhUser._id}`, {
      method: 'POST',
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };

  const { mutate } = useMutation(addFollow);

  const SrhUser = Userdata?.profile?.user;
  const isLoggedInUser = user._id === SrhUser?._id;

  const mutation = useMutation(
    async (formdata) =>
      await axios.post(`${baseURL}/api/auth/profilePic`, formdata, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    setProfilePic(file);
    const formdata = new FormData();
    formdata.append('profilePic', file);
    try {
      await mutation.mutateAsync(formdata);
      toast.success('User settings have been updated');
      refreshData();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const handleCoverSubmit = async (e) => {
    var img = e.target.files[0];

    // if (
    //   !pixelarity.open(
    //     img,
    //     false,
    //     function (res) {
    //       $('#result').attr('src', res);
    //     },
    //     'jpg',
    //     1
    //   )
    // ) {
    //   alert('Whoops! That is not an image!');
    // }

    e.preventDefault();
    const formdata = new FormData();
    setCoverPic(img);
    formdata.append('coverPic', img);
    try {
      await axios.put(`${baseURL}/api/auth/coverPic`, formdata, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      });

      toast.success('User settings have been updated');
      refreshData();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  useEffect(() => {
    try {
      $('.common_poup').fancybox({
        wrapCSS: 'common_poup_wrap',
  
        minHeight: 450,
        fitToView: true,
        autoSize: true,
        autoScale: true
      });
      
    } catch (error) {
      
    }
  }, []);

  const handleSelectGame = async (obj) => {
    setSelectedGame({ game: obj });
    setStep1(false);
    setShowIgn('');
  };

  const deletehandleSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.delete(`${baseURL}/api/profile/${user._id}`);
      toast.success('Your Account has been successfully deleted');
      router.push('/login');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const handleTabs = async (Type) => {
    await axios
      .get(
        `${baseURL}/api/profile/profiledata/${Type}/${Userdata?.profile?._id}`,
        {
          headers: {
            Authorization: cookie.get('token')
          }
        }
      )
      .then((res) => setTabData(res.data));
  };

  const handleBlock = async (e) => {
    e.preventDefault();
    await axios.put(
      `${baseURL}/api/profile/block/BLOCK`,
      { userId: SrhUser._id },
      {
        headers: {
          Authorization: cookie.get('token')
        }
      }
    );
    toast.success('Blocked User');
    setBlocked(!blocked);
  };

  return (
    <>
      <div className="profile_box for_profile">
        <div className="profile_cover_photo">
          {/* <div className="report">
            <a href="#">
              <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
            </a>
          </div> */}
          <form>
            <img
              className=""
              id="result"
              src={
                coverPic ? URL.createObjectURL(coverPic) : SrhUser?.coverPicUrl
              }
              alt={SrhUser?.name}
            />

            {isLoggedInUser ? (
              <span className="edit_cover_photo ">
                <div className="style_file_upload">
                  <input
                    type="file"
                    name="coverPhoto"
                    id="coverPhoto"
                    className="custom-file-input"
                    onChange={handleCoverSubmit}
                  />
                  <label htmlFor="coverPhoto">
                    <span>
                      {' '}
                      <i className="fa fa-camera" aria-hidden="true"></i> Upload
                      Cover Photo
                    </span>
                  </label>
                </div>
              </span>
            ) : null}
          </form>
        </div>

        {isLoggedInUser ? (
          <>
            {deleteModal && (
              <div className="delete_post">
                <form onSubmit={deletehandleSubmit}>
                  <div className="delete_post_div">
                    <p>Confirm on Deleting the Account?</p>
                    <button
                      onClick={() => setDeleteModal(false)}
                      className="btn"
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn">
                      Confirm
                    </button>
                  </div>
                </form>
                <div className="overlay"></div>
              </div>
            )}
          </>
        ) : null}
        <div className="profile_dp_box">
          <div className="profile_pic">
            <form>
              <img
                className=""
                src={
                  profilePic
                    ? URL.createObjectURL(profilePic)
                    : SrhUser?.profilePicUrl
                }
                alt={SrhUser?.name}
              />
              {isLoggedInUser ? (
                <div className="edit_photo">
                  <label htmlFor="user-photo" className="edit_label">
                    <i className="fa fa-picture-o" aria-hidden="true"></i>
                  </label>
                  <input
                    id="user-photo"
                    name="user-photo"
                    type="file"
                    className="custom-file-input"
                    onChange={handleSubmit}
                    accept="image/*"
                  />
                </div>
              ) : null}
            </form>
            <span className="online_icon"></span>
          </div>

          <div className="profile_details pro_detail_box">
            <div className="top_details">
              <div className="name_box">
                <span className="game_name"> {SrhUser?.username} </span>
                <span className="name">
                  {SrhUser?.name}{' '}
                  <span className="follower">
                    {Userdata?.followers?.length} Followers
                  </span>
                </span>
              </div>
              <div className="flag">
                <ReactCountryFlag
                  countryCode={user.country}
                  svg
                  style={{
                    width: '2em',
                    height: '2em'
                  }}
                />
              </div>
              <div className="tick">
                {later === false ? null : (
                  <span className="active">
                    <i className="fa fa-check" aria-hidden="true"></i>
                  </span>
                )}
              </div>
              {isLoggedInUser ? null : (
                <div className="button">
                  <button className="btn" onClick={followhandlesubmit}>
                    {follow === true ? 'Unfollow' : 'Follow'}
                  </button>{' '}
                  <a href="#" className="btn">
                    Message
                  </a>
                  {follow === true || isfollower ? (
                    <a href="#" className="btn" onClick={handleBlock}>
                      {blocked ? 'Unblock' : 'Block'}
                    </a>
                  ) : null}
                </div>
              )}
            </div>

            <div className="bottom_details">
              <div className="current_status">
                <div className="current_team">
                  <span className="ct"> Current Team</span>

                  {Userdata?.currentTeam ? (
                    <a href={`/team/${Userdata?.profile?.current_team}`}>
                      <span className="were">
                        {Userdata?.currentTeam}{' '}
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                      </span>
                    </a>
                  ) : (
                    <a href={`#`}>
                      <span className="were">
                        {Userdata?.currentTeam}{' '}
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                      </span>
                    </a>
                  )}
                </div>
                {Userdata?.profile?.headline.team ? (
                  <div className="game_role">
                    <span className="ct"> In Game Role</span>
                    <a>
                      <span className="were">
                        {Userdata?.currentTeam &&
                          Userdata?.profile?.headline.inGameRole}{' '}
                        -{' '}
                        {Userdata?.currentTeam &&
                          Userdata?.profile?.headline.game?.name}
                      </span>
                    </a>
                  </div>
                ) : (
                  ' '
                )}
              </div>

              <Badges Userdata={Userdata} />
            </div>
          </div>
        </div>
        <div className="bio_box profile_bio">
          <div className="left_bio">
            <div className="top_bio">
              <h3>BIO</h3>
              <div className="socail">
                {Userdata?.profile?.social?.facebook ? (
                  <a
                    href={`https://www.facebook.com/${Userdata?.profile?.social?.facebook}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i
                      className="fa fa-facebook-official"
                      aria-hidden="true"
                    ></i>
                  </a>
                ) : null}
                {Userdata?.profile?.social?.instagram ? (
                  <a
                    href={`https://www.instagram.com/${Userdata?.profile?.social?.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                ) : null}

                {Userdata?.profile?.social?.twitch ? (
                  <a
                    href={`https://www.twitch.tv/${Userdata?.profile?.social?.twitch}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-twitch" aria-hidden="true"></i>
                  </a>
                ) : null}

                {Userdata?.profile?.social?.youtube ? (
                  <a
                    href={`https://www.youtube.com/c/${Userdata?.profile?.social?.youtube}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-youtube" aria-hidden="true"></i>
                  </a>
                ) : null}

                {Userdata?.profile?.social?.discord ? (
                  <a
                    href={`https://${Userdata?.profile?.social?.discord}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src="/assets/media/social/discord.png"
                      height="20px"
                      width="20px"
                    />
                  </a>
                ) : null}

                {Userdata?.profile?.social?.website ? (
                  <a
                    href={`https://${Userdata?.profile?.social?.website}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <i className="fa fa-globe" aria-hidden="true"></i>
                  </a>
                ) : null}
              </div>

              {isLoggedInUser ? (
                <div onClick={() => handleTabs('TEAMS')}>
                  <ProfileEdit
                    Userdata={Userdata?.profile}
                    allteams={tabData?.teams}
                    user={user}
                    games={games}
                  />
                </div>
              ) : null}
            </div>

            <p> {Userdata?.profile ? Userdata?.profile?.bio : ''} </p>

            <div className="prof_games">
              <div className="games">
                <h3>GAMES</h3>
                {Userdata?.profile?.playergames.length !== 0 ? (
                  <div className="tit">
                    {Userdata?.profile?.playergames.map((game) => (
                      <>
                        <span>
                          {' '}
                          <img
                            src={game?.game?.imgUrl}
                            alt={game?.game?.name}
                          />
                        </span>
                      </>
                    ))}
                  </div>
                ) : (
                  <p>No Games yet.</p>
                )}
              </div>
            </div>
          </div>
          {Userdata?.profile?.isStatVisible !== true ? (
            <ProfileGameStat
              user={user}
              games={Userdata?.profile?.playergames}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ProfileBox;
