import React, { useEffect, useRef, useState } from 'react';
import {
  Form,
  Col,
  Row,
  Container,
  Button,
  Card,
  Alert
} from 'react-bootstrap';
import API from '@utils/blockapi';

function SendForm({ user }) {
  const formHandle = useRef();
  const cost = useRef(0);
  const { publicKey } = user.phone_number;
  const [coinVal, setCoinVal] = useState(0);
  const [coinAmount, setCoinAmount] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [inrVal, setINRVal] = useState(0);
  const [inrAmount, setINRAmount] = useState(0);
  const [fees, setFees] = useState(0);
  const [total, setTotal] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMessage, setShowAlertMessage] = useState('');
  const [showAlertVariant, setShowAlertVariant] = useState('danger');

  useEffect(() => {
    API.getINR().then((res) => {
      setCoinVal(res.data);
      const div = 1 / res.data;
      setINRVal(div);
    });
  });

  const handleAlertMessage = (message, variant) => {
    if (message) {
      setShowAlert(true);
      setShowAlertMessage(message);
      setShowAlertVariant(variant);
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    setShowAlertMessage('');
  };
  //Input is coins
  const getValue = (amount) => {
    amount = parseInt(amount);
    const value = amount * coinVal;
    const fee = amount / 100;

    setINRAmount(value.toFixed(2));
    setFees(fee);
    const total = amount + fee;
    setTotal(total);
  };

  //Input is INR
  const getINR = (inr) => {
    const value = inr * inrVal;
    setCoinAmount(value);
    const fee = value / 100;
    setFees(fee);
    const total = value + fee;
    setTotal(total);
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

  const submitForm = (e) => {
    e.preventDefault();
    const data = [...formHandle.current].reduce((obj, input) => {
      obj[input.getAttribute('id')] = input.value;
      return obj;
    }, {});
    data.from = publicKey;
    console.log(data);
    console.log(Object.values(data).reduce((a, c) => a && !!c, true));
    if (
      !Object.values(data).reduce((result, value) => result && !!value, true)
    ) {
      handleAlertMessage('Fill out the entire form', 'danger');
      return;
    }
    console.log(formHandle.current);
    console.log(formHandle.current[0].value);
    API.sendTransaction(data)
      .then((res) => {
        document.getElementById('sendForm').reset();
        handleAlertMessage('Transaction successful.', 'success');
      })
      .catch((err) => {
        handleAlertMessage(err.response.data.message, 'danger');
      });
  };

  return (
    <Card className="box add_money">
      <Alert
        show={showAlert}
        variant={showAlertVariant}
        onClose={() => {
          handleCloseAlert();
        }}
      >
        <p>{showAlertMessage}</p>
      </Alert>
      <Form ref={formHandle} id="sendForm">
        <Form.Group as={Row} controlId="to">
          <Col>
            <Form.Control
              className="inputBox"
              type="text"
              placeholder="Recipient (Public Key)"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="private">
          <Col>
            <Form.Control
              className="inputBox"
              type="text"
              placeholder="Private Key"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="label">
          <Col>
            <Form.Control
              className="inputBox"
              type="text"
              placeholder="Label"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="cost">
          <Form.Label style={{ marginTop: 5 }} column md={4}>
            Amount INR:
          </Form.Label>
          <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
            {toggle ? (
              <Form.Control
                className="inputBox"
                type="text"
                onFocus={(e) => toggleListener(false, e.target.value)}
                value={inrAmount}
              />
            ) : (
              <Form.Control
                className="inputBox"
                type="text"
                onChange={(e) => getINR(e.target.value)}
              />
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="amount">
          <Form.Label style={{ marginTop: 5 }} column md={4}>
            Amount MP Cryptocoin:
          </Form.Label>
          <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
            {toggle ? (
              <Form.Control
                className="inputBox"
                ref={cost}
                type="text"
                onChange={(e) => getValue(e.target.value)}
              />
            ) : (
              <Form.Control
                className="inputBox"
                ref={cost}
                type="text"
                onFocus={(e) => toggleListener(true, e.target.value)}
                value={coinAmount}
              />
            )}
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextTransFees">
          <Form.Label style={{ marginTop: 5 }} column md={4}>
            Trans Fees 1%:
          </Form.Label>
          <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
            <Form.Control readOnly value={fees} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextTotal">
          <Form.Label style={{ marginTop: 5 }} column md={4}>
            Total MP Cryptocoin:
          </Form.Label>
          <Col style={{ marginTop: 5 }} md={{ span: 4, offset: 4 }}>
            <Form.Control readOnly value={total} />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col style={{ marginTop: 5 }} md={{ span: 10, offset: 5 }}></Col>
        </Form.Group>
      </Form>
      <Button type="button" onClick={submitForm}>
        Continue
      </Button>
    </Card>
  );
}

export default SendForm;
