import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import React, { useState } from 'react';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';

const queryClient = new QueryClient();

export default function ChallengeDecline({ challenge, user }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Challenge_Decline challenge={challenge} user={user} />
    </QueryClientProvider>
  );
}

const Challenge_Decline = ({ challenge, user }) => {
  const [decline, setDecline] = useState(false);

  const plyrId = challenge.invites
    .filter((invi) => {
      return invi.playerId?.user === user._id;
    })
    .map((ply) => ply.playerId._id)[0];

  const reqhandlesubmit = async (e) => {
    e.preventDefault();
    try {
      mutate({ decline });
      setDecline(true);
      toast.success('The request has been Declined.');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const sendRequest = async () => {
    const { data } = await fetch(
      `${baseURL}/api/challenges/decline/${challenge._id}/${plyrId}`,
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
      <button className="btn ml20" onClick={reqhandlesubmit}>
        Reject
      </button>
    </>
  );
};
