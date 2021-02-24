export const ADD_TO_CART = "ADD TO CART";
export const REMOVE_FROM_CART = "REMOVE FROM CART";

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  product,
});

export const removeFromCart = (product) => ({
  type: REMOVE_FROM_CART,
  product,
});
