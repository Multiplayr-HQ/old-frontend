import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const VideosDropzone = ({ setVideos }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setVideos(acceptedFiles);
  }, []);

  const onDropRejected = () => {
    alert('Please drop upto 3 video files only!');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 3,
    accept: '.mp4,.mkv,.avi, .m4v',
    onDropRejected
  });

  return (
    <div className="jobs_browse" {...getRootProps()}>
      <h2>+ Upload Video</h2>
      <div className="drop_files">
        <input {...getInputProps()} />
        <i className="fa fa-upload" aria-hidden="true"></i>
        <div className="drop_file_txt">
          <p>Drop your files here</p>
          <span className="or">or</span>
          <span className="btn">browse</span>
        </div>
        <p>Max 3 videos. 16:9 aspect ratio recommended.</p>
      </div>
    </div>
  );
};

export default VideosDropzone;
