import React from 'react';
import { useState } from 'react';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const TeamStatAdd = ({ showform }) => {
  const [formData, setFormData] = useState({
    tournamentId: '',
    place: '',
    mp: '',
    wins: '',
    loss: '',
    w_streak: ''
  });

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditStat = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${baseURL}/api/tournamentstat/`, formData, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'application/json'
        }
      });
      toast.success('Tournament Stats has added.');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  return (
    <>
      {showform ? (
        <>
          <td>
            <input
              type="text"
              placeholder="Enter Tournament Id"
              name="tournamentId"
              value={formData?.tournamentId}
              onChange={onChange}
            ></input>
          </td>
          <td>
            <input
              type="text"
              placeholder="Enter place"
              name="place"
              value={formData?.place}
              onChange={onChange}
            ></input>
          </td>
          <td>
            <input
              type="text"
              placeholder="Enter the MP"
              name="mp"
              value={formData?.mp}
              onChange={onChange}
            ></input>
          </td>
          <td>
            <input
              type="text"
              placeholder="Enter the Wins"
              name="wins"
              value={formData?.wins}
              onChange={onChange}
            ></input>
          </td>
          <td>
            <input
              type="text"
              placeholder="Enter the Losses"
              name="loss"
              value={formData?.loss}
              onChange={onChange}
            ></input>
          </td>
          <td>---</td>
          <td>
            <input
              type="text"
              placeholder="Enter the Win Streak"
              name="w_streak"
              value={formData?.w_streak}
              onChange={onChange}
            ></input>
          </td>
          <td>
            <button
              type="submit"
              onClick={(e) => handleEditStat(e)}
              className="btn"
            >
              Add
            </button>
          </td>
        </>
      ) : (
        ''
      )}
    </>
  );
};

export default TeamStatAdd;
