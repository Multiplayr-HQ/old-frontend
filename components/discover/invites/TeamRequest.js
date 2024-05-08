import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import React, { useState } from 'react';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';

const queryClient = new QueryClient();

export default function TeamRequest({ profile, team, user }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Team_Req team={team} profile={profile} user={user} />
    </QueryClientProvider>
  );
}

const Team_Req = ({ profile, team, user, isAdmin }) => {
  const playerId = profile.playergames[0]?.player?._id;

  const isReqSent =
    team?.request?.filter((plyr) => plyr.playerId._id === playerId).length > 0;

  const [request, setRequest] = useState(isReqSent);

  const isPlayer =
    team?.players?.filter((plyr) => plyr.playerId === playerId).length > 0;

  const reqhandlesubmit = async (e) => {
    e.preventDefault();
    try {
      mutate({ request });
      setRequest(!request);
      toast.success('Request has been sent');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const sendRequest = async () => {
    const { data } = await fetch(
      `${baseURL}/api/teams/send/${team._id}/${playerId}`,
      {
        method: 'PUT'
      }
    );
    return data;
  };

  const { mutate } = useMutation(sendRequest, {
    onSuccess: (data) => {
      console.log(data);
    }
  });

  return (
    <>
      {isPlayer || isAdmin ? (
        <a href={`/team/${team._id}`}>
          <button className="join">VIEW TEAM</button>
        </a>
      ) : request ? (
        <button className="join" disabled>
          REQUEST SENT
        </button>
      ) : (
        <button onClick={reqhandlesubmit} className="join">
          REQUEST TO JOIN
        </button>
      )}
    </>
  );
};
