const initialState = [];

const handleCart = (state = initialState, action) => {
  const product = action.payload;
  let updatedCart;

  switch (action.type) {
    case "SET_CART":
      return Array.isArray(action.payload) ? action.payload : state;

    case "ADDITEM":
      // Normalise a stable product id (Mongo _id or local id)
      const addKey = product._id || product.id || product.productId;

      // Check if product already in cart
      const exist = state.find(
        (x) => (x.id || x._id || x.productId) === addKey
      );
      if (exist) {
        // Increase the quantity
        updatedCart = state.map((x) =>
          (x.id || x._id || x.productId) === addKey
            ? { ...x, qty: x.qty + 1 }
            : x
        );
      } else {
        updatedCart = [
          ...state,
          {
            ...product,
            id: addKey,
            imageUrl: product.imageUrl || product.image,
            qty: 1,
          },
        ];
      }
      return updatedCart;

    case "DELITEM":
      const delKey = product._id || product.id || product.productId;
      const exist2 = state.find(
        (x) => (x.id || x._id || x.productId) === delKey
      );

      if (!exist2) {
        return state;
      }

      if (exist2.qty === 1) {
        updatedCart = state.filter(
          (x) => (x.id || x._id || x.productId) !== delKey
        );
      } else {
        updatedCart = state.map((x) =>
          (x.id || x._id || x.productId) === delKey
            ? { ...x, qty: x.qty - 1 }
            : x
        );
      }
      return updatedCart;

    default:
      return state;
  }
};

export default handleCart;
