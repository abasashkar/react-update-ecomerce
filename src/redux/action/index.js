// For Add Item to Cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

// For Delete Item from Cart
export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

// For replacing cart from server
export const setCart = (items) => {
  return {
    type: "SET_CART",
    payload: items,
  };
};
