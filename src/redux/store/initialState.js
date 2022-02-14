const initialState = {
  products: {
    list: [],
  },
  users: {
    cart: [],
    orders: [],
    role: '',
    uid: '',
    username: '',
  },
  loading: false,
  error: {
    message: '',
  },
};

export default initialState;
