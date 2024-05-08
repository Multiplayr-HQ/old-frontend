import Link from 'next/link';
import { useContext, useState } from 'react';
import { DataContext } from '@store/GlobalState';
import { addToCart } from '@store/Actions';

const PoUp = ({ product }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const [clicked, setClicked] = useState(false);

  const userLink = () => {
    return (
      <>
        <Link href={`product/${product._id}`}>
          <a className="btn btn-primary" data-hover="View">
            <div>
              <i className="fa fa-eye pl-2"></i>
            </div>
          </a>
        </Link>

        <a
          className="btn btn-primary"
          disabled={product.inStock === 0 ? true : false}
          onClick={() => {
            dispatch(addToCart(product, cart));
            setClicked(true);
          }}
        >
          {clicked ? 'Item in Cart' : 'Add to Cart'}
          <i className="fa fa-cart-plus pl-2"></i>
        </a>
      </>
    );
  };

  const adminLink = () => {
    return (
      <>
        <Link href={`create/${product._id}`}>
          <a
            className="btn bg-dark text-light slide"
            data-hover="Edit"
            style={{ marginRight: '5px', flex: 1 }}
          >
            <div>
              <i className="fas fa-edit"></i>
            </div>
          </a>
        </Link>
        <Link href={`product/${product._id}`}>
          <a
            className="btn slide text-info"
            data-hover="View"
            style={{ marginRight: '5px', flex: 1, background: '#8bd3dd' }}
          >
            <div>
              <i className="fas fa-eye pl-2"></i>
            </div>
          </a>
        </Link>
        <button
          className="btn slide text-danger"
          data-hover="Delete"
          style={{ marginLeft: '5px', flex: 1, background: '#f582ae' }}
          data-toggle="modal"
          data-target="#exampleModal"
          onClick={() =>
            dispatch({
              type: 'ADD_MODAL',
              payload: [
                {
                  data: '',
                  id: product._id,
                  title: product.title,
                  type: 'DELETE_PRODUCT'
                }
              ]
            })
          }
        >
          <div>
            <i className="fas fa-trash-alt"></i>
          </div>
        </button>
      </>
    );
  };

  return (
    <>
      <div className="common_model_box" id="product_details">
        <a href="#!" className="model_close">
          X
        </a>
        <div className="inner_model_box">
          <div className="poup_height msScroll_all">
            <div className="product_box">
              <div className="product-img-box">
                <div className="prod_big_thumb">
                  <img
                    src={product.images[0].url}
                    alt={product.images[0].url}
                  />
                </div>
              </div>
              <div className="product-detail-box">
                <h1>{product.title}</h1>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="like_view">
                      {' '}
                      <a href="#" className="art">
                        <i className="fa fa-picture-o" aria-hidden="true"></i>{' '}
                        Art
                      </a>{' '}
                      <a href="#" className="view">
                        <i className="fa fa-eye" aria-hidden="true"></i> 250
                      </a>{' '}
                      <a href="#" className="like">
                        <i className="fa fa-heart" aria-hidden="true"></i> 18
                      </a>{' '}
                    </div>
                    <div className="review">
                      {' '}
                      <i className="fa fa-star" aria-hidden="true"></i>{' '}
                      <i className="fa fa-star" aria-hidden="true"></i>{' '}
                      <i className="fa fa-star" aria-hidden="true"></i>{' '}
                      <i className="fa fa-star" aria-hidden="true"></i>{' '}
                      <i className="fa fa-star" aria-hidden="true"></i>{' '}
                      <span className="rev_txt">
                        Based on <b>2 reviews</b>
                      </span>{' '}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="price">
                      {' '}
                      ${product.price}{' '}
                      <del style={{ display: 'none' }}>£299.00</del>{' '}
                      <span className="discount" style={{ display: 'none' }}>
                        (10% Discount)
                      </span>{' '}
                    </div>
                    <p className="brief">{product.description}</p>
                  </div>
                </div>
                <div className="row size-option">
                  <div className="col-lg-12">
                    <ul>
                      <li>
                        {' '}
                        <a href="#!">Choose Size</a>
                        <div className="content size-chart mCustomScrollbar">
                          <ul>
                            <li>
                              36 x 5 inches<span>Out of Stock</span>
                            </li>
                            <li className="selected">
                              32 x 5 inches <span>Last 1 left</span>
                            </li>
                            <li>36 x 4 inches</li>
                            <li>26 x 1 inches</li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        {' '}
                        <a href="#!">Qty</a>
                        <div className="content size-chart qty mCustomScrollbar">
                          <ul>
                            <li>1</li>
                            <li>2</li>
                            <li className="selected">3</li>
                            <li>4</li>
                            <li>5</li>
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="row cart-row">
                  <div className="col-lg-12 col-md-12 col-xs-12">
                    {!auth.user || auth.user.role !== 'admin'
                      ? userLink()
                      : adminLink()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </div>
    </>
  );
};

export default PoUp;
