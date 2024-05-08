import axios from 'axios';
import React, { useEffect, useState } from 'react';
import baseURL from '../../../utils/baseURL';

const TeamSquadFilter = ({ playerData, players }) => {
  const [squadPlayers, setSquadPlayers] = useState({
    player: '',
    role: ''
  });
  // console.log("player",players);
  // console.log("playr data ",playerData);
  const [allplayers, setAllplayers] = useState([]);
  const [teamroles, setTeamroles] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/players`)
      .then((res) => setAllplayers(res.data));
     

    axios
      .get(`${baseURL}/api/all/teamroles`)
      .then((res) => setTeamroles(res.data));
      
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [searchText, setSearchText] = useState('');

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    
    console.log("object",searchWord);
    setSearchText(searchWord);
    const newFilter = allplayers?.filter((value) => {
      return (
        value.name?.toLowerCase().includes(searchWord.toLowerCase()) 
        // ||
        // value.apidata?.data?.platformInfo?.platformUserHandle
        //   .toLowerCase()
        //   .includes(searchWord.toLowerCase())
      );
    });
    if (searchText === '') {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
    console.log("new filter",newFilter);
  };




  
  const handleSelectedRig = (data) => {
    // if (data.apidata?.data?.platformInfo) {
    //   setSearchText(data.apidata?.data?.platformInfo.platformUserHandle);
    // } else {
    //   setSearchText(data.name);
    // }

    squadPlayers.player = data._id;
    playerData.push(squadPlayers);
    setFilteredData([]);
  };

  const onChange = (e) => {
    setSquadPlayers({ ...squadPlayers, [e.target.name]: e.target.value });
  };
  console.log("Sqade player",squadPlayers);

  return (
    <>
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select name="role" onChange={onChange} value={squadPlayers.role}>
          <option value="--">--</option>
          {teamroles.map((team,i) => (
            <option key={i} value={team}>{team}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Player</label>
        <input
          type="search"
          name="player"
          placeholder={`Enter The Name`}
          value={searchText}
          onChange={handleFilter}
          autoComplete="off"
        />
        {searchText?.length !== 0 ? (
          <>
            {filteredData.length > 0 ? (
              <>
                <div className="custom-rig-tag">
                  <div>
                    {!filteredData || filteredData?.length === 0 ? (
                      <p>No User found..</p>
                    ) : (
                      filteredData.map((data) => (
                        <div
                          onClick={() => handleSelectedRig(data)}
                          key={data._id}
                        >
                          {data.apidata?.data?.platformInfo ? (
                            <img
                              src={data.apidata?.data?.platformInfo?.avatarUrl}
                              height={50}
                              width={50}
                            />
                          ) : (
                            <img src={data?.imgUrl} height={50} width={50} />
                          )}
                          <p>
                            {data.apidata?.data?.platformInfo
                              ? data.apidata.data.platformInfo
                                  .platformUserHandle
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

export default TeamSquadFilter;
