import React, { useState, useEffect, useRef } from 'react';
import { Form, Col, Row, Button, Card } from 'react-bootstrap';
import API from '@utils/blockapi';
import useRazorpay from 'react-razorpay';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

function CoinBuyForm({ user }) {
  const cost = useRef(0);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({});
  const [coinVal, setCoinVal] = useState(0);
  const [coinAmount, setCoinAmount] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [inrVal, setINRVal] = useState(0);
  const [inrAmount, setINRAmount] = useState(0);
  const [fees, setFees] = useState(0);
  const [total, setTotal] = useState(0);
  const [invalid, setInvalid] = useState({});
  const [invalid2, setInvalid2] = useState({});
  const [hideButton, setHide] = useState(false);
  const { publicKey } = user.phone_number;

  const Razorpay = useRazorpay();

  useEffect(() => {
    API.getINR().then((res) => {
      setCoinVal(res.data);
      const div = 1 / res.data;
      setINRVal(div);
    });
  });
  //Input is coins
  const getValue = (amount) => {
    if (isNaN(amount)) {
      setInvalid2({ isInvalid: 'isInvalid' });
      setHide(true);
    } else {
      setHide(false);
      const value = amount * coinVal;

      setINRAmount(value.toFixed(2));

      const fee = value / 100;
      setFees(fee.toFixed(2));
      const total = parseFloat(value) + parseFloat(fee);
      setTotal(total.toFixed(2));
    }
  };

  //Input is INR
  const getINR = (inr) => {
    if (isNaN(inr)) {
      setInvalid({ isInvalid: 'isInvalid' });
      setHide(true);
    } else {
      setHide(false);
      setInvalid({});
      const value = inr * inrVal;
      setCoinAmount(value);

      const fee = inr / 100;
      setFees(fee.toFixed(2));
      const total = parseFloat(inr) + parseFloat(fee);
      setTotal(total.toFixed(2));
      console.log(total);
    }
  };

  const toggleListener = (boolean, val = 0) => {
    if (boolean) {
      setToggle(true);
      getValue(val);
    } else {
      setToggle(false);
      getINR(val);
    }
  };

  const handleSubmitPay = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setData({ total: e.target[3].value, coins: e.target[0].value, show: true });
    setShow(true);
  };

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    e.stopPropagation();
    setData({ total: e.target[3].value, coins: e.target[0].value, show: true });
    setShow(true);
    console.log(e.target[3].value);
    const options = {
      key: 'rzp_test_TGb47fS6VcBpqY',
      amount: e.target[3].value * 100,
      currency: 'INR',
      name: 'Multiplayr esports',
      description: 'Bought MP Coin for: Rs' + e.target[3].value,
      image: 'https://example.com/your_logo',
      handler: (respon) => {
        //Save the transaction details

        const trans = {
          public_key: user.phone_number,
          from: '9999999999',
          private: user.phone_number,
          to: user.phone_number,
          label: 'Bought for: Rs' + e.target[3].value,
          amount: e.target[3].value,
          external_payment_id: respon.razorpay_payment_id,
          email: user.email,
          currency: 'INR',
          status: 'SUCCESS',
          payment_mode: respon.razorpay_payment_id,
          trans_details: options
        };
        API.addTransaction(trans)
          .then((res) => {
            API.sendTransaction(trans)
              .then((res) => {
                toast.success('Payment transaction is successful.');
              })
              .catch((err) => {
                console.log(err);
                toast.error(
                  'Payment transaction failed.Please try again later.'
                );
              });
          })
          .catch((err) => {
            console.log(err);
            toast.error('Payment transaction failed.Please try again later.');
          });

        console.log(respon);
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
      <Card className="box add_money">
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label style={{ marginTop: 5 }} column md={4}>
              Amount of Coins:
            </Form.Label>
            <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
              {toggle ? (
                <Form.Control
                  ref={cost}
                  type="text"
                  onChange={(e) => getValue(e.target.value)}
                  {...invalid2}
                />
              ) : (
                <Form.Control
                  ref={cost}
                  type="text"
                  onFocus={(e) => toggleListener(true, e.target.value)}
                  value={coinAmount}
                />
              )}
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextCost">
            <Form.Label style={{ marginTop: 5 }} column md={4}>
              Cost INR:
            </Form.Label>

            <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
              {toggle ? (
                <Form.Control
                  type="text"
                  onFocus={(e) => toggleListener(false, e.target.value)}
                  value={inrAmount}
                />
              ) : (
                <Form.Control
                  type="text"
                  onChange={(e) => getINR(e.target.value)}
                  {...invalid}
                />
              )}
            </Col>
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTransFees">
            <Form.Label style={{ marginTop: 5 }} column md={4}>
              Trans Fees (1% INR):
            </Form.Label>
            <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
              <Form.Control readOnly value={fees} />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextTotal">
            <Form.Label style={{ marginTop: 5 }} column md={4}>
              Total (INR):
            </Form.Label>
            <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
              <Form.Control type="number" readOnly value={total} />
            </Col>
          </Form.Group>
          <Form.Group style={{ marginTop: 5 }} as={Row}>
            <Col>
              {hideButton ? null : (
                <Button type="submit" className="btn">
                  Continue
                </Button>
              )}
            </Col>
          </Form.Group>
        </Form>
      </Card>
    </>
  );
}

export default CoinBuyForm;
