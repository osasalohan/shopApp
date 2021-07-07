import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => async (dispatch) => {
  const response = await fetch(
    "https://rn-shopapp-5d038-default-rtdb.firebaseio.com/products.json"
  );

  const resData = await response.json();
  const loadedProducts = [];

  for (const key in resData) {
    loadedProducts.push(
      new Product(
        key,
        "u1",
        resData[key].title,
        resData[key].imageUrl,
        resData[key].description,
        resData[key].price
      )
    );
  }

  dispatch({ type: SET_PRODUCTS, products: loadedProducts });
};

export const deleteProduct = (id) => async (dispatch) => {
  await fetch(
    `https://rn-shopapp-5d038-default-rtdb.firebaseio.com/products/${id}.json`,
    {
      method: "DELETE",
    }
  );
  dispatch({ type: DELETE_PRODUCT, id });
};

export const editProduct = (id, product) => async (dispatch) => {
  console.log(product)
  await fetch(
    `https://rn-shopapp-5d038-default-rtdb.firebaseio.com/products/${id}.json`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );
  dispatch({
    type: EDIT_PRODUCT,
    id,
    product,
  });
};

export const addProduct = (product) => async (dispatch) => {
  const response = await fetch(
    "https://rn-shopapp-5d038-default-rtdb.firebaseio.com/products.json",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    }
  );

  const resData = await response.json();

  dispatch({ id: resData.name, type: ADD_PRODUCT, product });
};
