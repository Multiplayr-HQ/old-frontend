import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';

import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import { useQuery, useMutation } from 'react-query';
import { getTournament } from '@utils/functionsHelper';
import axios from 'axios';
import baseEsportsAPIURL from '@utils/baseEsportsAPIURL';
import { useState, useEffect } from 'react';
import { MPNumberFormat } from '@utils/helpers';
import { format } from 'date-fns';
import { getData } from '@utils/fetchData';

import baseURL from '@utils/baseURL';
import TournamentVideos from '@components/tournament/TournamentVideos';
import TournamentPhotos from '@components/tournament/TournamentPhotos';
import TournamentSeries from '@components/tournament/TournamentSeries';
import TournamentParticipants from '@components/tournament/TournamentParticipants';

import ProductList from '@components/common/ProductList';
import Matches from '@components/team/Matches';
import TournamentSponsor from '@components/tournament/TournamentSponsor';
import Moment from 'moment';
import { toast } from 'react-toastify';
import TournamentFollow from '../../components/tournament/TournamentFollow';
import AllPosts from '../../components/dashboard/AllPosts';
import TournamentRules from '../../components/tournament/TournamentRules';
import TournamentEdit from '../../components/tournament/TournamentEdit';
import Tournament_Reg from '../../components/tournament/TournamentRegister';
import ReactCountryFlag from 'react-country-flag';
import TournamentPrize from '../../components/tournament/TournamentPrize';
import TournamentPrizeDetail from '../../components/tournament/TournamentPrizeDetail';
import TournamentSlots from '../../components/tournament/TournamentSlots';
import { parseCookies } from 'nookies';
import TournamentGroups from '../../components/tournament/TournamentGroups';
import { isMember } from '../../utils/functionsHelper';
import BracketSystem from '../../components/tournament/BracketSystem';
import Link from 'next/link';

