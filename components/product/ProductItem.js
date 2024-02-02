import Link from 'next/link';
import { useContext, useState, useEffect } from 'react';
import { DataContext } from '@store/GlobalState';
import { addToCart } from '@store/Actions';
import PoUp from '@components/team/PoUp';

const ProductItem = ({ product, handleCheck }) => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth } = state;
  const [clicked, setClicked] = useState(false);

  return (
    <>
      <div className="pro_img">
        {' '}
        <a href="#!" className="model_show_btn">
          <img src={product.images[0].url} alt={product.images[0].url} />
        </a>{' '}
        <PoUp product={product} />
        <span className="size_option">36d 12h 13m 18s</span>{' '}
      </div>
      <div className="pro_bottom">
        <div className="name_dots">
          <h4> {product.title} </h4>
          {/* <a href="#">
            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
          </a>{' '} */}
        </div>
        <div className="stars">
          {' '}
          <a href="#">
            <i className="fa fa-star" aria-hidden="true"></i>
          </a>{' '}
          <a href="#">
            <i className="fa fa-star" aria-hidden="true"></i>
          </a>{' '}
          <a href="#">
            <i className="fa fa-star" aria-hidden="true"></i>
          </a>{' '}
          <a href="#">
            <i className="fa fa-star" aria-hidden="true"></i>
          </a>{' '}
          <a href="#">
            <i className="fa fa-star" aria-hidden="true"></i>
          </a>
        </div>

        <div className="likes_price">
          <div className="price"> ${product.price}</div>

          <a href="#">
            <i className="fa fa-heart" aria-hidden="true"></i> 80{' '}
          </a>
        </div>

        <button
          className="cart-btn btn btn-info"
          disabled={product.inStock === 0 ? true : false}
          onClick={() => {
            dispatch(addToCart(product, cart));
            setClicked(true);
          }}
        >
          {clicked ? 'Item in Cart' : 'Add to Cart'}
          <i className="fa fa-cart-plus pl-2"></i>
        </button>
      </div>
    </>
  );
};

export default ProductItem;
