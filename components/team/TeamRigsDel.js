import axios from 'axios';
import React from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const TeamRigsDel = ({
  rigId,
  team,
  isAdmin,
  isManager,
  isOwner,
  isCEO,
  isSupportAdmin
}) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    try {
      axios.delete(`${baseURL}/api/teams/rigs/${team?._id}/${rigId}`, {
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
      {isAdmin || isManager || isOwner || isCEO || isSupportAdmin ? (
        <button className="btn" onClick={handleDeleteSubmit}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      ) : null}
    </>
  );
};

export default TeamRigsDel;
