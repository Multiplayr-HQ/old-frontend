import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import baseURL from '@utils/baseURL';
import { useRouter } from 'next/router';
import TournamentAddSponsor from './TournamentAddSponsor';
import SponsorCard from './SponsorCard';

const TournamentSponsor = ({ user, data, isUser, isSupportAdmin }) => {
  useEffect(() => {
    $('a.model_show_btn').click(function () {
      $(this).next().addClass('show_model');
    });

    $('a.model_close').click(function () {
      $(this).parent().removeClass('show_model');
    });
  }, []);

  const isLoggedInUser = data.tournament?.user?._id === user._id;
  const [sponsors, setSponsors] = useState([]);
  const [count, setCount] = useState(0);
  const [state, setState] = useState({
    sponsor: [],
    title: ''
  });
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleRoleForm = (e) => {
    setCount(count + 1);
  };

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/sponsors`)
      .then((res) => setSponsors(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(
        `${baseURL}/api/tournaments/sponsors/${data.tournament._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(state)
        }
      );
      $('a.model_close').parent().removeClass('show_model');
      toast.success('Your Sponsor has been set successfully! ');
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  const handleDeleteSponsor = (e, sponsorId) => {
    e.preventDefault();
    try {
      axios.put(
        `${baseURL}/api/tournaments/sponsordelete/${data.tournament._id}/${sponsorId}`
      );
      toast.success('Deleted Sponsor Successfully');
      refreshData();
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <div className="tab hide" id="sponsors">
      <div className="sponsers_box">
        <span>
          <div className="loc_box">
            {' '}
            <a href="#!" className="model_show_btn">
              {isUser || isSupportAdmin ? (
                <button className="btn">
                  <i className="fa fa-plus-circle" aria-hidden="true" />
                  Add Sponsor
                </button>
              ) : null}
            </a>
            <div className="common_model_box edit_profile " id="big_poup">
              <a href="#!" className="model_close">
                X
              </a>
              <div className="inner_model_box">
                <h3>Sponsor&apos;s</h3>
                <form className="common_form" onSubmit={handleSubmit}>
                  <SponsorCard
                    states={state}
                    tournamentId={data?.tournament?._id}
                    sponsors={sponsors}
                  />

                  {[...Array(count)].map((e, index) => (
                    <div key={index}>
                      <SponsorCard
                        sponsors={sponsors}
                        tournamentId={data.tournament._id}
                        states={state}
                      />
                    </div>
                  ))}
                  {/* <div className="form-group">
                    <label htmlFor="">Add More Title and Sponsors</label>
                    <span onClick={(e) => handleRoleForm(e)}>
                      <i className="fa fa-life-ring" aria-hidden="true"></i>
                    </span>
                  </div> */}
                  <button className="btn">Update</button>
                </form>
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        </span>
        <ul>
          {data.sponsors &&
            data.sponsors.map((spons, index) => (
              <li key={index}>
                <div className="sponser_name">
                  <img src={spons.imgUrl} alt={spons.sponsorId} />
                </div>
                <div className="sponser_data">
                  {' '}
                  <span className="head_spons_bg">{spons.name}</span>
                  <p>{spons.description}</p>
                  {isUser || isSupportAdmin ? (
                    <button
                      className="btn"
                      onClick={(e) => handleDeleteSponsor(e, spons._id)}
                    >
                      <i className="fa fa-trash" />
                    </button>
                  ) : null}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default TournamentSponsor;
