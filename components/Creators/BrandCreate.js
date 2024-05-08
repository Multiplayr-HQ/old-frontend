import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { brandfromvalidate } from '@utils/valid';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import SearchName from './SearchName';

const BrandCreate = ({ isClaim, user }) => {
  const [image, setImage] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [newBrand, setNewBrand] = useState();
  const [brands, setBrands] = useState([]);
  const [state, setState] = useState({
    name: '',
    logoUrl: '/assets/media/discover/lxg.png',
    description: '',
    facebook: '',
    twitch: '',
    website: '',
    instagram: '',
    youtube: '',
    discord: '',
    isClaim
  });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const router = useRouter();

  const mutation = useMutation(
    async (formdata) =>
      await axios
        .post(`${baseURL}/api/brand/create`, formdata, {
          headers: {
            Authorization: cookie.get('token'),
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((res) => setNewBrand(res.data))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formErrors).length === 0) {
      let formdata = new FormData();
      formdata.append('name', state.name);
      formdata.append('isClaim', state.isClaim);
      formdata.append('description', state.description);
      formdata.append('facebook', state.facebook);
      formdata.append('twitch', state.twitch);
      formdata.append('website', state.website);
      formdata.append('instagram', state.instagram);
      formdata.append('youtube', state.youtube);
      formdata.append('discord', state.discord);
      formdata.append('logoUrl', image);

      try {
        await mutation.mutateAsync(formdata);
        toast.success('Your Brand has been successfully created');
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
    }
  };

  if (newBrand) {
    isClaim === true ? router.push(`/brand/${newBrand._id}`) : null;
  }

  useEffect(() => {
    //Brands
    axios.get(`${baseURL}/api/all/brands`).then((res) => setBrands(res.data));
  }, []);

  return (
    <>
      <div className="main_middle create_main_middle">
        <div className="white_bg create_bg">
          <div className="create_form_box">
            <div className="left_create_form">
              <img src="/assets/media/create_left_img.jpg" />

              <div className="create_heads">
                <h1>Create Brand</h1>
                <p>
                  Create Brand page and invite hundrends of gamers to
                  participate. Boost to increase the reach.
                </p>
              </div>
            </div>
            <div className="create_tournament">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <>
                  <div className="form-group">
                    <SearchName
                      data={brands}
                      type="Brand"
                      handleChange={handleChange}
                      isSearchOnly={false}
                      user={user}
                    />
                    {state.name.length > 15 && (
                      <h6>Brand name cannot be more then 15 characters</h6>
                    )}
                    <p>{formErrors.name}</p>
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
                    <label htmlFor="exampleFormControlInput1">
                      Description
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Description"
                      name="description"
                      onChange={handleChange}
                      value={state.description}
                    />
                    <p>{formErrors.description}</p>
                  </div>
                  <div className="colm full_width">
                    <label htmlFor="exampleFormControlInput1">
                      Social Links (Optional)
                    </label>
                    <ul className="socail_url">
                      <li>
                        <input
                          type="text"
                          className="form-control facebook"
                          placeholder="Enter your Facebook user ID as per the URL"
                          name="facebook"
                          onChange={handleChange}
                          value={state.facebook}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          className="form-control twitch"
                          placeholder="Enter your Twitch Channel name as per the URL"
                          name="twitch"
                          onChange={handleChange}
                          value={state.twitch}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          className="form-control twitter"
                          placeholder="Enter @Twitter Name"
                          name="twitter"
                          onChange={handleChange}
                          value={state.twitter}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          className="form-control instagram"
                          placeholder="Enter your Instagram User Name"
                          name="instagram"
                          onChange={handleChange}
                          value={state.instagram}
                        />
                      </li>
                      <li>
                        {' '}
                        <input
                          type="text"
                          className="form-control youtube"
                          placeholder="Enter your Youtube Channel Name as per the URL"
                          name="youtube"
                          onChange={handleChange}
                          value={state.youtube}
                        />
                      </li>
                      <li>
                        <input
                          type="text"
                          className="form-control discord"
                          placeholder="Enter your full Discord server link"
                          name="discord"
                          onChange={handleChange}
                          value={state.discord}
                        />
                      </li>
                    </ul>
                  </div>
                </>
                <input
                  type="submit"
                  className="btn"
                  value="Create Brand"
                  onClick={() => {
                    setFormErrors(brandfromvalidate(state));
                  }}
                  disabled={mutation.isLoading}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandCreate;
