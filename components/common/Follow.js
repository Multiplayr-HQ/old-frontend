import React, { useEffect } from 'react';
import baseURL from '@utils/baseURL';
import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import { toast } from 'react-toastify';

const queryClient = new QueryClient();

export default function Follow({ type, username, user }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <PostFollow type={type} username={username} user={user} />
    </QueryClientProvider>
  );
}

const PostFollow = ({ type, username, user }) => {
  const [data, setData] = useState();
  useEffect(async () => {
    await axios.get(`${baseURL}/api/all/${type}/${username}`).then((res) => {
      setData(res.data);
    });
  }, [type]);

  const isFollow =
    data &&
    data.filter((item) => item?.user === user?._id).map((item) => item?.user)
      .length > 0;
  const [follow, setfollow] = useState(isFollow);

  useEffect(() => {
    setfollow(isFollow);
  }, isFollow);

  const handlefollow = (e) => {
    e.preventDefault();
    mutate({ follow });
    setfollow(!follow);
  };

  const addingfollow = async () => {
    const res = await fetch(`${baseURL}/api/all/follow/${type}/${username}`, {
      method: 'PUT',
      headers: {
        Authorization: Cookies.get('token')
      }
    });
    toast.success(`Started Following ${username}`);
  };

  const { mutate } = useMutation(addingfollow);

  return (
    <>
      <button className="btn" onClick={handlefollow}>
        {follow ? 'Unfollow' : 'Follow'}
      </button>
    </>
  );
};
