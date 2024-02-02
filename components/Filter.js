import React, { useState, useEffect } from 'react';
import filterSearch from '../utils/filterSearch';
import { useRouter } from 'next/router';

const Filter = ({ state }) => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [category, setCategory] = useState('');

  const { categories } = state;

  const router = useRouter();

  const handleCategory = (e) => {
    setCategory(e.target.value);
    filterSearch({ router, category: e.target.value });
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    filterSearch({ router, sort: e.target.value });
  };

  useEffect(() => {
    filterSearch({ router, search: search ? search.toLowerCase() : 'all' });
  }, [search]);

  return (
    <>
      <div className="product_filter">
        <div className="welcome">
          <h1>Welcome to</h1>
          <h2> Multiplayr esports Merchandise Home Store...</h2>
          <h3>
            Customers can find favorite products sold by our <br /> partner
            merchandises. Sellers can
            <span>
              <a href="#footer"> contact Multiplayr </a>
            </span>{' '}
            for showing products here!
          </h3>
        </div>

        <div className="pro_filter_box">
          <div className="box1">
            <select
              className="custom-select text-capitalize  bg-info"
              value={category}
              onChange={handleCategory}
            >
              <option value="all">All Products</option>

              {categories.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="box2 input-group">
            <input
              list="title_product"
              type="search"
              placeholder="Searching our products here"
              aria-describedby="search-button"
              className="form-control   bg-info"
              value={search.toLowerCase()}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button id="search-button" type="button" className="btn btn-link ">
              <i className="fa fa-search"></i>
            </button>
          </div>

          <div className="box3">
            <select
              className="custom-select text-capitalize  bg-info"
              value={sort}
              onChange={handleSort}
            >
              <option value="-createdAt">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="-sold">Best sales</option>
              <option value="-price">Price: Hight-Low</option>
              <option value="price">Price: Low-Hight</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
