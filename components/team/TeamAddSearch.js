import React, { useState } from 'react';

const TeamAddSearch = ({ sponsors, states, type, val }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    let newFilter = [];
    if (val === 'Mouse' || val === 'Keyboard') {
      newFilter = sponsors?.filter((value) => {
        return (
          value.name.toLowerCase().includes(searchWord.toLowerCase()) &&
          value.category === val
        );
      });
    } else {
      newFilter = sponsors?.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
      });
    }
    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSelectedRig = (data) => {
    setSearchText(data.name);
    if (type === 'ARENA') {
      states.arena = data._id;
    } else if (type === 'KEYBOARD') {
      states.keyboard = data._id;
    } else if (type === 'MOUSE') {
      states.mouse = data._id;
    } else {
      states.sponsor = data._id;
    }
    setFilteredData([]);
  };
  return (
    <>
      <div className="form-group">
        {type === 'ARENA' ? (
          <label htmlFor="exampleFormControlInput1">Arena (Optional)</label>
        ) : type === 'KEYBOARD' ? (
          <label htmlFor="exampleFormControlInput1">Keyboard (Optional)</label>
        ) : type === 'MOUSE' ? (
          <label htmlFor="exampleFormControlInput1">Mouse (Optional)</label>
        ) : (
          <label htmlFor="exampleFormControlInput1">Sponsor (Optional)</label>
        )}
        <input
          type="search"
          name="sponsor"
          placeholder={`Enter The ${
            type === 'ARENA'
              ? 'Arena'
              : type === 'MOUSE'
              ? 'Mouse'
              : type === 'KEYBOARD'
              ? 'Keyboard'
              : 'Sponsor'
          } name`}
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
                      <p>
                        No{' '}
                        {type === 'ARENA'
                          ? 'Arena'
                          : type === 'MOUSE'
                          ? 'Mouse'
                          : type === 'KEYBOARD'
                          ? 'Keyboard'
                          : 'Sponsor'}{' '}
                        found..
                      </p>
                    ) : (
                      filteredData.map((data) => (
                        <div
                          onClick={() => handleSelectedRig(data)}
                          key={data._id}
                          className="items"
                        >
                          <span>
                            {type === 'KEYBOARD' || type === 'MOUSE' ? (
                              <img src={data?.image} height={50} width={50} />
                            ) : type === 'ARENA' ? (
                              <img src={data?.logoUrl} height={50} width={50} />
                            ) : (
                              <img src={data?.imgUrl} height={50} width={50} />
                            )}
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

export default TeamAddSearch;
