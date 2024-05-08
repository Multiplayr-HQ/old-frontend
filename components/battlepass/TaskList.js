import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import CollectReward from './CollectReward';

const TaskList = ({ week, battlepass, user }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/tasks/${week}`).then((res) => setTasks(res.data));
  }, []);

  return (
    <>
      {tasks && tasks.length === 0 ? (
        <p>Complete previous week tasks to unlock.</p>
      ) : (
        tasks &&
        tasks.map((task,i) => (
          <li key={i}>
            <span>{task.desc}</span>
            <CollectReward battlepass={battlepass} task={task} user={user} />
          </li>
        ))
      )}
    </>
  );
};

export default TaskList;
