import React, { useState, useEffect, useRef } from 'react';
import { Form, Col, Row, Button, Card } from 'react-bootstrap';
import API from '@utils/blockapi';
import useRazorpay from 'react-razorpay';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import baseURL from '@utils/baseURL';
import axios from 'axios';

function CoinBuyForm({ user }) {
  const Razorpay = useRazorpay();

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    e.stopPropagation();
    const options = {
      key: 'rzp_test_TGb47fS6VcBpqY',
      amount: 999 * 100,
      currency: 'INR',
      name: 'Multiplayr esports',
      description: 'Bought Premium Pass for: Rs999/-',
      image: 'https://example.com/your_logo',
      handler: (respon) => {
        //Save the transaction details

        const trans = {
          public_key: user.phone_number,
          from: '9999999999',
          private: user.phone_number,
          to: user.phone_number,
          label: 'Bought for: Rs 999/-',
          amount: 999 * 100,
          external_payment_id: respon.razorpay_payment_id,
          email: user.email,
          currency: 'INR',
          status: 'SUCCESS',
          payment_mode: respon.razorpay_payment_id,
          trans_details: options
        };
        axios
          .post(`${baseURL}/api/transactions/addTransaction`, trans)
          .then((res) => {
            toast.success('Payment transaction is successful.');
          })
          .catch((err) => {
            console.log(err);
            toast.error('Payment transaction failed.Please try again later.');
          });
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: '9880773498' //user.phone_number,
      },
      notes: {
        address: 'Multiplayr Coin Corporate Office'
      },
      theme: {
        color: '#7238E9'
      }
    };

    const rzpay = new Razorpay(options);

    rzpay.on('payment.failed', function (response) {
      toast.error('Payment transaction failed.Please try again later.');
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzpay.open();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <button className="btn">PURCHASE NOW</button>
      </Form>
    </>
  );
}

export default CoinBuyForm;
