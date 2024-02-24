import Head from 'next/head';
import React, { Fragment, useContext, useState, useEffect } from 'react';

import NotificationItem from './NotificationItem';
import ChatSection from './chats/ChatSection';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DataContext } from '@store/GlobalState';
import API from '@utils/blockapi';
import { MPNumberFormat } from '@utils/helpers';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { ethers } from 'ethers';
import { getEllipsisTxt } from '../utils';
import WalletSvg from './svg/WalletSvg';
import { BlockchainContext } from '../context/BlockchainContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import baseURL from '@utils/baseURL';
import cookie from 'js-cookie';
import SearchName from './Creators/SearchName';

const SignedHeader = ({ user, profile }) => {
  const router = useRouter();
  const { state, dispatch } = useContext(DataContext);
  const { auth, cart } = state;

  const { connectedAccount, connectWallet, disconnect } = useContext(
    BlockchainContext
  );

  const [teams, setTeams] = useState([]);
  const [coin, setCoin] = useState();
  const [INR, setINR] = useState();
  const [refModal, setRefModal] = useState(false);
  const [mail, setMail] = useState({
    email: '',
    sender: user?.name
  });

  const onChangeEmail = (e) => {
    setMail({ ...mail, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getUserBalance();
  });

  const [filterType, setFilterType] = useState('JOBS');

  const getUserBalance = () => {
    API.getAddressBalance(user?.phone_number).then((res) => {
      setCoin(res.data);
      getINR();
    });
  };
  const getINR = () => {
    API.getINR().then((res) => {
      const value = res.data * coin;
      setINR(value.toFixed(2));
    });
  };

  const logoutUser = () => {
    router.push('/login');
    console.log("router to push inside login executed")
    cookie.remove('token');
    router.reload()
  };

  const sendEmail = (e) => {
    e.preventDefault();
    try {
      axios.post(`${baseURL}/api/all/refer`, mail, {
        headers: {
          Authorization: cookie.get('token')
        }
      });
      toast.success('Invitation sent!');
      setRefModal(false);
    } catch (err) {
      toast.error('Please try again later');
    }
  };

  useEffect(() => {
    // Teams
    axios.get(`${baseURL}/api/all/teams`).then((res) => setTeams(res.data));
  }, []);

  return (
    <header>
      <div className="logo">
        <a href="#">
          <img src="/assets/media/logo.png" alt="Logo" />
        </a>
      </div>

      <div className="sb-toggle-right top_click">
        {' '}
        <a href="#!">
          <div className="three_line three_line--htx">
            <span>toggle menu</span>{' '}
          </div>
        </a>
      </div>

      <div className="right_menu">
        <div className="searchbox">
          <SearchName data={teams} type="Team" isSearchOnly={true} />
        </div>
        <ul className="top_menu">
          <li className="pluse">
            <a href="#">
              <img src="/assets/media/icons/Create.png" alt="" />
            </a>
            <div className="drop_down_bg create_pages">
              <h3>Create</h3>

              <ul className="">
                <li>
                  <Link href="/team/create">
                    <a>
                      <span>
                        <i className="fa fa-users" aria-hidden="true"></i>{' '}
                      </span>
                      <span>
                        {' '}
                        <b>Team</b>
                        <p>
                          Create a team, compete and rank yourself globally.
                        </p>
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/tour/create">
                    <a>
                      <span>
                        {' '}
                        <i className="fa fa-trophy" aria-hidden="true"></i>{' '}
                      </span>

                      <span>
                        {' '}
                        <b> Tournament</b>
                        <p>Create a tournament and invite participants.</p>
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <span>
                        {' '}
                        <i
                          className="fa fa-handshake-o"
                          aria-hidden="true"
                        ></i>{' '}
                      </span>
                      <span>
                        {' '}
                        <b>Community</b>
                        <p>Create a community and connect with people.</p>
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/brand/create">
                    <a>
                      <span>
                        {' '}
                        <i className="fa fa-file" aria-hidden="true"></i>{' '}
                      </span>
                      <span>
                        {' '}
                        <b>Brand/Company</b>
                        <p>Start selling your products and services.</p>
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/arena/create">
                    <a>
                      <span>
                        <i className="fa fa-sign-out" aria-hidden="true"></i>{' '}
                      </span>
                      <span>
                        <b> Arena</b>
                        <p>
                          Create arena, invite gamers and increase walk-ins.
                        </p>
                      </span>
                    </a>
                  </Link>
                </li>
                {/* <li>
                  <Link href="/company/create">
                    <i className="fa fa-building" aria-hidden="true"></i>
                    Create a company page
                  </Link>
                </li> */}
              </ul>

              <h3>Listing</h3>

              <ul className="">
                <li>
                  <Link href="/">
                    <a>
                      <span>
                        <i
                          className="fa fa-shopping-cart"
                          aria-hidden="true"
                        ></i>
                      </span>
                      <span>
                        {' '}
                        <b>Marketplace</b>
                        <p>Make a listing of your services and products.</p>
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobs/create"
                    onClick={() => setFilterType('JOBS')}
                  >
                    <a>
                      <span>
                        {' '}
                        <i className="fa fa-briefcase" aria-hidden="true"></i>
                      </span>

                      <span>
                        {' '}
                        <b> Jobs</b>
                        <p>Make a job listing.</p>
                      </span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="#">
                    <a>
                      <span>
                        {' '}
                        <i className="fa fa-university" aria-hidden="true"></i>
                      </span>
                      <span>
                        {' '}
                        <b>Masterclass</b>
                        <p>List your masterclass and earn.</p>
                      </span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          {/* <li className="chat_box">
            <Link href="#" className="open_chat_box">
              <a>
                <img src="/assets/media/icons/message.png" alt="" />
                <span className="pop">2</span>
              </a>
            </Link>

            <ChatSection user={user} />
          </li> */}

          <li className="noti">
            <NotificationItem user={user} />
          </li>

          {/* <li>
            <Link href="/cart">
              {' '}
              <i className="fa fa-shopping-cart" aria-hidden="true"></i>{' '}
              <span className="pop">{cart.length}</span>
            </Link>
          </li> */}

          <li className="profile">
            <Link href="#!">
              <a>
                <span className="dps">
                  <img src={user?.profilePicUrl} alt={user?.name} />
                </span>
                <span>
                  {user?.name}{' '}
                  <p className="">
                    {' '}
                    {profile?.online_status === true ? (
                      <>
                        <div className="online"></div> Online
                      </>
                    ) : (
                      <>
                        <div className="offline"></div> Offline
                      </>
                    )}
                  </p>
                </span>
                <span className="drop">
                  <i className="fa fa-sort-desc" aria-hidden="true"></i>
                </span>
              </a>
            </Link>
            <div className="drop_down_bg profile_drop_down">
              <ul>
                <li>
                  <Link href={`/user/${user?.username}`}>
                    <a>My Profile</a>
                  </Link>
                </li>

                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link href="/settings/general">Settings</Link>
                </li>
                <li>
                  <Link href="/myNFTs">My NFTs</Link>
                </li>
                <li>
                  <Link href="/mywallet">Payment</Link>
                </li>
                <li>
                  <Link href="#">Support</Link>
                </li>
                <li>
                  <Link href="#" onClick={() => setRefModal(true)}>
                    Refer a friend
                  </Link>
                </li>

                <li>
                  <Link href="/buypremium">
                    <a>
                      {' '}
                      <img src="/assets/media/login/go.png" alt="" />
                    </a>
                  </Link>
                </li>

                <li>
                  <Link href="/login" >
                    <a onClick={logoutUser}>
                      <img src="/assets/media/login/logout.png" alt="" />
                      Logout
                    </a>
                  </Link>
                </li>
                {refModal && (
                  <div className="delete_post">
                    <form onSubmit={sendEmail} id="refForm">
                      <div className="delete_post_div">
                        <h3 className="">
                          Enter your friend&apos;s email to invite
                        </h3>
                        <input
                          type="text"
                          value={user.name}
                          name="name"
                          hidden={true}
                        />
                        <input
                          type="email"
                          name="email"
                          onChange={onChangeEmail}
                        />
                        <button
                          onClick={() => setRefModal(false)}
                          className="btn"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="btn">
                          Send
                        </button>
                      </div>
                    </form>
                    <div className="overlay"></div>
                  </div>
                )}
              </ul>
            </div>
          </li>

          <li className="wallet">
            <Link href="/mywallet">
              <a>
                <span className="dps">
                  {' '}
                  <img src="/assets/media/login/wallet.png" alt="" />
                </span>
                <span>
                  <MPNumberFormat value={coin} />
                </span>
              </a>
            </Link>
            <div className="drop_down_bg wallet_drop_down">
              <h2>Wallet</h2>{' '}
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              <ul>
                <li className="balance1">
                  <span className="amt1">
                    <img src="/assets/media/login/wallet.png" alt="M" />{' '}
                  </span>
                  <span className="amt1">
                    <img src="/assets/media/login/m.png" alt="M" />{' '}
                  </span>
                  <span>
                    {' '}
                    <MPNumberFormat value={coin} />
                  </span>
                  <span>INR: Rs {INR} Balance</span>
                </li>

                <li className="connect_wallet">
                  {connectedAccount ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="flex items-center max-w-xs px-4 py-2 text-white transition rounded-full bg-gradient-to-tl from-indigo-500 via-purple-500 to-pink-500 hover:bg-gray-700 shadow-homogen font-poppins">
                          <span className="sr-only">Open user menu</span>

                          <div className="pr-2">
                            <WalletSvg className="w-5 h-5 text-white" />
                          </div>

                          <div className="font-sm">
                            {getEllipsisTxt(connectedAccount)}
                          </div>
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="">
                          <Menu.Item>
                            <div className="">
                              <button
                                onClick={() => disconnect()}
                                className="block p-2 text-white "
                              >
                                Disconnect
                              </button>
                            </div>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <button className="btn" onClick={() => connectWallet(true)}>
                      Connect Wallet
                    </button>
                  )}
                </li>

                <li className="two_btn">
                  {' '}
                  <button className="btn">Deposit</button>{' '}
                  <button className="btn">Withdraw</button>
                </li>

                <li>
                  {' '}
                  <Link href="/mywallet">View all transactions</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default SignedHeader;
