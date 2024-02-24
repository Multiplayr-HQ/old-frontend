import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { toast } from 'react-toastify';
import TeamDisplay from '../display/TeamDisplay';

const TeamFilters = ({
  filterType,
  myState,
  selectedGame,
  showfavs,
  profile,
  searchData,
  user
}) => {
  const [data, setData] = useState(null);

  const [selectedMapFilters, setSelectedMapFilters] = useState([]);
  var [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionTeam, setSessionTeam] = useState({ key: null, value: null });
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSelectFilter = (event) => {
    const filtered = event.target.value;
    const name = event.target.name;

    if (!selectedFilters.includes(filtered)) {
      setSelectedFilters([...selectedFilters, filtered]);
    } else {
      setSelectedFilters(
        selectedFilters.filter((selFilter) => {
          return selFilter !== filtered;
        })
      );
    }

    var found = selectedMapFilters.find((element) =>
      element.key.includes(name)
    );

    if (found == undefined) {
      var arr = new Set();
      arr.add(filtered);

      selectedMapFilters.push({ key: name, values: arr });
    } else {
      var arr = found.values;
      if (!arr.has(filtered)) {
        arr.add(filtered);

        selectedMapFilters.push({ key: name, values: arr });
      }
    }

    const uniqueTags = [];
    selectedMapFilters.map((item) => {
      var findItem = uniqueTags.find((x) => x.key === item.key);
      if (!findItem) uniqueTags.push(item);
    });

    setSelectedMapFilters(uniqueTags);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${baseURL}/api/filters/${filterType}`);
      const newData = await response.json();
      setData(newData);
    };
    fetchData();
  }, []);

  const handleClearFilter = async (e, key, val) => {
    e.preventDefault();
    var sf = selectedFilters.filter((selfil) => selfil != val);
    setSelectedFilters(sf);

    var found = selectedMapFilters.find((element) =>
      element.key.includes(name)
    );

    var smarr = found.values;
    smarr.delete(val);

    const uniqueTags = [];
    selectedMapFilters.map((item) => {
      if (item.key === key) {
        var findItem = selectedMapFilters.find((element) =>
          element.key.includes(key)
        );
        var smarr = findItem.values;
        smarr.delete(val);

        if (smarr.size > 0) {
          uniqueTags.push({ key: key, values: smarr });
        }
      } else {
        uniqueTags.push(item);
      }
    });
    setSelectedMapFilters(uniqueTags);
  };

  const handleApplyFilters = async (e) => {
    e.preventDefault();
    myState.setFilteredResults([]);
    myState.setSelectedFilters([]);
    const uniqueTags = [];
    selectedMapFilters.map((item) => {
      uniqueTags.push({ key: item.key, values: Array.from(item.values) });
    });

    //Always set the Selected Game as Filter.
    var ssg = undefined;
    if (selectedGame != null) {
      ssg = selectedGame._id;
    }

    const params = JSON.stringify({
      mapFilters: uniqueTags,
      selectedGame: ssg
    });

    try {
      axios
        .post(`${baseURL}/api/discover/teams`, params, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          myState.setFilteredResults(res.data);
          myState.setSelectedFilters(selectedMapFilters);
        });
    } catch (err) {
      toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    }
  };

  useEffect(() => {
    var sg = undefined;
    if (selectedGame != null) {
      sg = selectedGame._id;
    }

    if (myState.selectedFilters.length > 0) {
      setTeam(myState.filteredResults);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      if (sessionTeam.key === null) {
        axios.get(`${baseURL}/api/teams/teamsbygame/${sg}`).then((res) => {
          setTeam(res.data);
          setSessionTeam({ key: sg, value: team });
          setIsLoading(false);
        });
      } else {
        if (sessionTeam.key != sg) {
          axios.get(`${baseURL}/api/teams/teamsbygame/${sg}`).then((res) => {
            setTeam(res.data);
            setSessionTeam({ key: sg, value: team });
            setIsLoading(false);
          });
        } else {
          //setTeam (sessionTeam.get(sg));
          setIsLoading(false);
        }
      }
      //myState.setFilteredResults(team);
     
    }
  }, [myState, team]);
  console.log("selecter filter ", selectedFilters);
//  console.log('teams',team);
  if (data && data.filter) {
    return (
      <>
        <div className="team_filter">
          <div className="drop_downs">
            {data.filter.metadata.map((filter, index) =>
              filter.value?.indexOf(filter.key) < 0 ? (
                <div key={index} className="button-group">
                  <button
                    type="button"
                    className="btn btn-default btn-sm dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <span className="drop_name">{filter.key}</span>{' '}
                    <span className="caret"></span>{' '}
                  </button>

                  <ul className="dropdown-menu">
                    {filter.value.map((val, idx) => (
                      <li key={idx}>
                        <a
                          href="#"
                          className="small"
                          data-value={val}
                          tabIndex={idx}
                        >
                          <input
                            type="checkbox"
                            name={filter.key}
                            checked={selectedFilters.includes(val)}
                            onChange={handleSelectFilter}
                            id={val}
                            value={val}
                          />
                          <span>{val}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="button-group" key={idx}>
                  {' '}
                  <span className="drop_name">{filter.key}</span>
                  <div className="custom-control custom-checkbox">
                    <input
                      className="custom-control-input"
                      type="checkbox"
                      name={filter.key}
                      checked={selectedFilters.includes(filter.key)}
                      onChange={handleSelectFilter}
                      id={filter.key}
                      value={filter.key}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor={filter.key}
                    ></label>
                  </div>
                </div>
              )
            )}
          </div>

          {selectedMapFilters.length > 0 && (
            <div className="filters">
              {' '}
              <a
                href="#!"
                className="close1"
                onClick={() => {
                  setSelectedMapFilters([]);
                  myState.setFilteredResults([]);
                  myState.setSelectedFilters([]);
                }}
              >
                X
              </a>
              <h3>Filters</h3>
              <div className="filter_list">
                {' '}
                {selectedMapFilters.map((filter, idx) => (
                  <span className="filter1" key={idx}>
                    {' '}
                    {filter.key}:
                    {Array.from(filter.values).map((filval, idxv) => (
                      <>
                        {filval}{' '}
                        <a
                          href="#!"
                          className="close2"
                          onClick={(e) =>
                            handleClearFilter(e, filter.key, filval)
                          }
                        >
                          X
                        </a>{' '}
                      </>
                    ))}
                  </span>
                ))}
              </div>
              <button className="apply" onClick={handleApplyFilters}>
                APPLY FILTER
              </button>
            </div>
          )}
        </div>

        <TeamDisplay
          isLoading={isLoading}
          team={team}
          showfavs={showfavs}
          profile={profile}
          user={user}
          searchData={searchData}
        />
      </>
    );
  } else {
    return null;
  }
};

export default TeamFilters;
