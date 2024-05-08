import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '@store/GlobalState';

import { getData } from '@utils/fetchData';
import ProductItem from '@components/product/ProductItem';
import filterSearch from '@utils/filterSearch';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { toast } from 'react-toastify';
import RigsFilter from '../profile/RigsFilter';
import ProfileRigsDelete from '../profile/ProfileRigsDelete';

const ProductRigs = ({ user, productList, Userdata }) => {
  const [products, setProducts] = useState(productList);

  const [rigsData, setRigsData] = useState([]);
  const [states, setStates] = useState({
    Keyboard: '',
    Mouse: '',
    Headphone: '',
    Mat: '',
    Monitor: '',
    Gpu: '',
    Chair: '',
    rigsType: 'PC',
    Cbrand: '',
    Cmodel: '',
    Controller: '',
    Mbrand: '',
    Mmodel: ''
  });

  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  

  useEffect(() => {
    setProducts(productList);
  }, [productList]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

  useEffect(async() => {
    await axios.get(`${baseURL}/api/rigsdata/`).then((res) => {
      const { data } = res;
      // setRigsData([...data]);
      rigsData.push([...data]);
      console.log('fetched rig data \t \t', res, '\n', rigsData);
    });
  }, []);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const handleCheckALL = () => {
    products.forEach((product) => (product.checked = !isCheck));
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const handleDeleteAll = () => {
    let deleteArr = [];
    products.forEach((product) => {
      if (product.checked) {
        deleteArr.push({
          data: '',
          id: product._id,
          title: 'Delete all selected products?',
          type: 'DELETE_PRODUCT'
        });
      }
    });

    dispatch({ type: 'ADD_MODAL', payload: deleteArr });
  };

  const handleLoadmore = () => {
    setPage(page + 1);
    filterSearch({ router, page: page + 1 });
  };

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${baseURL}/api/profile/rigs/${user._id}`,
        states
      );
      await console.log('response for rigs \t \t ', res);
      await toast.success('Saved Changes', { autoClose: 2000 });
      $('a.model_close').parent().removeClass('show_model');
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
    refreshData();
  };

  const handleChangeCheck = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
  };

  // Switching the tab content using jquery

  useEffect(() => {
    $('.profile_tab_btn li a').click(function () {
      $('.prfoile_tab_data .tab').addClass('hide');
      var rel = jQuery(this).attr('rel');
      $('#' + rel).removeClass('hide');
      $('.profile_tab_btn li a').parent().removeClass('active');
      $(this).parent().addClass('active');
    });
  }, []);

  return (
    <div className="tab hide" id="rigs">
      <div className="sponser_btn">
        {' '}
        {/* adding add your rig button for profile owner */}
        {Userdata.profile.user._id === user._id ? (
          <a href="#!" className="model_show_btn">
            <button className="btn">
              {' '}
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Add Your
              Rigs
            </button>
          </a>
        ) : null}
        <div className="common_model_box  poup_rigs" id="big_poup">
          {' '}
          <a href="#!" className="model_close">
            {' '}
            X{' '}
          </a>
          <div className="inner_model_box">
            <h3>Rigs</h3>

            <form className="common_form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="exampleFormControlTextarea1">Platform</label>
                <div className="btn_selection">
                  <div className="big_btn">
                    <span class="form-check-label terms">PC</span>
                    <input
                      type="radio"
                      name="rigsType"
                      value="PC"
                      onChange={handleChangeCheck}
                    />
                  </div>

                  <div className="big_btn">
                    <span class="form-check-label terms">Console</span>
                    <input
                      type="radio"
                      name="rigsType"
                      value="Console"
                      onChange={handleChangeCheck}
                    />
                  </div>

                  <div className="big_btn">
                    <span class="form-check-label terms">Mobile</span>
                    <input
                      type="radio"
                      name="rigsType"
                      value="Mobile"
                      onChange={handleChangeCheck}
                    />
                  </div>
                </div>
              </div>

              {states.rigsType === 'PC' ? (
                <>
                  <RigsFilter val="Mouse" data={rigsData} states={states} />

                  <RigsFilter val="Keyboard" data={rigsData} states={states} />

                  <RigsFilter val="Mat" data={rigsData} states={states} />

                  <RigsFilter val="Headphone" data={rigsData} states={states} />

                  <RigsFilter val="Gpu" data={rigsData} states={states} />

                  <RigsFilter val="Monitor" data={rigsData} states={states} />

                  <RigsFilter val="Chair" data={rigsData} states={states} />
                </>
              ) : (
                <>
                  {states.rigsType === 'Console' ? (
                    <>
                      <RigsFilter
                        val="Console Model"
                        data={rigsData}
                        states={states}
                      />

                      <RigsFilter
                        val="Console Brand"
                        data={rigsData}
                        states={states}
                      />

                      <RigsFilter
                        val="Headphone"
                        data={rigsData}
                        states={states}
                      />

                      <RigsFilter
                        val="Controller"
                        data={rigsData}
                        states={states}
                      />

                      <RigsFilter val="Chair" data={rigsData} states={states} />
                    </>
                  ) : (
                    <>
                      <RigsFilter
                        val="Mobile Model"
                        data={rigsData}
                        states={states}
                      />

                      <RigsFilter
                        val="Mobile Brand"
                        data={rigsData}
                        states={states}
                      />

                      <RigsFilter
                        val="Earphone"
                        data={rigsData}
                        states={states}
                      />

                      <RigsFilter
                        val="Controller"
                        data={rigsData}
                        states={states}
                      />
                    </>
                  )}
                </>
              )}

              <button className="btn">Done</button>
            </form>
          </div>
          <div className="overlay"></div>
        </div>
      </div>

      <div className="rigs">
        <ul>
          {console.log('inside rigs ul \t', rigsData)}
          {Userdata?.profile?.rigs?.length === 0 ? (
            <p>No Rigs available for you.</p>
          ) : (
            Userdata?.profile?.rigs?.map((rig) => (
              <li className='rig-card'>
                <ProfileRigsDelete
                  rigId={rig._id}
                  profile={Userdata.profile}
                  user={user}
                />
                <div className="lft_prod_det">
                  {' '}
                  <span className="new"> New</span>
                  <div className="prod_brand">
                    {rig.rigId.name.length > 30
                      ? rig.rigId.name.substring(0, 30) + '...'
                      : rig.rigId.name}
                  </div>
                  <p className="prod_name">{rig.rigId.category}</p>
                  <a
                    href={rig.rigId?.link}
                    className="quickpoup"
                    target="_blank"
                  >
                    Buy Now
                  </a>{' '}
                </div>
                <div className="prod_img">
                  <img src={rig.rigId.image} alt={rig.rigId.name} />
                </div>
              </li>
            ))
          )}

          {rigsData[0]?.map((rig) => (
            <li key={rig._id}>
              <ProfileRigsDelete rigId={rig._id} profile={rig} user={rig} />
              <div className="lft_prod_det">
                {' '}
                <span className="new"> New</span>
                <div className="prod_brand">
                  {rig.name && rig.name.length > 30
                    ? rig.name.substring(0, 30) + '...'
                    : rig.name}
                </div>
                <p className="prod_name">{rig.category}</p>
                <a href={rig.link} className="quickpoup" target="_blank">
                  Buy Now
                </a>{' '}
              </div>
              <div className="prod_img">
                <img src={rig.image} alt={rig.name} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductRigs;
