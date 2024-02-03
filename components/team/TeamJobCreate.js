import { useState, useEffect, useMemo } from 'react';
import baseURL from '@utils/baseURL';
import axios from 'axios';
import countryList from 'react-select-country-list';
import 'rc-time-picker/assets/index.css';
import { toast } from 'react-toastify';
import { EditorState } from 'draft-js';
import dynamic from 'next/dynamic';
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
);
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { useRouter } from 'next/router';
import { jobformvalidate } from '@utils/valid';

const TeamJobCreate = ({ user, profile, teams }) => {
  const [formErrors, setFormErrors] = useState({});
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  let edited2 = draftToHtml(convertToRaw(editorState.getCurrentContent()));

  const router = useRouter();

  const [state, setState] = useState({
    name: '',
    role: '',
    owner: '',
    location: '',
    startDate: '',
    endDate: '',
    salary: 0,
    description: '',
    currency: 'Rs',
    experience: '',
    category: ''
  });

  const options = useMemo(() => countryList().getData(), []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      let jobData = state;
      state.description = edited2;

      try {
        console.log(jobData);
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(jobData)
        };
        const dt = fetch(
          `${baseURL}/api/jobs/create`,
          requestOptions
        ).then((data) => data.json());
        $('a.model_close').parent().removeClass('show_model');
        toast.success('Your Job has been successfully created!! ');
        router.push('/discover');
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
    }
  };

  function handleChange(e) {
    if (e.target.options) {
      var options = e.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      setState({ ...state, [e.target.name]: value });
    } else if (e.target.files) {
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  const handleChangeCheck = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="common_form">
        <>
          <div className="form-group">
            <label htmlFor= "exampleFormControlInput1">Job Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Job Title..."
              name="name"
              onChange={handleChange}
              value={state.name}
            />
            <p className="error">{formErrors.name}</p>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Job Type</label>
            <select
              name="role"
              className="form-control"
              onChange={handleChangeCheck}
              value={state.role}
            >
              <option value="">Select Opportunity Type...</option>
              <option value="Sniper">Sniper</option>
              <option value="AR">AR</option>
              <option value="Shotgun">Shotgun</option>
              <option value="Pistol">Pistol</option>
              <option value="Marksman Rifle">Marksman Rifle</option>
              <option value="SMGs">SMGs</option>
            </select>
            <p className="error">{formErrors.role}</p>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Job Category</label>
            <select
              name="category"
              className="form-control"
              onChange={handleChangeCheck}
              value={state.category}
            >
              <option value="">Select Category Type...</option>
              <option value="Editor">Editor</option>
              <option value="Movie Maker">Movie Maker</option>
              <option value="Web Designer">Web Designer</option>
              <option value="Nutritionist">Nutritionist</option>
              <option value="Staff">Staff</option>
              <option value="Shoutcaster">Shoutcaster</option>
              <option value="Manager">Manager</option>
              <option value="Psychologist">Psychologist</option>
              <option value="CXO">CXO</option>
              <option value="Game Tester">Game Tester</option>
              <option value="Game Developer">Game Developer</option>
              <option value="Game Designer">Game Designer</option>
              <option value="Others">Others</option>
            </select>
            <p className="error">{formErrors.category}</p>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Job Owner</label>
            <select
              className="game_search_result mscrollbar"
              name="owner"
              value={state.owner}
              onChange={handleChangeCheck}
            >
              <option value="">Select Job Owner...</option>
              {teams &&
                teams.map((team,i) => (
                  <option key={i} value={team._id}>{team?.name}</option>
                ))}
            </select>
            <p className="error">{formErrors.owner}</p>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">
              Location <span>Optional</span>
            </label>
            <select
              className="game_search_result mscrollbar"
              name="location"
              placeholder="Select Opportunity Type..."
              value={state.location}
              onChange={handleChangeCheck}
            >
              <option value="">Select Location...</option>
              {options.map((opt) => (
                <>
                  <option value={opt.value}>{opt.label}</option>
                </>
              ))}
            </select>
          </div>

          <div className="edit_four">
            <div className="form-group">
              <label htmlFor="startDate">application Start Date:</label>
              <input
                type="date"
                placeholder="MM/DD/YYYY"
                name="startDate"
                onChange={handleChange}
                value={state.startDate}
                className="form-control"
              />
              <p className="error">{formErrors.startDate}</p>
            </div>

            <div className="form-group">
              <label htmlFor="endDate">application End Date:</label>
              <input
                type="date"
                placeholder="MM/DD/YYYY"
                name="endDate"
                onChange={handleChange}
                value={state.endDate}
                className="form-control"
              />
              <p className="error">{formErrors.endDate}</p>
            </div>

            <div className="form-group" style={{ height: '70px' }}>
              <label htmlFor="exampleFormControlInput1">
                Money Included <span>Optional</span>
              </label>
              <div className="prize_boxs">
                {' '}
                <select
                  name="currency"
                  id="currency"
                  onChange={handleChangeCheck}
                  value={state.currency}
                >
                  <option value="Rs">INR (Rs) - Rupees</option>
                  <option value="$">USD($)- Dollars</option>
                </select>
                <input
                  type="number"
                  className="form-control"
                  placeholder=""
                  name="salary"
                  onChange={handleChange}
                  value={state.salary}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="endDate">Experience</label>
              <input
                type="number"
                name="experience"
                onChange={handleChangeCheck}
                value={state.experience}
                className="form-control"
              />
              <p className="error">{formErrors.experience}</p>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="exampleFormControlInput1">Description</label>

            <Editor
              editorState={editorState}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={setEditorState}
              toolbar={{
                options: ['inline', 'list'],
                inline: {
                  options: ['bold']
                },
                block: {
                  options: ['blocktype']
                },
                list: {
                  options: ['unordered']
                }
              }}
            />
          </div>

          <input
            type="submit"
            className="btn"
            value="Create Job"
            onClick={() => setFormErrors(jobformvalidate(state))}
          />
        </>
      </form>
    </>
  );
};

export default TeamJobCreate;
