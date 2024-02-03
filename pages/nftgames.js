import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';

import AllScript from './AllScript';
import Link from 'next/link';

const NFTGamesList = ({ user }) => {
  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">
        <div className="play_game_list">
          <h1>Play Game</h1>

          <ul className="play_games">
            <li>
              <Link href="/nft/carslane">
                <button className="">
                  <img src="/assets/media/play/cars.jpg" alt="" />
                </button>
                <h2> Cars Lane</h2>
              </Link>
            </li>

            <li>
              <a href="#/dodgerocks">
                <button className="">
                  <img src="/assets/media/play/rocks.jpg" alt="" />

                  <h2>Dodge Rocks</h2>
                </button>
              </a>
            </li>

            <li>
              <a href="#/dodgerocks">
                <button className="">
                  <img src="/assets/media/play/dharm.png" alt="" />
                  <span className="grey">Coming Soon</span>
                  <h2>Dharmyuddha</h2>
                </button>
              </a>
            </li>

            <li>
              <a href="#/dodgerocks">
                <button className="">
                  <img src="/assets/media/play/line.png" alt="" />

                  <span className="grey">Coming Soon</span>

                  <h2>Line of control</h2>
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <AllScript />
    </>
  );
};

export default NFTGamesList;
