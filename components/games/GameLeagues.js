import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';

const GameLeagues = ({ leagues, game }) => {
  return (
    <>
      {!leagues || leagues.length === 0 ? (
        <div className="activity_tag">
          <span className="act_name">No new leagues have {game.name}</span>
        </div>
      ) : (
        leagues.map((result, idx) => (
          <div className="game_row" key={idx}>
            {' '}
            <span className="star live">
              <i className="fa fa-star" aria-hidden="true"></i>
            </span>
            <div className="game_pos">
              <div className="game_loc">
                <img src="/assets/media/category/game_loc.jpg" alt="" />
              </div>
              <span className="tour_logo">
                {' '}
                <img src={result.imgUrl} alt="" />{' '}
              </span>{' '}
            </div>
            <div className="right_game_details">
              <div className="top_game">
                <div className="date">
                  <h3>{result.name}</h3>
                  --.---.----
                </div>
                <div className="reg">
                  {result.status ? (
                    <button className="active">result.status</button>
                  ) : (
                    ''
                  )}
                </div>
              </div>
              <div className="bottom_game">
                <div className="users">
                  <img src="/assets/media/category/users.png" alt="" />
                </div>
                <div className="games">
                  <h3>Games:</h3>
                  <div className="game_logo">
                    <img
                      src="/assets/media/category/game_loc.jpg"
                      alt={game.name}
                    />{' '}
                    <b>{game.name}</b>
                  </div>
                </div>
                <div className="prize leagues">
                  <h3>PRIZE POOL:</h3>
                  <span> $---.---</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default GameLeagues;
