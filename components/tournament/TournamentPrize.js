import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';
import TournamentPrizeAdd from './TournamentPrizeAdd';

const TournamentPrize = ({
  tournamentId,
  tournamentTier,
  tournament,
  isSupportAdmin
}) => {
  const [count, setCount] = useState(0);
  const [prizeCount, setPrizeCount] = useState(3);
  const [prizeData, setPrizeData] = useState([]);

  const handleRoleForm = (e) => {
    setCount(count + 1);
    setPrizeCount(prizeCount + 1);
  };

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(
          `${baseURL}/api/tournaments/tourPrize/${tournamentId}/${tournamentTier}/${tournament.playType}`,
          prizeData
        )
        .then((res) => toast.success(res.data.msg));
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  return (
    <>
      <a href="#!" className="rules_form">
        <button className="btn">
          {' '}
          <i className="fa fa-plus-circle" aria-hidden="true"></i>
          Add Prizes
        </button>
      </a>

      <div className="add_form">
        <a href="#!" className="close_block">
          X
        </a>

        <h3>Add Prizes</h3>

        <form className="common_form" onSubmit={handleSubmit}>
          <div className="prize1">
            <TournamentPrizeAdd
              prizes={'1st'}
              prizeData={prizeData}
              tournament={tournament}
              isSupportAdmin={isSupportAdmin}
            />
            <TournamentPrizeAdd
              prizes={'2nd'}
              prizeData={prizeData}
              tournament={tournament}
              isSupportAdmin={isSupportAdmin}
            />
            <TournamentPrizeAdd
              prizes={'3rd'}
              prizeData={prizeData}
              tournament={tournament}
              isSupportAdmin={isSupportAdmin}
            />

            {[...Array(count)].map((e, index) => (
              <div key={index} className="prize1">
                <TournamentPrizeAdd
                  prizes={`${prizeCount}th`}
                  prizeData={prizeData}
                  tournament={tournament}
                  isSupportAdmin={isSupportAdmin}
                />
              </div>
            ))}
          </div>

          <label htmlFor="">Add More Prize</label>
          <span onClick={(e) => handleRoleForm(e)}>
            <i className="fa fa-life-ring" aria-hidden="true"></i>
          </span>

          <input type="submit" className="btn" />
        </form>
      </div>
    </>
  );
};

export default TournamentPrize;
