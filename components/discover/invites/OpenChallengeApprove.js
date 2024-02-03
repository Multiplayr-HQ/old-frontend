import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import React, { useState, useEffect } from 'react';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

export default function OpenChallengeApprove({ challenge, profile }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Open_ChallengeApprove challenge={challenge} profile={profile} />
    </QueryClientProvider>
  );
}

const Open_ChallengeApprove = ({ challenge, profile }) => {
  const [isPlayer, setIsPlayer] = useState(false);
  const [commonTeams, setCommonTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState();

  const reqhandlesubmit = async (e) => {
    e.preventDefault();
    try {
      axios
        .put(`${baseURL}/api/challenges/accept/${challenge._id}/${profile._id}`)
        .then((res) => {
          setIsPlayer(res.data);
        });
      toast.success('The request has been approved.');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const handleteamreq = async (e, teamId) => {
    e.preventDefault();
    try {
      axios
        .put(
          `${baseURL}/api/challenges/teamaccept/${challenge._id}/${teamId}/${profile._id}`
        )
        .then((res) => {});
      toast.success('The request has been approved.');
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  const handleCommonTeams = () => {
    try {
      axios
        .get(
          `${baseURL}/api/challenges/acceptteam/${challenge._id}/${profile._id}`
        )
        .then((res) => {
          setCommonTeams(res.data);
        });
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <>
      {challenge.isOpenMatch === true && challenge.ChallType === 'Team' ? (
        <div>
          {challenge.User_team && challenge.opponent_team ? (
            <button className="btn" disabled>
              Challenge closed
            </button>
          ) : (
            <a
              href="#!"
              className="model_show_btn btn"
              onClick={handleCommonTeams}
            >
              Accept
            </a>
          )}

          <div className="common_model_box edit_profile" id="">
            <a href="#!" className="model_close">
              X
            </a>

            <div className="inner_model_box">
              <form className="common_form">
                <div className="form-group">
                  {commonTeams.length === 0 ? (
                    <p>No matching team with the challenge</p>
                  ) : (
                    <>
                      <label htmlFor="exampleFormControlInput1">
                        Challenge with the team
                      </label>
                      <select
                        name="selectedTeam"
                        value={selectedTeam}
                        onChange={(e) => setSelectedTeam(e.target.value)}
                      >
                        <option value="--">--</option>
                        {commonTeams &&
                          commonTeams.map((tem,i) => (
                            <option value={tem._id} key={i}>{tem.name}</option>
                          ))}
                      </select>
                    </>
                  )}
                </div>
                <button
                  className="btn"
                  type="submit"
                  onClick={(e) => handleteamreq(e, selectedTeam)}
                >
                  Submit
                </button>
              </form>
            </div>
            <div className="overlay"></div>
          </div>
        </div>
      ) : challenge.players.length === 2 ? (
        <button className="btn" disabled>
          Challenge closed
        </button>
      ) : (
        <button className="btn" onClick={reqhandlesubmit}>
          Accept
        </button>
      )}
    </>
  );
};
