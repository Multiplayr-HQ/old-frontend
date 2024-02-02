import React, { Fragment, useContext, useState, useEffect } from 'react';

import Link from 'next/link';


const NFTNavHeader = ({user}) => {

  return (

      <div className="right_menu">

        <ul className="top_menu">

          <li>
            <a href="/nftindex">
              {' '}
              <i className="fa fa-reply-all" aria-hidden="true"></i>{' '}
              <span>NFT Home</span>
            </a>
          </li>

          <li>
            <a href="/createItem">
              {' '}
              <i className="fa fa-pie-chart" aria-hidden="true"></i>{' '}
              <span>Create NFT</span>
            </a>
          </li>

          <li>
            <a href="/myNFTs">
              {' '}
              <i className="fa fa-bars" aria-hidden="true"></i>{' '}
              <span>My NFTs</span>
            </a>
          </li>

        </ul>
      </div>
  );
};

export default NFTNavHeader;
