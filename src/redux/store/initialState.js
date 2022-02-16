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
    id: '',
    type: '',
    message: '',
  },
};

export default initialState;
