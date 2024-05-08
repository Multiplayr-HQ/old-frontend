import React from 'react';
import baseURL from '../../../utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

const TeamStatDelete = ({ statData, isManager, isAdmin }) => {
  const router = useRouter();
  const deletehandleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${baseURL}/api/tournamentstat/${statData._id}`, {
        headers: {
          Authorization: cookie.get('token')
        }
      });
      toast.success('The Stat Record has been Deleted.');
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
      {isManager || isAdmin ? (
        <button onClick={deletehandleSubmit} className="btn">
          Delete
        </button>
      ) : null}
    </>
  );
};

export default TeamStatDelete;
