import React from 'react';
import { Form } from 'react-bootstrap';
import useRazorpay from 'react-razorpay';
import baseURL from '../../utils/baseURL';

const SubcriptionCard = ({ user, id, title, price }) => {
  const ReactRazorpay = useRazorpay();

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const vals = {
      id: id,
      title: title,
      price: price
    };
    var subrespId = 'NA';
    const requestSubOptions = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vals)
    };

    fetch(`${baseURL}/api/transactions/subscriptions/create`, requestSubOptions)
      .then((res) => {
        // if (!res.ok) {
        //   // get error message from body or default to response status
        //   const error = 'Payment is not updated';
        //   return Promise.reject(error);
        // }
        if (res.ok) return res.json();
      })
      .then((res) => {
        // swal({
        //   title: 'Payment is success',
        //   icon: 'success',
        //   timer: 300
        // });
        console.log(res.razorpay_subscription_id);

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, //'rzp_test_knKMlfEDu1nMll',
          subscription_id: res.razorpay_subscription_id,
          currency: 'INR',
          name: 'Multiplayr',
          description:
            'Multiplayr Subscription for: Rs' + price + ' - ' + title,
          image: 'images/icon1.png',
          handler: (respon) => {
            //Save the transaction details

            const trans = {
              public_key: user.phone_number,
              label: title + ' - Subscription for: Rs' + price * 100,
              amount: price * 100,
              external_payment_id: respon.razorpay_payment_id,
              external_subscription_id: res.razorpay_subscription_id,
              title: title,
              email: user.email,
              currency: 'INR',
              status: 'SUCCESS',
              payment_mode: respon.razorpay_payment_mode,
              trans_details: options
            };
            // Add code to save the transaction data

            const requestOptions = {
              method: 'POST',
              mode: 'cors',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(trans)
            };

            fetch(`${baseURL}/api/transactions/payment/create`, requestOptions)
              .then((res) => {
                // if (!res.ok) {
                //   // get error message from body or default to response status
                //   const error = 'Payment is not updated';
                //   return Promise.reject(error);
                // }
                if (res.ok) return res.json();
              })
              .then((res) => {
                // swal({
                //   title: 'Payment is success',
                //   icon: 'success',
                //   timer: 300
                // });
              })
              .catch((err) => {
                if (typeof err == 'string') {
                  if (err.includes('Payment is not updated')) {
                    // swal({
                    //   title: 'Payment not updated',
                    //   text: 'Something wrong with Payment',
                    //   icon: 'warning'
                    // });
                  }
                } else {
                  // swal({
                  //   title: 'Payment not saved',
                  //   text: 'Sorry for the inconvenience, try again in some time',
                  //   icon: 'warning'
                  // });
                }
              });
          },
          prefill: {
            name: user.name,
            email: user.email,
            contact: user.phone_number
          },
          notes: {
            address: 'Mulitplayr Corporate Office'
          },
          theme: {
            color: '#23636A'
          }
        };

        const rzpay = new ReactRazorpay(options);

        rzpay.on('payment.failed', function (response) {
          console.log('Payment transaction failed.Please try again later.');
          alert(response.error.code);
          alert(response.error.description);
          alert(response.error.source);
          alert(response.error.step);
          alert(response.error.reason);
          alert(response.error.metadata.order_id);
          alert(response.error.metadata.payment_id);
        });

        rzpay.open();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Form onSubmit={handleSubmit} className="">
        <button className="btn">BUY NOW</button>
      </Form>
    </>
  );
};

export default SubcriptionCard;
