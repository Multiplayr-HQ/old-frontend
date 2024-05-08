import axios from 'axios';
import Router from 'next/router';
import cookie from 'js-cookie';

import baseURL from './baseURL';
import catchErrors from './catchErrors';

export const registerUser = async (
  { firstname, lastname, username, email, password },
  setError,
  setLoading,
  toast,
  setStatus
) => {
  setLoading(true);
  try {
    var name = firstname + ' ' + lastname;
    const res = await axios.post(`${baseURL}/api/signup`, {
      name,
      username,
      email,
      password
    });
    toast.info(res.data.msg);
    setStatus('verify');
    Router.push('/verify');
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    // toast.error(errorMsg);
  }
  setLoading(false);
};

export const loginUser = async (
  { email, password },
  setError,
  setLoading,
  toast
) => {
  setLoading(true);
  try {
    const res = await axios.post(`${baseURL}/api/auth`, {
      email,
      password
    });
    console.log(res.data.token);
    setToken(res.data.token);
    Router.push('/dashboard');
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
    //toast.error(errorMsg);
  }
  setLoading(false);
};

export const onboardUser = async (verificationToken, setLoading, toast) => {
  setLoading(true);
  try {
    console.log(verificationToken);
    const res = await axios.post(
      `${baseURL}/api/onboarding/${verificationToken}`,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    setToken(res.data.token);
    toast.success(res.data.msg);
    Router.push('/dashboard');
  } catch (error) {
    const errorMsg = catchErrors(error);
    toast.error(errorMsg);
  }
  setLoading(false);
};

const setToken = (token) => {
  cookie.set('token', token);
};

export const logoutUser = () => {
  cookie.remove('token');
  Router.push('/login');
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
};
