import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { useQuery } from 'react-query';
import { useRouter } from 'next/router';
import TeamAboutEdit from './TeamAboutEdit';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import TeamAbtAdd from './TeamAbtAdd';

const TeamAbout = ({
  Data,
  isManager,
  isAdmin,
  isOwner,
  isCEO,
  user,
  isSupportAdmin,
  teamAbout
}) => {
  const [rolData, setRolData] = useState([]);
  const [count, setCount] = useState(0);

  const [showform, setShowForm] = useState(false);
  const [desc, setDesc] = useState(
    Data.team.about ? Data.team.about.description : null
  );
  const [members, setMembers] = useState(teamAbout?.employees);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const toggleShowform = () => {
    if (showform) {
      setShowForm(false);
    } else {
      setShowForm(true);
    }
  };

  const onChange = (e) => {
    setDesc(e.target.value);
  };

  const addingDesc = async () => {
    const res = await fetch(`${baseURL}/api/teams/desc/${Data.team?._id}`, {
      method: 'PUT',
      body: JSON.stringify({
        desc
      }),
      headers: {
        'Content-type': 'application/json'
      }
    });
    return res.json();
  };
  const handleButtonForm = (e) => {
    addingDesc();
    setShowForm(false);
    refreshData();
  };

  const handleRoleForm = (e) => {
    setCount(count + 1);
  };

  const handleSubmitAbout = async (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${baseURL}/api/teams/ins/about/${Data.team?._id}`, rolData)
        .then((res) => handleMembers(res.data));
      $('a.model_close').parent().removeClass('show_model');
      toast.success('Member Added Successfully');
      refreshData();
    } catch (error) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  useEffect(() => {
    setMembers(teamAbout?.employees);
  }, [teamAbout?.employees]);

  const handleMembers = (data) => {
    setMembers(data);
  };

  const handleDelete = async (employeeId) => {
    try {
      axios
        .delete(
          `${baseURL}/api/teams/del/about/${Data.team?._id}/${employeeId}`,
          {
            headers: {
              Authorization: cookie.get('token')
            }
          }
        )
        .then((res) => handleMembers(res.data));
      toast.success('The member has been removed.');
      refreshData();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <div className="our_team">
      <div className="about_team">
        <span>
          <div className="loc_box">
            {' '}
            <a href="#!" className="model_show_btn">
              {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? (
                <button className="btn">
                  <i className="fa fa-plus-circle" aria-hidden="true"></i> Add
                  Members
                </button>
              ) : null}
            </a>
            <div className="common_model_box" id="big_poup">
              <a href="#!" className="model_close">
                X
              </a>
              <div className="inner_model_box">
                <h3>Add Members</h3>
                <form className="common_form" onSubmit={handleSubmitAbout}>
                  <TeamAbtAdd role="CEO" rolesData={rolData} />
                  <TeamAbtAdd role="Owner" rolesData={rolData} />
                  <TeamAbtAdd role="Manager" rolesData={rolData} />
                  <TeamAbtAdd role="Coach" rolesData={rolData} />
                  <TeamAbtAdd role="PR Manager" rolesData={rolData} />
                  <TeamAbtAdd role="Captain" rolesData={rolData} />

                  {[...Array(count)].map((e, index) => (
                    <div className="form-group add_more_role" key={index}>
                      <label htmlFor="exampleFormControlInput1"> &nbsp;</label>
                      <TeamAbtAdd role="" rolesData={rolData} />
                    </div>
                  ))}
                  <div className="form-group">
                    <label htmlFor="">Add More Roles</label>
                    <span onClick={(e) => handleRoleForm(e)}>
                      <i className="fa fa-life-ring" aria-hidden="true"></i>
                    </span>
                  </div>

                  <button className="btn">Add</button>
                </form>
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        </span>

        <div className="about">
          <h2>
            OUR TEAM{' '}
            {isManager || isAdmin || isOwner || isCEO || isSupportAdmin ? (
              <button className="bio_edit" onClick={toggleShowform}>
                <i className="fa fa-pencil" aria-hidden="true"></i>
              </button>
            ) : null}
          </h2>
        </div>

        {Data.about &&
          Data.about?.contacts.map((itm, index) => (
            <div className="team_mails" key={index}>
              <h3>
                <i className="fa fa-life-ring" aria-hidden="true"></i>{' '}
                {itm.emailname}
              </h3>
              <a href="#">{itm.emailaddress}</a>{' '}
            </div>
          ))}
      </div>
      <div className="">
        {!showform ? (
          <>
            {Data.team.about.description ? (
              <p>{Data.team.about.description}</p>
            ) : (
              <p>No Description available</p>
            )}
          </>
        ) : null}

        {showform ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <textarea name="text" value={desc} onChange={onChange}></textarea>
            <button onClick={handleButtonForm} className="btn">
              Update
            </button>
          </form>
        ) : (
          ''
        )}
      </div>
      <div className="team_member">
        <ul>
          {teamAbout.employees?.length === 0 ? (
            <li>
              <div className="dp">No employees present</div>
            </li>
          ) : (
            teamAbout.type === 'ABOUT' &&
            members &&
            members.map((emp, idx) => (
              <li key={idx}>
                <div className="dp">
                  {' '}
                  <img src={emp?.employeeId?.profilePicUrl} alt="" />{' '}
                </div>

                <h4>{emp?.name} </h4>
                <h3>{emp.role.toUpperCase()}</h3>

                <h4>{emp?.employeeId?.name} </h4>

                <div className="two_btn">
                  {emp.role === 'Owner' ? null : (
                    <>
                      {isManager ||
                      isAdmin ||
                      isOwner ||
                      isCEO ||
                      isSupportAdmin ? (
                        <>
                          <button
                            className="btn"
                            onClick={() => handleDelete(emp._id)}
                          >
                            Delete
                          </button>
                        </>
                      ) : null}
                    </>
                  )}
                  {emp.role === 'Owner' ? null : (
                    <>
                      <TeamAboutEdit
                        employeeData={emp}
                        handleMembers={handleMembers}
                        team={Data.team}
                        isManager={isManager}
                        isAdmin={isAdmin}
                        isOwner={isOwner}
                        isCEO={isCEO}
                        isSupportAdmin={isSupportAdmin}
                      />
                    </>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TeamAbout;
