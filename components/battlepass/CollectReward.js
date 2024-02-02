import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import cookie from 'js-cookie';
import { useState } from 'react';

const queryClient = new QueryClient();

export default function CollectReward({ battlepass, task, user }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <RewardCollect battlepass={battlepass} task={task} user={user} />
    </QueryClientProvider>
  );
}

const RewardCollect = ({ battlepass, task, user }) => {
  const isCollected =
    task.users.filter((usr) => usr.userId === user._id).length > 0;

  const [collect, setCollect] = useState(isCollected);

  const isComplete =
    battlepass.completed_tasks &&
    battlepass.completed_tasks.filter((completed_task) => {
      return completed_task.taskId === task._id;
    }).length > 0;

  const handleCollect = (e) => {
    e.preventDefault();
    mutate({ collect });
    setCollect(!collect);
  };

  const collectingReward = async () => {
    await fetch(`${baseURL}/api/tasks/collectreward/${task._id}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };

  const { mutate } = useMutation(collectingReward);

  return (
    <>
      {isComplete ? (
        collect ? (
          <i className="fa fa-check" aria-hidden="true"></i>
        ) : (
          <span onClick={handleCollect}>Collect</span>
        )
      ) : (
        <span>{task.reward_point}XP</span>
      )}
    </>
  );
};
