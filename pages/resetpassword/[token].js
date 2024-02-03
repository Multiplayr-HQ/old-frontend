import Meta from '@components/Meta';
import FooterMain from '@components/FooterMain';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Script from 'next/script';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();
  const { token } = router.query;

  const mutation = useMutation(async () => {
    const { data } = await axios.put(
      `${baseURL}/api/auth/reset-password/${token}`,
      {
        password
      }
    );
    return data;
  });
  const ResetPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#^&_-])[A-Za-z\d@$!%*?#^&_-]{8,}$/;
  const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{4,7})/;
  const passwordValid = ResetPassword.test(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error('Passwords do not match');
    }
    if (passwordValid === true) {
      try {
        await mutation.mutateAsync();
        toast.success('Your password has been updated');
        router.push('/login');
      } catch (err) {
        toast.error(
          err.response?.data?.msg || 'There was an error. Try again later.'
        );
      }
    } else {
      return toast.error('Invalid Password');
    }
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
    setOpen(!open);
  };

  return (
    <main id="kt_body" className="bg-body">
      <Meta />

      <div className="d-flex flex-column flex-root">
        <div
          className="d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed"
          style={{ backgroundImage: 'url(/assets/media/illustrations/14.png)' }}
        >
          <div className="d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20">
            <a href="#" className="mb-12">
              <img
                alt="Logo"
                src="/assets/media/logos/logo.png"
                className="h-40px"
              />
            </a>
            <div className="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
              <form
                className="form w-100"
                noValidate
                id="kt_new_password_form"
                onSubmit={handleSubmit}
              >
                <div className="text-center mb-10">
                  <h1 className="text-dark mb-3">Setup New Password</h1>
                  <div className="text-gray-400 fw-bold fs-4">
                    Already have reset your password ?
                    <Link href="/login" className="link-primary fw-bolder">
                      Sign in here
                    </Link>
                  </div>
                </div>
                <div className="mb-10 fv-row" data-kt-password-meter="true">
                  <div className="mb-1">
                    <label className="form-label fw-bolder text-dark fs-6">
                      Password
                    </label>
                    <div className="position-relative mb-3">
                      <input
                        className="form-control form-control-lg form-control-solid"
                        type={passwordShown ? 'text' : 'password'}
                        name="password"
                        autoComplete="off"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        id="password"
                      />
                      <span
                        className="btn btn-sm btn-icon position-absolute translate-middle top-50 end-0 me-n2"
                        data-kt-password-meter-control="visibility"
                      >
                        {' '}
                        <i
                          className={`bi  ${open ? 'bi-eye' : 'bi-eye-slash'}`}
                          onClick={togglePassword}
                        ></i>{' '}
                      </span>{' '}
                    </div>
                    <div
                      className="d-flex align-items-center mb-3"
                      data-kt-password-meter-control="highlight"
                    >
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
                      <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
                    </div>
                  </div>
                  <p className="text-muted">
                    Password Strength:
                    {mediumRegex.test(password) ? (
                      <>
                        {' '}
                        {ResetPassword.test(password) ? (
                          'Strong'
                        ) : (
                          <> {password.length === 0 ? null : 'Medium'}</>
                        )}
                      </>
                    ) : (
                      <>
                        {password.length > 0 && password.length < 8
                          ? 'Weak'
                          : null}
                      </>
                    )}
                  </p>
                  <div className="text-muted">
                    Use 8 or more characters with a mix of letters, numbers
                    &amp; symbols.
                  </div>
                </div>
                <div className="fv-row mb-10">
                  <label className="form-label fw-bolder text-dark fs-6">
                    Confirm Password
                  </label>
                  <input
                    className="form-control form-control-lg form-control-solid"
                    type="password"
                    name="confirmPassword"
                    autoComplete="off"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-lg btn-primary fw-bolder"
                  >
                    <span className="indicator-label">Submit</span>
                    <span className="indicator-progress">
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          <FooterMain> </FooterMain>

          <Script src="/assets/plugins/global/plugins.bundle.js" />
          <Script src="/assets/js/scripts.bundle.js" />
        </div>
      </div>
    </main>
  );
};

export default ResetPassword;
