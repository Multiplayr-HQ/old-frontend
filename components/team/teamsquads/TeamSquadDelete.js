import React from 'react';
import baseURL from '../../../utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

const TeamSquadDelete = ({
  squad,
  isManager,
  isAdmin,
  isOwner,
  isCEO,
  isSupportAdmin
}) => {
  const router = useRouter();
  const deletehandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${baseURL}/api/squads/${squad._id}`, {
        headers: {
          Authorization: cookie.get('token')
        }
      });
      toast.success('The Squad has been Deleted.');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };
  const refreshData = () => {
    router.replace(router.asPath);
  };
  return (
    <>
      {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? (
        <button onClick={deletehandleSubmit} className="btn">
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      ) : null}
    </>
  );
};

export default TeamSquadDelete;
