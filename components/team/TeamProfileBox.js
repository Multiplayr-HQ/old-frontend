import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import ReactCountryFlag from 'react-country-flag';
import Moment from 'moment';
import TeamFollow from './TeamFollow';
import TeamRequest from '../discover/invites/TeamRequest';
import TeamChallenge from '../challenges/TeamChallenge';
import TeamEdit from './TeamEdit';
import ImageDropzone from '@components/common/ImageDropzone';
import { useMutation } from 'react-query';

const TeamProfileBox = ({
  user,
  data,
  isManager,
  isAdmin,
  isOwner,
  isCEO,
  isSupportAdmin,
  profile,
  teams
}) => {
  const [attr, setAttr] = useState(data.team?.attributes);
  const [sociallinks, setSociallinks] = useState(data.team?.social);
  const [later, setLater] = useState(false);
  const [trigger, setTrigger] = useState(true);
  const [images, setImages] = useState([]);

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const [coverPic, setCoverPic] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const [sponsors, setSponsors] = useState([]);

  function handleChangeAttr(e) {
    setAttr({ ...attr, [e.target.name]: e.target.value });
  }

  function handleChangeSocial(e) {
    setSociallinks({ ...sociallinks, [e.target.name]: e.target.value });
  }

  const handleAttrForm = async (e) => {
    e.preventDefault();
    if (
      attr.roles === '' ||
      attr.regions === '' ||
      attr.teamtype === '' ||
      attr.platform === '' ||
      attr.language === '' ||
      attr.paid === '' ||
      attr.mic === ''
    ) {
      toast.warning('Please enter all fields or check your inputs');
    } else {
      try {
        await axios.put(
          `${baseURL}/api/all/teamattribute/${data.team._id}`,
          attr,
          {
            headers: {
              Authorization: cookie.get('token'),
              'Content-Type': 'application/json'
            }
          }
        );
        toast.success("Detail's successfully have been updated");
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
      refreshData();
    }
  };

  function handleChange(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setAttr({ ...attr, [e.target.name]: value });
    } else {
      setAttr({ ...attr, [e.target.name]: e.target.value });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const [file] = e.target.files;
    setProfilePic(file);
    const formdata = new FormData();
    formdata.append('profilePic', file);
    try {
      await axios.put(
        `${baseURL}/api/teams/profilePic/${data.team._id}`,
        formdata,
        {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      toast.success('Team Profile Photo have been updated');
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
    setCoverPic(img);
    const formdata = new FormData();
    formdata.append('coverPic', img);
    try {
      await axios.put(
        `${baseURL}/api/teams/coverPic/${data.team._id}`,
        formdata,
        {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      toast.success('Cover Photo have been updated');
      refreshData();
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    axios.delete(`${baseURL}/api/teams/${data.team._id}`, {
      headers: {
        Authorization: cookie.get('token')
      }
    });
    toast.success('Deleted Successfully');
    router.push('/dashboard');
  };
  let Id = '';
  const mutation = useMutation(async (formdata) => {
    await axios.post(
      `${baseURL}/api/admin/team/${data.team._id}/${user._id}`,
      formdata,
      {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'application/json'
        }
      }
    );
  });

  const handleClaim = async (e, data) => {
    e.preventDefault();
    Id = data._id;
    const formdata = new FormData();
    for (const key of Object.keys(images)) {
      formdata.append('images', images[key]);
    }

    try {
      await mutation.mutateAsync(formdata);
      $('a.model_close').parent().removeClass('show_model');
      toast.success('User images have been updated');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please upload your images again');
    }
  };

  const empManager =
    data.team &&
    data.team.employees.map((x) => x).filter((x) => x.role === 'Manager');
  const empCoach =
    data.team &&
    data.team.employees.map((x) => x).filter((x) => x.role === 'Coach');

  useEffect(() => {
    axios
      .get(`${baseURL}/api/teams/teamdata/SPONSORS/${data.team?._id}`)
      .then((res) => setSponsors(res.data.sponsors));
  }, []);

  const isFollow =
    data.team &&
    data.team.followers
      ?.filter((team) => team?.user === user?._id)
      .map((team) => team?.user).length > 0;

  const playerId = profile.playergames[0]?.player?._id;

  const isReqSent =
    data.team &&
    data.team.request?.filter((reque) => reque.playerId._id === playerId)
      .length > 0;

  const isPlayer =
    data.team &&
    data.team.players?.filter((plyr) => plyr.playerId === playerId).length > 0;

  console.log("data",data);

  return (
    <div className="profile_box team_profile_box">
      <div className="profile_cover_photo">
        <div className="report">
          <a href="#">
            <i className="fa fa-flag" aria-hidden="true"></i> Report Team
          </a>
        </div>

        <form>
          <img
            className=""
            id="result"
            src={data.team && data.team.coverPhoto}
            alt=""
          />

          <span className="edit_cover_photo ">
            <div className="style_file_upload">
              <input
                type="file"
                name="coverPhoto"
                id="coverPhoto"
                className="custom-file-input"
                onChange={handleCoverSubmit}
              />
              {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? (
                <label htmlFor="coverPhoto">
                  <span>
                    <i className="fa fa-camera" aria-hidden="true"></i> Upload
                    Cover Photo
                  </span>
                </label>
              ) : null}
            </div>
          </span>
        </form>
      </div>

      <div className="profile_dp_box">
        <div className="profile_pic">
          {/* <img src={data.team.imgUrl} alt="" /> */}

          <form>
            <img
              className="rounded-full h-full w-full object-cover"
              src={data.team?.imgUrl}
              alt=""
            />
            {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? (
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
                />
              </div>
            ) : null}
          </form>
        </div>

        <div className="profile_details">
          <div className="top_details">
            <div className="name_box">
              <span className="game_name"> {data.team.name} </span>
              <span className="name">
                Founded {Moment(data.team.founded).format('MMM YYYY')}
              </span>
              <span className="follower">
                {data.team.followers?.length} followers
              </span>
            </div>

            <div className="flag">
              <ReactCountryFlag
                countryCode={data.team.region}
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
                  {data.team.isVerified ? (
                    <i className="fa fa-check" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-question-circle" aria-hidden="true"></i>
                  )}
                </span>
              )}
            </div>
            {isManager ||
            isAdmin ||
            isOwner ||
            isCEO ||
            isSupportAdmin ? null : (
              <>
                {isPlayer ? (
                  <>
                    <TeamFollow
                      team={data.team}
                      user={user}
                      isFollow={isFollow}
                    />
                    <div className="button">
                      <a href="#" className="btn">
                        MESSAGE
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="button">
                    <TeamFollow
                      team={data.team}
                      user={user}
                      isFollow={isFollow}
                    />
                    {data.team.isClaimed === false ? (
                      <>
                        <a
                          href="javascript:void(0);"
                          className="model_show_btn"
                          onClick={() => setTrigger(!trigger)}
                        >
                          Claim
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
                              <h3>Claim {data.name}</h3>
                            </div>
                            <div className="gallery_box claim-gallery">
                              <ImageDropzone setImages={setImages} />
                            </div>
                            <div className="upload_btn">
                              <button
                                onClick={(e) => handleClaim(e, data)}
                                className="btn"
                              >
                                UPLOAD NOW
                              </button>
                            </div>
                          </div>
                          <div className="overlay"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <a href="#" className="btn">
                          <TeamRequest
                            team={data.team}
                            profile={profile}
                            isReqSent={isReqSent}
                            isAdmin={isAdmin}
                          />
                        </a>
                        <TeamChallenge team={data.team} teams={teams} />
                      </>
                    )}
                  </div>
                )}
              </>
            )}

            <TeamEdit
              isAdmin={isAdmin}
              isManager={isManager}
              isOwner={isOwner}
              isCEO={isCEO}
              isSupportAdmin={isSupportAdmin}
              team={data.team}
            />

            <span>
              <div className="loc_box">
                {' '}
                {/* {isManager || isAdmin ? (
                  <a href="#!" className="model_show_btn">
                    <button className="btn">
                      <i
                        className="fa fa-trash"
                        aria-hidden="true"
                        style={{ color: 'white' }}
                      ></i>
                    </button>
                  </a>
                ) : null} */}
                <div className="common_model_box">
                  <a href="#!" className="model_close">
                    X
                  </a>

                  <div className="inner_model_box">
                    <h3>Are You Sure?</h3>

                    <div className="two_btn">
                      <button className="btn">No</button>
                      <button className="btn" onClick={handleDeleteSubmit}>
                        Yes
                      </button>
                    </div>
                  </div>
                  <div className="overlay"></div>
                </div>
              </div>
            </span>
          </div>
          <div className="bottom_details team_details">
            <div className="team_rank_box">
              <h5>RANKING</h5>

              {!data.team.ranks || data.team.ranks.length === 0 ? (
                <p>No ranks defined..</p>
              ) : (
                data.team.ranks.map((item, index) => (
                  <div key={index} className="current_team">
                    <span className="ct">
                      {' '}
                      <i className="fa fa-sort-asc" aria-hidden="true"></i>{' '}
                      {item.rank}
                    </span>
                    <span className="were">{item.rankType} </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bio_box team_bio">
        <div className="left_bio">
          <div className="top_bio">
            <h3>ABOUT THE TEAM</h3>
            <div className="socail">
              {data.team.social?.facebook ? (
                <a
                  href={`https://www.facebook.com/${data.team.social?.facebook}`}
                  target="_blank" rel="noreferrer"
                >
                  <i className="fa fa-facebook-official" aria-hidden="true"></i>
                </a>
              ) : null}
              {data.team.social?.instagram ? (
                <a
                  href={`https://www.instagram.com/${data.team.social?.instagram}`}
                  target="_blank" rel="noreferrer"
                >
                  <i className="fa fa-instagram" aria-hidden="true"></i>
                </a>
              ) : null}

              {data.team.social?.twitch ? (
                <a
                  href={`https://www.twitch.tv/${data.team.social?.twitch}`}
                  target="_blank" rel="noreferrer"
                >
                  <i className="fa fa-twitch" aria-hidden="true"></i>
                </a>
              ) : null}

              {data.team.social?.youtube ? (
                <a
                  href={`https://www.youtube.com/c/${data.team.social?.youtube}`}
                  target="_blank" rel="noreferrer"
                >
                  <i className="fa fa-youtube" aria-hidden="true"></i>
                </a>
              ) : null}

              {data.team.social?.discord ? (
                <a
                  href={`https://${data.team.social?.discord}`}
                  target="_blank" rel="noreferrer"
                >
                  <img
                    src="/assets/media/social/discord.png"
                    height="20px"
                    width="20px"
                  />
                </a>
              ) : null}

              {data.team.social?.website ? (
                <a
                  href={`https://${data.team.social?.website}`}
                  target="_blank" rel="noreferrer"
                >
                  <i className="fa fa-globe" aria-hidden="true"></i>
                </a>
              ) : null}
            </div>
          </div>

          {data.team ? data.team.description : ''}

          {/* <p className="team_pos">
            <span className="position">REGION:</span> {data.team.region}{' '}
          </p> */}

          <div className="team_pos">
            <ul>
              <li>
                <span className="position">MANAGER:</span>{' '}
                {empManager.length > 0 ? (
                  <>
                    {empManager.map((emply,i) => (
                      <span className="pos_name" key={i}>
                        <span className="imgs">
                          <img src={emply.employeeId.profilePicUrl} alt="" />
                        </span>
                        {emply.employeeId.name}
                      </span>
                    ))}
                  </>
                ) : (
                  'This Team Currently has no Manager.'
                )}
              </li>

              <li>
                <span className="position">Coach:</span>{' '}
                {empCoach.length > 0 ? (
                  <>
                    {empCoach.map((emply,i) => (
                      <span key={i} className="pos_name">
                        <span className="imgs">
                          <img src={emply.employeeId?.profilePicUrl} alt="" />
                        </span>
                        {emply.employeeId?.name}
                      </span>
                    ))}
                  </>
                ) : (
                  'This Team Currently has no Coach'
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="right_team_bio">
          <div className="sponser">
            <h5>Games</h5>
            <ul>
              {!data.games || data.games.length === 0 ? (
                <p>No Games Found..</p>
              ) : (
                data.games &&
                data.games.map((item, index) => (
                  <li key={index}>
                    <img src={item?.imgUrl} alt={item.name} />{' '}
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="sponser">
            <h5>SPONSORS</h5>

            <ul>
              {!sponsors || sponsors.length === 0 ? (
                <p>No sponsors defined..</p>
              ) : (
                sponsors.map((item, index) => (
                  <li key={index}>
                    <img src={item?.imgUrl} alt="" />{' '}
                  </li>
                ))
              )}
            </ul>
          </div>

          <div className="sponser">
            <h5 className="position">ARENAS:</h5>
            <ul>
              {!data.arenas || data.arenas.length === 0 ? (
                <p>No arenas defined...</p>
              ) : (
                data.arenas.map((item, index) => (
                  <li key={index}>
                    <span className="pos_name">
                      <img src={item.logoUrl} alt="" />
                      {/* <p className='name'> {item.name}</p> */}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamProfileBox;
