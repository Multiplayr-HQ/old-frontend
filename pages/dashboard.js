import axios from 'axios';
import React, { Component } from 'react';
import cookie from 'js-cookie';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import SignedMainContent from '@components/dashboard/Signhttps://github.com/Multiplayr-HQ/old-frontend/pull/17/conflict?name=pages%252Fdashboard.js&ancestor_oid=f1fc9c5884e8d638aaf0c5518095d07a6a399692&base_oid=4f12edd0ab8db25ba6b720ffebbd5e6435c96aea&head_oid=19b861ca4817184fd893ac8a2673639f8dbdbb93edMainContent';
import RightSection from '@components/dashboard/RightSection';
import AllScript from './AllScript';
import { parseCookies } from 'nookies';

const scrollToBottom = (divRef) => {
  divRef.current && divRef.current.scrollIntoView({ behaviour: 'smooth' });
};

const Dashboard = ({ user, profile, teams, posts, suggplayers }) => {
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { chat } = router.query;

  const [messages, setMessages] = useState([]);
  console.log('team in dashboard page :', teams);
  console.log('suggested player', suggplayers);

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} profile={profile} />

      <LeftNav user={user} />

      <SignedMainContent posts={posts} user={user} profile={profile} />

      <RightSection
        user={user}
        suggestedplayers={suggplayers}
        profile={profile}
        teams={teams}
      />

      <AllScript />
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { token } = parseCookies(context);
  const { teamId } = parseCookies(context);
  const response = await fetch(`${baseURL}/api/posts`, {
    method: 'get',
    headers: {
      Authorization: token
    }
  });
  const data = await response.json();
  const posts = data?.posts;


  const respons = await fetch(`${baseURL}/api/all/myteams`,{
    method: 'get',
    headers: {
      Authorization: token
    }
  });
    const teams = await respons.json();



  const res = await fetch(`${baseURL}/api/profile/suggested/players`, {
    method: 'post',
    headers: {
      Authorization: token
    }
  });
  const suggplayers = await res.json();

  return {
    props: { posts, suggplayers, teams }
  };
};

export default Dashboard;
