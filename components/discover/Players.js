import { useState } from 'react';
import PlayerFilters from './filters/PlayerFilters';

const Players = ({ selectedGame }) => {
  let myState = {};

  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  myState.selectedFilters = selectedFilters;
  myState.setSelectedFilters = setSelectedFilters;

  myState.filteredResults = filteredResults;
  myState.setFilteredResults = setFilteredResults;

  return (
    <div className="tab" id="players">
      <div className="white_bg">
        <div className="team_search">
          <div className="searchbox">
            <h3>Search</h3>
            <input type="search" placeholder="Search" />
            <input type="submit" />
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
              />
              <label
                className="custom-control-label"
                htmlFor="customSwitch1"
              ></label>
            </div>
          </div>
        </div>

        <PlayerFilters
          filterType={'PLAYERS'}
          myState={myState}
          selectedGame={selectedGame}
        />
      </div>
    </div>
  );
};

export default Players;
