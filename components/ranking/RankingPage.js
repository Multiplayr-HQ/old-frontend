import React from 'react';
import { useState } from 'react';
import { searchRanks } from '@utils/functionsHelper';
import { toast } from 'react-toastify';
import TeamFilter from './TeamFilter';

const RankingPage = ({ selectedGame, teamranking }) => {

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
    // const [searchResults, setSearchResults] = useState([]);
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
        sdata = await searchRanks(
            searchObj,
            setError,
            setFormLoading,
            toast,
            setStatus
        );

        // const response = await axios.get(
        //     `${baseURL}/api/rankings/search/${searchObj}`
        // );
        // setTeamsRanks((prev) => [...prev, ...response.data]);

        setSearchData(sdata);
    };

    return (

        <div className="tab" id="players">
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

                <TeamFilter
                    filterType={'RANKINGS'}
                    myState={myState}
                    selectedGame={selectedGame}

                    showfavs={showfavs}
                    // profile={profile}
                    teamrankings={teamranking}

                    searchData={searchData}
                // user={user}
                />
            </div>
        </div>


    );
};

export default RankingPage;