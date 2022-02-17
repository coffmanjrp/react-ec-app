const initialState = {
  alert: {
    id: '',
    type: '',
    message: '',
  },
  categories: [],
  loading: false,
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
};

export default initialState;
