import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import baseURL from '../../utils/baseURL';
import AllPosts from '../dashboard/AllPosts';
import BrandFollow from './BrandFollow';

const BrandDisplay = ({ brandData, user }) => {
  const [followData, setFollowData] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}/api/brand/${brandData.brand._id}/followers`)
      .then((res) => setFollowData(res.data));
  }, []);

  return (
    <>
      <div>
        <div className="main_middle profile_middle">
          <div className="profile_box tournament_dp_box games_page">
            <div className="profile_cover_photo">
              {' '}
              <img
                src="/assets/media/profile/cover_bg.jpg"
                alt="cover image"
              />{' '}
            </div>
            <div className="profile_dp_box">
              <div className="profile_pic">
                {' '}
                <img src={brandData.brand?.logoUrl} alt="" />{' '}
              </div>
              <div className="profile_details">
                <div className="top_details">
                  <div className="name_box">
                    <div className="flag_tick_flow">
                      {' '}
                      <span className="game_name">
                        {brandData.brand.name}
                      </span>{' '}
                      <div className="tick"></div>
                      <div className="button">
                        {' '}
                        <a href="#" className="btn">
                          {' '}
                          <BrandFollow
                            brandData={brandData.brand}
                            user={user}
                          />
                        </a>{' '}
                      </div>
                    </div>
                    <span className="follower">
                      {brandData.brand.followers?.length} Followers
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bio_box  game_bio">
              <div className="left_bio">
                <div className="top_bio">
                  <h3>ABOUT THE BRAND</h3>
                  <div className="socail">
                    {brandData.brand.social?.facebook ? (
                      <a
                        href={`https://www.facebook.com/${brandData.brand?.social?.facebook}`}
                        target="_blank" rel="noreferrer"
                      >
                        <i
                          className="fa fa-facebook-official"
                          aria-hidden="true"
                        ></i>
                      </a>
                    ) : null}
                    {brandData.brand.social?.instagram ? (
                      <a
                        href={`https://www.instagram.com/${brandData.brand?.social?.instagram}`}
                        target="_blank" rel="noreferrer"
                      >
                        <i className="fa fa-instagram" aria-hidden="true"></i>
                      </a>
                    ) : null}

                    {brandData.brand.social?.twitch ? (
                      <a
                        href={`https://www.twitch.tv/${brandData.brand?.social?.twitch}`}
                        target="_blank" rel="noreferrer"
                      >
                        <i className="fa fa-twitch" aria-hidden="true"></i>
                      </a>
                    ) : null}

                    {brandData.brand.social?.youtube ? (
                      <a
                        href={`https://www.youtube.com/c/${brandData.brand.social?.youtube}`}
                        target="_blank" rel="noreferrer"
                      >
                        <i className="fa fa-youtube" aria-hidden="true"></i>
                      </a>
                    ) : null}

                    {brandData.brand.social?.discord ? (
                      <a
                        href={`https://${brandData.brand.social?.discord}`}
                        target="_blank" rel="noreferrer"
                      >
                        <img
                          src="/assets/media/social/discord.png"
                          height="20px"
                          width="20px"
                        />
                      </a>
                    ) : null}

                    {brandData.brand.social?.website ? (
                      <a
                        href={`https://${brandData.brand.social?.website}`}
                        target="_blank" rel="noreferrer"
                      >
                        <i className="fa fa-globe" aria-hidden="true"></i>
                      </a>
                    ) : null}
                  </div>
                </div>
                <p>{brandData.brand?.description} </p>
              </div>
            </div>
            <ul className="profile_tab_btn">
              <li>
                <a href="#!" className="active" rel="feed">
                  FEED
                </a>
              </li>
            </ul>

            <div className="prfoile_tab_data">
              <div className="tab" id="feed">
                <div className="profile_left_post">
                  {' '}
                  {brandData.brandPosts.length !== 0 &&
                    brandData.brandPosts.map((post,i) =>
                      post.user._id !== user._id ? (
                        <>
                          <AllPosts
                            post={post}
                            user={user}
                            followData={followData.followers} key={i}
                          />
                        </>
                      ) : (
                        <AllPosts post={post} user={user} key={i} />
                      )
                    )}{' '}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandDisplay;
