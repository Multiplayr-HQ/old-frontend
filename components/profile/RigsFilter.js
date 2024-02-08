import React, { useState } from 'react';

const RigsFilter = ({ val, data, states }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = data?.filter((value) => {
      return (
        value.name.toLowerCase().includes(searchWord.toLowerCase()) &&
        value.category === val
      );
    });
    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSelectedRig = (data) => {
    setSearchText(data.name); 
    const keys = Object.keys(states);
    keys.forEach((key, index) => {
      if (key === val) {
        states[key] = data._id;
      }
    });
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">{val}</label>
        <input
          type="search"
          id={val}
          name={val}
          placeholder={`Enter The ${val} name`}
          value={searchText}
          onChange={handleFilter}
          autoComplete="off"
        />
        {searchText.length !== 0 ? (
          <>
            {filteredData.length > 0 ? (
              <>
                <div className="custom-rig-tag">
                  <div className="rigs_items">
                    {!filteredData || filteredData.length === 0 ? (
                      <p>No {val} found..</p>
                    ) : (
                      filteredData.map((data) => (
                        <div
                          onClick={() => handleSelectedRig(data)}
                          key={data._id}
                          className="items"
                        >
                          <span>
                            {' '}
                            <img src={data?.image} />
                          </span>
                          <p>
                            {data.name.length > 20
                              ? data.name.substring(0, 20) + '...'
                              : data.name}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </>
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
};

export default RigsFilter;
