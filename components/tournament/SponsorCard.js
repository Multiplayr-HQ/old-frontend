import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';
import TournamentAddSponsor from './TournamentAddSponsor';

const SponsorCard = ({ states, sponsors }) => {
  const [count, setCount] = useState(0);
  const handleRoleForm = (e) => {
    setCount(count + 1);
  };

  return (
    <>
      <div className="edit_four">
        {/* <div className="form-group">
          <label htmlFor="title">Title</label>
          <input type="text" name="title" />
        </div> */}

        <TournamentAddSponsor
          sponsors={sponsors}
          states={states}
          type="SPONSOR"
        />
      </div>

      {[...Array(count)].map((e, index) => (
        <div className="form-group" key={index}>
          <TournamentAddSponsor
            sponsors={sponsors}
            states={states}
            type="SPONSOR"
          />
        </div>
      ))}

      <div className="form-group">
        <label htmlFor="">Add More Sponsors</label>
        <span onClick={(e) => handleRoleForm(e)}>
          <i className="fa fa-life-ring" aria-hidden="true"></i>
        </span>
      </div>
    </>
  );
};

export default SponsorCard;