const TournamentDetail = ({
  user,
  data,
  tourRules,
  products,
  profile,
  teams
}) => {
  const router = useRouter();
  const [later, setLater] = useState(false);
  const [followData, setFollowData] = useState([]);
  const isRegisteredMember = isMember(data, user);


  const groupData = {
    teams: [
      {
        teamId: {
          name: "Team A",
          imgUrl: "teamA.jpg"
        },
        matches: 5,
        won: 3,
        draw: 1,
        loss: 1,
        points: 10
      },
      {
        teamId: {
          name: "Team B",
          imgUrl: "teamB.jpg"
        },
        matches: 5,
        won: 2,
        draw: 2,
        loss: 1,
        points: 8
      }
    ],
    participants: [
      {
        participantId: {
          username: "Player X",
          profilePicUrl: "/assets/media/default/team.jpg"
        },
        matches: 5,
        won: 4,
        draw: 0,
        loss: 1,
        points: 12
      },
      {
        participantId: {
          username: "Player Y",
          profilePicUrl: "/assets/media/default/team.jpg"
        },
        matches: 5,
        won: 3,
        draw: 1,
        loss: 1,
        points: 10
      }
    ]
  };


  useEffect(async () => {
    await axios
      .get(`${baseURL}/api/tournaments/${data.tournament?.name}/followers`)
      .then((res) => setFollowData(res.data));
  }, []);
  if (data) {
    const isUser = data.tournament?.user?._id === user._id;
    const isSupportAdmin =
      data.tournament?.isClaimed === false && user.isSupportAdmin;

    const refreshData = () => {
      router.replace(router.asPath);
    };

    const handleDeleteSubmit = async (e) => {
      e.preventDefault();
      axios.delete(
        `${baseURL}/api/tournaments/${data.tournament._id}/${data.tournament.name}`,
        {
          headers: {
            Authorization: cookie.get('token')
          },
          data: {
            user: user._id
          }
        }
      );
      toast.success('Deleted Successfully');
      router.push('/dashboard');
    };

    let x = Moment.duration(
      Moment(data.tournament?.startDate).diff(Moment().startOf('day'))
    )
      .asDays()
      .toString()
      .slice(0, 3);
    let daysLeft = Math.floor(Number(x));

    const handleSetMatches = async () => {
      try {
        axios
          .get(`${baseURL}/api/tournaments/matches/${data.tournament._id}`)
          .then((res) => console.log(res.data));
        toast.success('Created Matches Successfully');
      } catch (err) {
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
    };

    const handleCoverSubmit = async (e) => {
      var img = e.target.files[0];

      e.preventDefault();
      const formdata = new FormData();
      formdata.append('coverPhoto', img);
      try {
        await axios
          .put(
            `${baseURL}/api/tournaments/coverPic/${data.tournament._id}`,
            formdata,
            {
              headers: {
                Authorization: cookie.get('token'),
                'Content-Type': 'multipart/form-data'
              }
            }
          )
          .then((res) => toast.success(res.data.msg));
        refreshData();
      } catch (err) {
        console.log(err);
        toast.error(err.response?.data?.msg || 'Please recheck your inputs');
      }
    };
    console.log("data in tournament", data);

    return (
      <>
        <MetaDash />
        <SignedHeader user={user} profile={profile} />
        <LeftNav user={user} />

        <div>
          <div className="main_middle profile_middle">
            <div className="profile_box tournament_dp_box">
              <div className="profile_cover_photo">
                {' '}
                <img src={data.tournament?.coverPhoto} alt="cover image" />{' '}
              </div>
              <div className="profile_dp_box">
                <div className="profile_pic">
                  {' '}
                  <img
                    src={
                      data.tournament?.imgUrl
                        ? data.tournament?.imgUrl
                        : '/assets/media/tournament/1.png'
                    }
                    alt=""
                  />{' '}
                </div>
                <div className="profile_details">
                  <div className="top_details">
                    <div className="name_box">
                      {' '}
                      <div className="flag_tick_flow">
                        <span className="game_name">
                          {' '}
                          {data.tournament
                            ? data.tournament.name
                            : 'Not Defined'}{' '}
                        </span>
                        <div className="flag"></div>
                        <div className="tick">
                          {later === false ? null : (
                            <>
                              <span className="active">
                                <i
                                  className="fa fa-check"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </>
                          )}
                        </div>
                        {isUser || isSupportAdmin ? null : (
                          <div className="button">
                            <a href="#" className="btn">
                              <TournamentFollow
                                tournament={data.tournament}
                                user={user}
                              />
                            </a>
                          </div>
                        )}
                        {isUser || isSupportAdmin ? (
                          <span>
                            <div className="loc_box">
                              {' '}
                              {daysLeft <= 1 ? null : (
                                <>
                                  <a href="#!" className="model_show_btn">
                                    <button className="btn">
                                      <i
                                        className="fa fa-trash"
                                        aria-hidden="true"
                                        style={{ color: '#000' }}
                                      ></i>
                                    </button>
                                  </a>
                                </>
                              )}
                              <div className="common_model_box">
                                <a href="#!" className="model_close">
                                  X
                                </a>

                                <div className="inner_model_box">
                                  <h3>Are You Sure?</h3>

                                  <div className="two_btn">
                                    <button className="btn">No</button>
                                    <button
                                      className="btn"
                                      onClick={handleDeleteSubmit}
                                    >
                                      Yes
                                    </button>
                                  </div>
                                </div>
                                <div className="overlay"></div>
                              </div>
                            </div>
                          </span>
                        ) : null}
                      </div>
                      <span className="follower">
                        <p> {data.tournament?.followers.length} Followers</p>
                      </span>
                      <span className="name loc_date">
                        {data.tournament?.category !== 'LAN' ? null : (
                          <>
                            <i className="fa fa-map-marker"></i>
                            {data.tournament?.address},{' '}
                          </>
                        )}
                        {data.tournament?.location}{' '}
                        <span className="tour_time">
                          <i className="fa fa-clock-o"></i>{' '}
                          {Moment(data.tournament?.startDate).format('MMM DD')} -
                          {Moment(data.tournament?.endDate).format('MMM DD')}{' '}
                          {data.tournament?.startTime}
                        </span>
                      </span>{' '}
                      <span className="follower"></span>{' '}
                    </div>
                  </div>
                </div>

                <div className="bottom_details">
                  <div className="two_btns">
                    <Tournament_Reg
                      user={user}
                      tournament={data.tournament}
                      groups={data.tourGroups}
                      profile={profile}
                      teams={teams}
                    />
                    {data.tournament?.category === 'LAN' ? (
                      <a href="#" className="btn">
                        BOOK TICKETS
                      </a>
                    ) : null}
                    {isUser || isSupportAdmin ? (
                      <>
                        <input
                          type="file"
                          name="coverPhoto"
                          id="coverPhoto"
                          className="custom-file-input"
                          onChange={handleCoverSubmit}
                        />

                        <label htmlFor="coverPhoto">
                          <span>
                            <i className="fa fa-camera" aria-hidden="true"></i>{' '}
                            Upload Cover Photo
                          </span>
                        </label>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="tournament_sponsers">
                <div className="logos">
                  <h5>SPONSORS</h5>

                  <>
                    {data.sponsors && data.sponsors.length > 0 ? (
                      data.sponsors.map((item, index) => (
                        <span key={index}>
                          <img src={item.imgUrl} alt={item.sponsorId} />
                        </span>
                      ))
                    ) : (
                      <p>No Sponsor&apos;s Yet </p>
                    )}
                  </>
                </div>

                <div className="flex prices">
                  <h5>Prize Pool</h5>
                  {data.tournament?.currency}
                  <span className="">
                    <MPNumberFormat
                      value={
                        data.tournament?.prizepool
                          ? data.tournament?.prizepool
                          : null
                      }
                      currency={data.currency}
                    />
                  </span>
                </div>
              </div>
              <div className="bio_box team_bio arena_bio">
                <div className="left_bio">
                  <div className="top_bio">
                    <h3>ABOUT THE TOURNAMENT</h3>
                    <div className="socail">
                      {data.tournament?.social?.facebook ? (
                        <a
                          href={`https://www.facebook.com/${data.tournament.social?.facebook}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i
                            className="fa fa-facebook-official"
                            aria-hidden="true"
                          ></i>
                        </a>
                      ) : null}
                      {data.tournament?.social?.instagram ? (
                        <a
                          href={`https://www.instagram.com/${data.tournament.social?.instagram}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-instagram" aria-hidden="true"></i>
                        </a>
                      ) : null}

                      {data.tournament?.social?.twitch ? (
                        <a
                          href={`https://www.twitch.tv/${data.tournament.social?.twitch}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-twitch" aria-hidden="true"></i>
                        </a>
                      ) : null}

                      {data.tournament?.social?.youtube ? (
                        <a
                          href={`https://www.youtube.com/c/${data.tournament.social?.youtube}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-youtube" aria-hidden="true"></i>
                        </a>
                      ) : null}

                      {data.tournament?.social?.discord ? (
                        <a
                          href={`https://${data.tournament.social?.discord}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <img
                            src="/assets/media/social/discord.png"
                            height="20px"
                            width="20px"
                          />
                        </a>
                      ) : null}

                      {data.tournament?.website ? (
                        <a
                          href={`https://${data.tournament?.website}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-globe" aria-hidden="true"></i>
                        </a>
                      ) : null}
                    </div>
                    <span>
                      <div className="loc_box">
                        {' '}
                        {isUser || isSupportAdmin ? (
                          <div>
                            <TournamentEdit data={data} user={user} />
                          </div>
                        ) : null}
                      </div>
                    </span>
                  </div>

                  <p> {data.tournament ? data.tournament.description : ''} </p>

                  <div className="games">
                    <h3>organizer:</h3>

                    <>
                      {data.organizers &&
                        data.organizers.map((item, index) => (
                          <span key={index}>
                            <img
                              src={
                                item.imgUrl ? item.imgUrl : item.profilePicUrl
                              }
                              alt={item.name}
                            />{' '}
                            <b>{item.name}</b>
                          </span>
                        ))}
                    </>
                  </div>
                  <div className="games">
                    <h3>FORMAT:</h3> <span>{data.tournament?.playType}</span>{' '}
                  </div>
                  <div className="games">
                    <h3>
                      {data.tournament?.playType === 'TEAMS'
                        ? 'Teams:'
                        : 'PARTICIPANTS:'}{' '}
                    </h3>
                    {data.tournament?.playType === 'TEAMS'
                      ? data.tournament.teams?.slice(0, 3).map((team, i) => (
                        <span key={i}>
                          {' '}
                          <img src={team?.teamId.imgUrl} alt="" />
                        </span>
                      ))
                      : data.tournament?.registered?.slice(0, 3).map((reg, i) => (
                        <span key={i}>
                          {' '}
                          <img src={reg?.user?.profilePicUrl} alt="" />
                        </span>
                      ))}
                    {data.tournament?.playType === 'SOLO' ? (
                      <>
                        {data.tournament?.registered.length === 0
                          ? 'No Participants Yet'
                          : null}
                      </>
                    ) : (
                      <>
                        {data.tournament?.teams.length === 0
                          ? 'No Teams Yet'
                          : null}
                      </>
                    )}
                    {data.tournament?.registered.length > 3 ? (
                      <a href="#!" className="model_show_btn more">
                        +{data.tournament?.registered.length - 3}
                      </a>
                    ) : null}
                    <div className="common_model_box part_poup" id="share_prof">
                      <a href="#!" className="model_close">
                        X
                      </a>

                      <div className="inner_model_box">
                        <h3>Participants</h3>
                        <ul>
                          {data.tournament?.playType === 'SOLO' ? (
                            <>
                              {data.tournament?.registered.map((ppl, i) => (
                                <li key={i}>
                                  <div className="game_pic">
                                    {' '}
                                    <img
                                      src={ppl.user?.profilePicUrl}
                                      alt={ppl.user?.name}
                                    />
                                  </div>
                                  <Link href={`/user/${ppl.user?._id}`}>
                                    <p>{ppl.user?.name}</p>
                                  </Link>
                                </li>
                              ))}
                            </>
                          ) : (
                            <>
                              {data.tournament?.teams.map((team, i) => (
                                <li key={i}>
                                  <div className="game_pic">
                                    {' '}
                                    <img
                                      src={team.teamId?.imgUrl}
                                      alt={team.teamId?.name}
                                    />
                                  </div>
                                  <a href={`/user/${team.teamId?._id}`}>
                                    <p>{team.teamId?.name}</p>
                                  </a>
                                </li>
                              ))}
                            </>
                          )}
                        </ul>
                      </div>
                      <div className="overlay"></div>
                    </div>
                    <p className="slots">
                      {data.tournament?.playType === 'TEAMS' ? (
                        <>
                          {data.tournament.teams.length} /{' '}
                          {data.tournament.numberOfTeam} <b> SLOTS</b>
                        </>
                      ) : (
                        <>
                          {data.tournament?.registered.length} /{' '}
                          {data.tournament?.participants} <b> SLOTS</b>
                        </>
                      )}
                    </p>
                    <div className="slot-graphs">
                      {data.tournament?.playType === 'TEAMS' ? (
                        <>
                          {data.tournament?.teams.length === 0 ? null : (
                            <TournamentSlots
                              total={data.tournament?.numberOfTeam}
                              reg={data.tournament?.teams.length}
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {data.tournament?.registered.length === 0 ? null : (
                            <TournamentSlots
                              total={data.tournament?.participants}
                              reg={data.tournament?.registered.length}
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="right_team_bio">
                  <div className="games">
                    <h2>GAMES</h2>
                    <>
                      {data.tournament?.games &&
                        data.tournament?.games.map((item, index) => (
                          <span key={index}>
                            <img
                              src={item.gameId.imgUrl}
                              alt={item.gameId.name}
                            />
                          </span>
                        ))}
                      <p>Type: {data.tournament?.teamSize}</p>
                    </>
                  </div>

                  <div className="games">
                    <>
                      <h2>Maps: </h2>
                      {data.tournament?.games[0].gameId._id ===
                        data.tournament?.maps[0]?.mapId.game ? (
                        <>
                          {data.tournament?.maps &&
                            data.tournament?.maps.map((item, index) => (
                              <>
                                <span key={index}>
                                  <img
                                    src={item.mapId.imgUrl}
                                    alt={item.mapId.name}
                                  />
                                </span>
                                <p>{item.mapId.name}</p>
                              </>
                            ))}
                        </>
                      ) : (
                        <p>No Maps For The Game</p>
                      )}
                    </>
                  </div>

                  {data.tournament?.eligibleCountries.length > 0 ? (
                    <>
                      <div className="games">
                        <h2>Eligible Countries:</h2>
                        <>
                          {data.tournament.eligibleCountries &&
                            data.tournament.eligibleCountries.map(
                              (cty, index) => (
                                <>
                                  <span key={index}>
                                    <ReactCountryFlag
                                      countryCode={cty.iso}
                                      svg
                                      style={{
                                        width: '2em',
                                        height: '2em'
                                      }}
                                    />
                                  </span>
                                  <p>{cty.name}</p>
                                </>
                              )
                            )}
                        </>
                      </div>
                    </>
                  ) : null}

                  <div className="internet">
                    <ul>
                      <li>
                        <b>CATEGORY</b>
                        {data.tournament?.category ? (
                          <>{data.tournament?.category} </>
                        ) : (
                          'No Category selected'
                        )}
                      </li>
                      <li>
                        <b>REGISTRATION </b>
                        {data.tournament?.entranceFee !== 0 ? (
                          <>
                            {' '}
                            {data.tournament?.currency}{' '}
                            {data.tournament?.entranceFee}
                          </>
                        ) : (
                          'Free'
                        )}
                      </li>
                      <li>
                        {' '}
                        <b>PLAYOUT </b> {data.tournament?.playout}{' '}
                      </li>
                      <li>
                        <b>ELIMINATION </b>
                        {data.tournament?.tournamentType}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <ul className="profile_tab_btn">
              <li className="active">
                <a href="#!" rel="overview">
                  Overview
                </a>
              </li>

              <li>
                <a href="#!" rel="rules">
                  Rules
                </a>
              </li>
              <li>
                <a href="#!" rel="result">
                  Prizes/Result
                </a>
              </li>
              {/* <li>
                <a href="#!" rel="series">
                  TOURNAMENT SERIES
                </a>
              </li> */}
              <li>
                <a href="#!" rel="points">
                  Points Table
                </a>
              </li>
              <li>
                <a href="#!" rel="matches">
                  Shedules/Matches
                </a>
              </li>
              {/* <li>
                <a href="#!" rel="participants">
                  {' '}
                  PARTICIPANTS
                </a>
              </li> */}

              <li>
                <a href="#!" rel="braket">
                  Braket
                </a>
              </li>
              <li>
                <a href="#!" rel="store">
                  Store
                </a>
              </li>
              <li>
                <a href="#!" rel="video">
                  Streams/Media
                </a>
              </li>
              <li>
                <a href="#!" rel="sponsors">
                  Sponsors
                </a>
              </li>
            </ul>
            <div className="prfoile_tab_data">
              <div className="tab" id="overview">
                <div className="profile_left_post">
                  {data.tourPosts?.length === 0 ? (
                    <h6>No Posts Under This Tournament</h6>
                  ) : (
                    data.tourPosts?.length !== 0 &&
                    data.tourPosts?.map((post, index) => (
                      <AllPosts key={index}
                        post={post}
                        user={user}
                        followData={followData.followers}
                      />
                    ))
                  )}
                </div>
                <div>
                  {data.tournament?.room && isRegisteredMember === user._id ? (
                    <>
                      <p>Room ID and Password</p>
                      <p>ID: {data.tournament?.room?.roomId}</p>
                      <p>Password: {data.tournament?.room?.roompwd}</p>
                    </>
                  ) : null}
                </div>
              </div>

              <div className="tab hide" id="rules">
                {isUser || isSupportAdmin ? (
                  <TournamentRules
                    tournament={data.tournament}
                    tourRules={tourRules}
                  />
                ) : null}

                <div className="rules_details">
                  <div className="rules_row">
                    <h2> PRIZES</h2>
                    <p>{tourRules?.prizeRules}</p>
                  </div>
                  <div className="rules_row">
                    <h2> MATCH SETTINGS</h2>
                    <p>{tourRules?.matchSettings}</p>
                  </div>
                  <div className="rules_row">
                    <h2> GENERAL RULES</h2>
                    <p>{tourRules?.general}</p>
                  </div>
                  <div className="rules_row">
                    <h2> HOW TO COMPETE</h2>
                    <p>{tourRules?.compete}</p>
                  </div>

                  <div className="rules_row">
                    <h2> ELIGIBLE COUNTRIES</h2>
                    <ul>
                      {data.tournament?.eligibleCountries &&
                        data.tournament?.eligibleCountries?.map((cty, i) => (
                          <li key={i}>
                            <ReactCountryFlag
                              countryCode={cty.iso}
                              svg
                              style={{
                                width: '2em',
                                height: '2em'
                              }}
                            />
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="tab hide" id="result">
                {isUser || isSupportAdmin ? (
                  <TournamentPrize
                    tournamentId={data.tournament._id}
                    tournamentTier={data.tournament?.tournament_tier}
                    tournament={data.tournament}
                    isSupportAdmin={isSupportAdmin}
                  />
                ) : null}
                <TournamentPrizeDetail tournament={data.tournament} />
              </div>

              <div className="tab hide" id="series">
                <TournamentSeries user={user} tournament={data.tournament} />
              </div>
              <div className="tab hide" id="points">
                {/* {isUser || isSupportAdmin ? (
                  <button className="btn" onClick={() => handleSetMatches()}>
                    Set Matches
                  </button>
                ) : null} */}
                <div className="points_table">
                  <div className="groupds_box">
                    {data.tournament?.playType === 'SOLO' ? (
                      <>
                        <TournamentGroups
                          // group={data?.tourGroups[0]}
                          group = {groupData}
                          playType={data?.tournament.playType}
                          tournamentType={data?.tournament.tournamentType}
                        />
                        <TournamentGroups
                          // group={data?.tourGroups[1]}
                          group = {groupData}
                          playType={data?.tournament.playType}
                          tournamentType={data?.tournament.tournamentType}
                        />
                      </>
                    ) : (
                      <>
                        {/* <TournamentGroups
                          group={data?.tourGroups[0]}
                          playType={data?.tournament.playType}
                          tournamentType={data?.tournament.tournamentType}
                        /> */}
                        {/* <TournamentGroups
                          group={data?.tourGroups[1]}
                          playType={data?.tournament.playType}
                          tournamentType={data?.tournament.tournamentType}
                        /> */}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="tab hide" id="matches">
                <Matches
                  teamMatches={data?.tournamentMatches?.matches}
                  isMatchPlayersSet={data?.tournamentMatches?.isMatchPlayersSet}
                />
              </div>

              <div className="tab hide" id="participants">
                <TournamentParticipants
                  user={user}
                  tournament={data.tournament}
                />
              </div>

              <div className="tab hide" id="braket">
                <div className="results_box white_bg">
                  <div className="congratulations">
                    <h1>Congragulations to our winners!</h1>
                    <div className="winner_box">
                      <div className="winner">
                        <div className="heads">
                          <img src="/assets/media/result/teams.jpg" alt="" />
                          <h4>Gambit</h4>
                        </div>
                        <div className="winner_cup cup1">
                          {' '}
                          <img
                            src="/assets/media/result/cup1.jpg"
                            alt=""
                          />{' '}
                        </div>
                      </div>
                      <div className="winner">
                        <div className="heads">
                          <img src="/assets/media/result/teams.jpg" alt="" />
                          <h4>Astralis</h4>
                        </div>
                        <div className="winner_cup cup2">
                          {' '}
                          <img
                            src="/assets/media/result/cup2.jpg"
                            alt=""
                          />{' '}
                        </div>
                      </div>
                      <div className="winner">
                        <div className="heads">
                          <img src="/assets/media/result/teams.jpg" alt="" />
                          <h4>FaZO</h4>
                        </div>
                        <div className="winner_cup cup3">
                          {' '}
                          <img
                            src="/assets/media/result/cup3.jpg"
                            alt=""
                          />{' '}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="group_stage_box">
                    {/* <h2>Group Stage</h2>
                    <div className="group_stage">
                      <div className="match_date">
                        <ul>
                          <li>
                            <a href="#" className="active">
                              Saturday - Day1
                              <p>20 August 2020</p>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Friday - Day2
                              <p>20 August 2020</p>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Thursday - Day3
                              <p>20 August 2020</p>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              Saturday - Day4
                              <p>20 August 2020</p>
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="match_list">
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                        <div className="team_match_row">
                          <div className="all_matches">
                            <div className="first_team">
                              {' '}
                              <img src="/assets/media/teams/team1.png" alt="" />
                              <h3>Fnatic eSports</h3>
                            </div>
                            <div className="vs">VS</div>
                            <div className="second_team">
                              {' '}
                              <img src="/assets/media/teams/team2.png" alt="" />
                              <h3>WingsGaming</h3>
                            </div>
                          </div>
                          <p>@ Statstics At 5;45PM / Group Stage1</p>
                        </div>
                      </div>
                    </div> */}
                    <BracketSystem data={data.tournamentMatches?.matches} />
                  </div>
                </div>
              </div>

              <ProductList user={user} productList={products} />

              <div className="tab hide" id="video">
                <TournamentVideos
                  user={user}
                  tournament={data}
                  isUser={isUser}
                  isSupportAdmin={isSupportAdmin}
                />
              </div>
              <div className="tab hide" id="media">
                <TournamentPhotos
                  user={user}
                  tournament={data}
                  isUser={isUser}
                  isSupportAdmin={isSupportAdmin}
                />
              </div>
              <TournamentSponsor
                user={user}
                data={data}
                isUser={isUser}
                isSupportAdmin={isSupportAdmin}
              />
            </div>
          </div>
        </div>

        <AllScript />
      </>
    );
  } else {
    return null;
  }
};

export const getServerSideProps = async (context, query) => {
  const { tournamentname } = context.params;
  const page = query ? query.page || 1 : 1;
  const category = query ? query.category || 'all' : 'all';
  const sort = query ? query.sort || '' : '';
  const search = query ? query.search || 'all' : 'all';
  // const response = await fetch(`${baseEsportsAPIURL}/esport/tournaments/${tournamentid}`, {method:'GET',
  // headers: {'Authorization': 'Basic ' + Buffer.from('multiplyr' + ":" + 'Multiplyr123$').toString('base64')}});
  const { token } = parseCookies(context);
  const response = await fetch(`${baseURL}/api/tournaments/${tournamentname}`, {
    headers: {
      Authorization: token
    }
  });
  const data = await response.json();
 

 


  // const data = dat.data;

  const res = await fetch(
    `${baseURL}/api/tournamentRules/${data.tournament?._id}`
  );
  const tourRules = await res.json();

  const resprod = await getData(
    `product?limit=${page * 6
    }&category=${category}&sort=${sort}&title=${search}`
  );

  return {
    props: { data, tourRules, products: resprod.products }
  };
};

export default TournamentDetail;
