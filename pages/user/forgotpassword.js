import Head from 'next/head';
import Image from 'next/image';
import Meta from '@components/Meta';
import FooterMain from '@components/FooterMain';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { useMutation } from 'react-query';
import Link from 'next/link';
import Script from 'next/script';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const mutation = useMutation(async () => {
    const { data } = await axios.post(`${baseURL}/api/auth/forgot-password`, {
      email
    });
    return data;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutateAsync();
      toast.success('Please check your email to reset your password');
      setEmail('');
    } catch (err) {
      toast.error(
        err.response?.data?.msg || 'There was an error. Try again later.'
      );
    }
  };

  return (
    <div id="kt_body" className="bg-body">
      <Meta />

      <div className="singup_page_box forget-pass-box">
        <div className="left_banner">
          <span className="logo">
            {' '}
            <img src="/assets/media/logo.png" alt="Logo" />
          </span>

          <h1>
            A true Esports <br />
            platform that brings <br />
            all of Esports ecosystem <br />
            in one place.
          </h1>

          <span className="props1 props">
            {' '}
            <img src="/assets/media/login/1.png" alt="" />
          </span>
          <span className="props2 props">
            {' '}
            <img src="/assets/media/login/2.png" alt="" />
          </span>
          <span className="props3 props">
            {' '}
            <img src="/assets/media/login/3.png" alt="" />
          </span>
          <span className="props4 props">
            {' '}
            <img src="/assets/media/login/4.png" alt="" />
          </span>
          <span className="props5 props">
            {' '}
            <img src="/assets/media/login/5.png" alt="" />
          </span>
          <span className="props6 props">
            {' '}
            <img src="/assets/media/login/6.png" alt="" />
          </span>
          <span className="props7 props">
            {' '}
            <img src="/assets/media/login/7.png" alt="" />
          </span>
          <span className="props8 props">
            {' '}
            <img src="/assets/media/login/8.png" alt="" />
          </span>
          <span className="props9 props">
            {' '}
            <img src="/assets/media/login/9.png" alt="" />
          </span>
        </div>

        <div className="right_form">
          <div className="d-flex flex-center flex-column flex-column-fluid">
            <h2>Forgot Password ?</h2>
            <div className="form_box">
              <form
                className="form w-100"
                noValidate="novalidate"
                id="kt_password_reset_form"
                onSubmit={handleSubmit}
              >
                <div className="mb-10 text-center">
                  <div className="text-gray-400 fw-bold fs-4">
                    Enter your email to reset your password.
                  </div>
                </div>
                <div className="mb-10 fv-row">
                  <label className="text-gray-900 form-label fw-bolder fs-6">
                    Email
                  </label>
                  <input
                    className="form-control form-control-solid"
                    type="email"
                    placeholder=""
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="two_btn">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary fw-bolder me-4"
                  >
                    <span className="indicator-label">Submit</span>
                    <span className="indicator-progress">
                      Please wait...
                      <span className="align-middle spinner-border spinner-border-sm ms-2"></span>
                    </span>
                  </button>

                  <Link
                    href="/login"
                    className="btn btn-lg btn-light-primary fw-bolder"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Script src="/assets/plugins/global/plugins.bundle.js" />
      <Script src="/assets/js/scripts.bundle.js" />
    </div>
  );
};

export default ForgotPassword;
