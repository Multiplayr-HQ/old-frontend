import React, { Fragment, useContext, useState, useEffect } from 'react';

import Link from 'next/link';


const NFTNavHeader = ({user}) => {

  return (

      <div className="right_menu">

        <ul className="top_menu">

          <li>
            <Link href="/nftindex">
            <a>
              {' '}
              <i className="fa fa-reply-all" aria-hidden="true"></i>{' '}
              <span>NFT Home</span>
            </a>
            </Link>
          </li>

          <li>
            <Link href="/createItem">
            <a>
              {' '}
              <i className="fa fa-pie-chart" aria-hidden="true"></i>{' '}
              <span>Create NFT</span>
              </a>
            </Link>
          </li>

          <li>
            <Link href="/myNFTs">
            <a>
              {' '}
              <i className="fa fa-bars" aria-hidden="true"></i>{' '}
              <span>My NFTs</span>
            </a>
            </Link>
          </li>

        </ul>
      </div>
  );
};

export default NFTNavHeader;
