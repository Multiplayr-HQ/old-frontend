import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import API from "@utils/blockapi";


import {
    useStripe,
    useElements,
    CardNumberElement,
    CardExpiryElement,
    CardCvcElement
} from '@stripe/react-stripe-js';

const PayInfo = ({data, user}) => {

    const { publicKey } = user.phone_number;
    const stripe = useStripe();
    const elements = useElements();

    // displays payinfo modal
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false)
        data.show = false;
    };
    const handleShow = () => setShow(true);

    // displays successful transaction modal
    const [showSuccess, setShowSuccess] = useState(false);
    const handleCloseSuccess = () => setShowSuccess(false);
    const handleShowSuccess = () => setShowSuccess(true);

    // displays failed transaction modal
    const [showFailed, setShowFailed] = useState(false);
    const handleCloseFailed = () => setShowFailed(false);
    const handleShowFailed = () => setShowFailed(true);

    useEffect(() => {
        if (data.show === true) {
            setShow(true);
        }
    }, [data.show]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardNumberElement, CardExpiryElement, CardCvcElement),
        });
        if (!error) {
            const { id } = paymentMethod;
            try {
                await axios.post("/api/stripe/charge", { id, amount: data.total * 100 })
                    .then((_) => {
                        const trans = {
                            from: "9999999999",
                            private: "9008001199",
                            to: publicKey,
                            label: "Bought for: $" + data.total,
                            amount: data.coins
                        }
                        API.addTransaction(trans)
                            .then(res => {
                                API.sendTransaction(trans)
                                    .then(res => {
                                        handleClose();
                                        handleShowSuccess();
                                    }).catch(err => {
                                        console.log(err);
                                        handleClose();
                                        handleShowFailed();
                                    });
                            }).catch(err => {
                                console.log(err);
                                handleClose();
                                handleShowFailed();
                            });
                    }).catch((err) => {
                        console.log(err);
                        handleClose();
                        handleShowFailed();
                    });


            } catch (error) {
                handleClose();
                handleShowFailed();
                console.log(error);
            }
        }
    };

    return (
        <div>
            {/* payment modal */}
            <Modal
                show={show}
                onHide={handleClose}
                keyboard={false}>
                <Modal.Header style={{ justifyContent: "center" }} >
                    <Modal.Title>
                        <h3>Payment Information</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="input-box">
                            <CardNumberElement />
                        </Form.Group>
                        <Form.Group className="input-box">
                            <CardExpiryElement />
                        </Form.Group>
                        <Form.Group className="input-box">
                            <CardCvcElement />
                        </Form.Group>
                        <Button style={{ width: '50%', float: 'right' }} type="submit" disabled={!stripe}> Submit Payment</Button>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* success modal */}
            <Modal
                show={showSuccess}
                onHide={handleCloseSuccess}
                keyboard={false}
            >
                <Modal.Header style={{ justifyContent: "center" }}>
                    <Modal.Title>
                        <h3>Transaction Complete</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="formPlaintextTotal">
                        <Col style={{ marginTop: 5 }} md={{ span: 3, offset: 4 }}>
                            <h4 style={{ color: "green" }}>Success!</h4>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => handleCloseSuccess()}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* fail modal*/}
            <Modal
                show={showFailed}
                onHide={handleShow}
                keyboard={false}
            >
                <Modal.Header style={{ justifyContent: "center" }}>
                    <Modal.Title>
                        <h3>Error</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group as={Row} controlId="formPlaintextTotal">
                        <Col style={{ marginTop: 5, textAlign: "center" }} >
                            <h4 style={{ color: "red" }}>Transaction Failed</h4>
                            <h5>Amount too low.</h5>
                        </Col>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        handleCloseFailed();
                        handleShow();
                    }
                    }>
                        Back
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

};

export default PayInfo;