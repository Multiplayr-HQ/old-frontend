import { useState, useEffect, useMemo } from 'react';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import AllScript from '../AllScript';
import baseURL from '@utils/baseURL';
import axios from 'axios';
import countryList from 'react-select-country-list';
import 'rc-time-picker/assets/index.css';
import { toast } from 'react-toastify';
import TeamJobCreate from '../../components/team/TeamJobCreate';

const CreateJobs = ({ user, profile, teams }) => {
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />
      <LeftNav user={user} />
      <div className="main_middle create_main_middle">
        <div className="white_bg create_bg">
          <div className="create_form_box">
            <div className="left_create_form">
              <img src="/assets/media/create_left_img.jpg" />

              <div className="create_heads">
                <h1>Create a Jobs</h1>
                <p>
                  Post a free job and get the best talent that suits your
                  organization
                </p>
              </div>
            </div>

            <div className="create_tournament">
              <TeamJobCreate user={user} profile={profile} teams={teams} />
            </div>
          </div>
        </div>
      </div>
      <AllScript />
      <script></script>
    </>
  );
};

export default CreateJobs;
