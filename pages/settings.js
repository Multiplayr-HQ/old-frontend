import { useState, useEffect } from 'react';
import Head from 'next/head';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';

import AllScript from './AllScript';
import Link from 'next/link';

const Settings = ({ user }) => {
  return (
    <>
      <MetaDash />

      <SignedHeader user={user} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">

      		<Link href="/categories">
             <div>
                <button className="btn btn-info mb-4" >
                    <i className="fa fa-long-arrow-alt-left" aria-hidden="true"></i> UPDATE CATEGORIES
                </button>
            </div>
            </Link>

      		<a href="/create/product">
             <div>
                <button className="btn btn-info mb-4" >
                    <i className="fa fa-long-arrow-alt-left" aria-hidden="true"></i> UPDATE PRODUCTS
                </button>
            </div>
            </a> 		          

      </div>

      <AllScript />
    </>
  );
};

export default Settings;
