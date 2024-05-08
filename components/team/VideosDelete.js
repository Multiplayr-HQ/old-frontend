import axios from 'axios';
import React from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';

const VideosDelete = ({
  collectionId,
  team,
  isManager,
  isAdmin,
  isOwner,
  isCEO,
  isSupportAdmin
}) => {
  const refreshPage = () => {
    setTimeout(function () {
      document.body.location?.reload(false);
    }, 1000);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.delete(`${baseURL}/api/teams/videos/${team._id}/${collectionId}`, {
        headers: {
          Authorization: cookie.get('token')
        }
      });
      toast.success('Deleted Successfully');
    } catch (error) {
      console.log(error);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshPage();
  };
  return (
    <>
      {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? (
        <button className="btn" onClick={handleDeleteSubmit}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      ) : null}
    </>
  );
};

export default VideosDelete;
