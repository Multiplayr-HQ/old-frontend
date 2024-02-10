import axios from 'axios';
import { useEffect, useState, useMemo,useContext } from 'react';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { regionsData } from '../../utils/functionsHelper';
import { LanguageData } from '../../utils/functionsHelper';
import ToggleButton from 'react-toggle-button';
import { DataContext } from '@store/GlobalState';

const AttributeCard =({ type, attributeId, profile }) => {
  const [allgames, setAllgames] = useState([]);

  const [states, setStates] = useState({
    attributeId,
    attributeType: type,
    games: '',
    role: '',
    regions: '',
    Mic: false,
    language: '',
    type: '',
    salary: '',
    rank: '',
    platform: '',
    gender: ''
  });

  useEffect(() => {
    async function FetchData(){
      axios.get(`${baseURL}/api/all/games`).then((res) => setAllgames(res.data));
    }
    FetchData()
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
  const { setLoader } = useContext(DataContext);

  const router = useRouter();
  const refreshData = () => {
    // router.replace(router.asPath);
    router.reload();
  };

  const handleSubmitAttribute = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      await axios.post(`${baseURL}/api/attribute/`, states);
      
      toast.success('Added Recruitment card');
      $('a.model_close').parent().removeClass('show_model');

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    // refreshData();
    setLoader(false);
    router.reload()
    // console.log("from attribute card i am profile \t\t ",router.asPath);
    // router.push(router.asPath)
  };

  return (
    <>
      <span>
        <div className="loc_box">
          {' '}
          <div className="games_details" style={{ marginTop: '1rem' }}>
            {type === 'TEAM' ? (
              <>
                <p>Looking for Players to Join your team?</p>{' '}
                <p>
                  Create a recruitment card in just few steps and get best
                  talent to play for your team.
                </p>
              </>
            ) : (
              <>
                <p>Looking for a team to play with?</p>{' '}
                <p>
                  Create a recruitment card in just few steps and get invited to
                  play with top ranking teams.
                </p>
              </>
            )}
            <div className="chart_box">
              <img src="/assets/media/profilechart.jpg" alt="" />
            </div>

            <a href="#!" className="model_show_btn">
              <button className="game_btn">
                <i className="fa fa-plus-circle" aria-hidden="true">
                  {type === 'TEAM' ? ' RECRUIT TALENT' : ' GET RECRUITED'}
                </i>
              </button>
            </a>

            <div className="common_model_box edit_profile" id="big_poup">
              <a href="#!" className="model_close">
                X
              </a>

              <div className="inner_model_box">
                <div className="">
                  <h3> RECRUITEMENT CARD </h3>
                  <form
                    onSubmit={handleSubmitAttribute}
                    className="common_form"
                  >
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Game</label>
                      <select
                        name="games"
                        id="games"
                        value={states.games}
                        onChange={onChange}
                        className="form-control"
                      >
                        <option value="">Select Game</option>
                        {allgames.map((game,i) => (
                          <option key={i} value={game?._id}>{game.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="edit_four">
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          Platform
                        </label>
                        <select
                          id="platform"
                          name="platform"
                          onChange={onChange}
                          value={states.platform}
                          className="form-control text-capitalize"
                        >
                          <option value="">Select Platform...</option>
                          <option value="PC">PC</option>
                          <option value="Console">Console</option>
                          <option value="Mobile">Mobile</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Role</label>
                        <select
                          name="role"
                          onChange={onChange}
                          value={states.role}
                          multiple={false}
                          className="form-control"
                        >
                          <option value="">Select Role...</option>
                          <option value="Sniper">Sniper</option>
                          <option value="AR">AR</option>
                          <option value="Shotgun">Shotgun</option>
                          <option value="Pistol">Pistol</option>
                          <option value="Marksman Rifle">Marksman Rifle</option>
                          <option value="SMGs">SMGs</option>
                        </select>
                      </div>
                      {type === 'PROFILE' ? (
                        <div className="form-group">
                          <label htmlFor="exampleFormControlInput1">
                            Gender
                          </label>
                          <select
                            name="gender"
                            onChange={onChange}
                            disabled={true}
                            value={profile}
                          >
                            <option value={profile}>{profile}</option>
                          </select>
                        </div>
                      ) : (
                        <div className="form-group">
                          <label htmlFor="exampleFormControlInput1">
                            Gender
                          </label>
                          <select
                            name="gender"
                            onChange={onChange}
                            value={states.gender}
                            className="form-control"
                          >
                            <option value="">Select Gender...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                          </select>
                        </div>
                      )}
                      <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">
                          Region
                        </label>
                        <select
                          name="regions"
                          onChange={onChange}
                          className="form-control"
                        >
                          <option value="">Select Region</option>
                          {regionsData &&
                            regionsData.map((role,i) => (
                              <option key={i} value={role}>{role}</option>
                            ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <div className="custom-control custom-switch">
                          <label htmlFor="exampleFormControlTextarea1">
                            &nbsp;
                          </label>

                          <label>Mic</label>
                          <ToggleButton
                            value={states.Mic || false}
                            onToggle={(value) => {
                              setStates({ ...states, Mic: !value });
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Language</label>
                      <select
                        name="language"
                        onChange={handleSubmit}
                        multiple={true}
                        value={states.language.slice(0,5)}
                        className="form-control"
                      >
                        {LanguageData &&
                          LanguageData.map((lang,i) => (
                            <option key={i} value={lang}>{lang}</option>
                          ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Type</label>
                      <select
                        id="type"
                        name="type"
                        onChange={onChange}
                        value={states.type}
                        className="form-control"
                      >
                        <option value="">Select Game Type</option>
                        <option value="Casual">Casual</option>
                        <option value="SemiPro">SemiPro</option>
                        <option value="Pro">Pro</option>
                        <option value="Local Lan">Local Lan</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1">Salary</label>
                      <select
                        name="salary"
                        id="salary"
                        value={states.salary}
                        onChange={onChange}
                        className="form-control"
                      >
                        <option value="">Select Salary</option>
                        <option value="Unpaid">Unpaid</option>
                        <option value="Paid">Paid</option>
                        <option value="prize_sharing">
                          Prize money Sharing
                        </option>
                      </select>
                    </div>
                    {type === 'TEAM' ? (
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">
                          Minimum rank
                        </label>
                        <input
                          type="text"
                          name="rank"
                          onChange={onChange}
                          value={states.rank}
                          className="form-control"
                        />
                      </div>
                    ) : null}

                    <input type="submit" value="Confirm" className="btn" />
                  </form>
                </div>
              </div>
              <div className="overlay"></div>
            </div>
          </div>
        </div>
      </span>
    </>
  );
};

export default AttributeCard;
