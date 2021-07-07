import { createStore, combineReducers, applyMiddleware } from "redux";
import productReducer from "./reducers/product";
import cartReducer from "./reducers/cart";
import orderReducer from "./reducers/order";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
