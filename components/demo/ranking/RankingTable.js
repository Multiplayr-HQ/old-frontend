import { MPNumberFormat } from '../../utils/helpers';
import { format } from 'date-fns';
import Moment from 'moment';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import ReactCountryFlag from 'react-country-flag';

const RankingTable = ({ teamrankingss, searchResults, favshow, user, team }) => {
  // console.log('search :', searchResults);
  // console.log('team ranking data in ranking table :', teamrankingss.teams);
  console.log("team in Ranking table", teamrankingss);

  if (!teamrankingss) {
    return null; // If teamrankingss is falsy, render nothing
  }

  const [content, setContent] = useState([]);

  // console.log("gandu Team Ranking length" , teamrankingss?.teams?.length);
  
  
  useEffect(() => {
    if (team.length > 0 ) {
      setContent({teams: team});
    } else if (searchResults.length > 0 ) {
      setContent({teams : searchResults});
    } else {
      setContent(teamrankingss);
    }
  }, [ searchResults, team, teamrankingss]);
  console.log("content",content);
  const getContent = () => {

    // Return "No teams are ranked yet ..." message if there's no content
    if ((content === 0 && teamrankingss === 0) || (searchResults == 0)) {
      return (
        <div className="activity_tag">
          <span className="act_name">No teams are ranked yet ...</span>
        </div>
      );
    }

   
   console.log("Content of ranking",content);

    return content?.teams?.map((result, idx) => (
          <div className="row_box" key={idx}>
          <div className="cols_box">
            <div className="cols">
              {result.rank ? result.rank : 'Not Ranked'}
            </div>
            <div className="cols">
              <a href={`/team/${result.team._id}`}>
                {result.team.name}
              </a>
            </div>
            <div className="cols">
              {result.points ? result.points : 'Not Defined'}
            </div>
            <div className="cols">{result.totalTournaments}</div>
            <div className="cols">{result.teamWinCount}</div>
            <div className="cols">
              {/* {result.points ? result.points : '0'}
              ---
              / 0 */}
              0
            </div>
            {/* <div className="cols">tdb</div> */}
            <div className="cols">
              {' '}
              <span className="round green"></span>{' '}
              <span className="round green"></span>{' '}
              <span className="round red"></span>{' '}
              <span className="round red"></span>{' '}
              <span className="round green"></span>{' '}
            </div>
            {result.team.team_winnings ? (
              <div className="cols">
                $ {result.team.team_winnings}
              </div>
            ) : (
              'No Winnings Yet'
            )}
          </div>

          {/* {!result.team || result.team.length >= 0 ? ( */}
          <div className="more_data" key={idx}>
            <div className="pic">
              <div className="tumb">
                <img src={result.team.imgUrl} alt="" />
              </div>
              <h3>{result.team.name}</h3>

              <ReactCountryFlag
                countryCode={result.team.region}
                svg
                
                style={{
                  width: '2em',
                  height: '2em',
                 
                }}
              />
            </div>
            <div className="total">
              <p>
                <MPNumberFormat
                  value={result.team.prizepool}
                  currency={result.currency}
                />
              </p>
              {/* <p>TOTAL PRIZE POOL EARNED</p> */}
              <div className='team-prize'>
                <div className='prize'>
                  <span>PRIZE EARNED</span>
                  <p>USD {result.team.team_winnings}</p>
                </div>
                <div className='prize_2'>
                  <div className="team-stablish">
                    <span>ESTABLISHED</span>
                    <p>{Moment(result.team.founded).format('MMM YYYY')}</p>
                  </div>
                  <div className="manager">
                    <span>{result.team.role}</span>
                    <p>Sonu Singh</p>
                  </div>

                </div>

              </div>
            </div>

            <div className="chart">
              {/* <img src="/assets/media/ranking/chart.png" alt="" /> */}
            </div>
            <div className="follows">
              <button>Follow</button>
              <div className="ate">
                {' '}
                {/* {result.matches[0]
                                ? result.matches[0].teams[0].teamName.substring(
                                    0,
                                    7
                                  ) + '...'
                                : 'Not Mentioned'}{' '} */}
                                ATE<span className="circle"></span> {' '}
                16-3
                <span className="circle"></span>{' '}TWW
                {/* {result.matches[0]
                                ? result.matches[0].teams[1].teamName.substring(
                                    0,
                                    7
                                  ) + '...'
                                : 'Not Mentioned'}{' '} */}
              </div>
            </div>
          </div>
          {/* ) : (
                      result.team.map((tresult, idx) => (
  
                      )) */}
          {/* )
                    } */}
        </div>
    ));


    // Otherwise, map the content to UI elements
    // if (content.length > 0) {
    //   return content.map((result, idx) => (
    //     <div className="row_box" key={idx}>
    //       <div className="cols_box">
    //         <div className="cols">
    //           {result.rank ? result.rank : 'Not Ranked'}
    //         </div>
    //         <div className="cols">
    //           <a href={`/team/${result.team._id}`}>
    //             {result.team.name}
    //           </a>
    //         </div>
    //         <div className="cols">
    //           {result.points ? result.points : 'Not Defined'}
    //         </div>
    //         <div className="cols">{result.totalTournaments}</div>
    //         <div className="cols">{result.teamWinCount}</div>
    //         <div className="cols">
    //           {result.points ? result.points : '0'}
    //           ---
    //           / 0
    //         </div>
    //         {/* <div className="cols">tdb</div> */}
    //         <div className="cols">
    //           {' '}
    //           <span className="round green"></span>{' '}
    //           <span className="round green"></span>{' '}
    //           <span className="round red"></span>{' '}
    //           <span className="round red"></span>{' '}
    //           <span className="round green"></span>{' '}
    //         </div>
    //         {result.team.team_winnings ? (
    //           <div className="cols">
    //             Rs: {result.team.team_winnings}
    //           </div>
    //         ) : (
    //           'No Winnings Yet'
    //         )}
    //       </div>

    //       {/* {!result.team || result.team.length >= 0 ? ( */}
    //       <div className="more_data" key={idx}>
    //         <div className="pic">
    //           <div className="tumb">
    //             <img src={result.team.imgUrl} alt="" />
    //           </div>
    //           <h3>{result.team.name}</h3>

    //           <ReactCountryFlag
    //             countryCode={result.team.region}
    //             svg
    //             style={{
    //               width: '2em',
    //               height: '2em'
    //             }}
    //           />
    //         </div>
    //         <div className="total">
    //           <p>
    //             <MPNumberFormat
    //               value={result.team.prizepool}
    //               currency={result.currency}
    //             />
    //           </p>
    //           {/* <p>TOTAL PRIZE POOL EARNED</p> */}
    //           <div className='team-prize'>
    //             <div className='prize'>
    //               <p>PRIZE EARNED</p>
    //               <span>USD 912,840</span>
    //             </div>
    //             <div className='prize_2'>
    //               <div className="team-stablish">
    //                 <p>STABLISHED</p>
    //                 <span>MARCH 2007</span>
    //               </div>
    //               <div className="manager">
    //                 <p>Manager </p>
    //                 <span>Sonu Singh</span>
    //               </div>

    //             </div>

    //           </div>
    //         </div>

    //         <div className="chart">
    //           <img src="/assets/media/ranking/chart.png" alt="" />
    //         </div>
    //         <div className="follows">
    //           <button>Follow</button>
    //           <div className="ate">
    //             {' '}
    //             {/* {result.matches[0]
    //                             ? result.matches[0].teams[0].teamName.substring(
    //                                 0,
    //                                 7
    //                               ) + '...'
    //                             : 'Not Mentioned'}{' '} */}
    //             <span className="circle"></span> 16-3{' '}
    //             <span className="circle"></span>{' '}
    //             {/* {result.matches[0]
    //                             ? result.matches[0].teams[1].teamName.substring(
    //                                 0,
    //                                 7
    //                               ) + '...'
    //                             : 'Not Mentioned'}{' '} */}
    //           </div>
    //         </div>
    //       </div>
    //       {/* ) : (
    //                   result.team.map((tresult, idx) => (
  
    //                   )) */}
    //       {/* )
    //                 } */}
    //     </div>
    //   ));
    // } else {
    //   return(
    //     teamrankingss.map((result, idx) => (
    //       <div className="row_box" key={idx}>
    //         <div className="cols_box">
    //           <div className="cols">
    //             {result.rank ? result.rank : 'Not Ranked'}
    //           </div>
    //           <div className="cols">
    //             <a href={`/team/${result.team._id}`}>
    //               {result.team.name}
    //             </a>
    //           </div>
    //           <div className="cols">
    //             {result.points ? result.points : 'Not Defined'}
    //           </div>
    //           <div className="cols">{result.totalTournaments}</div>
    //           <div className="cols">{result.teamWinCount}</div>
    //           <div className="cols">
    //             {result.points ? result.points : '0'}
    //             ---
    //             / 0
    //           </div>
    //           {/* <div className="cols">tdb</div> */}
    //           <div className="cols">
    //             {' '}
    //             <span className="round green"></span>{' '}
    //             <span className="round green"></span>{' '}
    //             <span className="round red"></span>{' '}
    //             <span className="round red"></span>{' '}
    //             <span className="round green"></span>{' '}
    //           </div>
    //           {result.team.team_winnings ? (
    //             <div className="cols">
    //               Rs: {result.team.team_winnings}
    //             </div>
    //           ) : (
    //             'No Winnings Yet'
    //           )}
    //         </div>
  
    //         {/* {!result.team || result.team.length >= 0 ? ( */}
    //         <div className="more_data" key={idx}>
    //           <div className="pic">
    //             <div className="tumb">
    //               <img src={result.team.imgUrl} alt="" />
    //             </div>
    //             <h3>{result.team.name}</h3>
  
    //             <ReactCountryFlag
    //               countryCode={result.team.region}
    //               svg
    //               style={{
    //                 width: '2em',
    //                 height: '2em'
    //               }}
    //             />
    //           </div>
    //           <div className="total">
    //             <p>
    //               <MPNumberFormat
    //                 value={result.team.prizepool}
    //                 currency={result.currency}
    //               />
    //             </p>
    //             {/* <p>TOTAL PRIZE POOL EARNED</p> */}
    //             <div className='team-prize'>
    //               <div className='prize'>
    //                 <p>PRIZE EARNED</p>
    //                 <span>USD 912,840</span>
    //               </div>
    //               <div className='prize_2'>
    //                 <div className="team-stablish">
    //                   <p>STABLISHED</p>
    //                   <span>MARCH 2007</span>
    //                 </div>
    //                 <div className="manager">
    //                   <p>Manager </p>
    //                   <span>Sonu Singh</span>
    //                 </div>
  
    //               </div>
  
    //             </div>
    //           </div>
  
    //           <div className="chart">
    //             <img src="/assets/media/ranking/chart.png" alt="" />
    //           </div>
    //           <div className="follows">
    //             <button>Follow</button>
    //             <div className="ate">
    //               {' '}
    //               {/* {result.matches[0]
    //                                   ? result.matches[0].teams[0].teamName.substring(
    //                                       0,
    //                                       7
    //                                     ) + '...'
    //                                   : 'Not Mentioned'}{' '} */}
    //               <span className="circle"></span> 16-3{' '}
    //               <span className="circle"></span>{' '}
    //               {/* {result.matches[0]
    //                                   ? result.matches[0].teams[1].teamName.substring(
    //                                       0,
    //                                       7
    //                                     ) + '...'
    //                                   : 'Not Mentioned'}{' '} */}
    //             </div>
    //           </div>
    //         </div>
    //         {/* ) : (
    //                         result.team.map((tresult, idx) => (
        
    //                         )) */}
    //         {/* )
    //                       } */}
    //       </div>
    //     ))
    //   )
     
    // }

  };

  return (
    <div className="ranking_table">
      {teamrankingss.length === 0 ? (
        <div className="team_row">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="table">
          <div className="heads_row">
            <div className="heads_row">
              <div className="heads">ranking</div>
              <div className="heads">team</div>
              <div className="heads">Points</div>
              <div className="heads">TOURNAMENTS </div>
              {/* <div className="heads">TOURNAMENTS WON </div> */}
              <div className="heads">MATCHES WON/loss</div>
              <div className="heads">win%</div>
              <div className="heads">form</div>
              <div className="heads">PRIZE MONEY</div>
            </div>
          </div>
          {getContent()}
        </div>
      )}
    </div>
  );



  // if (teamrankingss) {
  //   return (

  //     <div className="ranking_table ">
  //       {teamrankingss.length == 0   ? (
  //         <div className="team_row">
  //           <LoadingSpinner />
  //         </div>
  //       ) : (
  //         <div className="table">
  //           <div className="heads_row">
  //             <div className="heads">ranking</div>
  //             <div className="heads">team</div>
  //             <div className="heads">Points</div>
  //             <div className="heads">TOURNAMENTS </div>
  //             {/* <div className="heads">TOURNAMENTS WON </div> */}
  //             <div className="heads">MATCHES WON/loss</div>
  //             <div className="heads">win%</div>
  //             <div className="heads">form</div>
  //             <div className="heads">PRIZE MONEY</div>
  //           </div>

  //           {(!teamrankingss || teamrankingss.length) && searchResults === 0 && team === 0 ? (
  //             <div className="activity_tag">
  //               <span className="act_name">No teams are ranked yet ...</span>
  //             </div>
  //           ) : teamrankingss.length > 0 &&  searchResults.length == 0 && team.length == 0 ?(
  //             teamrankingss.map((result, idx) => (
  //                 <div className="row_box" key={idx}>
  //                   <div className="cols_box">
  //                     <div className="cols">
  //                       {result.rank ? result.rank : 'Not Ranked'}
  //                     </div>
  //                     <div className="cols">
  //                       <a href={`/team/${result.team._id}`}>
  //                         {result.team.name}
  //                       </a>
  //                     </div>
  //                     <div className="cols">
  //                       {result.points ? result.points : 'Not Defined'}
  //                     </div>
  //                     <div className="cols">{result.totalTournaments}</div>
  //                     <div className="cols">{result.teamWinCount}</div>
  //                     <div className="cols">
  //                       {result.points ? result.points : '0'}
  //                       ---
  //                       / 0
  //                     </div>
  //                     {/* <div className="cols">tdb</div> */}
  //                     <div className="cols">
  //                       {' '}
  //                       <span className="round green"></span>{' '}
  //                       <span className="round green"></span>{' '}
  //                       <span className="round red"></span>{' '}
  //                       <span className="round red"></span>{' '}
  //                       <span className="round green"></span>{' '}
  //                     </div>
  //                     {result.team.team_winnings ? (
  //                       <div className="cols">
  //                         Rs: {result.team.team_winnings}
  //                       </div>
  //                     ) : (
  //                       'No Winnings Yet'
  //                     )}
  //                   </div>

  //                   {/* {!result.team || result.team.length >= 0 ? ( */}
  //                   <div className="more_data" key={idx}>
  //                     <div className="pic">
  //                       <div className="tumb">
  //                         <img src={result.team.imgUrl} alt="" />
  //                       </div>
  //                       <h3>{result.team.name}</h3>

  //                       <ReactCountryFlag
  //                         countryCode={result.team.region}
  //                         svg
  //                         style={{
  //                           width: '2em',
  //                           height: '2em'
  //                         }}
  //                       />
  //                     </div>
  //                     <div className="total">
  //                       <p>
  //                         <MPNumberFormat
  //                           value={result.team.prizepool}
  //                           currency={result.currency}
  //                         />
  //                       </p>
  //                       {/* <p>TOTAL PRIZE POOL EARNED</p> */}
  //                       <div className='team-prize'>
  //                         <div className='prize'>
  //                           <p>PRIZE EARNED</p>
  //                           <span>USD 912,840</span>
  //                         </div>
  //                         <div className='prize_2'>
  //                           <div className="team-stablish">
  //                             <p>STABLISHED</p>
  //                             <span>MARCH 2007</span>
  //                           </div>
  //                           <div className="manager">
  //                             <p>Manager </p>
  //                             <span>Sonu Singh</span>
  //                           </div>

  //                         </div>

  //                       </div>
  //                     </div>

  //                     <div className="chart">
  //                       <img src="/assets/media/ranking/chart.png" alt="" />
  //                     </div>
  //                     <div className="follows">
  //                       <button>Follow</button>
  //                       <div className="ate">
  //                         {' '}
  //                         {/* {result.matches[0]
  //                             ? result.matches[0].teams[0].teamName.substring(
  //                                 0,
  //                                 7
  //                               ) + '...'
  //                             : 'Not Mentioned'}{' '} */}
  //                         <span className="circle"></span> 16-3{' '}
  //                         <span className="circle"></span>{' '}
  //                         {/* {result.matches[0]
  //                             ? result.matches[0].teams[1].teamName.substring(
  //                                 0,
  //                                 7
  //                               ) + '...'
  //                             : 'Not Mentioned'}{' '} */}
  //                       </div>
  //                     </div>
  //                   </div>
  //                   {/* ) : (
  //                   result.team.map((tresult, idx) => (

  //                   )) */}
  //                   {/* )
  //                 } */}
  //                 </div>
  //               ))
  //           ) : searchResults.length > 0 && team.length == 0? (
  //             searchResults.map((result, idx) => (

  //               <div className="row_box" key={idx}>
  //                 <div className="cols_box">
  //                   <div className="cols">
  //                     {result.rank ? result.rank : 'Not Ranked'}
  //                   </div>
  //                   <div className="cols">
  //                     <a href={`/team/${result._id}`}>
  //                       {result.team.name}
  //                     </a>
  //                   </div>
  //                   <div className="cols">
  //                     {result.team.team_points ? result.team.team_points : 'Not Defined'}
  //                   </div>
  //                   <div className="cols">
  //                     {result.team.tournament ? result.team.tournament.length : 0}
  //                   </div>
  //                   <div className="cols">
  //                     {result.team.team_points ? result.team.team_points : '0'}/ 0
  //                   </div>
  //                   <div className="cols">tdb</div>
  //                   <div className="cols">
  //                     {' '}
  //                     <span className="round green"></span>{' '}
  //                     <span className="round green"></span>{' '}
  //                     <span className="round red"></span>{' '}
  //                     <span className="round red"></span>{' '}
  //                     <span className="round green"></span>{' '}
  //                   </div>
  //                   <div className="cols">
  //                     Rs: {result.team.team_winnings}
  //                   </div>
  //                 </div>



  //                 <div className="more_data" key={idx}>
  //                   <div className="pic">
  //                     <div className="tumb">
  //                       <img src={result.team.imgUrl} alt="" />
  //                     </div>
  //                     <h3>{result.team.name}</h3>

  //                     <ReactCountryFlag
  //                       countryCode={result.team.region}
  //                       svg
  //                       style={{
  //                         width: '2em',
  //                         height: '2em'
  //                       }}
  //                     />
  //                   </div>
  //                   <div className="total">
  //                     <p>
  //                       <MPNumberFormat
  //                         value={result.team.prizepool}
  //                         currency={result.currency}
  //                       />
  //                     </p>
  //                     {/* <p>TOTAL PRIZE POOL EARNED</p> */}
  //                     <div className='team-prize'>
  //                       <div className='prize'>
  //                         <p>PRIZE EARNED</p>
  //                         <span>USD 912,840</span>
  //                       </div>
  //                       <div className='prize_2'>
  //                         <div className="team-stablish">
  //                           <p>STABLISHED</p>
  //                           <span>MARCH 2007</span>
  //                         </div>
  //                         <div className="manager">
  //                           <p>Manager </p>
  //                           <span>Sonu Singh</span>
  //                         </div>

  //                       </div>

  //                     </div>
  //                   </div>

  //                   <div className="chart">
  //                     <img src="/assets/media/ranking/chart.png" alt="" />
  //                   </div>
  //                   <div className="follows">
  //                     <button>Follow</button>
  //                     <div className="ate">
  //                       {' '}
  //                       {/* {result.matches[0]
  //                             ? result.matches[0].teams[0].teamName.substring(
  //                                 0,
  //                                 7
  //                               ) + '...'
  //                             : 'Not Mentioned'}{' '} */}
  //                       <span className="circle"></span> 16-3{' '}
  //                       <span className="circle"></span>{' '}
  //                       {/* {result.matches[0]
  //                             ? result.matches[0].teams[1].teamName.substring(
  //                                 0,
  //                                 7
  //                               ) + '...'
  //                             : 'Not Mentioned'}{' '} */}
  //                     </div>
  //                   </div>
  //                 </div>

  //                 {/* {!result.tournament || result.tournament.length === 0 ? (
  //                   <div className="more_data">
  //                     <div className="activity_tag">
  //                       <span className="act_name">
  //                         No TOURNAMENTS played yet by this team ...
  //                       </span>
  //                     </div>
  //                   </div>
  //                 ) : (
  //                   result.tournament.map((tresult, idx) => (
  //                     <div className="more_data" key={idx}>
  //                       <div className="pic">
  //                         <div className="tumb">
  //                           <img src={tresult.imgUrl} alt="" />
  //                         </div>
  //                         <h3>{tresult.name}</h3>
  //                       </div>
  //                       <div className="total">
  //                         <p>
  //                           <MPNumberFormat
  //                             value={tresult.prizepool}
  //                             currency={result.currency}
  //                           />
  //                         </p>
  //                         <p>TOTAL PRIZE POOL EARNED</p>
  //                       </div>
  //                       <div className="chart">
  //                         <img src="/assets/media/ranking/chart.png" alt="" />
  //                       </div>
  //                       <div className="follows">
  //                         <button>Follow</button>
  //                         <div className="ate">
  //                           {' '}
  //                           {result.matches[0]
  //                             ? result.matches[0].teams[0].teamName.substring(
  //                                 0,
  //                                 7
  //                               ) + '...'
  //                             : 'Not Mentioned'}{' '}
  //                           <span className="circle"></span> 16-3{' '}
  //                           <span className="circle"></span>{' '}
  //                           {result.matches[0]
  //                             ? result.matches[0].teams[1].teamName.substring(
  //                                 0,
  //                                 7
  //                               ) + '...'
  //                             : 'Not Mentioned'}{' '}
  //                         </div>
  //                       </div>
  //                     </div>
  //                   ))
  //                 )} */}
  //               </div>
  //             ))
  //           ) : team.length > 0 ? (
  //             team.map((result, idx) => (
  //               <div className="row_box" key={idx}>
  //                 <div className="cols_box">
  //                   <div className="cols">
  //                     {result.rank ? result.rank : 'Not Ranked'}
  //                   </div>
  //                   <div className="cols">
  //                     <a href={`/team/${result._id}`}>
  //                       {result.team.name}
  //                     </a>
  //                   </div>
  //                   <div className="cols">
  //                     {result.team.team_points ? result.team.team_points : 'Not Defined'}
  //                   </div>
  //                   <div className="cols">
  //                     {result.team.tournament ? result.team.tournament.length : 0}
  //                   </div>
  //                   <div className="cols">
  //                     {result.team.team_points ? result.team.team_points : '0'}/ 0
  //                   </div>
  //                   <div className="cols">tdb</div>
  //                   <div className="cols">
  //                     {' '}
  //                     <span className="round green"></span>{' '}
  //                     <span className="round green"></span>{' '}
  //                     <span className="round red"></span>{' '}
  //                     <span className="round red"></span>{' '}
  //                     <span className="round green"></span>{' '}
  //                   </div>
  //                   <div className="cols">
  //                     Rs: {result.team.team_winnings}
  //                   </div>
  //                 </div>



  //                 <div className="more_data" key={idx}>
  //                   <div className="pic">
  //                     <div className="tumb">
  //                       <img src={result.team.imgUrl} alt="" />
  //                     </div>
  //                     <h3>{result.team.name}</h3>

  //                     <ReactCountryFlag
  //                       countryCode={result.team.region}
  //                       svg
  //                       style={{
  //                         width: '2em',
  //                         height: '2em'
  //                       }}
  //                     />
  //                   </div>
  //                   <div className="total">
  //                     <p>
  //                       <MPNumberFormat
  //                         value={result.team.prizepool}
  //                         currency={result.currency}
  //                       />
  //                     </p>
  //                     {/* <p>TOTAL PRIZE POOL EARNED</p> */}
  //                     <div className='team-prize'>
  //                       <div className='prize'>
  //                         <p>PRIZE EARNED</p>
  //                         <span>USD 912,840</span>
  //                       </div>
  //                       <div className='prize_2'>
  //                         <div className="team-stablish">
  //                           <p>STABLISHED</p>
  //                           <span>MARCH 2007</span>
  //                         </div>
  //                         <div className="manager">
  //                           <p>Manager </p>
  //                           <span>Sonu Singh</span>
  //                         </div>

  //                       </div>

  //                     </div>
  //                   </div>

  //                   <div className="chart">
  //                     <img src="/assets/media/ranking/chart.png" alt="" />
  //                   </div>
  //                   <div className="follows">
  //                     <button>Follow</button>
  //                     <div className="ate">
  //                       {' '}
  //                       {/* {result.matches[0]
  //                             ? result.matches[0].teams[0].teamName.substring(
  //                                 0,
  //                                 7
  //                               ) + '...'
  //                             : 'Not Mentioned'}{' '} */}
  //                       <span className="circle"></span> 16-3{' '}
  //                       <span className="circle"></span>{' '}
  //                       {/* {result.matches[0]
  //                             ? result.matches[0].teams[1].teamName.substring(
  //                                 0,
  //                                 7
  //                               ) + '...'
  //                             : 'Not Mentioned'}{' '} */}
  //                     </div>
  //                   </div>
  //                 </div>


  //               </div>

  //             ))
  //           ) : (
  //               teamrankingss.map((result, idx) => (
  //                 <div className="row_box" key={idx}>
  //                   <div className="cols_box">
  //                     <div className="cols">
  //                       {result.rank ? result.rank : 'Not Ranked'}
  //                     </div>
  //                     <div className="cols">
  //                       <a href={`/team/${result.team._id}`}>
  //                         {result.team.name}
  //                       </a>
  //                     </div>
  //                     <div className="cols">
  //                       {result.points ? result.points : 'Not Defined'}
  //                     </div>
  //                     <div className="cols">{result.totalTournaments}</div>
  //                     <div className="cols">{result.teamWinCount}</div>
  //                     <div className="cols">
  //                       {result.points ? result.points : '0'}
  //                       ---
  //                       / 0
  //                     </div>
  //                     {/* <div className="cols">tdb</div> */}
  //                     <div className="cols">
  //                       {' '}
  //                       <span className="round green"></span>{' '}
  //                       <span className="round green"></span>{' '}
  //                       <span className="round red"></span>{' '}
  //                       <span className="round red"></span>{' '}
  //                       <span className="round green"></span>{' '}
  //                     </div>
  //                     {result.team.team_winnings ? (
  //                       <div className="cols">
  //                         Rs: {result.team.team_winnings}
  //                       </div>
  //                     ) : (
  //                       'No Winnings Yet'
  //                     )}
  //                   </div>

  //                   {/* {!result.team || result.team.length >= 0 ? ( */}
  //                   <div className="more_data" key={idx}>
  //                     <div className="pic">
  //                       <div className="tumb">
  //                         <img src={result.team.imgUrl} alt="" />
  //                       </div>
  //                       <h3>{result.team.name}</h3>

  //                       <ReactCountryFlag
  //                         countryCode={result.team.region}
  //                         svg
  //                         style={{
  //                           width: '2em',
  //                           height: '2em'
  //                         }}
  //                       />
  //                     </div>
  //                     <div className="total">
  //                       <p>
  //                         <MPNumberFormat
  //                           value={result.team.prizepool}
  //                           currency={result.currency}
  //                         />
  //                       </p>
  //                       {/* <p>TOTAL PRIZE POOL EARNED</p> */}
  //                       <div className='team-prize'>
  //                         <div className='prize'>
  //                           <p>PRIZE EARNED</p>
  //                           <span>USD 912,840</span>
  //                         </div>
  //                         <div className='prize_2'>
  //                           <div className="team-stablish">
  //                             <p>STABLISHED</p>
  //                             <span>MARCH 2007</span>
  //                           </div>
  //                           <div className="manager">
  //                             <p>Manager </p>
  //                             <span>Sonu Singh</span>
  //                           </div>

  //                         </div>

  //                       </div>
  //                     </div>

  //                     <div className="chart">
  //                       <img src="/assets/media/ranking/chart.png" alt="" />
  //                     </div>
  //                     <div className="follows">
  //                       <button>Follow</button>
  //                       <div className="ate">
  //                         {' '}
  //                         {/* {result.matches[0]
  //                             ? result.matches[0].teams[0].teamName.substring(
  //                                 0,
  //                                 7
  //                               ) + '...'
  //                             : 'Not Mentioned'}{' '} */}
  //                         <span className="circle"></span> 16-3{' '}
  //                         <span className="circle"></span>{' '}
  //                         {/* {result.matches[0]
  //                             ? result.matches[0].teams[1].teamName.substring(
  //                                 0,
  //                                 7
  //                               ) + '...'
  //                             : 'Not Mentioned'}{' '} */}
  //                       </div>
  //                     </div>
  //                   </div>
  //                   {/* ) : (
  //                   result.team.map((tresult, idx) => (

  //                   )) */}
  //                   {/* )
  //                 } */}
  //                 </div>
  //               ))
  //             )


  //           }
  //         </div>
  //       )}
  //     </div>
  //   );
  // } else {
  //   return null;
  // }
};

export default RankingTable;
