export const ADD_ORDER = "ADD_ORDER";

export const addOrder = (cartItems, totalAmount) => ({
  type: ADD_ORDER,
  cartItems,
  totalAmount,
});
