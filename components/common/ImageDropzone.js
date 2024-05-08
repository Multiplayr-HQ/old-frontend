import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const ImageDropzone = ({ setImages }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setImages(acceptedFiles);
  }, []);

  const onDropRejected = () => {
    alert('Please drop upto 5 image files only!');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 5,
    accept: 'image/*',
    onDropRejected
  });

  return (
    <div className="jobs_browse" {...getRootProps()}>
      <h2>+ Create album</h2>

      <div className="drop_files">
        <input {...getInputProps()} />
        <i className="fa fa-upload" aria-hidden="true"></i>
        <div className="drop_file_txt">
          <p>Drop your files here</p>
          <span className="or">or</span>
          <span className="btn">browse</span>
        </div>
        <p>Max 5 images. 16:9 aspect ratio recommended.</p>
      </div>
    </div>
  );
};

export default ImageDropzone;
