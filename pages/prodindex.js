import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '@store/GlobalState';

import { getData } from '@utils/fetchData';
import ProductItem from '@components/product/ProductItem';
import filterSearch from '@utils/filterSearch';
import { useRouter } from 'next/router';
import Filter from '@components/Filter';
import Meta from '@components/Meta';

import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import FooterMain from '@components/FooterMain';
import AllScript from './AllScript';

const Home = (props) => {
  const [products, setProducts] = useState(props.products);

  const [isCheck, setIsCheck] = useState(false);
  const [page, setPage] = useState(1);
  const router = useRouter();

  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;

  useEffect(() => {
    setProducts(props.products);
  }, [props.products]);

  useEffect(() => {
    if (Object.keys(router.query).length === 0) setPage(1);
  }, [router.query]);

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

  return (
    <>
      <MetaDash />

      <SignedHeader user={props.user} />

      <LeftNav user={props.user} />

      <div className="main_middle profile_middle">
        <div className="home_page">
          <Head>
            <title>Home Page</title>
          </Head>

          <Filter state={state} />

          {auth.user && auth.user.role === 'admin' && (
            <div
              className="delete_all btn btn-info mt-2"
              style={{ marginBottom: '-10px' }}
            >
              <input
                type="checkbox"
                checked={isCheck}
                onChange={handleCheckALL}
                style={{
                  width: '25px',
                  height: '25px',
                  transform: 'translateY(8px)'
                }}
              />

              <button
                className="btn ml-2"
                style={{ background: '#f582ae' }}
                data-toggle="modal"
                data-target="#exampleModal"
                onClick={handleDeleteAll}
              >
                CLICK TO DELETE
              </button>
            </div>
          )}

          <div className="products">
            <ul>
              {products?.length === 0 ? (
                <h2>No Products</h2>
              ) : (
                products?.map((product,i) => (
                  <li key={i}>
                    <ProductItem
                      key={product._id}
                      product={product}
                      handleCheck={handleCheck}
                    />
                  </li>
                ))
              )}
            </ul>
          </div>

          {props.result < page * 6 ? (
            ''
          ) : (
            <button className="btn" onClick={handleLoadmore}>
              Load more...
            </button>
          )}
        </div>
      </div>

      <AllScript />
    </>
  );
};

export async function getServerSideProps({ query }) {
  const page = query.page || 1;
  const category = query.category || 'all';
  const sort = query.sort || '';
  const search = query.search || 'all';

  const res = await getData(
    `product?limit=${
      page * 6
    }&category=${category}&sort=${sort}&title=${search}`
  );
  // server side rendering
  return {
    props: {
      products: res.products,
      result: res.result
    } // will be passed to the page component as props
  };
}

export default Home;
