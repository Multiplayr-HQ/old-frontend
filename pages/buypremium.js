import React, { useEffect, useState } from 'react';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from './AllScript';
import cookie from 'js-cookie';
import { toast } from 'react-toastify';
import axios from 'axios';
import PremiumPass from '../components/crypto/PremiumPass';

const challenges = ({ user, profile }) => {
  return (
    <>
      <MetaDash />

      <SignedHeader user={user} profile={profile} />

      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <div className="premium_box">
          <div className="premium_inner">
            <div className="premium_top">
              <div className="left_top">
                <span>
                  <img src="/assets/media/logo.png" alt="" /> <b>MULTIPLAYR</b>{' '}
                  <img src="/assets/media/buypremium/prem.png" alt="" />
                </span>

                <p>
                  Become Multiplayr Prime lifetime member and get access to
                  seller’s account, verified badge, faster withdrawls and a lot
                  more features and enhance your Multiplayr experience.
                </p>
              </div>
              <div className="right_top">
                <span className="price">₹ 999 /- </span>
                <p>Lifetime Membership</p>
                <PremiumPass user={user} />
                <ul>
                  <li>
                    <img src="/assets/media/buypremium/infine.png" alt="" /> No
                    expiration
                  </li>

                  <li>
                    <img src="/assets/media/buypremium/block.png" alt="" /> No
                    hidden fees
                  </li>
                </ul>
              </div>
            </div>

            <ul className="catgory">
              <li>
                <span>
                  {' '}
                  <img src="/assets/media/buypremium/verified.png" alt="" />
                </span>
                <p>Verified badge </p>
              </li>

              <li>
                <span>
                  {' '}
                  <img src="/assets/media/buypremium/shop.png" alt="" />
                </span>
                <p>
                  {' '}
                  Premium ticket support commission fees reduction to 3.5% from
                  5%
                </p>
              </li>
              <li>
                <span>
                  {' '}
                  <img src="/assets/media/buypremium/call.png" alt="" />
                </span>
                <p> Premium ticket support </p>
              </li>
              <li>
                <span>
                  {' '}
                  <img src="/assets/media/buypremium/discount.png" alt="" />
                </span>
                <p>25% discount on Season Passes</p>
              </li>
              <li>
                <span>
                  {' '}
                  <img src="/assets/media/buypremium/gift.png" alt="" />
                </span>
                <p>Auto-entry to giveaways </p>
              </li>
              <li>
                <span>
                  {' '}
                  <img src="/assets/media/buypremium/funds.png" alt="" />
                </span>
                <p>Faster Withdrawals </p>
              </li>
              <li>
                <span>
                  {' '}
                  <img src="/assets/media/buypremium/tag.png" alt="" />
                </span>
                <p>3% fees from 5% fees on tournament rewards </p>
              </li>
              <li>
                <span>
                  {' '}
                  <img src="/assets/media/buypremium/ticket.png" alt="" />
                </span>
                <p>5 more free entry on tournaments every month </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export default challenges;
