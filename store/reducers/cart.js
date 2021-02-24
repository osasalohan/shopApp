import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/order";
import { DELETE_PRODUCT } from "../actions/product";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      let product = action.product;
      let items;
      if (product.id in state.items) {
        items = {
          ...state.items,
          [product.id]: {
            quantity: state.items[product.id].quantity + 1,
            cost: state.items[product.id].cost + product.price,
          },
        };
      } else {
        items = {
          ...state.items,
          [product.id]: { quantity: 1, cost: product.price },
        };
      }
      return { items, totalAmount: state.totalAmount + product.price };
    case REMOVE_FROM_CART:
      product = action.product;
      if (state.items[product.id].quantity > 1) {
        items = {
          ...state.items,
          [product.id]: {
            quantity: state.items[product.id].quantity - 1,
            cost: state.items[product.id].cost - product.price,
          },
        };
      } else {
        items = { ...state.items };
        delete items[product.id];
      }
      return { items, totalAmount: state.totalAmount - product.price };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.id]) return state;
      items = { ...state.items };
      let itemTotal = state.items[action.id].sum;
      delete items[action.id];
      return {
        items,
        totalAmount: state.totalAmount - itemTotal,
      };
    default:
      return state;
  }
};
