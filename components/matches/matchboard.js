
 import PropTypes from 'prop-types';
 import Head from 'next/head'
 
 const MatchBoard = (props) => (

    <>

<h2>gon championship finals - dota 2 <b>2021</b></h2>
  <div className="match_heads">
    <ul>
      <li>
        <h4>Overview</h4>
        <h3>First Game</h3>
      </li>
      <li>
        <h4>Overview</h4>
        <h3>Second Game</h3>
      </li>
      <li>
        <h4>Overview</h4>
        <h3>Third Game</h3>
      </li>
    </ul>
  </div>
  <div className="match_board">
    <div className="participate_team">
      <div className="team_photo">
        <div className="pic"></div>
        <div className="team_name">TWW</div>
        <div className="count">1</div>
      </div>
      <div className="ranked">ranked #6</div>
      <div className="team_form">TEAM FORM</div>
      <div className="players"> <span className="round red">L</span> <span className="round green">W</span> <span className="round red">L</span> <span className="round green">W</span> <span className="round red">L</span> </div>
    </div>
    <div className="participate_details">
      <div className="live"><span className="round red"></span> Live</div>
      <div className="date">28 nov 17</div>
      <div className="time">3:00 pm | 15:00 ist</div>
      <div className="map"> MAP: DE_DUST</div>
      <div className="head_to_head">HEAD TO HEAD</div>
      <div className="heads_num"><span><b>3</b><b>5</b></span> <span><b>3</b><b>5</b></span> <span><b>3</b><b>5</b></span></div>
    </div>
    <div className="participate_team rightside">
      <div className="team_photo">
        <div className="count">1</div>
        <div className="team_name">EGO</div>
        <div className="pic"></div>
      </div>
      <div className="ranked">ranked #6</div>
      <div className="team_form">TEAM FORM</div>
      <div className="players"> <span className="round red">L</span> <span className="round green">W</span> <span className="round red">L</span> <span className="round green">W</span> <span className="round red">L</span> </div>
    </div>
  </div>
  <div className="players_box">
    <div className="team_mem">
      <div className="pic"></div>
      <div className="pic"></div>
      <div className="pic"></div>
      <div className="pic"></div>
      <div className="pic"></div>
    </div>
    <div className="team_mem">
      <div className="pic"></div>
      <div className="pic"></div>
      <div className="pic"></div>
      <div className="pic"></div>
      <div className="pic"></div>
    </div>
  </div>
    
</>


    
);

export default MatchBoard;