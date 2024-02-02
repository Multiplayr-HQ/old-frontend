import Head from 'next/head';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@store/GlobalState';
import CartItem from '@components/CartItem';
import Link from 'next/link';
import { getData, postData } from '@utils/fetchData';
import { useRouter } from 'next/router';
import MetaDash from '@components/MetaDash';
import SignedHeader from '@components/SignedHeader';
import LeftNav from '@components/LeftNav';
import FooterMain from '@components/FooterMain';
import AllScript from '@pages/AllScript';
import baseURL from '@utils/baseURL';

const Cart = ({ user, profile }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders } = state;

  const [total, setTotal] = useState(0);
  const [shippingFee, setShippingFee] = useState(10);
  const [subTotal, setSubTotal] = useState(0);

  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');

  const [callback, setCallback] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setSubTotal(res);
      res > 30 ? setTotal(res) : setTotal(shippingFee + res);
    };

    getTotal();
  }, [cart]);

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem('ecommerce_next'));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item?._id}`);
          const { _id, title, images, price, inStock, sold } = res.product;
          if (inStock > 0) {
            newArr.push({
              _id,
              title,
              images,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity
            });
          }
        }

        dispatch({ type: 'ADD_CART', payload: newArr });
      };

      updateCart();
    }
  }, [callback]);

  const handlePayment = async () => {
    if (!address || !mobile)
      return dispatch({
        type: 'NOTIFY',
        payload: {
          error: 'Please add your delivery address and contact number.'
        }
      });

    let newCart = [];
    for (const item of cart) {
      const res = await getData(`product/${item._id}`);
      if (res.product.inStock - item.quantity >= 0) {
        newCart.push(item);
      }
    }

    if (newCart.length < cart.length) {
      setCallback(!callback);
      return dispatch({
        type: 'NOTIFY',
        payload: {
          error: 'The product is out of stock or the quantity is insufficient.'
        }
      });
    }

    dispatch({ type: 'NOTIFY', payload: { loading: true } });

    postData('order', { address, mobile, cart, total }, auth.token).then(
      (res) => {
        if (res.err)
          return dispatch({ type: 'NOTIFY', payload: { error: res.err } });

        dispatch({ type: 'ADD_CART', payload: [] });

        const newOrder = {
          ...res.newOrder,
          user: auth.user
        };
        dispatch({ type: 'ADD_ORDERS', payload: [...orders, newOrder] });
        dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
        return router.push(`/order/${res.newOrder._id}`);
      }
    );
  };

  return (
    <>
      <MetaDash />

      <SignedHeader user={user} profile={profile} />

      <LeftNav user={user} />

      <div className="main_middle profile_middle">
        {cart.length === 0 ? (
          <>
            <div className="col-md-5 p-lg-4 mx-auto my-1">
              <p className="lead fw-normal">
                Your Shopping Cart Is Empty, Add Your Favorite Products and
                Continue Shopping!
              </p>
            </div>

            <img
              className="img-fluid w-50 mt-5"
              src="/empty_cart.svg"
              alt="empty cart"
            />
          </>
        ) : (
          <>
            <div className="checkout_strip">
              <h1>Shopping Cart</h1>
              <button className="btn" onClick={() => router.back()}>
                <i className="fa fa-long-arrow-left" aria-hidden="true"></i> Go
                Back
              </button>
            </div>

            <div className="row">
              <div className="col-md-12 text-secondary table-responsive my-3">
                <table className="table cart_table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col"> </th>
                      <th scope="col">Prodcut</th>
                      <th scope="col">Price</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Total</th>
                      <th scope="col">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <CartItem
                        key={item._id}
                        item={item}
                        dispatch={dispatch}
                        cart={cart}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="address_order_box">
              <div className="user_add">
                <h3>Checkout Information</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="address">Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Type your delivery address here"
                      className="form-control mb-2"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="mobile">Contact Number</label>
                    <input
                      type="text"
                      name="mobile"
                      id="mobile"
                      placeholder="Type your contact number here"
                      className="form-control mb-2"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </form>
              </div>

              <div className="checkout_total">
                <h3>Your Order Total</h3>

                <div className="amount">
                  <div className="amt_row">
                    <span>subTotal:</span>{' '}
                    <span className="text-info">${subTotal}</span>
                  </div>
                  <div className="amt_row">
                    <span>Shipping Fee (free for orders over $30):</span>{' '}
                    <span className="text-danger">
                      ${subTotal > 30 ? 0 : shippingFee}
                    </span>
                  </div>

                  <div className="amt_row">
                    <span>Total:</span>{' '}
                    <span className="text-danger">${total}</span>
                  </div>

                  <Link href={auth.user ? '#!' : '/login'}>
                    <a
                      className="btn"
                      data-hover="Proceed with Payment"
                      onClick={handlePayment}
                    >
                      <div>
                        Checkout <i className="fa fa-credit-card"></i>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <AllScript />
    </>
  );
};

export default Cart;
