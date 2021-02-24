import Product from "../../models/product";
import PRODUCTS from "../../data/dummy-data";
import { ADD_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } from "../actions/product";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === "u1"),
};

export default (state = initialState, action) => {
  let availableProducts;
  let userProducts;

  switch (action.type) {
    case DELETE_PRODUCT:
      availableProducts = state.availableProducts.filter(
        (product) => product.id !== action.id
      );
      userProducts = state.userProducts.filter(
        (product) => product.id !== action.id
      );
      return {
        availableProducts,
        userProducts,
      };

    case EDIT_PRODUCT:
      let editedProduct = new Product(
        action.id,
        "u1",
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        action.product.price
      );
      availableProducts = state.availableProducts.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      );
      userProducts = state.userProducts.map((product) =>
        product.id === editedProduct.id ? editedProduct : product
      );
      return { availableProducts, userProducts };

    case ADD_PRODUCT:
      let newProduct = new Product(
        new Date().toString(),
        "u1",
        action.product.title,
        action.product.imageUrl,
        action.product.description,
        action.product.price
      );
      availableProducts = state.availableProducts.concat(newProduct);
      userProducts = state.userProducts.concat(newProduct);
      return { availableProducts, userProducts };

    default:
      return state;
  }
};
