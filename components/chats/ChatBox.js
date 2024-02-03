import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import baseURL from '../../utils/baseURL';
import chatBaseURL from '../../utils/chatBaseURL';
import { useForm } from 'react-hook-form';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import Link from 'next/link';
import MyChats from './MyChats';
import ChatDisplay from './ChatDisplay';
import { useAppContext } from './ChatProvider';
import { toast } from 'react-toastify';
import cookie from 'js-cookie';

const ChatBox = ({ user }) => {
  const { setSelectedChat, chats, setChats } = useAppContext();

  const [fetchAgain, setFetchAgain] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const [searchText, setSearchText] = useState('');

  const { data, isLoading, isSuccess } = useQuery(
    ['search', searchText],
    async () => {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();

      const promise = await axios.get(
        `${baseURL}/api/friendrequests/search/${searchText}`,
        {
          cancelToken: source.token
        }
      );

      promise.cancel = () => {
        source.cancel();
      };

      return promise.data;
    },
    {
      enabled: !!searchText
    }
  );

  const accessChat = async (userId) => {
    let x = {};
    try {
      setLoadingChat(true);
      await axios
        .post(
          `${chatBaseURL}/chatapi/v1/chat`,
          { userId },
          {
            headers: {
              Authorization: cookie.get('token')
            }
          }
        )
        .then((res) => (x = res.data));

      if (!chats.find((c) => c._id === x._id)) setChats([x, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setSearchText('');
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const test = () => {
    jQuery(function ($) {
      jQuery('.dlab-chat-user-box').addClass('d-none');
      jQuery('.dlab-chat-history-box').removeClass('d-none');
    });
  };

  return (
    <>
      <div className="card mb-sm-3 mb-md-0 contacts_card dlab-chat-user-box ">
        <div className="card-header chat-list-header text-center hide">
          <a href="#!">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              version="1.1"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect
                  fill="#000000"
                  x="4"
                  y="11"
                  width="16"
                  height="2"
                  rx="1"
                />
                <rect
                  fill="#000000"
                  opacity="0.3"
                  transform="translate(12.000000, 12.000000) rotate(-270.000000) translate(-12.000000, -12.000000) "
                  x="4"
                  y="11"
                  width="16"
                  height="2"
                  rx="1"
                />
              </g>
            </svg>
          </a>

          <div>
            <h6 className="mb-1">Chat List</h6>
            <p className="mb-0">Show All</p>
          </div>
          <a href="#!">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              width="18px"
              height="18px"
              viewBox="0 0 24 24"
              version="1.1"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <rect x="0" y="0" width="24" height="24" />
                <circle fill="#000000" cx="5" cy="12" r="2" />
                <circle fill="#000000" cx="12" cy="12" r="2" />
                <circle fill="#000000" cx="19" cy="12" r="2" />
              </g>
            </svg>
          </a>
        </div>
        <div className="new-chat-box">
          <div className="left-search-contact">
            <div className="user_search">
              <input
                id="search"
                name="search"
                className=""
                placeholder="Search for users and posts..."
                type="search"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                autoComplete="off"
              />
              {searchText.trim() !== '' && !isLoading && isSuccess && (
                <div className="search_result">
                  {/* <h2>Users</h2> */}
                  <div className="flex flex-col space-y-2">
                    {!data || data.length === 0 ? (
                      <p>No users found..</p>
                    ) : (
                      data
                        .filter(
                          (resultuser) => resultuser.username !== user.username
                        )
                        .map((resultuser,i) => (
                          <ul className="contact_list" key={i}>
                            <li
                              className="active dlab-chat-user"
                              onClick={() => accessChat(resultuser._id)}
                            >
                              <div className="d-flex bd-highlight">
                                <div className="img_cont">
                                  <img
                                    src={resultuser?.profilePicUrl}
                                    className="rounded-circle user_img"
                                    alt={resultuser.name}
                                  />
                                  <span className="online_icon"></span>
                                </div>
                                <div className="user_info">
                                  <span>
                                    {' '}
                                    {resultuser.name.length > 20
                                      ? resultuser.name.substring(0, 20) + '...'
                                      : resultuser.name}
                                  </span>
                                </div>
                              </div>
                            </li>
                          </ul>
                        ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {user && <MyChats fetchAgain={fetchAgain} user={user} />}
          </div>
          {user && (
            <ChatDisplay
              fetchAgain={fetchAgain}
              setFetchAgain={setFetchAgain}
              user={user}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ChatBox;
