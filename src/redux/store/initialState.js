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
  alert: {
    type: '',
    message: '',
  },
};

export default initialState;
