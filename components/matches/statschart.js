
 import PropTypes from 'prop-types';
 import Head from 'next/head'
 
 const StatsChart = (props) => (

    <>

<div className="stat_chart">
    <div className="chart1">
      <h3>Game Statistics</h3>
      <div className="game_chart"> <img src="/assets/media/match/game.jpg" alt="" /> </div>
    </div>
    <div className="chart1">
      <h3>Additional Stats</h3>
      <div className="game_chart"> <a href="#"> <span className="icon"><i className="fa fa-dot-circle-o" aria-hidden="true"></i></span>
        <h4>Gold</h4>
        <p>Per Minute</p>
        </a> <a href="#"> <span className="icon"><i className="fa fa-dot-circle-o" aria-hidden="true"></i></span>
        <h4>Kills</h4>
        <p>Per Minute</p>
        </a> <a href="#"> <span className="icon"><i className="fa fa-dot-circle-o" aria-hidden="true"></i></span>
        <h4>Deaths</h4>
        <p>Per Minute</p>
        </a> <a href="#"> <span className="icon"><i className="fa fa-dot-circle-o" aria-hidden="true"></i></span>
        <h4>Assists</h4>
        <p>Per Minute</p>
        </a> <a href="#"> <span className="icon"><i className="fa fa-dot-circle-o" aria-hidden="true"></i></span>
        <h4>Pentak</h4>
        <p>Per Minute</p>
        </a> <a href="#"> <span className="icon"><i className="fa fa-dot-circle-o" aria-hidden="true"></i></span>
        <h4>F.Blood</h4>
        <p>Per Minute</p>
        </a> <a href="#"> <span className="icon"><i className="fa fa-dot-circle-o" aria-hidden="true"></i></span>
        <h4>TB Kills</h4>
        <p>Per Minute</p>
        </a> <a href="#"> <span className="icon"><i className="fa fa-dot-circle-o" aria-hidden="true"></i></span>
        <h4>T.Wins</h4>
        <p>Per Minute</p>
        </a> </div>
    </div>
    <div className="chart1">
      <h3>Top3 Damage Leaders</h3>
      <div className="game_chart"> <img src="/assets/media/match/game.jpg" alt="" /> </div>
    </div>
  </div>
</>


    
);

export default StatsChart;