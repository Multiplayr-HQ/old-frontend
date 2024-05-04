import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'moment';

const Matches = ({ }) => {

  const sampleTeamMatches = [
    // {
    //   startDate: '2024-02-08T18:00:00',
    //   instance: 'Round1',
    //   opponents: [
    //     {
    //       opponent: {
    //         image_url: '/assets/media/teams/team1.png',
    //         name: 'Fortuna eSports',
    //       },
    //     },
    //     {
    //       opponent: {
    //         image_url: '/assets/media/teams/team2.png',
    //         name: 'Gambit Gaming',
    //       },
    //     },
    //   ],
    //   game: {
    //     name: 'CAALL OF DUTY WW2',
    //   },
    //   streamsList: [
    //     {
    //       embed_url: 'https://www.twitch.tv/embed/sample_stream',
    //     },
    //   ],
    // }, {
    //   startDate: '2024-02-08T18:00:00',
    //   instance: 'Semifinals',
    //   opponents: [
    //     {
    //       opponent: {
    //         image_url: '/assets/media/teams/team1.png',
    //         name: 'Fortuna eSports',
    //       },
    //     },
    //     {
    //       opponent: {
    //         image_url: '/assets/media/teams/team2.png',
    //         name: 'Gambit Gaming',
    //       },
    //     },
    //   ],
    //   game: {
    //     name: 'PUBG',
    //   },
    //   streamsList: [
    //     {
    //       embed_url: 'https://www.twitch.tv/embed/sample_stream',
    //     },
    //   ],
    // },
    // {
    //   startDate: '2024-02-08T18:00:00',
    //   instance: 'Round1',
    //   opponents: [
    //     {
    //       opponent: {
    //         image_url: '/assets/media/teams/team1.png',
    //         name: 'Fortuna eSports',
    //       },
    //     },
    //     {
    //       opponent: {
    //         image_url: '/assets/media/teams/team2.png',
    //         name: 'Gambit Gaming',
    //       },
    //     },
    //   ],
    //   game: {
    //     name: 'CAALL OF DUTY WW2',
    //   },
    //   streamsList: [
    //     {
    //       embed_url: 'https://www.twitch.tv/embed/sample_stream',
    //     },
    //   ],
    // },
    // Add more sample team matches if needed
  ];



  // let [teamMatches, setteamMatches] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get(`https://9dfd-2409-40c4-1018-d952-904f-6d01-fee1-f77.ngrok-free.app/api/teams/teamdata/MATCHES/63948072 `)
  //     .then((res) => setteamMatches(res.data));
  // },[])


  // const sampleTeamMatches = [
  //   {
  //     startDate: '2024-02-08T18:00:00',
  //     instance: 'Round1',
  //     opponents: [
  //       {
  //         opponent: {
  //           image_url: '/assets/media/teams/team1.png',
  //           name: 'Fortuna eSports',
  //         },
  //       },
  //       {
  //         opponent: {
  //           image_url: '/assets/media/teams/team2.png',
  //           name: 'Gambit Gaming',
  //         },
  //       },
  //     ],
  //     game: {
  //       name: 'CAALL OF DUTY WW2',
  //     },
  //     streamsList: [
  //       {
  //         embed_url: 'https://www.twitch.tv/embed/sample_stream',
  //       },
  //     ],
  //   },
  //   {
  //     startDate: '2024-02-08T18:00:00',
  //     instance: 'Round1',
  //     opponents: [
  //       {
  //         opponent: {
  //           image_url: '/assets/media/teams/team1.png',
  //           name: 'Fortuna eSports',
  //         },
  //       },
  //       {
  //         opponent: {
  //           image_url: '/assets/media/teams/team2.png',
  //           name: 'Gambit Gaming',
  //         },
  //       },
  //     ],
  //     game: {
  //       name: 'CAALL OF DUTY WW2',
  //     },
  //     streamsList: [
  //       {
  //         embed_url: 'https://www.twitch.tv/embed/sample_stream',
  //       },
  //     ],
  //   },
  //   // Add more sample team matches if needed
  // ];

  // Sample raw data for isMatchPlayersSet
  const teamMatches = sampleTeamMatches;
  const isMatchPlayersSet = true;


  const roundsMatches = teamMatches?.filter((x) => {
    return x.instance === 'Round1' || x.instance === 'Round2';
  });
  const semiFinalAndFinalMatches = teamMatches?.filter((x) => {
    return x.instance === 'Semifinals' || x.instance === 'Final';
  });




  return (
    <>
      {/* -------- old code of matches------- */}
      {/* <div className="matches_box ">
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
        <div className="heads_bg">Upcoming Matches</div>
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
                <h3 className="_vs">MANILA MASTERS TORONTO 4V4</h3>
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
      )}
      </div> */}

      {/* -------- present  code of matches------- */}
      <div className="matches_box ">
        {/* <div className="heads_bg">latest Matches </div> */}
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
      </div>
    </>
  );
};

export default Matches;
