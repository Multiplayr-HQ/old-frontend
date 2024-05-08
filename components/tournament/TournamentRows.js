import { useState } from 'react';
import TournamentFilters from './TournamentFilters';
import { searchTournaments } from '@utils/functionsHelper';
import { toast } from 'react-toastify';
import { object } from 'prop-types';

const TournamentRows = ({ user, selectedGame, profile, teams ,tournament}) => {
  let myState = {};

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showfavs, setShowFavs] = useState(false);

  let cancel;
  var sdata;

  const [error, setError] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const [status, setStatus] = useState('confirm');
  const [searchData, setSearchData] = useState([]);
  const [searchObj, setSearchObj] = useState({
    search: ''
  });

  const { search } = searchObj;

  myState.selectedFilters = selectedFilters;
  myState.setSelectedFilters = setSelectedFilters;

  myState.filteredResults = filteredResults;
  myState.setFilteredResults = setFilteredResults;

  const handleChange = (e) => {
    setSearchObj((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    sdata = await searchTournaments(
      searchObj,
      setError,
      setFormLoading,
      toast,
      setStatus
    );
    setSearchData(sdata);
    // console.log("search object",searchObj);
  };

  return (
    <>
      <div className="white_bg">
        <div className="team_search">
          <div className="searchbox">
            <h3>Search</h3>

            <form
              className="form w-100"
              noValidate="novalidate"
              onSubmit={handleSubmit}
            >
              <input
                id="search"
                name="search"
                className=""
                placeholder="Search for tournaments..."
                type="search"
                value={search}
                onChange={handleChange}
                autoComplete="off"
              />
              <input type="submit" value="" />
            </form>
          </div>
          <div className="advance">
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

        <TournamentFilters
          filterType={'TOURNAMENTS'}
          myState={myState}
          tournament={tournament}
          selectedGame={selectedGame}
          showfavs={showfavs}
          profile={profile}
          searchData={searchData}
          searchObj = {searchObj}
          user={user}
          teams={teams}
        />
      </div>
    </>
  );
};

export default TournamentRows;
