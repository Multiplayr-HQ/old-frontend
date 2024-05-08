import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const InviteCode = () => {
  const inviteCodes = ['APQ447', 'HM007C', '883POL', 'DL12WD'];

  const [inviteCode, setInviteCode] = useState('');
  const router = useRouter();

  const handleSubmitCode = async (e) => {
    e.preventDefault();
    if (inviteCodes.includes(inviteCode)) {
      toast.success('Redirecting to dashboard', { autoClose: 2000 });
      router.push('/dashboard');
    } else {
      toast.warning("Invite's Only.");
    }
  };

  useEffect(() => {
    $('button.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);
  return (
    <>
      <button
        type="submit"
        id="kt_sign_up_submit"
        className="model_show_btn btn"
      >
        {' '}
        <span className="indicator-label">Log In and Play</span>{' '}
        <span className="indicator-progress">
          {' '}
          Please wait...{' '}
          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{' '}
        </span>{' '}
      </button>
      <div className="common_model_box" id="verifycode">
        <a href="#!" className="model_close">
          X
        </a>

        <div className="inner_model_box">
          <div className="verify_box">
            <a href="#" className="logos">
              <img alt="Logo" src="/assets/media/logos/logo.png" />
            </a>
            <div className="inn_verify">
              <h2>Only for the Invites.</h2>

              <div className="verify_form">
                <form
                  className="form w-100"
                  id="kt_sign_in_form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="fv-row mb-10">
                    <label className="form-label">Enter the Invite Code</label>
                    <input
                      className="form-control form-control-lg form-control-solid"
                      type="text"
                      name="code"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      placeholder="Enter Invite code"
                      autoComplete="off"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      onClick={handleSubmitCode}
                      className="btn"
                    >
                      <span className="indicator-label">Confirm</span>
                      <span className="indicator-progress">
                        Please wait...
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="bg_logo"
              style={{
                backgroundImage: 'url(/assets/media/illustrations/17.png'
              }}
            ></div>
          </div>
          <div className="overlay"></div>
        </div>
      </div>
    </>
  );
};

export default InviteCode;
