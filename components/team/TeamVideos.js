import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import VideoDropzone from '@components/common/VideosDropzone';
import { Video } from 'cloudinary-react';
import VideosDelete from './VideosDelete';

const TeamVideos = ({
  user,
  team,
  isManager,
  isAdmin,
  isOwner,
  isCEO,
  isSupportAdmin
}) => {
  const [videos, setVideos] = useState([]);
  const [videodisc, setVideodisc] = useState();

  const mutation = useMutation(async (formdata) => {
    await axios.put(`${baseURL}/api/uploads/uploadVideos`, formdata, {
      headers: {
        Authorization: cookie.get('token'),
        'Content-Type': 'multipart/form-data'
      }
    });
    $('a.model_close').parent().removeClass('show_model');
  });

  function refreshPage() {
    setTimeout(function () {
      document.body.location?.reload(false);
    }, 1000);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (const key of Object.keys(videos)) {
      formdata.append('videos', videos[key]);
    }

    formdata.append('videodisc', videodisc);
    formdata.append('model', 'TEAM');
    formdata.append('id', team._id);

    try {
      await mutation.mutateAsync(formdata);

      toast.success('User videos have been updated');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please upload your videos again');
    }
    refreshPage();
  };

  return (
    <div className="video_box">
      {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? (
        <>
          <div className="add_photos">
            <a href="#!" className="model_show_btn">
              <button className="btn">
                <i aria-hidden="true">
                  <i className="fa fa-plus-circle" aria-hidden="true"></i> Add
                  Media
                </i>
              </button>
            </a>
            <div className="common_model_box">
              <a href="#!" className="model_close">
                X
              </a>
              <div className="inner_model_box">
                <h3>Add Videos</h3>
                <VideoDropzone setVideos={setVideos} />
                {videos.length > 0 ? (
                  <div className="upload_btn">
                    <form onSubmit={handleSubmit}>
                      <textarea
                        type="text"
                        placeholder="Add a description"
                        id="videodisc"
                        name="videodisc"
                        value={videodisc}
                        onChange={(e) => setVideodisc(e.target.value)}
                      ></textarea>

                      <a href="#!" onClick={handleSubmit} className="btn">
                        UPLOAD NOW{' '}
                      </a>
                    </form>
                  </div>
                ) : null}
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        </>
      ) : null}

      <p></p>

      {team.videosgallery.length === 0 ? (
        <p>No Media Available</p>
      ) : (
        team.videosgallery &&
        team.videosgallery.map((vid, idx) => (
          <ul key={idx}>
            {vid.videos.map((vide, idex) => (
              <li key={idex}>
                {' '}
                <div className="video">
                  {' '}
                  <Video
                    cloudName="dch502zpg"
                    controls
                    fallback="Cannot display video"
                    publicId={vide.path}
                  ></Video>
                </div>
                <div className="bottom_data">
                  {' '}
                  {/* <a href="#">The Team</a>{' '}
                  <a href="#" className="yellow">
                    Lq Heroes
                  </a> */}
                  <h2>
                    {/* {vide.originalname} :  */}
                    <span>{vid.videodisc}</span>
                  </h2>
                  {/* <span className="date">{vide.createdAt}</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '} */}
                  <VideosDelete
                    collectionId={vid._id}
                    team={team}
                    isManager={isManager}
                    isAdmin={isAdmin}
                    isOwner={isOwner}
                    isCEO={isCEO}
                    isSupportAdmin={isSupportAdmin}
                  />
                </div>
              </li>
            ))}

            {/* <li style={{ display: 'none' }}>
                <div className="video">
                  {' '}
                  <img src="/assets/media/video/thumb1.jpg" alt="" />{' '}
                </div>
                <div className="bottom_data">
                  {' '}
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="yellow">
                    Lq Heroes
                  </a>
                  <h2>
                    Destroy Played the first Mission of the Mercenaries Update
                    With Kelly And Saki
                  </h2>
                  <span className="date">August 27th,2018</span>{' '}
                  <span className="views">
                    <i className="fa fa-eye" aria-hidden="true"></i> 2223
                  </span>{' '}
                  <span className="likes">
                    <i className="fa fa-heart" aria-hidden="true"></i>453
                  </span>{' '}
                  <span className="comments">
                    <i className="fa fa-comment" aria-hidden="true"></i>18
                  </span>{' '}
                </div>
              </li> */}
          </ul>
        ))
      )}
    </div>
  );
};

export default TeamVideos;
