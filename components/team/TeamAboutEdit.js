import baseURL from '@utils/baseURL';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const TeamAboutEdit = ({
  employeeData,
  team,
  isManager,
  isAdmin,
  isOwner,
  isCEO,
  isSupportAdmin,
  handleMembers
}) => {
  const [aboutData, setAboutData] = useState({
    _id: employeeData?._id,
    username: employeeData.employeeId?.name,
    employeeId: employeeData.employeeId?._id,
    value: employeeData.role
  });
  const [teamroles, setTeamRoles] = useState([]);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  const onChange = (e) => {
    setAboutData({ ...aboutData, [e.target.name]: e.target.value });
  };

  const handleEditAbout = async (e) => {
    e.preventDefault();

    try {
      await axios
        .patch(`${baseURL}/api/teams/upd/about/${team._id}`, aboutData, {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'application/json'
          }
        })
        .then((res) => handleMembers(res.data));
      toast.success('Updated Successfully');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    $('a.model_close').parent().removeClass('show_model');
    refreshData();
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/teamroles`)
      .then((res) => setTeamRoles(res.data));
  }, []);
  return (
    <div>
      {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? (
        <a href="#!" className="model_show_btn btn">
          Edit
        </a>
      ) : null}
      <div className="common_model_box">
        <a href="#!" className="model_close">
          X
        </a>

        <div className="inner_model_box">
          <h3>Edit Team Member</h3>

          <form className="common_form" onSubmit={handleEditAbout}>
            <h2>{aboutData.username}</h2>
            <label htmlFor="exampleFormControlInput1">Roles</label>
            <select
              name="value"
              className="form-control"
              onChange={onChange}
              value={aboutData.value}
            >
              {teamroles.map((tr, idx) => (
                <option key={idx} value={tr}>
                  {tr}
                </option>
              ))}
            </select>
            <button className="btn" type="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="overlay"></div>
      </div>
    </div>
  );
};

export default TeamAboutEdit;
