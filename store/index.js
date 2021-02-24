import { createStore, combineReducers } from "redux";
import productReducer from "./reducers/product";
import cartReducer from "./reducers/cart";
import orderReducer from "./reducers/order";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
