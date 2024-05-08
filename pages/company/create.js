import { useState } from 'react';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import baseURL from '@utils/baseURL';
import axios from 'axios';
import 'rc-time-picker/assets/index.css';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';

const CreateBrand = ({ user, profile }) => {
  const [image, setImage] = useState(null);
  const [state, setState] = useState({
    name: '',
    logoUrl: '/assets/media/discover/lxg.png',
    description: '',
    location: '',
    founded: ''
  });

  const mutation = useMutation(
    async (formdata) =>
      await axios.post(`${baseURL}/api/company/create`, formdata, {
        headers: {
          Authorization: cookie.get('token'),
          'Content-Type': 'multipart/form-data'
        }
      })
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      state.name === '' ||
      state.description === '' ||
      state.location === '' ||
      state.founded === ''
    ) {
      toast.warning('Please enter all fields or check your inputs');
    } else {
      let formdata = new FormData();
      formdata.append('name', state.name);
      formdata.append('description', state.description);
      formdata.append('location', state.location);
      formdata.append('founded', state.founded);
      formdata.append('logoUrl', image);

      try {
        await mutation.mutateAsync(formdata);
        toast.success('Your Company has been successfully created');
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
    }
  };

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />
      <LeftNav user={user} />
      <div className="main_middle create_main_middle">
        <div className="white_bg">
          <div className="left_create_form">
            <h1>Left create Company</h1>
          </div>
          <div className="create_tournament">
            <h1>Create Company</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Company name"
                    name="name"
                    onChange={handleChange}
                    value={state.name}
                  />
                  {state.name.length >= 51 && (
                    <h6>Company name cannot be more then 50 characters</h6>
                  )}
                </div>
                <div className="form-group">
                  <div className="style_file_upload">
                    <input
                      type="file"
                      name="logoUrl"
                      id="logoUrl"
                      className="inputfile"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <label htmlFor="logoUrl">
                      <span>Upload Logo</span>
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    name="description"
                    onChange={handleChange}
                    value={state.description}
                  />
                  {state.description.length >= 201 && (
                    <h6>Descrtption cannot be more then 200 characters</h6>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Location"
                    name="location"
                    onChange={handleChange}
                    value={state.location}
                  />
                  {state.location.length >= 61 && (
                    <h6>Location cannot be more then 60 characters</h6>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Founded</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Founded"
                    name="founded"
                    onChange={handleChange}
                    value={state.founded}
                  />
                  {state.founded.length >= 5 && <h6>Year is invalid.</h6>}
                </div>
              </>
              <button className={`btn rgtside`}>Create</button>
            </form>
          </div>
        </div>
      </div>
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateBrand;
