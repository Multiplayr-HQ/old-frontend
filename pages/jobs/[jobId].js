import MetaDash from '@components/MetaDash';
import baseURL from '../../utils/baseURL';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import { MPNumberFormat } from '@utils/helpers';
import ReactCountryFlag from 'react-country-flag';

const Job = ({ data, user, profile }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />

      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <div className="jobs_box">
          <div className="left_jobs">
            <h1> {data.title}</h1>

            <div>
              {data.experience && data.experience > 0 ? (
                <p>
                  EXPERIENCE: {data?.experience}{' '}
                  {data?.experience === 1 ? 'Year' : 'Years'}{' '}
                </p>
              ) : (
                <p>EXPERIENCE: -- </p>
              )}
            </div>

            <div className="job_profile1">
              <span>
                {data.location.name}{' '}
                <ReactCountryFlag
                  countryCode={data.location.iso}
                  svg
                  style={{
                    width: '2em',
                    height: '2em'
                  }}
                />
              </span>

              <span className="">
                <i className="fa fa-money" aria-hidden="true"></i>
                {data.salary === 0 ? (
                  'Not Disclosed'
                ) : (
                  <MPNumberFormat
                    value={data.salary ? data.salary : 'Not Disclosed'}
                    currency={data.currency}
                  />
                )}
              </span>
              <b> Status: {data.status ? 'Available' : 'Closed'}</b>
            </div>

            <h2>Job Description</h2>
            {/* <ul>{data?.description}</ul> */}
            <div dangerouslySetInnerHTML={{ __html: data.description }} />
          </div>

          <div className="right_job">
            <h1> About Company</h1>

            <div className="logo">
              <img src="/assets/media/flip-kart.png" />
            </div>

            <p>Flipkart internet Private Limited</p>

            <div className="address_box">
              <h3>Company about info</h3>
              <div className="address">
                <h4>Address</h4>
                <p>
                  {' '}
                  Alyssa, Begonia
                  <br />
                  Clover,SyNo.12/4,12/6 to,
                  <br />
                  Bangalore, Karnataka, India
                </p>
              </div>
            </div>

            <button className="btn">Apply On Comapany Site</button>
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { jobId } = context.params;
  try {
    const response = await fetch(`${baseURL}/api/jobs/${jobId}`);
    const data = await response.json();
    return {
      props: { data }
    };
  } catch {
    return {
      props: {}
    };
  }
};

export default Job;
