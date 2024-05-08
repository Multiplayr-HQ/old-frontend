import React, { useState } from 'react';
import baseURL from '../../utils/baseURL';
import cookie from 'js-cookie';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import { useRouter } from 'next/router';

const queryClient = new QueryClient();

export default function TeamFollow({ team, user, isFollow }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Team_Follow team={team} user={user} isFollow={isFollow} />
    </QueryClientProvider>
  );
}
const Team_Follow = ({ team, user, isFollow }) => {
  const [follow, setfollow] = useState(isFollow);

  const handlefollow = (e) => {
    e.preventDefault();
    mutate({ follow });
    setfollow(!follow);
  };

  const addingfollow = async () => {
    const res = await fetch(`${baseURL}/api/teams/follow/team/${team._id}`, {
      method: 'PUT',
      headers: {
        Authorization: cookie.get('token')
      }
    });
  };

  const { mutate } = useMutation(addingfollow);

  const isAdmin =
    team &&
    team.employees.filter(
      (emp) => emp.role === 'Admin' && emp.employeeId?._id === user?._id
    ).length > 0;

  const isManager =
    team?.employees.filter(
      (emp) => emp.role === 'Manager' && emp.employeeId._id === user._id
    ).length > 0;

  return (
    <>
      {isAdmin || isManager ? null : (
        <button className="btn" onClick={handlefollow}>
          {follow ? 'Following' : 'Follow'}
        </button>
      )}
    </>
  );
};
