import Link from 'next/link';
import { decrease, increase } from '@store/Actions';

const CartItem = ({ item, dispatch, cart }) => {
  return (
    <>
      {/*        
        <tr>
            <td>
                <Link href={`/product/${item._id}`}>
                <img src={item.images[0].url} alt={item.images[0].url}
                className="img-thumbnail w-100"
                 />
                </Link>
            </td>

            <td  >
                <h5 className="text-capitalize text-secondary">
                    <Link href={`/product/${item._id}`}>
                        <a style={{textDecoration:'none', color: 'inherit'}}>{item.title}</a>
                    </Link>
                </h5>

                <h6 style={{ color: '#f582ae'}}>${item.quantity * item.price}</h6>
                {
                    item.inStock > 0
                    ? <p className="mb-1 text-info">In Stock: {item.inStock}</p>
                    : <p className="mb-1 text-danger">Out Stock</p>
                }
            </td>

            <td>
                <button className="btn btn-outline-secondary"
                onClick={ () => dispatch(decrease(cart, item._id)) } 
                disabled={item.quantity === 1 ? true : false} > - </button>

                <span className="px-3">{item.quantity}</span>

                <button className="btn btn-outline-secondary"
                onClick={ () => dispatch(increase(cart, item._id)) }
                disabled={item.quantity === item.inStock ? true : false} > + </button>
            </td>

            <td>
                <i className="far fa-trash-alt text-danger" aria-hidden="true" 
                style={{fontSize: '18px'}} data-toggle="modal" data-target="#exampleModal"
                onClick={() => dispatch({
                    type: 'ADD_MODAL',
                    payload: [{ data: cart, id: item._id, title: item.title, type: 'ADD_CART' }]
                })} ></i>
            </td>
            </tr> */}

      <tr>
        <td scope="row">1</td>
        <td>
          {' '}
          <Link href={`/product/${item._id}`}>
            <img
              src={item.images[0].url}
              alt={item.images[0].url}
              className="prod_img"
            />
          </Link>
        </td>
        <td>
          {' '}
          <h3>
            <Link href={`/product/${item._id}`}>
              <a style={{ textDecoration: 'none', color: 'inherit' }}>
                {item.title}
              </a>
            </Link>
          </h3>
        </td>
        <td>
          <h6>${item.price}</h6>
          {item.inStock > 0 ? (
            <p className="mb-1 text-info">In Stock: {item.inStock}</p>
          ) : (
            <p className="mb-1 text-danger">Out Stock</p>
          )}
        </td>
        <td>
          {' '}
          <button
            className="btn btn-outline-secondary"
            onClick={() => dispatch(decrease(cart, item._id))}
            disabled={item.quantity === 1 ? true : false}
          >
            {' '}
            -{' '}
          </button>
          <span className="px-3">{item.quantity}</span>
          <button
            className="btn btn-outline-secondary"
            onClick={() => dispatch(increase(cart, item._id))}
            disabled={item.quantity === item.inStock ? true : false}
          >
            {' '}
            +{' '}
          </button>
        </td>
        <td>
          <p>${item.quantity * item.price}</p>
        </td>
        <td>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </td>
      </tr>
    </>
  );
};

export default CartItem;
