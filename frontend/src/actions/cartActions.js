import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

// getState() returns the entire state of the store. It is a plain object.
// getState().cart.cartItems is the cartItems array.
// dispatch() is used to dispatch actions to the store. It is a function. It takes an action object. The action object has a type property. The type property is a string. The type property is used to identify the action. The action object has a payload property. The payload property is an object. The payload property is used to pass data to the action.
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  // localStorage is a global object. It is used to store data in the browser.
  // it returns an object with a key-value pair.
  // JSON.Stringify() converts an object to a string.
  // JSON.parse() converts a string to an object. We will need it later in store to convert it back to a JS object.

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// export const removeFromCart = (id) => (dispatch, getState().cart.cartItems) => {
//   dispatch({
//     type: CART_REMOVE_ITEM,
//     payload: id,
//   })

//   localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
// }

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: data,
  });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
