import { MPNumberFormat } from '../../utils/helpers';
import { format } from 'date-fns';
import Moment from 'moment';
import { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import ReactCountryFlag from 'react-country-flag';


import { AreaChart, linearGradient, XAxis, YAxis, Area, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RankingTable = ({ teamrankingss, searchResults, favshow, user, team }) => {
  // console.log('search :', searchResults);
  // console.log('team ranking data in ranking table :', teamrankingss.teams);
  console.log("team in Ranking table", teamrankingss);
  console.log("filter data in ranking",team);

  if (!teamrankingss) {
    return null; // If teamrankingss is falsy, render nothing
  }

  const [content, setContent] = useState([]);
  // setContent(teamrankingss);

  // console.log("gandu Team Ranking length" , teamrankingss?.teams?.length);
  const data = [
    {
      "name": "Page A",
      "uv": 4000,
      "pv": 2400,
      "amt": 2400
    },
    {
      "name": "Page B",
      "uv": 3000,
      "pv": 1398,
      "amt": 2210
    },
    {
      "name": "Page C",
      "uv": 2000,
      "pv": 9800,
      "amt": 2290
    },
    {
      "name": "Page D",
      "uv": 2780,
      "pv": 3908,
      "amt": 2000
    },
    {
      "name": "Page E",
      "uv": 1890,
      "pv": 4800,
      "amt": 2181
    },
    {
      "name": "Page F",
      "uv": 2390,
      "pv": 3800,
      "amt": 2500
    },
    {
      "name": "Page G",
      "uv": 3490,
      "pv": 4300,
      "amt": 2100
    }
  ]

  // useEffect(() => {
  //   if (team.length > 0) {
  //     setContent( team );
  //     console.log("set team in ranking ")
  //   } 
  //   else if (searchResults.length > 0) {
  //     setContent( searchResults );
  //   } 
  //   else {
  //     setContent(teamrankingss);
  //   }
  // }, [searchResults, team, teamrankingss]);
useEffect(() => {
      
        setContent(team);
 
      
      
    
  }, [team]);

  useEffect(() => {
   
    setContent(teamrankingss);
    
  
}, [teamrankingss]);




  
  const getContent = () => {

    // Return "No teams are ranked yet ..." message if there's no content
    if ((content === 0 && teamrankingss === 0) ) {
      return (
        <div className="activity_tag">
          <span className="act_name">No teams are ranked yet ...</span>
        </div>
      );
    }


    console.log("Content of ranking", content);

    return content?.team?.map((result, idx) => (
      <div className="row_box" key={idx}>
        <div className="cols_box">
          <div className="cols">
            {result.rank ? result.rank : 'Not Ranked'}
          </div>
          <div className="cols">
            <a href={`/team/${result._id}`}>
              {result.teamData[0].name}
            </a>
          </div>
          <div className="cols">
            {result.team_points ? result.team_points : 'Not Defined'}
          </div>
          <div className="cols">{result.total_tournaments}</div>
          <div className="cols">{result.winLossCounts[0]?.wins} / {result.winLossCounts[0]?.losses}</div>
          <div className="cols">
            {/* {result.points ? result.points : '0'}
              ---
              / 0 */}
            {result.win_percentage} %
          </div>
          {/* <div className="cols">tdb</div> */}
          <div className="cols">
            {' '}
            {/* <span className="round green"></span>{' '}
              <span className="round green"></span>{' '}
              <span className="round red"></span>{' '}
              <span className="round red"></span>{' '}
              <span className="round green"></span>{' '} */}

            {result.recentMatchData.recentMatches.length === 0 ? (
              <span>-----</span>
            ) : (
              result.recentMatchData.recentMatches.map((data, index) => (
                data === null ? (
                  <span key={index}>-----</span>
                ) : (
                  <span key={index} className={data.isWin ? "round green" : "round red"}></span>
                )
              ))
            )}
          </div>
          {result.teamData[0].team_winnings ? (
            <div className="cols">
              $ {result.teamData[0].team_winnings}
            </div>
          ) : (

            (<div className="cols">
              No Winnings
            </div>)
          )}
        </div>

        {/* {!result.team || result.team.length >= 0 ? ( */}
        <div className="more_data" key={idx}>
          <div className="pic">
            <div className="tumb">
              <img src={result.teamData[0]?.imgUrl} alt="" />
            </div>
            {/* <h3>{result.teamData[0].name}</h3> */}
            <a href={`/team/${result._id}`}>
              {result.teamData[0].name}
            </a>

            <ReactCountryFlag
              countryCode={result.teamData[0]?.region}
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
                // value={result.team.prizepool}
                currency={result.currency}
              />
            </p>
            {/* <p>TOTAL PRIZE POOL EARNED</p> */}
            <div className='team-prize'>
              <div className='prize'>
                <span>PRIZE EARNED</span>
                <p>USD {result?.total_prize}</p>
              </div>
              <div className='prize_2'>
                <div className="team-stablish">
                  <span>ESTABLISHED</span>
                  <p>{Moment(result.teamData[0].founded).format('MMM YYYY')}</p>
                </div>
                <div className="manager">
                  <span>{result.teamData[0].role ? result.teamData[0].role : 'Manager'}</span>
                  <p>Sonu Singh</p>
                </div>
              </div>

            </div>
          </div>

          <div className="chart">
            {/* <img src="/assets/media/ranking/chart.png" alt="" /> */}


            {/* <AreaChart width={300} height={150} data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />

              <Tooltip />
              <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
              <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart> */}


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
