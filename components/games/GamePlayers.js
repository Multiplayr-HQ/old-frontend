
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';


const GamePlayers = ({ user, game }) => {

  const router = useRouter();

  const [players, setPlayers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);


  const { id } = router.query;


  useEffect(() => {

  	    axios.get(`${baseURL}/api/player/playersbyteamsbygame/${id}`).then((res) => {
            setPlayers(res.data);
        });

  }, []);

  return (

  	 <ul className="communities players">
    {!players || players.length === 0 ? (
    	 <li>
      <div className="activity_tag">
        <span className="act_name">No Players for selected game ...</span>
      </div>
      </li>
    ) : (
       players.map((result, idx) => (
                      
              <li key={idx}>
              <a href={`/player/${result._id}`}>
                <div className="imgs">
                  {' '}
                  <img src={result.imgUrl} alt={result.name} />{' '}
                </div>
                <div className="bottom_data">
                  <h3>{result.name}</h3>
                </div>
               </a>
              </li>          
      ))
    )}

    </ul>



  );
};

export default GamePlayers;
