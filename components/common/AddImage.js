import { useEffect, useState,useContext } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import ImageDropzone from '@components/common/ImageDropzone';
import { useRouter } from 'next/router';

import { DataContext } from '@store/GlobalState';

const AddImage = ({ type, typeId }) => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState("");

  const photomutation = useMutation(async (formdata) => {
    await axios.put(`${baseURL}/api/uploads/uploadImages`, formdata, {
      headers: {
        Authorization: cookie.get('token'),
        'Content-Type': 'multipart/form-data'
      }
    });
  });

  const router=useRouter();
  const { setLoader } = useContext(DataContext);



  const handleSelectAgain =()=>{
    setImages([])

  }

  function refreshPage() {
    // setTimeout(function () {
    //   window.location.reload(false);
    // }, 5000);
    router.reload();
    // router.replace(router.asPath);
  
    
  }

  const handlePhotosSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const formdata = new FormData();
    for (const key of Object.keys(images)) {
      formdata.append('images', images[key]);
    }

    formdata.append('title', title);
    formdata.append('model', type);
    formdata.append('id', typeId);

    try {
      await photomutation.mutateAsync(formdata);
      $('a.model_close').parent().removeClass('show_model');
      toast.success('User images have been updated');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please upload your images again');
    }
    // ;refreshPage();
    setLoader(false);
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
              required
            />
            <a href="#!" onClick={handlePhotosSubmit} className="btn">
              UPLOAD NOW{' '}
            </a>

            <br />
            <br />

            <a href="#!" onClick={handleSelectAgain} className="btn">
              CANCEL{' '}
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
