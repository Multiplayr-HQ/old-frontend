import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '@utils/baseURL';
// import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import TournamentDisplay from './TournamentDisplay';


const TournamentFilters = ({
  filterType,
  myState,
  selectedGame,
  showfavs,
  profile,
  searchData,
  user,
  teams,
  tournament,
  searchObj
}) => {
  const [data, setData] = useState(null);

  let filter = {};

  const [selectedMapFilters, setSelectedMapFilters] = useState([]);
  const [filterdata, setFilterdata] = useState(tournament);
  const [isLoading, setIsLoading] = useState(false);
  const [sessiontournament, setSessionTournament] = useState({
    key: null,
    value: null
  });
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
    // console.log("selected map filter",selectedFilters);

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
    // myState.setFilteredResults([]);
    // myState.setSelectedFilters([]);
    const uniqueTags = [];
    selectedMapFilters.map((item) => {
      uniqueTags.push({ key: item.key, values: Array.from(item.values) });
    });
    // console.log("selected map filter",)


    const getfilterData  =  async () => {
     
      selectedMapFilters.map((item , index) => {
        const key = item.key.toString().toLowerCase();
        console.log(key);
        filter = {
          ...filter,
          [key] : Array.from(item.values)
        }
      })

      console.log("xxxx" , filter);

      fetch(`${baseURL}/api/discover/tournaments/${selectedGame?._id}`, {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(filter),
      })
      .then(response => response.json())
      .then(data => console.log("xxxx api response" , data))
      .catch((error) => {
        console.error('Error:', error);
      }) 
    };

    await getfilterData();

    //Always set the Selected Game as Filter.
    // var ssg = undefined;
    // if (selectedGame != null) {
    //   ssg = selectedGame._id;
    // }

    // const params = JSON.stringify({
    //   mapFilters: uniqueTags,
    //   selectedGame: ssg
    // });

    // try {
    //   axios
    //     .post(`${baseURL}/api/discover/tournaments`, params, {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     .then((res) => {
    //       myState.setFilteredResults(res.data);
    //       myState.setSelectedFilters(selectedMapFilters);
    //     });
    // } catch (err) {
    //   toast.error(err.response?.data?.msg || 'Please recheck your inputs');
    // }
    // console.log("selected map filter",selectedMapFilters);
  };

  // console.log("session tournament is :",sessiontournament);

  useEffect (()  =>  {
      if (myState.selectedFilters.length > 0) {
      
      setFilterdata(myState.filteredResults);
    }

  } ,[myState] );
  // useEffect(() => {
  //   var sg = undefined;
  //   if (selectedGame != null) {
  //     sg = selectedGame._id;
  //   }

  //   if (myState.selectedFilters.length > 0) {
  //     setTournament(myState.filteredResults);
  //   } else {
  //     if (sessiontournament.key === null) {
  //       axios
  //         .get(`${baseURL}/api/tournaments/tournamentsbygame/${sg}`)
  //         .then((res) => {
  //           setTournament(res.data);
  //           console.log("session tournament in first api :",sessiontournament);
  //           setSessionTournament({ key: sg, value: tournament });
  //         });
  //     } else {
  //       if (sessiontournament.key != sg) {
  //         axios
  //           .get(`${baseURL}/api/tournaments/tournamentsbygame/${sg}`)
  //           .then((res) => {
  //             setTournament(res.data);
  //             console.log("session tournament in second api :",sessiontournament);
  //             setSessionTournament({ key: sg, value: tournament });
  //           });
  //       } else {
  //         //setTeam (sessionTeam.get(sg));
  //       }
  //     }

  //     // myState.setFilteredResults(team);
  //     //console.log(team);
  //   }
  // }, [myState, tournament]);

  

  return (
    <>
      <div className="team_filter">
        <div className="drop_downs">
          {data &&
            data.filter.metadata.map((filter, index) =>
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
                <div className="button-group" key={Date.now()}>
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
                <span key={idx} className="filter1">
                  {' '}
                  {filter.key}:
                  {Array.from(filter.values).map((filval, idxv) => (
                    < >
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

      <TournamentDisplay
        isLoading={isLoading}
        tournament={tournament}
        showfavs={showfavs}
        profile={profile}
        filterdata ={filterdata}
        searchData={searchData}
        user={user}
        teams={teams}
        searchObj = {searchObj}
      />
      {/* <div>
        <button  className='pagination-btn' style={{ height: 40, width: 100 }}>page : </button>
      </div> */}
    </>
  );
};

export default TournamentFilters;
