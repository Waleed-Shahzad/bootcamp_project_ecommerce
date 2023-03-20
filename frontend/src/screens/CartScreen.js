import React, { useEffect } from 'react';
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';

// useLocation is a hook; it returns an object with a key of pathname.

const CartScreen = () => {
  const { id: productID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productID) {
      dispatch(addToCart(productID, qty));
    }
  }, [dispatch, productID, qty]);

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
    console.log('checkout');
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
    console.log('remove from cart');
  };

  // console.log("cart", cartItems);
  // console.log("ID: ", productID);
  // console.log("quantity:", qty);

  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message variant='dark'>
            Your Cart is empty. <Link to='/'>Click here to go back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems &&
              cartItems?.map((item) => (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as='select'
                        value={item.qty}
                        onChange={(e) => {
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          );
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                        ;
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type='button'
                        variant='light'
                        onClick={() => {
                          removeFromCartHandler(item.product);
                        }}
                      >
                        <i className='fa fa-trash'></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, currItem) => acc + currItem.qty, 0)})
                items
              </h2>
              ${' '}
              {cartItems
                .reduce(
                  (acc, totalItems) => acc + totalItems.qty * totalItems.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Checkout
              </Button>
            </ListGroup.Item>
            <ListGroup.Item>
              <Link to='/'>
                <Button type='button' className='btn-block'>
                  Shop More
                </Button>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
