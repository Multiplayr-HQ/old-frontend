import React from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';

const GameFollow = ({ game, user }) => {
  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const followhandlesubmit = async (gameId) => {
    await fetch(`${baseURL}/api/games/follow/${gameId}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
    refreshData();
  };

  const isFollow =
    game &&
    game.followers
      ?.filter((game) => game?.user === user?._id)
      .map((game) => game?.user).length > 0;

  return (
    <>
      <button onClick={() => followhandlesubmit(game?._id)}>
        {isFollow === true ? 'Following' : 'Follow'}
      </button>
    </>
  );
};

export default GameFollow;
