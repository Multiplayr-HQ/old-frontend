import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseURL from '../../utils/baseURL';

const TeamAbtAdd = ({ role, rolesData }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [addRole, setAddRole] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;

    setSearchText(searchWord);
    const newFilter = userData?.filter((value) => {
      return value?.name?.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  useEffect(() => {
    axios.get(`${baseURL}/api/all/users`).then((res) => setUserData(res.data));
  }, []);

  const handleSelectedRig = (data) => {
    setSearchText(data.name);
    let x = '';
    if (addRole.length > 0) {
      x = addRole;
    } else {
      x = role;
    }
    rolesData.push({
      employeeId: data._id,
      role: x
    });
    setFilteredData([]);
  };

  return (
    <>
      <div className="form-group">
        {role.length > 0 ? (
          <label htmlFor="">{role}</label>
        ) : (
          <input
            type="text"
            placeholder={`enter role`}
            value={addRole}
            className="form-control"
            onChange={(e) => setAddRole(e.target.value)}
          />
        )}
        <input
          type="text"
          placeholder={`enter ${role} name`}
          value={searchText}
          className="form-control"
          onChange={handleFilter}
        />
        {searchText.length !== 0 ? (
          <>
            {filteredData.length > 0 ? (
              <>
                <div className="custom-rig-tag">
                  <div className="rigs_items">
                    {!filteredData ? (
                      <p>No {role} found..</p>
                    ) : (
                      filteredData.map((data) => (
                        <div
                          onClick={() => handleSelectedRig(data)}
                          key={data._id}
                          className="items"
                        >
                          <span>
                            <img
                              src={data?.profilePicUrl}
                              height={50}
                              width={50}
                            />
                          </span>
                          <p>
                            {data?.name.length > 20
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

export default TeamAbtAdd;
