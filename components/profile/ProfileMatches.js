import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import Moment from 'moment';

const ProfileMatches = ({ user, Userdata ,data}) => {


  const sampleTeamMatches = [
    {
      startDate: '2024-02-08T18:00:00',
      instance: 'Round1',
      opponents: [
        {
          opponent: {
            image_url: '/assets/media/teams/team1.png',
            name: 'Fortuna eSports',
          },
        },
        {
          opponent: {
            image_url: '/assets/media/teams/team2.png',
            name: 'Gambit Gaming',
          },
        },
      ],
      game: {
        name: 'CAALL OF DUTY WW2',
      },
      streamsList: [
        {
          embed_url: 'https://www.twitch.tv/embed/sample_stream',
        },
      ],
    },
    {
      startDate: '2024-02-08T18:00:00',
      instance: 'Round1',
      opponents: [
        {
          opponent: {
            image_url: '/assets/media/teams/team1.png',
            name: 'Fortuna eSports',
          },
        },
        {
          opponent: {
            image_url: '/assets/media/teams/team2.png',
            name: 'Gambit Gaming',
          },
        },
      ],
      game: {
        name: 'CAALL OF DUTY WW2',
      },
      streamsList: [
        {
          embed_url: 'https://www.twitch.tv/embed/sample_stream',
        },
      ],
    },
    // Add more sample team matches if needed
  ];

  // Sample raw data for isMatchPlayersSet
  const teamMatches=  sampleTeamMatches ;
  const isMatchPlayersSet = true;


  const roundsMatches = teamMatches.filter((x) => {
    return x.instance === 'Round1' || x.instance === 'Round2';
  });
  const semiFinalAndFinalMatches = teamMatches.filter((x) => {
    return x.instance === 'Semifinals' || x.instance === 'Final';
  });

  console.log('teammatches',teamMatches);
  
  // console.log( ' teamMatchesList :',teamMatchesList)
  return (
    // <div className="tab hide" id="matches">
    //   {' '}
    //   {teamMatchesList.teamMatches?.length == 0 ? (
    //     <p>
    //       {' '}
    //       Player info is not attached to the profile. Please ensure that player
    //       is assigned to this profile.{' '}
    //     </p>
    //   ) : (
    //     teamMatchesList.type === 'MATCHES' &&
    //     teamMatchesList.teamMatches.map((result, index) => (
    //       <div className="next_matches" key={index}>
    //         <div className="bdr_clr_green">
    //           <div className="single_team">
    //             <h2>Team : </h2>
    //             <h3>{result.team.name} </h3>
    //             <img src={result.team.imgUrl} alt="" />
    //           </div>

    //           <div className="user_vs_player">
    //             <h2>PLAYERS :</h2>
    //             <ul>
    //               {result.team.players.map((player, index) => (
    //                 <>
    //                   {' '}
    //                   <li>
    //                     {player.playerId?.imgUrl ? (
    //                       <img
    //                         src={player.playerId?.imgUrl}
    //                         alt={player.playerId.name}
    //                       />
    //                     ) : (
    //                       <img src="/assets/media/user.png" alt="" />
    //                     )}
    //                     <h4>{player.playerId?.name}</h4>
    //                   </li>
    //                 </>
    //               ))}
    //             </ul>
    //           </div>
    //         </div>

    //         <div className="stats_table">
    //           <table className="table">
    //             <thead>
    //               <tr>
    //                 <th>Date</th>
    //                 <th>Versus</th>
    //                 <th>Competition</th>
    //                 <th>Instance</th>
    //                 <th>Time</th>
    //                 <th>Score</th>
    //                 <th>Watch</th>
    //                 <th>Tickets</th>
    //               </tr>
    //             </thead>
    //             <tbody>
    //               {result.matches.map((match, index) => {
    //                 return (
    //                   <>
    //                     <tr key={index}>
    //                       <td>
    //                         {Moment(match.startDate).format('DD-MM-YYYY')}
    //                       </td>
    //                       <td>
    //                         {match.opponents.map((res, idx) =>
    //                           result.team._id != res.opponent._id ? (
    //                             <>
    //                               <span className="dp">
    //                                 <img src={res.opponent.image_url} alt="" />
    //                               </span>{' '}
    //                               <span className="dp_name">
    //                                 <b>{res.opponent.name}</b>
    //                               </span>
    //                             </>
    //                           ) : (
    //                             ''
    //                           )
    //                         )}
    //                       </td>
    //                       <td>{match.name}</td>
    //                       <td>Semi-Finals</td>
    //                       <td>{Moment(match.startDate).format('h:m')}</td>
    //                       <td>
    //                         {match.results[0].score} - {match.results[1].score}
    //                       </td>
    //                       <td>View Match</td>
    //                       <td>
    //                         <a href="#">Buy Match Tickets</a>
    //                       </td>
    //                     </tr>
    //                   </>
    //                 );
    //               })}
    //             </tbody>
    //           </table>
    //         </div>
    //       </div>
    //     ))
    //   )}
    // </div>


    <div className="matches_box ">
      <div className="heads_bg">latest Matches </div>
      {roundsMatches?.length === 0 || !isMatchPlayersSet ? (
        <h5>NO Matches</h5>
      ) : (
        roundsMatches?.map((tm, idx) => (
          <div className="match_row bdr_clr_green" key={idx}>
            {tm.opponents.length > 0 ? (
              <>
                {tm.opponents[0] ? (
                  <div className="team_a">
                    {' '}
                    <img
                      src={tm.opponents[0].opponent.image_url}
                      alt=""
                      className="team_logo"
                    />
                    <div className="team_name">
                      <h3>{tm.opponents[0].opponent.name}</h3>
                      <a href="#">
                        <img src="/assets/media/teams/user1.png" alt="" />
                      </a>{' '}
                      <a href="#">
                        <img src="/assets/media/teams/user2.png" alt="" />
                      </a>{' '}
                      <a href="#">
                        <img src="/assets/media/teams/user3.png" alt="" />
                      </a>{' '}
                      <a href="#">
                        <img src="/assets/media/teams/user4.png" alt="" />
                      </a>{' '}
                    </div>
                  </div>
                ) : (
                  <div className="team_b">
                    <img
                      src="/assets/media/user.jpg"
                      className="team_logo"
                      alt=""
                    />
                    <h3>---</h3>
                  </div>
                )}

                <div className="team_vs">
                <h3 className="_vs">MANILA MASTERS TORONTO 4V4</h3>
                  <p>
                    {Moment(tm.startDate).format('MMMM, DD, YYYY hh:mm A')}
                    <a href={tm.streamsList[0]?.embed_url} target="_blank" rel="noreferrer" >
                      View Match{' '}
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </a>
                  </p>
                  <div className="vs">2:3</div>
                  <p>{tm?.game?.name}</p>
                </div>

                {tm.opponents[1] ? (
                  <div className="team_b">
                    {' '}
                    <img
                      src={tm.opponents[1].opponent?.image_url}
                      alt=""
                      className="team_logo"
                    />
                    <div className="team_name">
                      <h3>{tm.opponents[1].opponent?.name}</h3>
                      <a href="#">
                        <img src="/assets/media/teams/user1.png" alt="" />
                      </a>{' '}
                      <a href="#">
                        <img src="/assets/media/teams/user2.png" alt="" />
                      </a>{' '}
                      <a href="#">
                        <img src="/assets/media/teams/user3.png" alt="" />
                      </a>{' '}
                      <a href="#">
                        <img src="/assets/media/teams/user4.png" alt="" />
                      </a>{' '}
                    </div>
                  </div>
                ) : (
                  <div className="team_b">
                    <img
                      src="/assets/media/user.jpg"
                      className="team_logo"
                      alt=""
                    />
                    <h3>---</h3>
                  </div>
                )}
              </>
            ) : (
              <>
                {tm.participants[0] ? (
                  <div className="team_a">
                    {' '}
                    <img
                      src={tm.participants[0].participantId.profilePicUrl}
                      alt=""
                      className="team_logo"
                    />
                    <h3>{tm.participants[0].participantId.name}</h3>
                  </div>
                ) : null}

                <div className="team_vs">
                  <p>
                    {Moment(tm.createdAt).format('MMMM, DD, YYYY hh:mm A')}
                    <a href={tm.streamsList[0]?.embed_url} target="_blank" rel="noreferrer">
                      View Match{' '}
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </a>
                  </p>
                  <div className="vs">vs</div>
                  <p>{tm?.games[0]?.gameId.name}</p>
                </div>

                {tm.participants[1] ? (
                  <div className="team_b">
                    {' '}
                    <img
                      src={tm.participants[1].participantId.profilePicUrl}
                      alt=""
                      className="team_logo"
                    />
                    <h3>{tm.participants[1].participantId.name}</h3>
                  </div>
                ) : (
                  <div className="team_b">
                    <img
                      src="/assets/media/user.jpg"
                      className="team_logo"
                      alt=""
                    />
                    <h3>---</h3>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )}
      {/* <div className="heads_bg">Upcoming Matches</div>
      {semiFinalAndFinalMatches.length === 0 || !isMatchPlayersSet ? (
        <h5>No Matches</h5>
      ) : (
        semiFinalAndFinalMatches.map((tm, idx) => (
          <div className="match_row" key={idx}>
            {tm.opponents.length > 0 ? (
              <>
                {tm.opponents[0] ? (
                  <div className="team_a">
                    {tm.opponents[0].opponent ? (
                      <img src={tm.opponents[0].opponent?.image_url} alt="" />
                    ) : (
                      <img
                        src="/assets/media/user.jpg"
                        alt=""
                        className="team_logo"
                      />
                    )}
                    <div className="team_name">
                      <h3>
                        {tm.opponents[0].opponent
                          ? tm.opponents[0].opponent?.name
                          : tm.instance === 'Semifinals'
                          ? 'Semi-Final Player'
                          : 'Final Player'}
                      </h3>
                      <a href="#">
                        <img src="/assets/media/teams/user1.png" alt="" />
                      </a>{' '}
                      <a href="#">
                        <img src="/assets/media/teams/user2.png" alt="" />
                      </a>{' '}
                      <a href="#">
                        <img src="/assets/media/teams/user3.png" alt="" />
                      </a>{' '}
                      <a href="#">
                        <img src="/assets/media/teams/user4.png" alt="" />
                      </a>{' '}
                    </div>
                  </div>
                ) : null}

                <div className="team_vs">
                  <p>
                    {Moment(tm.startDate).format('MMMM, DD, YYYY hh:mm A')}
                    <a href={tm.streamsList[0]?.embed_url} target="_blank">
                      View Match{' '}
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </a>
                  </p>
                  <div className="vs">VS</div>
                  <p>{tm?.game?.name}</p>
                </div>

                {tm.opponents[1] ? (
                  <div className="team_b">
                    {' '}
                    {tm.opponents[1].opponent ? (
                      <img src={tm.opponents[1].opponent?.image_url} alt="" />
                    ) : (
                      <img
                        src="/assets/media/user.jpg"
                        alt=""
                        className="team_logo"
                      />
                    )}
                    <div className="team_name">
                      <h3>
                        {tm.opponents[1].opponent
                          ? tm.opponents[1].opponent?.name
                          : tm.instance === 'Semifinals'
                          ? 'Semi-Final Player'
                          : 'Final Player'}
                      </h3>
                      <a href="#">
                        <img src="/assets/media/teams/user1.png" alt="" />
                      </a>{' '}
                      <a href="#">
                        <img src="/assets/media/teams/user2.png" alt="" />
                      </a>{' '}
                      <a href="#">
                        <img src="/assets/media/teams/user3.png" alt="" />
                      </a>{' '}
                      <a href="#">
                        <img src="/assets/media/teams/user4.png" alt="" />
                      </a>{' '}
                    </div>
                  </div>
                ) : null}
              </>
            ) : (
              <>
                {tm.participants[0] ? (
                  <div className="team_a">
                    {' '}
                    <img
                      src={tm.participants[0].participantId.profilePicUrl}
                      alt=""
                      className="team_logo"
                    />
                    <h3>{tm.participants[0].participantId.name}</h3>
                  </div>
                ) : (
                  <div className="team_b">
                    <img
                      src="/assets/media/user.jpg"
                      className="team_logo"
                      alt=""
                    />
                    <h3>
                      {tm.instance === 'Semifinals'
                        ? 'Semi-Final Player'
                        : 'Final Player'}
                    </h3>
                  </div>
                )}

                <div className="team_vs">
                  <p>
                    {Moment(tm.createdAt).format('MMMM, DD, YYYY hh:mm A')}
                    <a href={tm.streamsList[0]?.embed_url} target="_blank">
                      View Match{' '}
                      <i className="fa fa-play" aria-hidden="true"></i>
                    </a>
                  </p>
                  <div className="vs">VS</div>
                  <p>{tm?.game?.name}</p>
                </div>

                {tm.participants[1] ? (
                  <div className="team_b">
                    {' '}
                    <img
                      src={tm.participants[1].participantId.profilePicUrl}
                      alt=""
                      className="team_logo"
                    />
                    <h3>{tm.participants[1].participantId.name}</h3>
                  </div>
                ) : (
                  <div className="team_b">
                    <img
                      src="/assets/media/user.jpg"
                      className="team_logo"
                      alt=""
                    />
                    <h3>
                      {tm.instance === 'Semifinals'
                        ? 'Semi-Final Player'
                        : 'Final Player'}
                    </h3>
                  </div>
                )}
              </>
            )}
          </div>
        ))
      )} */}
    </div>


    
    
  );
};

export default ProfileMatches;
