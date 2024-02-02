import axios from 'axios';
import React from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const ProfileRigsDelete = ({ rigId, profile, user, type, teamId }) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      let url = '';
      if (type === 'ProfileTeamDel') {
        url = `${baseURL}/api/profile/profileteam/${profile?._id}/${teamId}`;
      } else {
        url = `${baseURL}/api/profile/rigs/${profile?._id}/${rigId}`;
      }
      axios.delete(url, {
        headers: {
          Authorization: cookie.get('token')
        }
      });
      refreshData();
      toast.success('Deleted Successfully');
    } catch (error) {
      console.log(error);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
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

export default ProfileRigsDelete;
