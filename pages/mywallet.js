import axios from 'axios';
import React, { Component } from 'react';
import cookie from 'js-cookie';
import { useState, useContext, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import baseURL from '@utils/baseURL';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import API from '@utils/blockapi';
import CoinGraph from '@components/crypto/CoinGraph';
import AllScript from './AllScript';
import CoinBuyForm from '@components/crypto/CoinBuyForm';
import SendForm from '@components/crypto/SendForm';
import Moment from 'moment';

const MyWallet = ({ user, profile }) => {
  const publicKey = user?.phone_number;
  const username = user.username;
  const [coin, setCoin] = useState();
  const [INR, setINR] = useState();
  const [showBuy, setShowBuy] = useState('none');
  const [showSend, setShowSend] = useState('none');

  useEffect(() => {
    getUserBalance();
  });

  const getUserBalance = () => {
    API.getAddressBalance(publicKey).then((res) => {
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(publicKey);
  };

  const handleShowBuy = () => {
    if (showBuy === 'none') {
      setShowBuy('');
      setShowSend('none');
    } else {
      setShowBuy('none');
    }
  };

  const handleShowSend = () => {
    if (showSend === 'none') {
      setShowSend('');
      setShowBuy('none');
    } else {
      setShowSend('none');
    }
  };

  const [transactions, setTransactions] = useState([]);
  const headerSortingStyle = { backgroundColor: '#353535', color: 'white' };
  const defaultSorted = [
    {
      dataField: 'timestamp',
      order: 'desc'
    }
  ];
  // ^^^ background color of column when clicked.

  const timeConverter = (time) => {
    const unixTime = time;
    const dateObject = new Date(unixTime);
    const dateFormat = dateObject.toLocaleString();
    return dateFormat;
  };

  useEffect(() => {
    API.getUserTransactions(publicKey)
      .then((res) => {
        let count = 0;
        res.data.forEach((data) => {
          data.key = count;
          data.timestamp = timeConverter(data.timestamp);
          if (data.fromAddress === publicKey) {
            data.fromAddress = username;
            data.amount = ' - ' + data.amount;
            API.getUsername(data.toAddress).then((result) => {
              //Fix the crash we had during the demo
              if (result.data === null) {
                data.toAddress = 'User not Found';
              } else {
                data.toAddress = result.data.name;
              }
            });
          }
          if (data.toAddress === publicKey) {
            data.toAddress = username;
            data.amount = ' + ' + data.amount;
            if (data.fromAddress) {
              API.getUsername(data.fromAddress).then((result) => {
                if (result.data === null) {
                  data.fromAddress = 'User not Found';
                } else {
                  data.fromAddress = result.data.name;
                }
              });
            } else {
              data.fromAddress = 'System';
            }
          }
          count++;
        });
        return res.data;
      })
      .then((finalRes) => {
        // Add a promise so we won't try to load the table before the data is ready
        // Still add a small timeout because of nested getUsername API call
        setTimeout(() => {
          // setTransactions(finalRes);
        }, 1000);
      });
  }, [publicKey, username]);
  useEffect(() => {
    axios
      .get(`${baseURL}/api/transactions/${user.email}`)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <MetaDash />
      <SignedHeader user={user} profile={profile} />
      <LeftNav user={user} />
      <div className="main_middle profile_middle">
        <h1>My wallet</h1>
        <div className="wallet_box">
          <div className="payment_methods box">
            <h4>Payment methods</h4>
            <p>
              You have not added any payment methods yet, go to the settings
              page tp add a new payment method
            </p>
            <a href="#">Add another payment method</a>
            <div className="payment_card">
              <img src="/assets/media/login/card.png" alt="" />{' '}
            </div>
          </div>
          <div className="balance box">
            <div className="bal">
              {' '}
              <img src="/assets/media/login/wallet.png" alt="" />
              <div className="amt_bal">
                <h3>Available balance</h3>
                <span className="amt">
                  <img src="/assets/media/login/m.png" alt="" /> {coin}
                </span>{' '}
                INR: Rs {INR}
              </div>
            </div>
            <div className="two_btn">
              {' '}
              <button className="btn" onClick={() => handleShowBuy()}>
                Deposit
              </button>{' '}
              <button className="btn">Withdraw</button>
              <button className="btn" onClick={() => handleShowSend()}>
                Send
              </button>
            </div>
          </div>
          <div className="money_withdrawn box">
            {' '}
            <span className="icons">
              <img src="/assets/media/login/drawn.png" alt="" />{' '}
            </span>
            <h3>Money Withdrawn</h3>
            <div className="amt">
              {' '}
              <img src="/assets/media/login/m.png" alt="" /> 10,000.00{' '}
            </div>
          </div>
          <div className="money_earned box">
            {' '}
            <span className="icons">
              <img src="/assets/media/login/wallet-icon.png" alt="" />{' '}
            </span>
            <h3>Money Earned</h3>
            <div className="amt">
              <img src="/assets/media/login/m.png" alt="" /> 10,000.00{' '}
            </div>
          </div>
        </div>

        <div style={{ overflow: 'hidden', display: showBuy }}>
          <CoinBuyForm user={user} />
        </div>

        <div style={{ overflow: 'hidden', display: showSend }}>
          <SendForm user={user} />
        </div>

        <div className="bottom_box">
          <div className="earning box">
            <h4>Earning</h4>
            <select className="custom-select ">
              <option>Weekly</option>
            </select>
            <div className="cart">
              <CoinGraph />
            </div>
          </div>
          <div className="transaction box">
            <h4>Recent Transaction</h4>
            <select className="custom-select ">
              <option>Sort by</option>
              <option>Sort by</option>
              <option>Sort by</option>
            </select>
            <div className="trans_list">
              <ul>
                <li>
                  <span className="list_name">Recipient</span>
                  <span className="list_name">Description</span>
                  <span className="list_name">Date</span>
                  <span className="list_name">Amount</span>
                </li>

                {transactions.length === 0 ? (
                  <li className="no_transcation">
                    <h3>You have no Transactions yet!</h3>
                    <p>
                      Lets get going on this! Start by clicking one of the
                      buttons below!
                    </p>
                    <div className="two_btn">
                      {' '}
                      <button href="/buy" className="btn">
                        Buy Coin
                      </button>
                      <button href="/mining" className="btn">
                        Mine Coin
                      </button>
                    </div>
                  </li>
                ) : (
                  transactions.map((result, idx) => (
                    <li key={idx}>
                      <span className="list_name">
                        {result.trans_details?.name}
                      </span>
                      <span className="list_name">
                        {result.trans_details?.description}
                      </span>
                      <span className="date">
                        {Moment(result.date).format('MMMM, DD hh:mm A')}
                      </span>
                      <div className="amt">
                        <img src="/assets/media/login/m.png" alt="" />{' '}
                        {result.amount}{' '}
                      </div>
                      <span>
                        <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                      </span>
                    </li>
                  ))
                )}
              </ul>

              <a href="#">View all transactions</a>
            </div>
          </div>
        </div>
      </div>
      <AllScript />
    </>
  );
};

export default MyWallet;
