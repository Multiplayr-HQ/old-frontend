import baseURL from '@utils/baseURL';
import React from 'react';
import cookie from 'js-cookie';
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

const TeamStatEdit = ({ statData }) => {
  const [editFormData, setEditFormData] = useState({
    tournamentId: statData ? statData.tournamentId : '',
    place: statData ? statData.place : '',
    mp: statData ? statData.mp : '',
    wins: statData ? statData.wins : '',
    loss: statData ? statData.loss : '',
    w_streak: statData ? statData.w_streak : ''
  });

  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleEditStat = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `${baseURL}/api/tournamentstat/${statData._id}`,
        editFormData,
        {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success('The Record has been Updated.');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    setEditFormData('');
    refreshData();
  };
  return (
    <tr>
      <td>
        <input
          type="text"
          placeholder="Click to Edit"
          name="tournamentId"
          value={editFormData?.tournamentId}
          onChange={onChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Click to Edit"
          name="place"
          value={editFormData?.place}
          onChange={onChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Click to Edit"
          name="mp"
          value={editFormData?.mp}
          onChange={onChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Click to Edit"
          name="wins"
          value={editFormData?.wins}
          onChange={onChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          placeholder="Click to Edit"
          name="loss"
          value={editFormData?.loss}
          onChange={onChange}
        ></input>
      </td>
      <td>69%</td>
      <td>
        <input
          type="text"
          placeholder="Click to Edit"
          name="w_streak"
          value={editFormData?.w_streak}
          onChange={onChange}
        ></input>
      </td>
      <td>
        <button
          type="submit"
          onClick={(e) => handleEditStat(e)}
          className="btn"
        >
          Update
        </button>
      </td>
    </tr>
  );
};

export default TeamStatEdit;
