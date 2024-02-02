import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';
import { useState } from 'react';

const queryClient = new QueryClient();

export default function RewardList({ battlepass, rewards, reward }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <ListReward battlepass={battlepass} rewards={rewards} reward={reward} />
    </QueryClientProvider>
  );
}

const ListReward = ({ battlepass, rewards, reward }) => {
  const isClaimed =
    rewards.filter((rwd) => {
      return rwd.rewardId === reward._id;
    }).length > 0;
  console.log(isClaimed);
  const [collect, setCollect] = useState(isClaimed);

  const handleCollect = (e) => {
    e.preventDefault();
    mutate({ collect });
    setCollect(!collect);
  };

  const collectingReward = async () => {
    await fetch(`${baseURL}/api/battlepass/claimreward/${reward._id}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };

  const { mutate } = useMutation(collectingReward);
  console.log(battlepass);
  return (
    <>
      <li>
        <img src={reward.imgUrl} alt={reward.name} />
        <p>{reward.name}</p>
        {reward.levelId <= battlepass.level ? (
          collect === true ? (
            <button disabled>Claimed</button>
          ) : (
            <button onClick={handleCollect}>Claim</button>
          )
        ) : null}
      </li>
    </>
  );
};
