import { QueryClient, QueryClientProvider, useMutation } from 'react-query';
import React, { useState } from 'react';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const queryClient = new QueryClient();

export default function Approve({ user, Id, type }) {
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <Approve_Req user={user} Id={Id} type={type} />
    </QueryClientProvider>
  );
}

const Approve_Req = ({ user, Id, type }) => {
  const [request, setRequest] = useState(false);

  const reqhandlesubmit = async (e) => {
    e.preventDefault();
    try {
      mutate({ request });
      setRequest(true);
      $('a.model_close').parent().removeClass('show_model');
      toast.success('The request has been approved.');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  const sendRequest = async () => {
    const { data } = await fetch(
      `${baseURL}/api/admin/approve/${type}/${Id}/${user._id}`,
      {
        method: 'PUT',
        headers: {
          Authorization: Cookies.get('token')
        }
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
        Approve
      </button>
    </>
  );
};
