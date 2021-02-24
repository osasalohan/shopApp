export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const ADD_PRODUCT = "ADD_PRODUCT";

export const deleteProduct = (id) => ({ type: DELETE_PRODUCT, id });

export const editProduct = (id, product) => ({
  type: EDIT_PRODUCT,
  id,
  product,
});

export const addProduct = (product) => ({
  type: ADD_PRODUCT,
  product,
});
