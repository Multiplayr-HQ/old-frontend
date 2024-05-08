import { useEffect, useState } from 'react';
import ProdPoup from '../profile/prodPoup';
import Photos from './Photos';
import Videos from './Videos';
import ProductList from '@components/common/ProductList';
import ProductRigs from '@components/common/ProductRigs';
import ProfileMatches from './ProfileMatches';
import TeamAllStats from '@components/team/TeamAllStats';
import GamesDetails from './GamesDetails';
import AllPosts from '@components/dashboard/AllPosts';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import { useRouter } from 'next/router';
import cookie from 'js-cookie';
import ProfileTournament from './ProfileTournament';
import ProfileTeams from './ProfileTeams';

const ProfileData = ({ user, Userdata, products, teams }) => {
  const profile = Userdata?.profile;
  let [tabData, setTabData] = useState([]);
  const [allGames, setAllGames] = useState([]);
  const [teamroles, setTeamRoles] = useState([]);

  useEffect(() => {
    axios.get(`${baseURL}/api/all/games`).then((res) => setAllGames(res.data));

    axios
      .get(`${baseURL}/api/all/teamroles`)
      .then((res) => setTeamRoles(res.data));
  }, []);

  const router = useRouter();

  const refreshData = () => {
    router.replace(router.asPath);
  };



  // useEffect(() => {
  //     refreshData();
  // }, []);

  useEffect(() => {}, [profile]);
  useEffect(() => {}, [Userdata]);

  const handleTabs = async (Type) => {
    console.log(Type);
    await axios
      .get(
        `${baseURL}/api/profile/profiledata/${Type}/${Userdata?.profile._id}`,
        {
          headers: {
            Authorization: cookie.get('token')
          }
        }
      )
      .then((res) => setTabData(res.data));
      
  };

  return (
    <>
      <ul className="profile_tab_btn">
        <li>
          <a href="#!" className="active" rel="feed">
            FEED
          </a>
        </li>
        {/* <li>
          <a href="#!" className="active" rel="statistics">
            Statistics
          </a>
        </li> */}
        <li>
          <a
            href="#!"
            className="active"
            rel="teams"
            onClick={() => handleTabs('TEAMS')}
          >
            Teams
          </a>
        </li>
        <li>
          <a
            href="#!"
            className="active"
            rel="tournaments"
            onClick={() => handleTabs('TOURNAMENTS')}
          >
            Tournaments
          </a>
        </li>
        {/* <li>
          <a href="#!" rel="achievement">
            {' '}
            ACHIEVEMENTS
          </a>
        </li> */}
        {/* <li>
          <a href="#!" rel="matches" onClick={() => handleTabs('MATCHES')}>
            MATCHES
          </a>
        </li> */}
        {/* <li>
          <a href="#!" rel="store">
            merchandise
          </a>
        </li> */}
        <li>
          <a href="#!" rel="photos" onClick={() => handleTabs('PHOTOS')}>
            Photos
          </a>
        </li>
        <li>
          <a href="#!" rel="video" onClick={() => handleTabs('VIDEOS')}>
            Videos/streams
          </a>
        </li>
        {/* <li>
          <a href="#!" rel="rigs">
            rigs
          </a>
        </li> */}
      </ul>
      <div className="prfoile_tab_data">
        <div className="tab" id="feed">
          <div className="profile_left_post">
            {' '}
            {Userdata?.posts?.length !== 0 &&
              Userdata?.posts?.map((post, i) =>
                post.user._id !== user._id ? (
                  <>
                    <AllPosts
                      post={post}
                      user={user}
                      profiledata={Userdata?.profile}
                      key={i}
                    />
                  </>
                ) : (
                  <AllPosts post={post} user={user} key={i} />
                )
              )}{' '}
          </div>
          <div className="profile_match_details">
            {' '}
            {Userdata?.teamMatchesList?.map((result, index) => (
              <TeamAllStats teamId={result.team._id} key={index} />
            ))}
            <GamesDetails user={user} Userdata={profile} teams={teams} />
          </div>
        </div>
        <div className="tab hide" id="statistics">
          <ul className="stats_card">
            <li>
              <div className="card_img">
                {' '}
                <img src="/assets/media/stats.jpg" alt="" />{' '}
              </div>
              <div className="right_data">
                <h3>Counter strike:Global Offensive</h3>
                <div className="card_details">
                  <div className="once">
                    <p>kills avg</p>
                    <span className="big_name"> 1.33 </span>{' '}
                  </div>
                  <div className="once">
                    <p>headchange avg</p>
                    <span className="big_name"> 1.1 </span>{' '}
                  </div>
                  <div className="once">
                    <p>Gammer ceaton avg</p>
                    <span className="big_name"> 473.29 </span>{' '}
                  </div>
                  <div className="once">
                    <p>kills avg</p>
                    <span className="big_name">50% </span>{' '}
                  </div>
                </div>
              </div>
              <div className="comp_btn">
                <i className="fa fa-compress" aria-hidden="true"></i> Compare
              </div>
            </li>

            <li>
              <div className="card_img">
                {' '}
                <img src="/assets/media/stats.jpg" alt="" />{' '}
              </div>
              <div className="right_data">
                <h3>Counter strike:Global Offensive</h3>
                <div className="card_details">
                  <div className="once">
                    <p>kills avg</p>
                    <span className="big_name"> 1.33 </span>{' '}
                  </div>
                  <div className="once">
                    <p>headchange avg</p>
                    <span className="big_name"> 1.1 </span>{' '}
                  </div>
                  <div className="once">
                    <p>Gammer ceaton avg</p>
                    <span className="big_name"> 473.29 </span>{' '}
                  </div>
                  <div className="once">
                    <p>kills avg</p>
                    <span className="big_name">50% </span>{' '}
                  </div>
                </div>
              </div>
              <div className="comp_btn">
                <i className="fa fa-compress" aria-hidden="true"></i> Compare
              </div>
            </li>

            <li>
              <div className="card_img">
                {' '}
                <img src="/assets/media/stats.jpg" alt="" />{' '}
              </div>
              <div className="right_data">
                <h3>Counter strike:Global Offensive</h3>
                <div className="card_details">
                  <div className="once">
                    <p>kills avg</p>
                    <span className="big_name"> 1.33 </span>{' '}
                  </div>
                  <div className="once">
                    <p>headchange avg</p>
                    <span className="big_name"> 1.1 </span>{' '}
                  </div>
                  <div className="once">
                    <p>Gammer ceaton avg</p>
                    <span className="big_name"> 473.29 </span>{' '}
                  </div>
                  <div className="once">
                    <p>kills avg</p>
                    <span className="big_name">50% </span>{' '}
                  </div>
                </div>
              </div>
              <div className="comp_btn">
                <i className="fa fa-compress" aria-hidden="true"></i> Compare
              </div>
            </li>
          </ul>
        </div>

        <ProfileTeams
          Userdata={Userdata?.profile}
          user={user}
          allGames={allGames}
          teamroles={teamroles}
          teamsData={tabData?.teams}
        />

        <ProfileTournament
          user={user}
          profile={profile}
          teams={teams}
          allGames={allGames}
          teamroles={teamroles}
          tournamentData={tabData}
        />

        <div className="tab hide" id="achievement">
          {' '}
          <div className="achivement_box">
            <div className="features">
              <h2>featured</h2>
              <ul>
                <li>
                  <div className="img">
                    {' '}
                    <i className="fa fa-trophy" aria-hidden="true"></i>{' '}
                  </div>
                  <p className="tit">Silver x1</p>
                  <p>Awarded for placing second 1 tournament</p>
                </li>
              </ul>
            </div>
            <div className="trophy_cabinate">
              <h3>trophy cabinet</h3>
              <ul>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
                <li>
                  <p className="num">21</p>
                  <h4> Title </h4>
                  <h5>professional</h5>
                  <h5>tournaments</h5>
                </li>
              </ul>
            </div>
            <div className="tournament_table">
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">tournament</th>
                    <th scope="col">game</th>
                    <th scope="col">date</th>
                    <th scope="col">rank</th>
                    <th scope="col">prize</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>zapak gaming tournament </td>
                    <td>cod 4</td>
                    <td>2011</td>
                    <td>1</td>
                    <td>rs. 10,000</td>
                  </tr>
                  <tr>
                    <td>zapak gaming tournament </td>
                    <td>cod 4</td>
                    <td>2011</td>
                    <td>1</td>
                    <td>rs. 10,000</td>
                  </tr>
                  <tr>
                    <td>zapak gaming tournament </td>
                    <td>cod 4</td>
                    <td>2011</td>
                    <td>1</td>
                    <td>rs. 10,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>{' '}
        </div>

        {/* <ProfileMatches
          user={user}
          Userdata={Userdata}
          teamMatchesList={tabData}
        /> */}

        <ProductList user={user} productList={products} />

        <Photos
          Userdata={Userdata?.profile}
          user={user}
          photosData={tabData?.photos}
        />

        <Videos
          Userdata={Userdata?.profile}
          user={user}
          data={tabData?.videos}
        />

        {/* <ProductRigs user={user} productList={products} Userdata={Userdata} /> */}
      </div>
      {/* ------------- start poup data ------------- */}
      <ProdPoup />
    </>
  );
};
export default ProfileData;
