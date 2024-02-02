import PropTypes from 'prop-types';
import Head from 'next/head'

const TeamFilter = (props) => (

        <div className="team_filter">
          <div className="drop_downs">
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name">Tier </span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  Sniper</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  AR</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Shotgun</a></li>
                <li><a href="#" className="small" data-value="option4" tabIndex="-1">
                  <input type="checkbox"/>
                  Pistol</a></li>
                <li><a href="#" className="small" data-value="option5" tabIndex="-1">
                  <input type="checkbox"/>
                  Marksman Rifile</a></li>
                <li><a href="#" className="small" data-value="option6" tabIndex="-1">
                  <input type="checkbox"/>
                  SMGs</a></li>
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> REGIONS</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1"> Assam
                  <input type="checkbox"/>
                  </a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1"> Arunachal Pradesh
                  <input type="checkbox"/>
                  </a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1"> Karnataka
                  <input type="checkbox"/>
                  </a></li>
                <li><a href="#" className="small" data-value="option4" tabIndex="-1"> Delhi
                  <input type="checkbox"/>
                  </a></li>
                <li><a href="#" className="small" data-value="option5" tabIndex="-1"> Maharasthra
                  <input type="checkbox"/>
                  </a></li>
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> Year</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  PC</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  Console</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Mobile</a></li>
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> PRIZE MONEY</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  PC</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  Console</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Mobile</a></li>
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> matches </span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  PC</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  Console</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Mobile</a></li>
              </ul>
            </div>
            <div className="button-group">
              <button type="button" className="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown"> <span className="drop_name"> PLATFORM</span> <span className="caret"></span> </button>
              <ul className="dropdown-menu">
                <li><a href="#" className="small" data-value="option1" tabIndex="-1">
                  <input type="checkbox"/>
                  PC</a></li>
                <li><a href="#" className="small" data-value="option2" tabIndex="-1">
                  <input type="checkbox"/>
                  Console</a></li>
                <li><a href="#" className="small" data-value="option3" tabIndex="-1">
                  <input type="checkbox"/>
                  Mobile</a></li>
              </ul>
            </div>
          </div>
          <div className="filters"> <a href="#" className="close1">X</a>
            <h3>Filters</h3>
            <div className="filter_list"> <span className="filter1"> Games: Call of Duty <a href="#" className="close2">X</a></span> <span className="filter1"> Category: LAN <a href="#" className="close2">X</a></span> <span className="filter1"> Type: Pro <a href="#" className="close2">X</a></span> <span className="filter1"> Rank: Legend <a href="#" className="close2">X</a></span> <span className="filter1"> Platform: Mobile <a href="#" className="close2">X</a></span> </div>
          </div>
        </div>

  
  

    );

export default TeamFilter;

