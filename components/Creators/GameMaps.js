import React, { useState, useEffect } from 'react';

const GameMaps = ({ gameId, maps, states }) => {
  const handleMapSubmit = async (mapName) => {
    let isMapPresent = states.selectedMaps.indexOf(mapName);
    if (isMapPresent < 0) {
      states.selectedMaps.push(mapName);
      $('#' + mapName).addClass('slc_img');
    } else {
      states.selectedMaps.splice(isMapPresent, 1);
      $('#' + mapName).removeClass('slc_img');
    }
  };

  return (
    <>
      {gameId === 20 || gameId === 3 || gameId === 26 ? (
        <ul
          className="game_search_result map-slection"
          style={{ display: 'flex' }}
        >
          {maps &&
            maps.map((map,i) => (
              <li onClick={() => handleMapSubmit(map._id)} id={map._id} key={i}>
                <img src={map.imgUrl} alt={map.name} />
                <i className= "fa fa-check" aria-hidden="true"></i>
                <p>{map.name}</p>
              </li>
            ))}
        </ul>
      ) : (
        'No map for selected game'
      )}
    </>
  );
};

export default GameMaps;
