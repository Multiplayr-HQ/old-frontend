import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import VideoDropzone from '@components/common/VideosDropzone';
import { Video } from 'cloudinary-react';

const GameVideos = ({ user, game }) => {
  const [videos, setVideos] = useState([]);
  const [videodisc, setVideodisc] = useState();

  const mutation = useMutation(async (formdata) => {
    await axios.put(`${baseURL}/api/uploads/uploadVideos`, formdata, {
      headers: {
        Authorization: cookie.get('token'),
        'Content-Type': 'multipart/form-data'
      }
    });
  });

  function refreshPage() {
    // setTimeout(function () {
    //   window.location.reload(false);
    // }, 5000);
    router.reload();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (const key of Object.keys(videos)) {
      formdata.append('videos', videos[key]);
    }

    formdata.append('videodisc', videodisc);
    formdata.append('model', 'GAME');
    formdata.append('id', game._id);

    try {
      await mutation.mutateAsync(formdata);

      toast.success('Game videos have been updated');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please upload your game videos again');
    }
    refreshPage();
  };

  return (
    <div className="video_box">
      <form onSubmit={handleSubmit}>
        <VideoDropzone setVideos={setVideos} />

        <p></p>

        {videos.length > 0 ? (
          <div className="upload_btn">
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
          </div>
        ) : (
          ''
        )}

        <p></p>

        {game?.videosgallery && game?.videosgallery?.map((vid, idx) => (
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
                  <a href="#">The Team</a>{' '}
                  <a href="#" className="yellow">
                    Lq Heroes
                  </a>
                  <h2>
                    {vide.originalname} : <span>{vid.videodisc}</span>
                  </h2>
                  <span className="date">{vide.createdAt}</span>{' '}
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
        ))}
      </form>
    </div>
  );
};

export default GameVideos;
