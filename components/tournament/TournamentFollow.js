import React from 'react';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

const TournamentFollow = ({ tournament, user }) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const followhandlesubmit = async (tournamentId) => {
    await fetch(`${baseURL}/api/tournaments/follow/${tournamentId}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
    refreshData();
  };

  const isFollow =
    tournament &&
    tournament.followers
      ?.filter((tournaments) => tournaments?.user === user?._id)
      .map((tour) => tour?.user).length > 0;

  return (
    <>
      <button onClick={() => followhandlesubmit(tournament?._id)}>
        {isFollow === true ? 'Following' : 'Follow'}
      </button>
    </>
  );
};

export default TournamentFollow;
