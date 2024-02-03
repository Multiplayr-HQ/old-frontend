import { useState, useEffect } from 'react';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import baseURL from '../../utils/baseURL';
import Moment from 'moment';
import { toast } from 'react-toastify';
import axios from 'axios';

import AllScript from '../AllScript';

const CreateListing = ({ user }) => {
  const [state, setState] = useState({
    user: user._id,
    Type: 'Product',
    name: '',
    imgUrl: '/assets/media/default/tournament.jpg',
    category: '',
    collections: '',
    price: null,
    desc: '',
    properties: '',
    quantity: null,
    offers: '',
    sizes: null,
    colors: '',
    delivery_time: ''
  });
  const [newList, setNewList] = useState();

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
      console.log(e.target.files[0]);
      setState({ ...state, [e.target.name]: e.target.files[0] });
    } else {
      setState({ ...state, [e.target.name]: e.target.value });
    }
  }

  const handleChangeCheck = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let listdata = state;

    try {
      console.log(listdata);
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(listdata)
      };
      const dt = fetch(
        `${baseURL}/api/listings/create`,
        requestOptions
      ).then((res) => setNewList(res.data));

      toast.success('The Listing has been successfully created!! ');
      // Router.push(`/listings/${newList._id}`);
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  return (
    <>
      <MetaDash />
      <SignedHeader user={user} />
      <LeftNav user={user} />
      <div className="main_middle create_main_middle">
        <div className="white_bg create_bg">
          <div className="create_form_box">
            <div className="left_create_form">
              <img src="/assets/media/create_left_img.jpg" />

              <div className="create_heads">
                <h1>Create a Listing</h1>
                <p>Sell your product, services or NFT&apos;s</p>
              </div>
            </div>
            <div className="create_tournament">
              <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="exampleFormControlTextarea1">Type</label>
                  <div className="btn_selection">
                    <div className="big_btn">
                      <span className="form-check-label terms">Product</span>
                      <input
                        type="radio"
                        name="Type"
                        value="Product"
                        onChange={handleChangeCheck}
                      />
                    </div>

                    <div className="big_btn">
                      <span className="form-check-label terms">NFT</span>
                      <input
                        type="radio"
                        name="Type"
                        value="NFT"
                        onChange={handleChangeCheck}
                      />
                    </div>

                    <div className="big_btn">
                      <span className="form-check-label terms">Service</span>
                      <input
                        type="radio"
                        name="Type"
                        value="Service"
                        onChange={handleChangeCheck}
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter name"
                    name="name"
                    value={state.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <div className="style_file_upload">
                    <input
                      type="file"
                      name="imgUrl"
                      id="imgUrl"
                      className="inputfile"
                      onChange={handleChange}
                    />
                    <label>
                      <span>Upload Photo</span>
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="colm">
                    <label htmlFor="exampleFormControlInput1">Category</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Category"
                      name="category"
                      value={state.category}
                      onChange={handleChange}
                    />
                  </div>
                  {state.Type === 'Product' ? (
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">Quantity</label>
                      <input
                        type="text"
                        name="quantity"
                        className="form-control"
                        placeholder="Enter the quantity"
                        value={state.quantity}
                        onChange={handleChange}
                      />
                    </div>
                  ) : state.Type === 'NFT' ? (
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">Collection</label>
                      <input
                        type="text"
                        name="collection"
                        className="form-control"
                        placeholder="Enter the Collection"
                        value={state.collections}
                        onChange={handleChange}
                      />
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <div className="colm">
                    <label htmlFor="exampleFormControlInput1">Price</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Price"
                      name="price"
                      value={state.price}
                      onChange={handleChange}
                    />
                  </div>
                  {state.Type === 'Product' || state.Type === 'Service' ? (
                    <div className="colm">
                      <label htmlFor="exampleFormControlInput1">Offers</label>
                      <select
                        className="form-control text-capitalize"
                        multiple={false}
                        name="offers"
                        value={state.offers}
                        onChange={handleChange}
                      >
                        <option value="0">--</option>
                        <option value="10">10%</option>
                        <option value="35">35%</option>
                        <option value="45">45%</option>
                      </select>
                    </div>
                  ) : null}
                </div>
                <div className="form-group">
                  <label htmlFor="exampleFormControlInput1">Description</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Description"
                    name="desc"
                    value={state.desc}
                    onChange={handleChange}
                  />
                </div>
                {state.Type === 'NFT' ? (
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">
                      Properties(If any)
                    </label>
                    <div>
                      <span>1. </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Property"
                        name="properties"
                        value={state.properties}
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <span>2.</span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Property"
                        name="properties"
                        value={state.properties}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                ) : state.Type === 'Product' ? (
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">
                      Sizes (if applicable)
                    </label>
                    <div className="colm">
                      <input
                        type="text"
                        className="form-control"
                        name="sizes"
                        value={state.sizes}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="colm">
                      <input
                        type="text"
                        className="form-control"
                        name="sizes"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="colm">
                      <input
                        type="text"
                        className="form-control"
                        name="sizes"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="colm">
                      <input
                        type="text"
                        className="form-control"
                        name="sizes"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                ) : null}
                {state.Type === 'Product' || state.Type === 'Service' ? (
                  <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">
                      Delivery Time
                    </label>
                    <input
                      type="time"
                      name="delivery_time"
                      onChange={handleChange}
                      value={state.delivery_time}
                    />
                  </div>
                ) : null}
                <button type="submit" className="btn">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export default CreateListing;
