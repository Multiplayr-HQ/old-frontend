
import React from 'react';
import Moment from 'moment';

const TournamentParticipants = ({ user, tournament }) => {

  return (


    <div className="participants">
                  
          <div className="selections">
            <div className="button-group">
              {' '}
              <span className="drop_name">All</span>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="All"
                />
                <label
                  className="custom-control-label"
                  htmlFor="All"
                ></label>
              </div>
            </div>                  

            {tournament?.games.map((game, index) => (

                    <div className="button-group" key={index}>
                     
                      <span className="drop_name">{game.gameId.name}</span>
                      <div className="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={game.gameId._id}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={game.gameId.name}
                        ></label>
                      </div>
                    </div>
           	))}

            </div>
                  

                    {tournament?.games.map((game, index) => (
                  <div className="banner" key={index}>
                    {' '}

                    <img src={game.gameId.imgUrl} alt="" />
                    <h2>{game.gameId.name}</h2>

                  </div>
                    ))}



                  <div className="">
                    
                    <div className="group">
                      
                      <table className="table">
                        <thead>
                          <tr>
                            <td>Opponents</td>

                          </tr>
                        </thead>


                        <tbody>

  							{tournament?.matches.map((match, index) => (


                          <tr key={index}>

  					{ match.matchId.opponents.map((result, idx) => (

  						<>
                        <td>
                          <img src={result.opponent.image_url} alt="" />{' '}
                          <strong>{result.opponent.name}</strong>
                        </td>
                        <td>
                          <b>score: {match.matchId.results[idx]?.score}</b>
                        </td>
                        </>
          

                )) }

                          </tr>
                            

            ))}

 </tbody>
                      

                      </table>


                    </div>             
                  </div>
                </div>



	)
};

export default TournamentParticipants;
