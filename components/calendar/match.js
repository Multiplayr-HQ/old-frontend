import { useState, useEffect } from 'react'
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import { QueryClient, QueryClientProvider, useMutation } from 'react-query'


const Match = () => {

  const [tournament, SetTournament] = useState([])

  useEffect(() => {
    axios
      .get(`${baseURL}/api/tournaments/`)
      .then((res) => {
        SetTournament(res.data);
        console.log(tournament)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

 
    
return(

  <>
  <h1>Match</h1>


  {tournament.length === 0 ? (<p>No data</p>) : (<div>{tournament.map((tour)=>(
  <div key={tour._id}>
  <p>{tour.tournament.name}</p> </div>))}</div>
 
  
  )}



  </>


)
}

export default Match;