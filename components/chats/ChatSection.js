import React, { useEffect, useState } from 'react';
import ChatDisplay from './ChatDisplay';
import ChatBox from './ChatBox';
import cookie from 'js-cookie';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import dynamic from 'next/dynamic';

const ChatSection = ({ user }) => {
  return (
    <div>
      <div className="chatbox">
        <div className="chatbox-close"></div>

        <div className="tab_box">
          <div className="tabs" style={{ display: 'none' }}>
            <ul>
              <li className="active">
                <a href="#" rel="tab1">
                  Chat
                </a>
              </li>
            </ul>
          </div>

          <div className="tab_data tab_data_scroll">
            <div className="chat tab" id="tab1">
              <ChatBox user={user} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
