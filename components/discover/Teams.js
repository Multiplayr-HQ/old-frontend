import { useState, useEffect } from 'react';
import { searchTeams } from '@utils/functionsHelper';
import { toast } from 'react-toastify';
import TeamFilters from './filters/TeamFilters';

const Teams = ({ profile, selectedGame, user }) => {
  let myState = {};

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  myState.selectedFilters = selectedFilters;
  myState.setSelectedFilters = setSelectedFilters;

  myState.filteredResults = filteredResults;
  myState.setFilteredResults = setFilteredResults;

  const [showfavs, setShowFavs] = useState(false);
  const [searchObj, setSearchObj] = useState({
    search: ''
  });

  const [status, setStatus] = useState('confirm');
  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [searchData, setSearchData] = useState([]);

  const { search } = searchObj;
  var sdata;

  const handleChange = (e) => {
    setSearchObj((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sdata = await searchTeams(
      searchObj,
      setError,
      setFormLoading,
      toast,
      setStatus
    );
    setSearchData(sdata);
  };

  return (
    <div className="tab" id="teams">
      <div className="white_bg">
        <div className="team_search">
          <div className="searchbox">
            <h3>Search</h3>
            <form
              className="form w-100"
              noValidate="noValidate"
              onSubmit={handleSubmit}
            >
              <input
                type="search"
                placeholder="Search For Teams..."
                id="search"
                name="search"
                value={search}
                onChange={handleChange}
                autoComplete="off"
              />
              <input type="submit" />
            </form>
          </div>
          <div className="advance">
            <div className="views">
              <h3>ADVANCED FILTER </h3>
              EXCLUDE “ALREADY VIEWED”
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label
                  className="custom-control-label"
                  htmlFor="customCheck1"
                ></label>
              </div>
            </div>
            <h3>Favourite</h3>
            <div className="custom-control custom-switch">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customSwitch1"
                onClick={() => setShowFavs(!showfavs)}
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitch1"
              ></label>
            </div>
          </div>
        </div>

        <TeamFilters
          filterType={'TEAMS'}
          selectedGame={selectedGame}
          showfavs={showfavs}
          profile={profile}
          myState={myState}
          searchData={searchData}
          user={user}
        />
      </div>
    </div>
  );
};

export default Teams;
