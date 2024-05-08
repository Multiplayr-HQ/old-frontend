import axios from 'axios';
import React, { useContext } from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { DataContext } from '@store/GlobalState';

const ProfileRigsDelete = ({ rigId, profile, user, type, teamId }) => {
  const router = useRouter();
  const { setLoader } = useContext(DataContext);

  const refreshData = () => {
    // router.replace(router.asPath);
    router.reload();
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    try {
      let url = '';
      if (type === 'ProfileTeamDel') {
        profile.teams.map(
          (tem) =>{
            if(tem.teamId._id===teamId){
              url = `${baseURL}/api/profile/profileteam/${profile?._id}/${teamId}/${tem._id}`;
            }
          }
        )
      } else {
        url = `${baseURL}/api/profile/rigs/${profile?._id}/${rigId}`;
      }
      axios.delete(url, {
        headers: {
          Authorization: cookie.get('token')
        }
      });
      
      toast.success('Deleted Successfully');
    } catch (error) {
      console.log(error);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    setLoader(false)
    refreshData();
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
