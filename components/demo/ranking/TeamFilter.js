// import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import baseURL from '../../utils/baseURL';
import axios from 'axios';
// import Head from 'next/head'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import RankingTable from './RankingTable';

const TeamFilter = ({ filterType, myState, selectedGame, showfavs, searchData, teamrankings, user }) => {

  const [data, setData] = useState(null);

  let filter = {};
  

  const [selectedMapFilters, setSelectedMapFilters] = useState([]);
  var [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionTeam, setSessionTeam] = useState({ key: null, value: null });
  const [selectedFilters, setSelectedFilters] = useState([]);

  // const [selectedFilters, setSelectedFilters] = useState({key : });

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


  const router = useRouter();

  const refreshData = () => {
    // router.replace(router.asPath);
    router.reload()
  };


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

    refreshData();

  };

  // const handleApplyFilters = async (e) => {


  //   e.preventDefault();
  //   myState.setFilteredResults([]);
  //   myState.setSelectedFilters([]);
  //   const uniqueTags = [];
  //   selectedMapFilters.map((item) => {
  //     uniqueTags.push({ key: item.key, values: Array.from(item.values) });
  //   });

  //   //Always set the Selected Game as Filter.
  //   var ssg = undefined;
  //   if (selectedGame != null) {
  //     ssg = selectedGame._id;
  //   }

  //   const params = JSON.stringify({
  //     mapFilters: uniqueTags,
  //     selectedGame: ssg
  //   });

  //   try {
  //     axios
  //       .post(`${baseURL}/api/discover/teams`, params, {
  //         headers: {
  //           'Content-Type': 'application/json'
  //         }
  //       })
  //       .then((res) => {
  //         myState.setFilteredResults(res.data);
  //         myState.setSelectedFilters(selectedMapFilters);
  //       });
  //   } catch (err) {
  //     toast.error(err.response?.data?.msg || 'Please recheck your inputs');
  //   }
  // };
  //   useEffect(() => {
  //     const fetchRankings = async () => {
  //         // setLoading(true);
  //         try {
  //             const response = await axios.get(
  //               `${baseURL}/api/rankings/bywinnings100/${selectedGame?._id}?region=${filterdata} `
  //             );
  //             setTeam(response.data);
  //             // setLoading(false);
  //         } catch (err) {
  //             // setError(err);
  //             // setLoading(false);
  //             toast.error('Error fetching rankings');
  //         }
  //     };

  //     fetchRankings();
  // }, [team]);


  const handleApplyFilters = async (e) => {
    // e.preventDefault();
    // myState.setFilteredResults([]);
    // myState.setSelectedFilters([]);
    const uniqueTags = [];
    // const uniqueTags = {};
    selectedMapFilters.map((item) => {
      uniqueTags.push({ key: item.key, values: Array.from(item.values) });
      // uniqueTags.push({key:item.key,value:item.value});
    });


    const filterdata = uniqueTags[0].values[0];
    // console.log("FILTERS  2 :",filterdata);

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

        fetch(`${baseURL}/api/rankings/bywinnings100/${selectedGame?._id}`, {
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

  }


  useEffect(() => {
    var sg = undefined;
    if (selectedGame != null) {
      sg = selectedGame._id;
    }


    if (myState.selectedFilters.length > 0) {
      setTeam(myState.filteredResults);
      //     setIsLoading(false);
    }
    else {

      setIsLoading(true);
      // if (sessionTeam.key === null) {
      //   axios.get(`${baseURL}/api/rankings/bywinnings100/${sg}`).then((res) => {
      //     setTeam(res.data);
      //     setSessionTeam({ key: sg, value: team });
      //     setIsLoading(false);
      //   });
      // } else {
      if (sessionTeam.key != sg) {
        axios.get(`${baseURL}/api/rankings/bywinnings100/${sg}`).then((res) => {
          setTeam(res.data);
          setSessionTeam({ key: sg, value: team });
          setIsLoading(false);
        });
      }
      // else {
      //   //setTeam (sessionTeam.get(sg));
      //   setIsLoading(false);
      // }
      // }
      // myState.setFilteredResults(team):

    }
  }, [myState, team]);
  
  console.log("selected filter :", selectedFilters);
  console.log("Selected map filter ", selectedMapFilters);
 

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

        <RankingTable
          isLoading={isLoading}
          team={team}
          showfav={showfavs}
          // profile={profile}
          user={user}
          searchResults={searchData}
          teamrankingss={teamrankings}
        />



      </>
    );
  } else {
    return null;
  }


  // return(

  //       <div className="team_filter">
  //         <div className="drop_downs">
  //           <div className="button-group">
  //             <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name">Tier </span> <span className="caret"></span> </button>
  //             <ul className="dropdown-menu">
  //               <li><a href="#" className="small" data-value="option1" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 Sniper</a></li>
  //               <li><a href="#" className="small" data-value="option2" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 AR</a></li>
  //               <li><a href="#" className="small" data-value="option3" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 Shotgun</a></li>
  //               <li><a href="#" className="small" data-value="option4" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 Pistol</a></li>
  //               <li><a href="#" className="small" data-value="option5" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 Marksman Rifile</a></li>
  //               <li><a href="#" className="small" data-value="option6" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 SMGs</a></li>
  //             </ul>
  //           </div>
  //           <div className="button-group">
  //             <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> REGIONS</span> <span className="caret"></span> </button>
  //             <ul className="dropdown-menu">
  //               <li><a href="#" className="small" data-value="option1" tabIndex="-1"> Assam
  //                 <input type="checkbox"/>
  //                 </a></li>
  //               <li><a href="#" className="small" data-value="option2" tabIndex="-1"> Arunachal Pradesh
  //                 <input type="checkbox"/>
  //                 </a></li>
  //               <li><a href="#" className="small" data-value="option3" tabIndex="-1"> Karnataka
  //                 <input type="checkbox"/>
  //                 </a></li>
  //               <li><a href="#" className="small" data-value="option4" tabIndex="-1"> Delhi
  //                 <input type="checkbox"/>
  //                 </a></li>
  //               <li><a href="#" className="small" data-value="option5" tabIndex="-1"> Maharasthra
  //                 <input type="checkbox"/>
  //                 </a></li>
  //             </ul>
  //           </div>
  //           <div className="button-group">
  //             <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> Year</span> <span className="caret"></span> </button>
  //             <ul className="dropdown-menu">
  //               <li><a href="#" className="small" data-value="option1" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 PC</a></li>
  //               <li><a href="#" className="small" data-value="option2" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 Console</a></li>
  //               <li><a href="#" className="small" data-value="option3" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 Mobile</a></li>
  //             </ul>
  //           </div>
  //           <div className="button-group">
  //             <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> PRIZE MONEY</span> <span className="caret"></span> </button>
  //             <ul className="dropdown-menu">
  //               <li><a href="#" className="small" data-value="option1" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 PC</a></li>
  //               <li><a href="#" className="small" data-value="option2" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 Console</a></li>
  //               <li><a href="#" className="small" data-value="option3" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 Mobile</a></li>
  //             </ul>
  //           </div>
  //           <div className="button-group">
  //             <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> matches </span> <span className="caret"></span> </button>
  //             <ul className="dropdown-menu">
  //               <li><a href="#" className="small" data-value="option1" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 PC</a></li>
  //               <li><a href="#" className="small" data-value="option2" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 Console</a></li>
  //               <li><a href="#" className="small" data-value="option3" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 Mobile</a></li>
  //             </ul>
  //           </div>
  //           <div className="button-group">
  //             <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> PLATFORM</span> <span className="caret"></span> </button>
  //             <ul className="dropdown-menu">
  //               <li><a href="#" className="small" data-value="option1" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 PC</a></li>
  //               <li><a href="#" className="small" data-value="option2" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 Console</a></li>
  //               <li><a href="#" className="small" data-value="option3" tabIndex="-1">
  //                 <input type="checkbox"/>
  //                 Mobile</a></li>
  //             </ul>
  //           </div>
  //         </div>
  //         <div className="filters"> <a href="#" className="close1">X</a>
  //           <h3>Filters</h3>
  //           {/* <div className="filter_list"> <span className="filter1"> Games: Call of Duty <a href="#" className="close2">X</a></span> <span className="filter1"> Category: LAN <a href="#" className="close2">X</a></span> <span className="filter1"> Type: Pro <a href="#" className="close2">X</a></span> <span className="filter1"> Rank: Legend <a href="#" className="close2">X</a></span> <span className="filter1"> Platform: Mobile <a href="#" className="close2">X</a></span> </div> */}
  //         </div>
  //       </div>

  // )
};

export default TeamFilter;

