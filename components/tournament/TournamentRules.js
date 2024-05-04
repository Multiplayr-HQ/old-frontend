import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import countryList from 'react-select-country-list';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';
import { tournamentRules } from '../../utils/valid';

const TournamentRules = ({ tourRules, tournament }) => {
  const [formErrors, setFormErrors] = useState({});
  const countryNames = tournament.eligibleCountries.map((cty) => cty.iso);
  const [states, setStates] = useState({
    check_in: tourRules?.check_in || '',
    forfeit: tourRules?.forfeit || '',
    prizeRules: tourRules?.prizeRules || '',
    matchSettings: tourRules?.matchSettings || '',
    general: tourRules?.general || '',
    compete: tourRules?.compete || '',
    cusRuleHead: tourRules?.cusRuleHead || '',
    cusRuleBody: tourRules?.cusRuleBody || '',
    country: countryNames || '',
    admins: tourRules?.admins?._id || '',
    contact: tourRules?.contact || ''
  });
  const [allusers, setAllusers] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/all/users`).then((res) => setAllusers(res.data));
  }, []);

  const onChange = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setStates({ ...states, [e.target.name]: value });
    } else if (e.target.files) {
      console.log(e.target.files[0]);
      setStates({ ...states, [e.target.name]: e.target.files[0] });
    } else {
      setStates({ ...states, [e.target.name]: e.target.value });
    }
  }

  const router = useRouter();

  const refreshData = () => {
    // router.replace(router.asPath);
    router.reload();
  };

  const options = useMemo(() => countryList().getData(), []);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = allusers?.filter((value) => {
      return value?.name?.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSelectedRig = (data) => {
    setSearchText(data.name);
    states.admins = data._id;
    setFilteredData([]);
  };

  const handleTournamentRules = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      try {
        axios.put(
          `${baseURL}/api/tournamentRules/${tourRules.tournamentId}`,
          states
        );
        toast.success('Tournament Rules Updated');
        // router.refresh();
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
      refreshData();
    }
  };

  return (
    <>
      <a href="#!" className="rules_form">
        <button className="btn">
          {' '}
          <i className="fa fa-plus-circle" aria-hidden="true"></i>
          {tourRules.tournamentId == router.query.tournamentid &&
          tourRules.tournamentId
            ? 'Edit Rules'
            : 'Add Rules'}
        </button>
      </a>

      <div className="add_form">
        <a href="#!" className="close_block">
          X
        </a>

        <h3>Rules</h3>
        <form className="common_form" onSubmit={handleTournamentRules}>
          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Advance Match Check In</label>
            <select
              name="check_in"
              id="check_in"
              value={states.check_in}
              onChange={onChange}
            >
              <option value="">Select Advance Check In...</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
            </select>
            <p>{formErrors.check_in}</p>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Automatic Forfeit</label>
            <select
              name="forfeit"
              id="forfeit"
              value={states.forfeit}
              onChange={onChange}
            >
              <option value="">Select Forfeit time...</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </select>
            <p>{formErrors.forfeit}</p>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">
              Prize Distribution Rules
            </label>
            <textarea
              name="prizeRules"
              onChange={onChange}
              value={states.prizeRules}
            />
            <p>{formErrors.prizeRules}</p>
          </div>

          <div className="form-group">
            <label htmlFor="matchSettings">Match Settings</label>
            <textarea
              name="matchSettings"
              onChange={onChange}
              value={states.matchSettings}
            />
            <p>{formErrors.matchSettings}</p>
          </div>

          <div className="form-group">
            <label htmlFor="general">General Info</label>
            <textarea
              name="general"
              onChange={onChange}
              value={states.general}
            />
            <p>{formErrors.general}</p>
          </div>

          <div className="form-group">
            <label htmlFor="compete">How To Compete</label>
            <textarea
              name="compete"
              onChange={onChange}
              value={states.compete}
            />
            <p>{formErrors.compete}</p>
          </div>

          <div className="form-group">
            <label htmlFor="cusRuleHead">Add more rules</label>
            <input
              type="text"
              name="cusRuleHead"
              placeholder="Header Name"
              onChange={onChange}
              value={states.cusRuleHead}
            />
            <p>{formErrors.cusRuleHead}</p>
          </div>

          <div className="form-group">
            <textarea
              name="cusRuleBody"
              cols="30"
              rows="10"
              onChange={onChange}
              value={states.cusRuleBody}
              placeholder="Add Content"
            />
            <p>{formErrors.cusRuleBody}</p>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Eligible Countries</label>
            <select
              className="game_search_result mscrollbar"
              name="country"
              value={states.country}
              onChange={handleSubmit}
              multiple={true}
            >
              {options.map((opt) => (
                <>
                  <option value={opt.value}>{opt.label}</option>
                </>
              ))}
            </select>
            <p>{formErrors.country}</p>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Admin</label>
            <input
              type="search"
              name="admins"
              value={searchText}
              placeholder={`${
                tourRules?.admins ? `${tourRules.admins?.name}` : ''
              }`}
              onChange={handleFilter}
              autoComplete="off"
            />
            {searchText.length !== 0 ? (
              <>
                {filteredData.length > 0 ? (
                  <>
                    <div className="custom-rig-tag">
                      <div className="rigs_items">
                        {!filteredData || filteredData.length === 0 ? (
                          <p>No User found..</p>
                        ) : (
                          filteredData.map((data) => (
                            <div
                              onClick={() => handleSelectedRig(data)}
                              key={data._id}
                              className="items"
                            >
                              <span>
                                {' '}
                                <img
                                  src={data?.profilePicUrl}
                                  height={50}
                                  width={50}
                                />
                              </span>
                              <p>
                                {data.name.length > 20
                                  ? data.name.substring(0, 20) + '...'
                                  : data.name}
                              </p>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </>
                ) : null}
              </>
            ) : null}
            <p>{formErrors.admins}</p>
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact Details</label>
            <input
              type="text"
              name="contact"
              onChange={onChange}
              value={states.contact}
              placeholder="Discord Server/Email/Phone number"
            />
            <p>{formErrors.contact}</p>
          </div>

          <button
            className="btn"
            onClick={() => setFormErrors(tournamentRules(states))}
          >
            Confirm
          </button>
        </form>
      </div>
    </>
  );
};

export default TournamentRules;
