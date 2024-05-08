import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import baseURL from '../../utils/baseURL';

const Category = ({ data }) => {
  const [tierData, setTierData] = useState('');

  const handleChange = (e) => {
    setTierData(e.target.value);
    handleClickTier(e, e.target.value);
  };

  const handleClickTier = (e, value) => {
    e.preventDefault();
    try {
      axios
        .put(`${baseURL}/api/tournaments/category/${data._id}`, { value })
        .then((res) => toast.success(res.data.msg));
    } catch (err) {
      console.log(err);
      toast.error('Please Check Tier value');
    }
  };

  return (
    <>
      <select
        name="category"
        id="category"
        value={data?.tournament_tier}
        disabled={data?.tournament_tier === '' ? false : true}
        onChange={(e) => handleChange(e)}
      >
        <option value="">Select Category</option>
        <option value="tier1">Tier 1</option>
        <option value="tier2">Tier 2</option>
        <option value="tier3">Tier 3</option>
        <option value="tier4">Tier 4</option>
      </select>
    </>
  );
};

export default Category;
