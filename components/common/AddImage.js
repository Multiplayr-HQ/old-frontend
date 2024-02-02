import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import ImageDropzone from '@components/common/ImageDropzone';

const AddImage = ({ type, typeId }) => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState();
  const photomutation = useMutation(async (formdata) => {
    await axios.put(`${baseURL}/api/uploads/uploadImages`, formdata, {
      headers: {
        Authorization: cookie.get('token'),
        'Content-Type': 'multipart/form-data'
      }
    });
  });

  function refreshPage() {
    setTimeout(function () {
      window.location.reload(false);
    }, 5000);
  }

  const handlePhotosSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    for (const key of Object.keys(images)) {
      formdata.append('images', images[key]);
    }

    formdata.append('title', title);
    formdata.append('model', type);
    formdata.append('id', typeId);

    try {
      await photomutation.mutateAsync(formdata);
      toast.success('User images have been updated');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please upload your images again');
    }
    refreshPage();
  };

  return (
    <>
      <ImageDropzone setImages={setImages} />
      {images.length > 0 ? (
        <div className="upload_btn">
          <form onSubmit={handlePhotosSubmit}>
            <textarea
              type="text"
              placeholder="Add a Title"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <a href="#!" onClick={handlePhotosSubmit} className="btn">
              UPLOAD NOW{' '}
            </a>
          </form>
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default AddImage;
