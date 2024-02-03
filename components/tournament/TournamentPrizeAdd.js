import axios from 'axios';
import { useState, useEffect } from 'react';
import baseURL from '../../utils/baseURL';

const TournamentPrizeAdd = ({
  prizes,
  prizeData,
  tournament,
  isSupportAdmin
}) => {
  const [states, setStates] = useState({
    prizeName: '',
    goodies: '',
    prize_sponsor: '',
    place: prizes,
    winnings: null,
    winner_img: ''
  });
  const [allsponsor, setAllsponsor] = useState([]);
  const [allTeams, setAllTeams] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/all/sponsors`)
      .then((res) => setAllsponsor(res.data));
    if (isSupportAdmin) {
      axios
        .get(`${baseURL}/api/all/allteams`)
        .then((res) => setAllTeams(res.data));
    }
  }, []);

  const handleChange = (e) => {
    setStates({ ...states, [e.target.name]: e.target.value });
    setTrigger(!trigger);
  };
  let searchData = '';

  if (isSupportAdmin) {
    searchData = allTeams;
  } else if (tournament.playType === 'SOLO') {
    searchData = tournament.registered;
  } else if (tournament.playType === 'TEAMS') {
    searchData = tournament.teams;
  }

  const [filteredData, setFilteredData] = useState([]);
  const [playersData, setPlayersData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [trigger, setTrigger] = useState(null);

  const handleFilter = (event, type) => {
    const searchWord = event.target.value;
    if (type === 'PLAYER') {
      setStates({ ...states, prizeName: event.target.value });
    } else {
      setSearchText(searchWord);
    }
    let newFilter = '';
    if (type === 'PLAYER') {
      newFilter = searchData?.filter((value) => {
        if (value.user) {
          return value.user.name
            .toLowerCase()
            .includes(states.prizeName.toLowerCase());
        } else {
          return value.teamId.name
            .toLowerCase()
            .includes(states.prizeName.toLowerCase());
        }
      });
    } else {
      newFilter = allsponsor?.filter((value) => {
        return value.name.toLowerCase().includes(searchWord.toLowerCase());
      });
    }
    if (searchText === '' && !type) {
      setFilteredData([]);
    } else if (type === 'PLAYER') {
      setPlayersData(newFilter);
    } else {
      setFilteredData(newFilter);
    }
  };

  const handleSelectedRig = (data, type) => {
    if (type === 'PLAYER') {
      if (data.user) {
        setStates({
          ...states,
          prizeName: data.user.name,
          winner_img: data.user.profilePicUrl
        });
      } else {
        setStates({
          ...states,
          prizeName: data.teamId.name,
          winner_img: data.teamId.imgUrl
        });
      }
      setPlayersData([]);
      states.prizeName = data.teamId.name;
      states.winner_img = data.teamId.imgUrl;
      prizeData.push(states);
    } else {
      setSearchText(data.name);
      states.prize_sponsor = data._id;
      prizeData.push(states);
      setFilteredData([]);
    }
  };

  useEffect(() => {
    prizeData.push(states);
  }, [trigger]);

  return (
    <>
      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">{prizes} Prize</label>
        <input
          type="text"
          className="form-control"
          value={states.prizeName}
          onChange={(e) => handleFilter(e, 'PLAYER')}
          name="prizeName"
        />
        {states.prizeName.length !== 0 ? (
          <>
            {playersData.length > 0 ? (
              <div className="custom-rig-tag">
                <div className="rigs_items">
                  {!playersData || playersData.length === 0 ? (
                    <p>No Player found..</p>
                  ) : (
                    playersData.map((data) => (
                      <div
                        onClick={() => handleSelectedRig(data, 'PLAYER')}
                        key={data?._id}
                        className="items"
                      >
                        <span>
                          {data.user ? (
                            <img
                              src={data?.user?.profilePicUrl}
                              height={50}
                              width={50}
                            />
                          ) : (
                            <img
                              src={data?.teamId?.imgUrl}
                              height={50}
                              width={50}
                            />
                          )}
                        </span>
                        <p>
                          {data.teamId ? (
                            <>
                              {data.teamId?.name.length > 20
                                ? data.teamId?.name.substring(0, 20) + '...'
                                : data.teamId?.name}
                            </>
                          ) : (
                            <>
                              {data.user?.name.length > 20
                                ? data.user?.name.substring(0, 20) + '...'
                                : data.user?.name}
                            </>
                          )}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ) : null}
          </>
        ) : null}
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Prize Won</label>
        <input
          type="number"
          className="form-control"
          name="winnings"
          value={states.winnings}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Goodies</label>
        <input
          type="text"
          className="form-control"
          name="goodies"
          value={states.goodies}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Upload Image of Trophy</label>
        <div className="style_file_upload">
          <input type="file" name="imgUrl" id="imgUrl" className="inputfile" />
          <label htmlFor="imgUrl">
            <span>PNG Image</span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="exampleFormControlInput1">Sponsor</label>
        <input
          type="search"
          name="sponsor"
          placeholder={`Enter The Sponsor name`}
          value={searchText}
          onChange={handleFilter}
          autoComplete="off"
        />
        {searchText.length !== 0 ? (
          <>
            {filteredData.length > 0 ? (
              <div className="custom-rig-tag">
                <div className="rigs_items">
                  {!filteredData || filteredData.length === 0 ? (
                    <p>No Sponsor found..</p>
                  ) : (
                    filteredData.map((data) => (
                      <div
                        onClick={() => handleSelectedRig(data)}
                        key={data._id}
                        className="items"
                      >
                        <span>
                          <img src={data?.imgUrl} height={50} width={50} />
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
            ) : null}
          </>
        ) : null}
      </div>
    </>
  );
};

export default TournamentPrizeAdd;
