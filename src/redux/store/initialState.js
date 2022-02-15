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
    email: '',
  },
  loading: false,
  alert: {
    type: '',
    message: '',
  },
};

export default initialState;
