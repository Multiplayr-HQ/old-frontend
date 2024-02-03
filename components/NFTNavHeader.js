import React, { Fragment, useContext, useState, useEffect } from 'react';

import Link from 'next/link';


const NFTNavHeader = ({user}) => {

  return (

      <div className="right_menu">

        <ul className="top_menu">

          <li>
            <Link href="/nftindex">
              {' '}
              <i className="fa fa-reply-all" aria-hidden="true"></i>{' '}
              <span>NFT Home</span>
            </Link>
          </li>

          <li>
            <Link href="/createItem">
              {' '}
              <i className="fa fa-pie-chart" aria-hidden="true"></i>{' '}
              <span>Create NFT</span>
            </Link>
          </li>

          <li>
            <Link href="/myNFTs">
              {' '}
              <i className="fa fa-bars" aria-hidden="true"></i>{' '}
              <span>My NFTs</span>
            </Link>
          </li>

        </ul>
      </div>
  );
};

export default NFTNavHeader;
