import axios from 'axios';
import React, { useContext } from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { DataContext } from '@store/GlobalState';

const ProfilePhotosDel = ({ collectionId, profile, user }) => {
  const router = useRouter();
  const { setLoader } = useContext(DataContext);

  const refreshData = () => {
    // router.replace(router.asPath);
    router.reload();
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      axios.delete(
        `${baseURL}/api/profile/images/${profile?._id}/${collectionId}`,
        {
          headers: {
            Authorization: cookie.get('token')
          }
        }
      );
      refreshData();
      toast.success('Deleted Successfully');
    } catch (error) {
      console.log(error);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    setLoader(false);
  };
  return (
    <>
      {profile.user?._id === user._id ? (
        <button className="btn" onClick={handleDeleteSubmit}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      ) : null}
    </>
  );
};

export default ProfilePhotosDel;
