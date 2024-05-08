import React, { useState, useEffect } from 'react';
import { useAppContext } from './ChatProvider';
// import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./GroupChatModal";
import { toast } from 'react-toastify';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { getSender, getSenderImg } from '../../utils/chat';
import cookie from 'js-cookie';
import axios from 'axios';
import LoadingSpinner from '../LoadingSpinner';
import chatBaseURL from '@utils/chatBaseURL';

const MyChats = ({ fetchAgain, user }) => {
  const { selectedChat, setSelectedChat, chats, setChats } = useAppContext();
  const fetchChats = async () => {
    try {
      await axios
        .get(`${chatBaseURL}/chatapi/v1/chat`, {
          headers: {
            Authorization: cookie.get('token')
          }
        })
        .then((res) => setChats(res.data));
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    // setLoggedUser(getUserFromLocalStorage("user"));
    fetchChats();
  }, [fetchAgain]);
  return (
    <>
      {chats ? (
        <ul className="contact_list">
          {chats?.map((chat) => (
            <li
              className="active dlab-chat-user"
              onClick={() => setSelectedChat(chat)}
              key={chat?._id}
            >
              <div className="d-flex bd-highlight">
                <div className="img_cont">
                  <img
                    src={
                      !chat?.isGroupChat
                        ? `${getSenderImg(user, chat?.users)}`
                        : `/assets/media/avatar/1.png`
                    }
                    className="rounded-circle user_img mCS_img_loaded"
                    alt=""
                  />
                  <span className="online_icon"></span>
                </div>
                <div className="user_info">
                  {' '}
                  <span>
                    {!chat?.isGroupChat
                      ? getSender(user, chat?.users)
                      : chat?.chatName}
                  </span>
                  <p></p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default MyChats;
