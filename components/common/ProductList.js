import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '@store/GlobalState';

import { getData } from '@utils/fetchData';
import ProductItem from '@components/product/ProductItem';
import filterSearch from '@utils/filterSearch';
import { useRouter } from 'next/router';
import Filter from '@components/Filter';

const ProductList = ({ user, productList }) => {
  const [products, setProducts] = useState(productList);

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
    <div className="tab hide" id="store">
      <div className="products">
        <ul>
          {products?.length === 0 ? (
            <li>
              <h2>No Products</h2>
            </li>
          ) : (
            products?.map((product, index) => (
              <li key={index}>
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
    </div>
  );
};

export default ProductList;
