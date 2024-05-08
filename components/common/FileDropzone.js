import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileDropzone = ({ setFiles }) => {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const onDropRejected = () => {
    alert('Please drop upto 5 files only!');
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 5,
    accept: '.pdf, .doc, .docx, .rtf, .ppt',
    onDropRejected
  });

  return (
    <div className="jobs_browse" {...getRootProps()}>
      <div className="drop_files">
        <input {...getInputProps()} />
        <i className="fa fa-upload" aria-hidden="true"></i>
        <div className="drop_file_txt">
          <p>Drop your files here</p>
          <span className="or">or</span>
          <span className="btn">browse</span>
        </div>
        <p>
          Max 5 files. PDF or .doc <br /> files are recommended.
        </p>
      </div>
    </div>
  );
};

export default FileDropzone;
