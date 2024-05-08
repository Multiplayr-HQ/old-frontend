import React, { useEffect } from 'react';
import baseURL from '@utils/baseURL';
import Cookies from 'js-cookie';
import { useState } from 'react';
import axios from 'axios';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { IonIcon } from '@ionic/react';
import { personAddOutline, stopCircleOutline } from 'ionicons/icons';

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
  useEffect(() => {
    const fet = async () => {
      try {
        await axios.get(`${baseURL}/api/all/${type}/${username}`).then((res) => {
          setData(res.data);
        });
        
      } catch (error) {
        console.log(error)
        
      }
    };
    fet();
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
    try {
      const res = await fetch(`${baseURL}/api/all/follow/${type}/${username}`, {
        method: 'PUT',
        headers: {
          Authorization: Cookies.get('token')
        }
      });
      toast.success(`Started Following ${username}`);
    } catch (error) {}
  };

  const { mutate } = useMutation(addingfollow);

  return (
    <>
      <div
        className="flex justify-center items-center h-10 p-2 w-full rounded-lg hover:bg-background"
        onClick={handlefollow}
      >
        {follow ? (
          <div className="flex justify-center items-center text-red-500">
            {' '}
            <IonIcon
              className=" text-xl shrink-0"
              icon={stopCircleOutline}
            />{' '}
            Unfollow{' '}
          </div>
        ) : (
          <div className="flex justify-center items-center text-primary1">
            {' '}
            <IonIcon
              className="text-xl shrink-0"
              icon={personAddOutline}
            />{' '}
            Follow{' '}
          </div>
        )}
      </div>
    </>
  );
};
