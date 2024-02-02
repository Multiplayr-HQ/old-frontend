import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import React, { useState } from 'react';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';

const queryClient = new QueryClient();

export default function ChallengeApprove({ challenge, user, team }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Challenge_Approve challenge={challenge} user={user} team={team} />
    </QueryClientProvider>
  );
}

const Challenge_Approve = ({ challenge, user, team }) => {
  const [approve, setApprove] = useState(false);

  const plyrId = challenge.invites
    .filter((invi) => {
      return invi.playerId?.user === user._id;
    })
    .map((ply) => ply.playerId._id)[0];

  const reqhandlesubmit = async (e) => {
    e.preventDefault();
    try {
      mutate({ approve });
      setApprove(true);
      toast.success('The request has been approved.');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const sendRequest = async () => {
    const { data } = await fetch(
      `${baseURL}/api/challenges/accept/${challenge._id}/${team._id}/${plyrId}`,
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
      <button className="btn" onClick={reqhandlesubmit}>
        Accept
      </button>
    </>
  );
};
